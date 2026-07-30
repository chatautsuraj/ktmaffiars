"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import type { Video } from "@/types";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export function VideoListCard({ video }: { video: Video }) {
  return (
    <Link href={`/videos/${video.slug}`} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-sm mb-4 bg-light-gray">
        <ContentImage
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-navy/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-10 w-10 sm:h-12 sm:w-12 text-white fill-white" />
        </div>
        <span className="absolute bottom-2 right-2 bg-navy/90 text-white text-xs px-2 py-1 rounded-sm">
          {video.duration}
        </span>
      </div>
      <p className="section-label">{video.category}</p>
      <h2 className="font-serif text-lg font-bold mt-1 group-hover:text-gold transition-colors line-clamp-2">
        {video.title}
      </h2>
      <p className="text-xs text-muted mt-2">{formatDate(video.publishedAt)}</p>
    </Link>
  );
}
