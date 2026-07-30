export interface Author {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email?: string;
  twitter?: string;
  linkedin?: string;
  expertise: string[];
  articleCount: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  color?: string;
  showOnHomepage?: boolean;
  homepageOrder?: number;
}

export type ArticleStatus = "draft" | "published";

export type ArticleSource = "manual" | "autopilot";

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  isPremium?: boolean;
  isBreaking?: boolean;
  isFeatured?: boolean;
  pullQuotes?: string[];
  relatedSlugs?: string[];
  /**
   * Publication status. Missing/undefined is treated as "published" so that
   * pre-existing and manually created articles remain publicly visible.
   * Autopilot-created articles are always "draft" until an editor approves them.
   */
  status?: ArticleStatus;
  /** Provenance: how the article was created. Missing means "manual". */
  source?: ArticleSource;
  /** Original source article URL (autopilot only). */
  sourceUrl?: string;
  /** Human-readable name of the originating outlet (autopilot only). */
  sourceName?: string;
  /** Stable identifier (RSS guid or link) used for dedupe (autopilot only). */
  sourceGuid?: string;
}

export interface Country {
  id: string;
  slug: string;
  name: string;
  officialName: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  gdp: number;
  heroImage: string;
  overview: string;
  nepalRelations: string;
  coordinates: { lat: number; lng: number };
  tradeData: TradeData;
  timeline: TimelineEvent[];
  agreements: Agreement[];
  investment: InvestmentData;
  gallery: string[];
  embassySlug?: string;
  stats: CountryStat[];
}

export interface TradeData {
  exports: number;
  imports: number;
  balance: number;
  topExports: string[];
  topImports: string[];
  yearOverYear: number;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface Agreement {
  title: string;
  date: string;
  type: string;
  description: string;
}

export interface InvestmentData {
  totalFDI: number;
  projects: number;
  sectors: { name: string; value: number }[];
}

export interface CountryStat {
  label: string;
  value: string | number;
  change?: number;
}

export interface Embassy {
  id: string;
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  type: "embassy" | "consulate" | "mission";
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  heroImage: string;
  coordinates: { lat: number; lng: number };
  ambassadorSlug?: string;
  established: string;
  visaInfo: string;
  cooperationProjects: CooperationProject[];
  gallery: string[];
}

export interface CooperationProject {
  title: string;
  description: string;
  status: "active" | "completed" | "planned";
  year: number;
}

export interface Ambassador {
  id: string;
  slug: string;
  name: string;
  title: string;
  country: string;
  countrySlug: string;
  embassySlug: string;
  photo: string;
  bio: string;
  appointed: string;
  previousPosts: string[];
  languages: string[];
  speeches?: Speech[];
}

export interface Speech {
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  acronym: string;
  type: string;
  founded: string;
  headquarters: string;
  members: number;
  logo: string;
  heroImage: string;
  overview: string;
  nepalRole: string;
  keyInitiatives: string[];
  website: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  type: string;
  image: string;
  isVirtual?: boolean;
  registrationUrl?: string;
}

export interface Podcast {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  publishedAt: string;
  image: string;
  episode: number;
  season: number;
  guests?: string[];
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
  category: string;
}

export type SocialPlatform = "youtube" | "instagram" | "tiktok" | "facebook";

export interface SocialVideo {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnail: string;
  platform: SocialPlatform;
  platformHandle: string;
  embedUrl?: string;
  videoUrl: string;
  publishedAt: string;
}

export interface MagazineIssue {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  publishedAt: string;
  description: string;
  articles: string[];
}

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  frequency: string;
}

export interface SearchFilters {
  category?: string;
  region?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: "article" | "country" | "embassy" | "organization";
}
