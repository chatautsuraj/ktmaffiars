import "server-only";
import Parser from "rss-parser";
import type { FeedConfig, NormalizedItem } from "./types";

interface MediaNode {
  $?: { url?: string; medium?: string; type?: string };
}

interface RawItem {
  title?: string;
  link?: string;
  guid?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  summary?: string;
  enclosure?: { url?: string; type?: string };
  mediaContent?: MediaNode | MediaNode[];
  mediaThumbnail?: MediaNode | MediaNode[];
}

const parser: Parser<unknown, RawItem> = new Parser<unknown, RawItem>({
  timeout: 15000,
  headers: { "User-Agent": "KTMAffairs-Autopilot/1.0 (+https://ktmaffairs.com)" },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
    ],
  },
});

const FETCH_TIMEOUT_MS = 15000;

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMediaUrl(node?: MediaNode | MediaNode[]): string | undefined {
  if (!node) return undefined;
  const arr = Array.isArray(node) ? node : [node];
  for (const m of arr) {
    const url = m?.$?.url;
    if (url && /^https?:\/\//.test(url)) return url;
  }
  return undefined;
}

function extractImage(item: RawItem): string | undefined {
  if (item.enclosure?.url && (item.enclosure.type?.startsWith("image") ?? true)) {
    return item.enclosure.url;
  }
  return firstMediaUrl(item.mediaContent) ?? firstMediaUrl(item.mediaThumbnail);
}

/**
 * Fetch and parse a single feed into normalized items. Network and parse
 * failures are surfaced to the caller (per-feed) rather than thrown globally,
 * so one broken feed never aborts a whole run.
 */
export async function fetchFeed(feed: FeedConfig): Promise<NormalizedItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let xml: string;
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { "User-Agent": "KTMAffairs-Autopilot/1.0 (+https://ktmaffairs.com)" },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    xml = await res.text();
  } finally {
    clearTimeout(timer);
  }

  const parsed = await parser.parseString(xml);
  const items = (parsed.items ?? []) as RawItem[];

  return items
    .map((item): NormalizedItem | null => {
      const link = (item.link || "").trim();
      const guid = (item.guid || link || "").trim();
      const title = (item.title || "").trim();
      if (!title || !guid) return null;
      const rawSummary = item.contentSnippet || item.summary || item.content || "";
      return {
        guid,
        title,
        link: link || guid,
        summary: stripHtml(rawSummary).slice(0, 1200),
        isoDate: item.isoDate || item.pubDate,
        imageUrl: extractImage(item),
        feedName: feed.name,
        feedCategory: feed.category,
      };
    })
    .filter((item): item is NormalizedItem => item !== null);
}
