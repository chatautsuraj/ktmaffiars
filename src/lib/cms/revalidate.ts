import { revalidatePath } from "next/cache";
import type { CmsCollection } from "./collections";

const PUBLIC_PATHS: Partial<Record<CmsCollection, string[]>> = {
  articles: ["/", "/article"],
  categories: ["/", "/category"],
  authors: ["/authors", "/author"],
  countries: ["/countries", "/country"],
  embassies: ["/embassies", "/embassy"],
  ambassadors: ["/ambassadors", "/ambassador"],
  organizations: ["/organizations", "/organization"],
  events: ["/events"],
  podcasts: ["/podcasts"],
  videos: ["/videos"],
  "social-videos": ["/", "/videos"],
  "magazine-issues": ["/magazine"],
};

export function revalidateCollection(collection: CmsCollection) {
  const paths = PUBLIC_PATHS[collection] || ["/"];
  paths.forEach((path) => revalidatePath(path, "layout"));
}
