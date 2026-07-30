import type { MetadataRoute } from "next";
import { getArticles } from "@/data/articles";
import { getCountries } from "@/data/countries";
import {
  getEmbassies,
  getOrganizations,
  getPodcasts,
  getVideos,
  getMagazineIssues,
  getAmbassadors,
} from "@/data/content";
import { getCategories, getAuthors } from "@/data/authors";

const BASE_URL = "https://ktmaffairs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    articles,
    countries,
    embassies,
    organizations,
    podcasts,
    videos,
    magazineIssues,
    ambassadors,
    categories,
    authors,
  ] = await Promise.all([
    getArticles(),
    getCountries(),
    getEmbassies(),
    getOrganizations(),
    getPodcasts(),
    getVideos(),
    getMagazineIssues(),
    getAmbassadors(),
    getCategories(),
    getAuthors(),
  ]);

  const staticPages = [
    "", "/search", "/newsletter", "/membership", "/about", "/contact",
    "/events", "/podcasts", "/videos", "/magazine", "/countries", "/embassies", "/organizations",
    "/authors", "/ambassadors", "/privacy", "/terms",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticPages,
    ...articles.map((a) => ({
      url: `${BASE_URL}/article/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...categories.map((c) => ({
      url: `${BASE_URL}/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    })),
    ...countries.map((c) => ({
      url: `${BASE_URL}/country/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...embassies.map((e) => ({
      url: `${BASE_URL}/embassy/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ambassadors.map((a) => ({
      url: `${BASE_URL}/ambassador/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...organizations.map((o) => ({
      url: `${BASE_URL}/organization/${o.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...authors.map((a) => ({
      url: `${BASE_URL}/author/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...podcasts.map((p) => ({
      url: `${BASE_URL}/podcasts/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...videos.map((v) => ({
      url: `${BASE_URL}/videos/${v.slug}`,
      lastModified: new Date(v.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...magazineIssues.map((m) => ({
      url: `${BASE_URL}/magazine/${m.slug}`,
      lastModified: new Date(m.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
