"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import type { SearchResult } from "@/lib/search";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const displayedResults = query.length < 2 ? [] : results;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setQuery("");
      setResults([]);
    }
    onOpenChange(nextOpen);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
    }
  };

  useEffect(() => {
    if (query.length < 2) return;

    const timer = setTimeout(() => {
      fetch(`/api/content/search?q=${encodeURIComponent(query)}&type=article`)
        .then((r) => r.json())
        .then((data: SearchResult[]) => setResults(data.slice(0, 6)));
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl top-[20%] translate-y-0">
        <DialogHeader>
          <DialogTitle>Search KTM Affairs</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            placeholder="Search articles, countries, topics..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </form>

        {displayedResults.length > 0 && (
          <div className="mt-2 space-y-1 max-h-64 overflow-y-auto">
            {displayedResults.map((result) => (
              <Link
                key={result.id}
                href={result.href}
                onClick={() => handleOpenChange(false)}
                className="block p-3 hover:bg-secondary rounded-sm transition-colors"
              >
                <p className="font-serif text-sm font-semibold">{result.title}</p>
                <p className="text-xs text-muted mt-0.5">
                  {result.subtitle}
                  {result.date && ` · ${formatDate(result.date)}`}
                </p>
              </Link>
            ))}
          </div>
        )}

        {query.length > 1 && displayedResults.length === 0 && (
          <p className="text-sm text-muted text-center py-4">No results found for &ldquo;{query}&rdquo;</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
