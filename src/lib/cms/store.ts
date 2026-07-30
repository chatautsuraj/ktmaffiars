import "server-only";
import fs from "fs/promises";
import path from "path";
import { BlobNotFoundError, head, put } from "@vercel/blob";
import type { CmsCollection } from "./collections";
import { assertCmsWritable, isBlobConfigured } from "./runtime";

const CONTENT_DIR = path.join(process.cwd(), "content");

function filePath(collection: CmsCollection) {
  return path.join(CONTENT_DIR, `${collection}.json`);
}

function blobPathname(collection: CmsCollection) {
  return `cms/${collection}.json`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Read the latest collection JSON from Blob.
 * Prefer `head` + cache-busted fetch over `get()`, because pathname overwrites
 * can briefly serve stale CDN bodies even with useCache:false.
 */
async function readBlobCollection<T>(collection: CmsCollection): Promise<T[]> {
  const pathname = blobPathname(collection);
  try {
    const meta = await head(pathname);
    const bust = meta.uploadedAt instanceof Date ? meta.uploadedAt.getTime() : Date.now();
    const url = `${meta.url}${meta.url.includes("?") ? "&" : "?"}v=${bust}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as T[]) : [];
  } catch (error) {
    if (error instanceof BlobNotFoundError) return [];
    throw error;
  }
}

async function writeBlobCollection<T>(collection: CmsCollection, data: T[]) {
  const pathname = blobPathname(collection);
  const result = await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    // Minimum allowed by Blob; still bust reads via uploadedAt query param.
    cacheControlMaxAge: 60,
  });

  // Confirm origin has the payload we wrote (avoids racing a stale CDN body).
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(`${result.url}${result.url.includes("?") ? "&" : "?"}v=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const parsed = (await res.json()) as unknown;
        if (Array.isArray(parsed) && parsed.length === data.length) {
          return;
        }
      }
    } catch {
      // retry
    }
    await sleep(150 * (attempt + 1));
  }
}

async function blobCollectionExists(collection: CmsCollection): Promise<boolean> {
  try {
    await head(blobPathname(collection));
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return false;
    throw error;
  }
}

async function readFsCollection<T>(collection: CmsCollection): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath(collection), "utf-8");
    return JSON.parse(raw) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeFsCollection<T>(collection: CmsCollection, data: T[]) {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(filePath(collection), JSON.stringify(data, null, 2), "utf-8");
}

async function fsCollectionExists(collection: CmsCollection): Promise<boolean> {
  try {
    await fs.access(filePath(collection));
    return true;
  } catch {
    return false;
  }
}

export async function readCollection<T>(collection: CmsCollection): Promise<T[]> {
  if (isBlobConfigured()) return readBlobCollection<T>(collection);
  return readFsCollection<T>(collection);
}

export async function writeCollection<T>(collection: CmsCollection, data: T[]) {
  assertCmsWritable();
  if (isBlobConfigured()) {
    await writeBlobCollection(collection, data);
    return;
  }
  await writeFsCollection(collection, data);
}

export async function getById<T extends { id: string }>(
  collection: CmsCollection,
  id: string
): Promise<T | undefined> {
  const items = await readCollection<T>(collection);
  return items.find((item) => item.id === id);
}

export async function getBySlug<T extends { slug: string }>(
  collection: CmsCollection,
  slug: string
): Promise<T | undefined> {
  const items = await readCollection<T>(collection);
  return items.find((item) => item.slug === slug);
}

/**
 * Read-modify-write with short retries so Blob eventual/CDN consistency
 * does not drop creates or make deletes report "Not found".
 */
async function mutateCollection<T extends { id: string }>(
  collection: CmsCollection,
  mutator: (items: T[]) => { items: T[]; result: T | boolean | null }
): Promise<T | boolean | null> {
  let last: T | boolean | null = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    const current = await readCollection<T>(collection);
    const { items, result } = mutator(current);
    last = result;
    if (result === null || result === false) {
      if (attempt < 5) {
        await sleep(150 * (attempt + 1));
        continue;
      }
      return result;
    }
    await writeCollection(collection, items);
    return result;
  }
  return last;
}

export async function createItem<T extends { id: string }>(
  collection: CmsCollection,
  item: T
): Promise<T> {
  const created = await mutateCollection<T>(collection, (items) => {
    const without = items.filter((existing) => existing.id !== item.id);
    without.unshift(item);
    return { items: without, result: item };
  });
  return created as T;
}

export async function updateItem<T extends { id: string }>(
  collection: CmsCollection,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const updated = await mutateCollection<T>(collection, (items) => {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return { items, result: null };
    items[index] = { ...items[index], ...updates, id };
    return { items, result: items[index] };
  });
  return updated as T | null;
}

export async function deleteItem<T extends { id: string }>(
  collection: CmsCollection,
  id: string
): Promise<boolean> {
  const deleted = await mutateCollection<T>(collection, (items) => {
    const next = items.filter((item) => item.id !== id);
    if (next.length === items.length) return { items, result: false };
    return { items: next, result: true };
  });
  return Boolean(deleted);
}

export async function collectionExists(collection: CmsCollection): Promise<boolean> {
  if (isBlobConfigured()) return blobCollectionExists(collection);
  return fsCollectionExists(collection);
}
