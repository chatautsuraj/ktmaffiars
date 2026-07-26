import type { MetadataRoute } from "next";
import { ARTICLES, COUNTRIES, NAV, SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", ...NAV.map((n) => n.href), "/membership", "/search"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
  }));

  const articleRoutes = ARTICLES.map((a) => ({
    url: `${SITE.url}/article/${a.slug}`,
    lastModified: a.publishedAt,
  }));

  const countryRoutes = COUNTRIES.map((c) => ({
    url: `${SITE.url}/countries/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...countryRoutes];
}
