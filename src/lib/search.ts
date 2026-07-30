import "server-only";
import { getArticles } from "@/data/articles";
import { getCountries } from "@/data/countries";
import { getEmbassies, getOrganizations } from "@/data/content";
import type { SearchFilters } from "@/types";

export interface SearchResult {
  id: string;
  type: "article" | "country" | "embassy" | "organization";
  title: string;
  subtitle?: string;
  href: string;
  date?: string;
}

export async function searchAll(query: string, filters: SearchFilters = {}): Promise<SearchResult[]> {
  const q = query.toLowerCase().trim();
  if (!q && !filters.category && !filters.region && !filters.type) return [];

  const results: SearchResult[] = [];
  const [articles, countries, embassies, organizations] = await Promise.all([
    !filters.type || filters.type === "article" ? getArticles() : Promise.resolve([]),
    !filters.type || filters.type === "country" ? getCountries() : Promise.resolve([]),
    !filters.type || filters.type === "embassy" ? getEmbassies() : Promise.resolve([]),
    !filters.type || filters.type === "organization" ? getOrganizations() : Promise.resolve([]),
  ]);

  if (!filters.type || filters.type === "article") {
    articles
      .filter((a) => {
        const matchesQuery =
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCategory = !filters.category || a.category.slug === filters.category;
        return matchesQuery && matchesCategory;
      })
      .forEach((a) =>
        results.push({
          id: a.id,
          type: "article",
          title: a.title,
          subtitle: a.category.name,
          href: `/article/${a.slug}`,
          date: a.publishedAt,
        })
      );
  }

  if (!filters.type || filters.type === "country") {
    countries
      .filter((c) => {
        const matchesQuery =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          c.overview.toLowerCase().includes(q);
        const matchesRegion = !filters.region || c.region === filters.region;
        return matchesQuery && matchesRegion;
      })
      .forEach((c) =>
        results.push({
          id: c.id,
          type: "country",
          title: c.name,
          subtitle: c.region,
          href: `/country/${c.slug}`,
        })
      );
  }

  if (!filters.type || filters.type === "embassy") {
    embassies
      .filter(
        (e) =>
          !q ||
          e.name.toLowerCase().includes(q) ||
          e.country.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q)
      )
      .forEach((e) =>
        results.push({
          id: e.id,
          type: "embassy",
          title: e.name,
          subtitle: e.city,
          href: `/embassy/${e.slug}`,
        })
      );
  }

  if (!filters.type || filters.type === "organization") {
    organizations
      .filter(
        (o) =>
          !q ||
          o.name.toLowerCase().includes(q) ||
          o.acronym.toLowerCase().includes(q) ||
          o.type.toLowerCase().includes(q)
      )
      .forEach((o) =>
        results.push({
          id: o.id,
          type: "organization",
          title: o.name,
          subtitle: o.acronym,
          href: `/organization/${o.slug}`,
        })
      );
  }

  return results.sort((a, b) => {
    if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });
}
