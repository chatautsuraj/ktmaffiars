"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ArticleCard } from "@/components/article-card";
import { ARTICLES } from "@/lib/data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.dek.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        (a.region ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="container-editorial max-w-4xl py-10 sm:py-14">
      <p className="eyebrow mb-3">Search</p>
      <h1 className="mb-8 font-display text-display-md leading-[1.03] text-ink sm:text-display-lg">
        Search KTM Affairs
      </h1>

      <div className="mb-4 flex items-center gap-3 border border-hairline bg-white px-4 focus-within:border-gold">
        <SearchIcon className="h-4 w-4 text-ink/40" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search countries, conflicts, treaties, or reporters…"
          className="border-none px-0 py-6 text-lg focus-visible:ring-0"
        />
      </div>
      <p className="mb-10 flex items-center gap-2 text-xs text-ink/40">
        <Sparkles className="h-3.5 w-3.5 text-gold" />
        Prefer natural language? Use the AI Research Assistant from the header search icon.
      </p>

      {query.trim() && (
        <p className="mb-6 font-mono text-xs uppercase tracking-wideish text-ink/40">
          {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {results.map((a) => (
          <ArticleCard key={a.slug} article={a} variant="horizontal" />
        ))}
      </div>

      {query.trim() && results.length === 0 && (
        <p className="py-10 text-center text-sm text-ink/50">
          No articles match your search. Try a different country, region, or keyword.
        </p>
      )}
    </div>
  );
}
