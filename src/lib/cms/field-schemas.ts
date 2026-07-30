import type { CmsCollection } from "./collections";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "date"
  | "tags"
  | "json"
  | "select"
  | "image"
  | "video";

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

const CATEGORY_FIELDS: FieldSchema[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text", hint: "Auto-generated from name if left empty" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "color", label: "Color", type: "text", placeholder: "#1a2744" },
  {
    key: "showOnHomepage",
    label: "Show on homepage",
    type: "checkbox",
    hint: "Display a section for this category on the homepage with its recent articles",
  },
  {
    key: "homepageOrder",
    label: "Homepage order",
    type: "number",
    hint: "Lower numbers appear first among homepage category sections",
  },
];

const AUTHOR_FIELDS: FieldSchema[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "bio", label: "Bio", type: "textarea", rows: 4 },
  { key: "avatar", label: "Avatar", type: "image", hint: "Paste a URL or upload an image" },
  { key: "email", label: "Email", type: "text" },
  { key: "twitter", label: "Twitter", type: "text" },
  { key: "linkedin", label: "LinkedIn", type: "text" },
  { key: "expertise", label: "Expertise", type: "tags", hint: "Comma-separated topics" },
  { key: "articleCount", label: "Article Count", type: "number" },
];

const EVENT_FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4 },
  { key: "date", label: "Start Date", type: "date", required: true },
  { key: "endDate", label: "End Date", type: "date" },
  { key: "location", label: "Location", type: "text" },
  { key: "type", label: "Type", type: "text", placeholder: "Summit, Forum, Briefing..." },
  { key: "image", label: "Image", type: "image", hint: "Paste a URL or upload an image" },
  { key: "isVirtual", label: "Virtual Event", type: "checkbox" },
  { key: "registrationUrl", label: "Registration URL", type: "text" },
];

const PODCAST_FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4 },
  { key: "duration", label: "Duration", type: "text", placeholder: "42 min" },
  { key: "publishedAt", label: "Published", type: "date" },
  { key: "image", label: "Cover Image", type: "image", hint: "Paste a URL or upload an image" },
  { key: "episode", label: "Episode", type: "number" },
  { key: "season", label: "Season", type: "number" },
  { key: "guests", label: "Guests", type: "tags" },
];

const VIDEO_FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 4 },
  { key: "thumbnail", label: "Thumbnail", type: "image", hint: "Paste a URL or upload an image" },
  { key: "duration", label: "Duration", type: "text", placeholder: "12:30" },
  { key: "publishedAt", label: "Published", type: "date" },
  { key: "category", label: "Category", type: "text" },
];

const SOCIAL_VIDEO_FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "thumbnail", label: "Thumbnail", type: "image", hint: "Paste a URL or upload an image" },
  {
    key: "platform",
    label: "Platform",
    type: "select",
    required: true,
    options: [
      { value: "youtube", label: "YouTube" },
      { value: "instagram", label: "Instagram" },
      { value: "tiktok", label: "TikTok" },
      { value: "facebook", label: "Facebook" },
    ],
  },
  { key: "platformHandle", label: "Platform Handle", type: "text", placeholder: "@KTMAffairs" },
  { key: "embedUrl", label: "Embed URL", type: "text", hint: "YouTube embed URL (optional)" },
  { key: "videoUrl", label: "Video", type: "video", required: true, hint: "Paste a URL or upload a video file" },
  { key: "publishedAt", label: "Published", type: "date" },
];

const MAGAZINE_FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "description", label: "Description", type: "textarea", rows: 3 },
  { key: "coverImage", label: "Cover Image", type: "image", hint: "Paste a URL or upload an image" },
  { key: "publishedAt", label: "Published", type: "date" },
  { key: "articles", label: "Article Slugs", type: "tags", hint: "Comma-separated article slugs in this issue" },
];

const ORGANIZATION_FIELDS: FieldSchema[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "acronym", label: "Acronym", type: "text" },
  { key: "type", label: "Type", type: "text" },
  { key: "founded", label: "Founded", type: "text" },
  { key: "headquarters", label: "Headquarters", type: "text" },
  { key: "members", label: "Members", type: "number" },
  { key: "logo", label: "Logo", type: "image", hint: "Paste a URL or upload an image" },
  { key: "heroImage", label: "Hero Image", type: "image", hint: "Paste a URL or upload an image" },
  { key: "overview", label: "Overview", type: "textarea", rows: 5 },
  { key: "nepalRole", label: "Nepal's Role", type: "textarea", rows: 4 },
  { key: "keyInitiatives", label: "Key Initiatives", type: "tags" },
  { key: "website", label: "Website", type: "text" },
];

const AMBASSADOR_FIELDS: FieldSchema[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "country", label: "Country", type: "text" },
  { key: "countrySlug", label: "Country Slug", type: "text" },
  { key: "embassySlug", label: "Embassy Slug", type: "text" },
  { key: "photo", label: "Photo", type: "image", hint: "Paste a URL or upload an image" },
  { key: "bio", label: "Bio", type: "textarea", rows: 5 },
  { key: "appointed", label: "Appointed", type: "text" },
  { key: "previousPosts", label: "Previous Posts", type: "tags" },
  { key: "languages", label: "Languages", type: "tags" },
];

