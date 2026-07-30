import "server-only";
import fs from "fs";
import path from "path";

export type SubscriptionKind = "newsletter" | "membership";

export interface SubscriberRecord {
  id: string;
  email: string;
  kind: SubscriptionKind;
  /** newsletter list id or membership plan slug */
  listOrPlan: string;
  name?: string;
  organization?: string;
  createdAt: string;
  source?: string;
}

const CONTENT_FILE = path.join(process.cwd(), "content", "subscribers.json");
const BLOB_PATHNAME = "cms/subscribers.json";

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readFromBlob(): Promise<SubscriberRecord[]> {
  const { list } = await import("@vercel/blob");
  const result = await list({ prefix: BLOB_PATHNAME, limit: 10 });
  const match = result.blobs.find((b) => b.pathname === BLOB_PATHNAME);
  if (!match) return [];
  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as SubscriberRecord[];
  return Array.isArray(data) ? data : [];
}

async function writeToBlob(records: SubscriberRecord[]) {
  const { put } = await import("@vercel/blob");
  await put(BLOB_PATHNAME, JSON.stringify(records, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function readFromFs(): SubscriberRecord[] {
  if (!fs.existsSync(CONTENT_FILE)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    return Array.isArray(data) ? (data as SubscriberRecord[]) : [];
  } catch {
    return [];
  }
}

function writeToFs(records: SubscriberRecord[]) {
  fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export async function listSubscribers(): Promise<SubscriberRecord[]> {
  if (hasBlobToken()) {
    try {
      return await readFromBlob();
    } catch {
      return readFromFs();
    }
  }
  return readFromFs();
}

export async function addSubscriber(input: {
  email: string;
  kind: SubscriptionKind;
  listOrPlan: string;
  name?: string;
  organization?: string;
  source?: string;
}): Promise<{ record: SubscriberRecord; created: boolean }> {
  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const listOrPlan = input.listOrPlan.trim() || "general";
  const records = await listSubscribers();
  const existing = records.find(
    (r) => r.email === email && r.kind === input.kind && r.listOrPlan === listOrPlan
  );
  if (existing) {
    return { record: existing, created: false };
  }

  const record: SubscriberRecord = {
    id: crypto.randomUUID(),
    email,
    kind: input.kind,
    listOrPlan,
    name: input.name?.trim() || undefined,
    organization: input.organization?.trim() || undefined,
    createdAt: new Date().toISOString(),
    source: input.source,
  };

  const next = [record, ...records];
  if (hasBlobToken()) {
    await writeToBlob(next);
  } else if (process.env.VERCEL) {
    throw new Error(
      "Subscriptions need Vercel Blob storage on this host. Set BLOB_READ_WRITE_TOKEN, or subscribe from a configured environment."
    );
  } else {
    writeToFs(next);
  }

  return { record, created: true };
}
