"use client";

import Link from "next/link";
import type { Podcast } from "@/types";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export function PodcastListCard({ podcast }: { podcast: Podcast }) {
  return (
    <Link
      href={`/podcasts/${podcast.slug}`}
      className="group card-elevated p-5 sm:p-6 flex flex-col sm:flex-row gap-5"
    >
      <div className="relative w-full sm:w-28 h-28 shrink-0 overflow-hidden rounded-sm bg-light-gray">
        <ContentImage src={podcast.image} alt={podcast.title} fill sizes="112px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="section-label mb-2">
          S{podcast.season} E{podcast.episode} · {podcast.duration}
        </p>
        <h2 className="font-serif text-lg font-bold group-hover:text-gold transition-colors line-clamp-2">
          {podcast.title}
        </h2>
        <p className="text-sm text-muted mt-2 line-clamp-2">{podcast.description}</p>
        <p className="text-xs text-muted mt-2">{formatDate(podcast.publishedAt)}</p>
      </div>
    </Link>
  );
}
