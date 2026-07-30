export const CMS_COLLECTIONS = [
  "articles",
  "categories",
  "authors",
  "countries",
  "embassies",
  "ambassadors",
  "organizations",
  "events",
  "podcasts",
  "videos",
  "social-videos",
  "magazine-issues",
] as const;

export type CmsCollection = (typeof CMS_COLLECTIONS)[number];

export const COLLECTION_LABELS: Record<CmsCollection, string> = {
  articles: "Articles",
  categories: "Categories",
  authors: "Authors",
  countries: "Countries",
  embassies: "Embassies",
  ambassadors: "Ambassadors",
  organizations: "Organizations",
  events: "Events",
  podcasts: "Podcasts",
  videos: "Videos",
  "social-videos": "Social Videos",
  "magazine-issues": "Magazine Issues",
};

export function isValidCollection(value: string): value is CmsCollection {
  return CMS_COLLECTIONS.includes(value as CmsCollection);
}
