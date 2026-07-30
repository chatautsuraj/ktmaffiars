/**
 * One-shot: upload content/*.json into Vercel Blob when missing.
 * Usage: BLOB_READ_WRITE_TOKEN=... node --import tsx scripts/seed-blob.mjs
 * Or: node scripts/seed-blob.mjs (reads token from env / .env.local)
 */
import fs from "fs";
import path from "path";
import { head, put, BlobNotFoundError } from "@vercel/blob";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function exists(pathname) {
  try {
    await head(pathname);
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return false;
    throw error;
  }
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is required");
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const collection = file.replace(/\.json$/, "");
    const pathname = `cms/${collection}.json`;
    if (await exists(pathname)) {
      console.log(`skip ${pathname} (exists)`);
      skipped += 1;
      continue;
    }
    const body = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    await put(pathname, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    console.log(`uploaded ${pathname}`);
    uploaded += 1;
  }

  console.log(`done. uploaded=${uploaded} skipped=${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
