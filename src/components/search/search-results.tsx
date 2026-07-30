"use client";

import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/shared/pagination";
import type { Category } from "@/types";
import type { SearchResult } from "@/lib/search";

const PAGE_SIZE = 12;

interface SearchResultsProps {
  categories: Pick<Category, "slug" | "name">[];
}

export function SearchResults({ categories }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const region = searchParams.get("region") || undefined;
  const category = searchParams.get("category") || undefined;
  const type = (searchParams.get("type") as "article" | "country" | "embassy" | "organization") || undefined;
  const page = Number(searchParams.get("page") || "1");

  const [query, setQuery] = useState(initialQuery);
  const [resultsByKey, setResultsByKey] = useState<{ key: string; results: SearchResult[] }>({
    key: "",
    results: [],
  });

  const searchKey = useMemo(
    () => [query || initialQuery, region ?? "", category ?? "", type ?? ""].join("|"),
    [query, initialQuery, region, category, type]
  );

  const loading = resultsByKey.key !== searchKey;
  const allResults = loading ? [] : resultsByKey.results;

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    const q = query || initialQuery;
    if (q) params.set("q", q);
    if (region) params.set("region", region);
    if (category) params.set("category", category);
    if (type) params.set("type", type);

    fetch(`/api/content/search?${params.toString()}`)
      .then((r) => r.json())
      .then((data: SearchResult[]) => {
        if (!cancelled) {
          setResultsByKey({ key: searchKey, results: data });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [searchKey, query, initialQuery, region, category, type]);

  const totalPages = Math.ceil(allResults.length / PAGE_SIZE);
  const results = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (region) params.set("region", region);
    if (category) params.set("category", category);
    if (type) params.set("type", type);
    window.location.href = `/search?${params.toString()}`;
  }, [query, region, category, type]);

  return (
    <>
      <form onSubmit={handleSearch} className="relative max-w-2xl mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, countries, embassies..."
          className="pl-12 h-12 text-base"
        />
      </form>

      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { label: "All", value: "" },
          { label: "Articles", value: "article" },
          { label: "Countries", value: "country" },
          { label: "Embassies", value: "embassy" },
          { label: "Organizations", value: "organization" },
        ].map((filter) => {
          const params = new URLSearchParams(searchParams.toString());
          if (filter.value) params.set("type", filter.value);
          else params.delete("type");
          params.delete("page");
          return (
            <Link
              key={filter.value}
              href={`/search?${params.toString()}`}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                (type || "") === filter.value
                  ? "bg-navy text-white border-navy"
                  : "border-border hover:border-gold"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.slice(0, 6).map((cat) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("category", cat.slug);
          params.delete("page");
          return (
            <Link
              key={cat.slug}
              href={`/search?${params.toString()}`}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                category === cat.slug ? "border-gold text-gold" : "border-border hover:border-gold text-muted"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {(region || category || type) && !loading && (
        <p className="text-sm text-muted mb-6">
          {allResults.length} result{allResults.length !== 1 ? "s" : ""}
          {region && ` in ${region}`}
          {category && ` · ${categories.find((c) => c.slug === category)?.name}`}
        </p>
      )}

      {loading ? (
        <div className="text-center py-16 text-muted">Searching...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted">No results found. Try a different search term or filter.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {results.map((result) => (
            <li key={`${result.type}-${result.id}`}>
              <Link
                href={result.href}
                className="block py-6 group hover:bg-secondary/30 px-4 -mx-4 transition-colors"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-gold uppercase tracking-wider capitalize">{result.type}</span>
                  {result.date && (
                    <span className="text-xs text-muted">{formatDate(result.date)}</span>
                  )}
                </div>
                <h2 className="font-serif text-xl font-semibold group-hover:text-gold transition-colors">
                  {result.title}
                </h2>
                {result.subtitle && (
                  <p className="text-sm text-muted mt-1">{result.subtitle}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/search"
        query={Object.fromEntries(
          Object.entries({ q: query || initialQuery, region, category, type }).filter(([, v]) => v)
        ) as Record<string, string>}
      />
    </>
  );
}
