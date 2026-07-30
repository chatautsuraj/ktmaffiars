export type UploadKind = "image" | "video";

export const IMAGE_MIME_TYPES: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

export const VIDEO_MIME_TYPES: Record<string, string> = {
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
};

export const IMAGE_MAX_BYTES = 8 * 1024 * 1024; // 8MB
export const VIDEO_MAX_BYTES = 100 * 1024 * 1024; // 100MB

export function acceptAttr(kind: UploadKind): string {
  const mimes = kind === "video" ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES;
  return Object.keys(mimes).join(",");
}

export function maxBytesFor(kind: UploadKind): number {
  return kind === "video" ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES;
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))}MB`;
  return `${Math.round(bytes / 1024)}KB`;
}
