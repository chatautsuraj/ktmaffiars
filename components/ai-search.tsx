"use client";

import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  "Summarize this week's Security Council votes",
  "What is the state of ASEAN chip diplomacy?",
  "Explain the Himalayan water-sharing framework",
  "Compare sanctions regimes on energy exports",
];

export function AISearch() {
  const [query, setQuery] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="focus-ring flex items-center gap-2 border border-hairline px-3 py-2 text-ink/60 transition-colors hover:border-gold hover:text-ink"
          aria-label="Open AI-powered search"
        >
          <Search className="h-4 w-4" />
          <span className="hidden font-mono text-xs uppercase tracking-wideish sm:inline">Search</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <div className="border-b border-hairline p-6">
          <div className="mb-3 flex items-center gap-2 text-gold">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono text-[0.65rem] uppercase tracking-widest2">AI Research Assistant</span>
          </div>
          <div className="flex items-center gap-3 border border-hairline bg-white px-4 focus-within:border-gold">
            <Search className="h-4 w-4 text-ink/40" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about any country, conflict, treaty, or trend…"
              className="border-none px-0 focus-visible:ring-0"
            />
          </div>
        </div>
        <div className="p-6">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-widest2 text-ink/40">
            Try asking
          </p>
          <ul className="space-y-1">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  onClick={() => setQuery(s)}
                  className="focus-ring group flex w-full items-center justify-between gap-3 py-2.5 text-left text-sm text-ink/80 transition-colors hover:text-ink"
                >
                  <span>{s}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-hairline pt-4 text-xs text-ink/40">
            AI-generated answers are grounded in KTM Affairs reporting and cite original sources. This assistant is a
            preview feature.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
