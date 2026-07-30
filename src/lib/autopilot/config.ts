import "server-only";
import fs from "fs";
import path from "path";
import type { AutopilotConfig } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONFIG_PATH = path.join(CONTENT_DIR, "autopilot-config.json");
const SEEN_PATH = path.join(CONTENT_DIR, "autopilot-seen.json");

/**
 * Seeded defaults. `enabled` is false so Autopilot never surprise-runs after
 * install; an editor must turn it on. Feeds are reputable international outlets
 * with stable, publicly documented RSS endpoints.
 */
export const DEFAULT_CONFIG: AutopilotConfig = {
  enabled: false,
  publishMode: "review",
  maxItemsPerRun: 5,
  scheduleIntervalMinutes: 180,
  defaultCategorySlug: "nepal-world",
  feeds: [
    { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", category: "nepal-world", enabled: false },
    { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", category: "nepal-world", enabled: false },
    { name: "The Guardian World", url: "https://www.theguardian.com/world/rss", category: "nepal-world", enabled: false },
    { name: "NPR World", url: "https://feeds.npr.org/1004/rss.xml", category: "foreign-policy", enabled: false },
    { name: "UN News", url: "https://news.un.org/feed/subscribe/en/news/all/rss.xml", category: "diplomacy", enabled: false },
  ],
};

function ensureDir() {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

/**
 * Read the Autopilot config, seeding defaults on first access and merging any
 * newly added default keys so upgrades never crash on missing fields.
 */
export function getAutopilotConfig(): AutopilotConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    ensureDir();
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2), "utf-8");
    return { ...DEFAULT_CONFIG };
  }
  try {
    const raw = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8")) as Partial<AutopilotConfig>;
    return {
      ...DEFAULT_CONFIG,
      ...raw,
      // publishMode is fixed to "review" for this deployment.
      publishMode: "review",
      feeds: Array.isArray(raw.feeds) ? (raw.feeds as AutopilotConfig["feeds"]) : DEFAULT_CONFIG.feeds,
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveAutopilotConfig(next: AutopilotConfig): AutopilotConfig {
  ensureDir();
  const sanitized: AutopilotConfig = {
    enabled: Boolean(next.enabled),
    publishMode: "review",
    maxItemsPerRun: clampInt(next.maxItemsPerRun, 1, 50, DEFAULT_CONFIG.maxItemsPerRun),
    scheduleIntervalMinutes: clampInt(next.scheduleIntervalMinutes, 5, 10080, DEFAULT_CONFIG.scheduleIntervalMinutes),
    defaultCategorySlug: next.defaultCategorySlug || DEFAULT_CONFIG.defaultCategorySlug,
    defaultAuthorId: next.defaultAuthorId || undefined,
    feeds: (Array.isArray(next.feeds) ? next.feeds : [])
      .filter((f) => f && typeof f.url === "string" && f.url.trim().length > 0)
      .map((f) => ({
        name: (f.name || f.url).trim(),
        url: f.url.trim(),
        category: f.category?.trim() || undefined,
        enabled: f.enabled !== false,
      })),
  };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(sanitized, null, 2), "utf-8");
  return sanitized;
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function loadSeen(): Set<string> {
  if (!fs.existsSync(SEEN_PATH)) return new Set();
  try {
    const raw = JSON.parse(fs.readFileSync(SEEN_PATH, "utf-8"));
    if (Array.isArray(raw)) return new Set(raw as string[]);
    if (Array.isArray(raw?.seen)) return new Set(raw.seen as string[]);
    return new Set();
  } catch {
    return new Set();
  }
}

export function saveSeen(seen: Set<string>) {
  ensureDir();
  // Cap the persisted history so the file cannot grow without bound.
  const list = Array.from(seen);
  const capped = list.slice(Math.max(0, list.length - 5000));
  fs.writeFileSync(SEEN_PATH, JSON.stringify({ seen: capped }, null, 2), "utf-8");
}
