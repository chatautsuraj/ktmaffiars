export interface FeedConfig {
  name: string;
  url: string;
  /** Default category slug for items from this feed (item keywords may override). */
  category?: string;
  enabled?: boolean;
}

/**
 * Publish mode for Autopilot-created articles.
 * "review" (the configured mode) always creates drafts for human approval.
 */
export type PublishMode = "review";

export interface AutopilotConfig {
  /** Master on/off switch. Scheduled runs are skipped entirely when false. */
  enabled: boolean;
  /** Always "review" for this deployment — drafts require admin approval. */
  publishMode: PublishMode;
  feeds: FeedConfig[];
  /** Maximum number of drafts to create across all feeds in a single run. */
  maxItemsPerRun: number;
  /** Suggested interval for the external scheduler, in minutes. */
  scheduleIntervalMinutes: number;
  /** Existing author id to attribute Autopilot drafts to. Falls back to the first author. */
  defaultAuthorId?: string;
  /** Category slug used when an item cannot be mapped to a specific category. */
  defaultCategorySlug: string;
}

export interface NormalizedItem {
  /** Stable dedupe key: RSS guid when present, otherwise the link. */
  guid: string;
  title: string;
  link: string;
  /** Plain-text summary/description from the feed. */
  summary: string;
  isoDate?: string;
  imageUrl?: string;
  feedName: string;
  feedCategory?: string;
}

export interface PerFeedResult {
  name: string;
  url: string;
  fetched: number;
  created: number;
  skipped: number;
  error?: string;
}

export interface CreatedArticleRef {
  id: string;
  slug: string;
  title: string;
  usedAI: boolean;
}

export interface RunSummary {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  /** Whether the run actually executed (false when disabled and not forced). */
  ran: boolean;
  enabled: boolean;
  forced: boolean;
  fetched: number;
  created: number;
  skipped: number;
  errors: number;
  aiUsed: number;
  fallbackUsed: number;
  perFeed: PerFeedResult[];
  createdArticles: CreatedArticleRef[];
  messages: string[];
}
