/**
 * CMS write availability:
 * - Local / non-serverless: filesystem under `content/`
 * - Vercel with `BLOB_READ_WRITE_TOKEN`: Vercel Blob (`cms/*.json` + `uploads/`)
 * - Vercel without Blob token: read-only (bundled content only)
 */

export function isServerlessHost(): boolean {
  return Boolean(process.env.VERCEL) || process.env.CMS_READ_ONLY === "true";
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** True when CMS create/update/delete and uploads can persist. */
export function isCmsWritable(): boolean {
  return !isServerlessHost() || isBlobConfigured();
}

export const CMS_READ_ONLY_MESSAGE =
  "Content editing is unavailable on this host (Vercel) because BLOB_READ_WRITE_TOKEN is not set. " +
  "Create a Vercel Blob store, add the token to the project env, and redeploy — " +
  "or edit content locally and redeploy.";

export function assertCmsWritable(): void {
  if (!isCmsWritable()) {
    throw new Error(CMS_READ_ONLY_MESSAGE);
  }
}
