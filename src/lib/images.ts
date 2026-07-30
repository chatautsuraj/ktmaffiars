export const IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop";

/** Replace broken Unsplash IDs with verified working URLs */
export const IMAGE_URL_FIXES: Record<string, string> = {
  "photo-1524492412937-280ce16d48a7": "photo-1529107386315-e1a2ed48a620",
  "photo-1526304640581-334504f102d0": "photo-1544735716-392fe2489ffa",
  "photo-1564507592333-c60657eea71f": "photo-1540575467063-178a50c2df87",
  "photo-1569163139394-de4798aa62b0": "photo-1451187580459-43490279c0fa",
  "photo-1478737270239-2f02eb77d678": "photo-1590602847861-f357a9332bbc",
  "photo-1580489944761-45a21f2d41c4": "photo-1573496359142-b8d87734a5a2",
};

export function resolveImageUrl(src: string): string {
  if (!src) return IMAGE_FALLBACK;
  let resolved = src;
  for (const [broken, fixed] of Object.entries(IMAGE_URL_FIXES)) {
    if (resolved.includes(broken)) {
      resolved = resolved.replace(broken, fixed);
    }
  }
  return resolved;
}

export function resolveImageUrls(urls: string[]): string[] {
  if (!Array.isArray(urls)) return [];
  return urls.map(resolveImageUrl);
}