const EMBASSY_FIELDS: FieldSchema[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "country", label: "Country", type: "text" },
  { key: "countrySlug", label: "Country Slug", type: "text" },
  { key: "type", label: "Type", type: "select", options: [
    { value: "embassy", label: "Embassy" },
    { value: "consulate", label: "Consulate" },
    { value: "mission", label: "Mission" },
  ]},
  { key: "address", label: "Address", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "phone", label: "Phone", type: "text" },
  { key: "email", label: "Email", type: "text" },
  { key: "website", label: "Website", type: "text" },
  { key: "heroImage", label: "Hero Image", type: "image", hint: "Paste a URL or upload an image" },
  { key: "ambassadorSlug", label: "Ambassador Slug", type: "text" },
  { key: "established", label: "Established", type: "text" },
  { key: "visaInfo", label: "Visa Info", type: "textarea", rows: 3 },
  { key: "coordinates", label: "Coordinates (JSON)", type: "json", hint: '{"lat": 27.7, "lng": 85.3}' },
  { key: "cooperationProjects", label: "Cooperation Projects (JSON)", type: "json" },
  { key: "gallery", label: "Gallery URLs", type: "tags" },
];

const COUNTRY_FIELDS: FieldSchema[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug", type: "text" },
  { key: "officialName", label: "Official Name", type: "text" },
  { key: "flag", label: "Flag Emoji", type: "text", placeholder: "🇳🇵" },
  { key: "capital", label: "Capital", type: "text" },
  { key: "region", label: "Region", type: "text" },
  { key: "population", label: "Population", type: "number" },
  { key: "gdp", label: "GDP (USD)", type: "number" },
  { key: "heroImage", label: "Hero Image", type: "image", hint: "Paste a URL or upload an image" },
  { key: "overview", label: "Overview", type: "textarea", rows: 5 },
  { key: "nepalRelations", label: "Nepal Relations", type: "textarea", rows: 4 },
  { key: "embassySlug", label: "Embassy Slug", type: "text" },
  { key: "coordinates", label: "Coordinates (JSON)", type: "json" },
  { key: "tradeData", label: "Trade Data (JSON)", type: "json" },
  { key: "timeline", label: "Timeline (JSON)", type: "json" },
  { key: "agreements", label: "Agreements (JSON)", type: "json" },
  { key: "investment", label: "Investment (JSON)", type: "json" },
  { key: "gallery", label: "Gallery URLs", type: "tags" },
  { key: "stats", label: "Stats (JSON)", type: "json" },
];

export const COLLECTION_FIELDS: Partial<Record<CmsCollection, FieldSchema[]>> = {
  categories: CATEGORY_FIELDS,
  authors: AUTHOR_FIELDS,
  events: EVENT_FIELDS,
  podcasts: PODCAST_FIELDS,
  videos: VIDEO_FIELDS,
  "social-videos": SOCIAL_VIDEO_FIELDS,
  "magazine-issues": MAGAZINE_FIELDS,
  organizations: ORGANIZATION_FIELDS,
  ambassadors: AMBASSADOR_FIELDS,
  embassies: EMBASSY_FIELDS,
  countries: COUNTRY_FIELDS,
};

export function getListColumns(collection: CmsCollection): { key: string; label: string }[] {
  const defaults: Record<CmsCollection, { key: string; label: string }[]> = {
    articles: [
      { key: "title", label: "Title" },
      { key: "category.name", label: "Category" },
      { key: "status", label: "Status" },
      { key: "source", label: "Source" },
      { key: "publishedAt", label: "Published" },
    ],
    categories: [{ key: "name", label: "Name" }, { key: "slug", label: "Slug" }],
    authors: [{ key: "name", label: "Name" }, { key: "title", label: "Title" }],
    countries: [{ key: "name", label: "Country" }, { key: "region", label: "Region" }],
    embassies: [{ key: "name", label: "Name" }, { key: "city", label: "City" }],
    ambassadors: [{ key: "name", label: "Name" }, { key: "country", label: "Country" }],
    organizations: [{ key: "name", label: "Name" }, { key: "acronym", label: "Acronym" }],
    events: [{ key: "title", label: "Title" }, { key: "date", label: "Date" }],
    podcasts: [{ key: "title", label: "Title" }, { key: "episode", label: "Episode" }],
    videos: [{ key: "title", label: "Title" }, { key: "category", label: "Category" }],
    "social-videos": [{ key: "title", label: "Title" }, { key: "platform", label: "Platform" }, { key: "publishedAt", label: "Published" }],
    "magazine-issues": [{ key: "title", label: "Title" }, { key: "publishedAt", label: "Published" }],
  };
  return defaults[collection];
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export function formatCellValue(item: Record<string, unknown>, key: string): string {
  const value = key.includes(".") ? getNestedValue(item, key) : item[key];
  if (value === undefined || value === null) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" && value.includes("T") && !isNaN(Date.parse(value))) {
    return new Date(value).toLocaleDateString();
  }
  return String(value);
}
