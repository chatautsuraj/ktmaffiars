"use client";

import Link from "next/link";
import type { Article } from "@/types";

interface BreakingTickerProps {
  articles: Article[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  if (articles.length === 0) return null;

  const tickerItems = [...articles, ...articles];

  return (
    <div className="bg-navy text-white overflow-hidden">
      <div className="container-editorial flex items-center gap-5 h-9">
        <span className="shrink-0 section-label text-gold-light text-[10px] inline-flex items-center gap-1.5">
          <span className="live-dot" aria-hidden />
          Live
        </span>
        <div className="w-px h-4 bg-white/20 shrink-0" />
        <div className="overflow-hidden flex-1 ticker-wrap">
          <div className="ticker-scroll flex gap-12 whitespace-nowrap">
            {tickerItems.map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/article/${article.slug}`}
                className="text-[13px] text-white/75 hover:text-gold-light transition-colors"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
