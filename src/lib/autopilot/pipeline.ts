import "server-only";
import type { Article, Author, Category } from "@/types";
import { createItem, readCollection } from "@/lib/cms/store";
import { ensureSeeded } from "@/lib/cms/seed";
import { slugify } from "@/lib/utils";
import { getAutopilotConfig, loadSeen, saveSeen } from "./config";
import { fetchFeed } from "./feeds";
import { AUTOPILOT_HALTED_MESSAGE, isAutopilotHalted } from "./halt";
import { aiModelLabel, isAIConfigured, summarizeItem } from "./summarize";
import type {
  AutopilotConfig,
  CreatedArticleRef,
  NormalizedItem,
  PerFeedResult,
  RunSummary,
} from "./types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&h=900&fit=crop";

/** Keyword -> category slug. First match wins; else the feed/default category. */
const CATEGORY_KEYWORDS: { slug: string; words: string[] }[] = [
  { slug: "security", words: ["war", "military", "defense", "defence", "attack", "troop", "missile", "conflict", "strike", "terror"] },
  { slug: "economy", words: ["economy", "economic", "trade", "market", "inflation", "gdp", "finance", "tariff", "investment", "bank"] },
  { slug: "climate", words: ["climate", "environment", "emission", "wildfire", "flood", "drought", "carbon", "warming"] },
  { slug: "diplomacy", words: ["diploma", "summit", "embassy", "bilateral", "treaty", "ambassador", "negotiat", "un ", "united nations"] },
  { slug: "foreign-policy", words: ["election", "president", "minister", "parliament", "policy", "government", "sanction", "vote"] },
];

function pickCategorySlug(item: NormalizedItem, config: AutopilotConfig): string {
  const haystack = `${item.title} ${item.summary}`.toLowerCase();
  for (const { slug, words } of CATEGORY_KEYWORDS) {
    if (words.some((w) => haystack.includes(w))) return slug;
  }
  return item.feedCategory || config.defaultCategorySlug;
}

function resolveCategory(slug: string, categories: Category[], config: AutopilotConfig): Category {
  return (
    categories.find((c) => c.slug === slug) ||
    categories.find((c) => c.slug === config.defaultCategorySlug) ||
    categories[0]
  );
}

function makeUniqueSlug(base: string, taken: Set<string>): string {
  const root = slugify(base).slice(0, 80) || `story-${Date.now()}`;
  let candidate = root;
  let n = 2;
  while (taken.has(candidate)) {
    candidate = `${root}-${n}`;
    n += 1;
  }
  taken.add(candidate);
  return candidate;
}

function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function escapeHtml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function attributionBlock(item: NormalizedItem): string {
  const safeName = escapeHtml(item.feedName);
  const safeUrl = escapeHtml(item.link);
  return (
    `<p class="autopilot-attribution"><em>This summary was compiled by KTM Affairs from reporting by ` +
    `${safeName}. Read the full story at <a href="${safeUrl}" target="_blank" rel="noopener noreferrer nofollow">${safeName}</a>.</em></p>`
  );
}

interface DraftContent {
  title: string;
  excerpt: string;
  content: string;
  usedAI: boolean;
}

async function buildDraftContent(item: NormalizedItem): Promise<DraftContent> {
  const ai = await summarizeItem(item);
  if (ai) {
    return {
      title: ai.title,
      excerpt: ai.excerpt,
      content: `${ai.content}\n${attributionBlock(item)}`,
      usedAI: true,
    };
  }
  // Excerpt fallback: short excerpt from the RSS summary + prominent attribution.
  const excerpt = item.summary
    ? item.summary.slice(0, 280)
    : `Read this story from ${item.feedName}.`;
  const body = `<p>${escapeHtml(excerpt)}</p>\n${attributionBlock(item)}`;
  return { title: item.title, excerpt, content: body, usedAI: false };
}

export interface RunOptions {
  /** When true, run even if the master switch is off (used by manual "Run now"). */
  force?: boolean;
}

/**
 * Execute one Autopilot ingestion pass. Pure of Next.js cache APIs so it can be
 * called from route handlers or scripts; callers handle revalidation.
 */
export async function runAutopilot(options: RunOptions = {}): Promise<RunSummary> {
  const startedAt = new Date();
  const config = getAutopilotConfig();
  const forced = Boolean(options.force);
  const messages: string[] = [];

  const base: RunSummary = {
    startedAt: startedAt.toISOString(),
    finishedAt: startedAt.toISOString(),
    durationMs: 0,
    ran: false,
    enabled: config.enabled,
    forced,
    fetched: 0,
    created: 0,
    skipped: 0,
    errors: 0,
    aiUsed: 0,
    fallbackUsed: 0,
    perFeed: [],
    createdArticles: [],
    messages,
  };

  if (isAutopilotHalted()) {
    messages.push(AUTOPILOT_HALTED_MESSAGE);
    return finalize(base, startedAt);
  }

  if (!config.enabled && !forced) {
    messages.push("Autopilot is disabled (master switch off). Run skipped.");
    return finalize(base, startedAt);
  }

  await ensureSeeded();
  const categories = await readCollection<Category>("categories");
  const authors = await readCollection<Author>("authors");
  const existing = await readCollection<Article>("articles");

  if (categories.length === 0 || authors.length === 0) {
    messages.push("No categories or authors available; cannot create drafts.");
    return finalize(base, startedAt);
  }

  const author =
    authors.find((a) => a.id === config.defaultAuthorId) || authors[0];

  const seen = loadSeen();
  const existingSlugs = new Set(existing.map((a) => a.slug));
  const existingKeys = new Set<string>();
  for (const a of existing) {
    if (a.sourceGuid) existingKeys.add(a.sourceGuid);
    if (a.sourceUrl) existingKeys.add(a.sourceUrl);
  }

  messages.push(
    isAIConfigured()
      ? `AI summaries enabled (${aiModelLabel()}).`
      : "No LLM key configured — using excerpt fallback mode."
  );

  const createdArticles: CreatedArticleRef[] = [];
  const perFeed: PerFeedResult[] = [];
  let fetched = 0;
  let created = 0;
  let skipped = 0;
  let errors = 0;
  let aiUsed = 0;
  let fallbackUsed = 0;

  const enabledFeeds = config.feeds.filter((f) => f.enabled !== false && f.url);

  for (const feed of enabledFeeds) {
    if (created >= config.maxItemsPerRun) {
      perFeed.push({ name: feed.name, url: feed.url, fetched: 0, created: 0, skipped: 0 });
      continue;
    }
    const feedResult: PerFeedResult = { name: feed.name, url: feed.url, fetched: 0, created: 0, skipped: 0 };
    try {
      const items = await fetchFeed(feed);
      feedResult.fetched = items.length;
      fetched += items.length;

      for (const item of items) {
        if (created >= config.maxItemsPerRun) break;

        const dupeByKey = seen.has(item.guid) || existingKeys.has(item.guid) || existingKeys.has(item.link);
        if (dupeByKey) {
          feedResult.skipped += 1;
          skipped += 1;
          continue;
        }

        const draft = await buildDraftContent(item);
        const slug = makeUniqueSlug(draft.title, existingSlugs);
        const categorySlug = pickCategorySlug(item, config);
        const category = resolveCategory(categorySlug, categories, config);
        const nowIso = new Date().toISOString();

        const article: Article = {
          id: crypto.randomUUID(),
          slug,
          title: draft.title,
          excerpt: draft.excerpt,
          content: draft.content,
          featuredImage: item.imageUrl || FALLBACK_IMAGE,
          category,
          author,
          publishedAt: item.isoDate ? new Date(item.isoDate).toISOString() : nowIso,
          updatedAt: nowIso,
          readingTime: estimateReadingTime(draft.content),
          tags: [item.feedName],
          status: "draft",
          source: "autopilot",
          sourceUrl: item.link,
          sourceName: item.feedName,
          sourceGuid: item.guid,
        };

        await createItem("articles", article);
        seen.add(item.guid);
        existingKeys.add(item.guid);
        existingKeys.add(item.link);

        created += 1;
        feedResult.created += 1;
        if (draft.usedAI) aiUsed += 1;
        else fallbackUsed += 1;
        createdArticles.push({ id: article.id, slug: article.slug, title: article.title, usedAI: draft.usedAI });
      }
    } catch (err) {
      errors += 1;
      feedResult.error = err instanceof Error ? err.message : String(err);
      messages.push(`Feed "${feed.name}" failed: ${feedResult.error}`);
    }
    perFeed.push(feedResult);
  }

  saveSeen(seen);

  const result: RunSummary = {
    ...base,
    ran: true,
    fetched,
    created,
    skipped,
    errors,
    aiUsed,
    fallbackUsed,
    perFeed,
    createdArticles,
    messages,
  };
  return finalize(result, startedAt);
}

function finalize(summary: RunSummary, startedAt: Date): RunSummary {
  const finishedAt = new Date();
  return {
    ...summary,
    finishedAt: finishedAt.toISOString(),
    durationMs: finishedAt.getTime() - startedAt.getTime(),
  };
}
