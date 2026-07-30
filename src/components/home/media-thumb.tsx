"use client";

import Link from "next/link";
import { ContentImage } from "@/components/ui/content-image";

interface MediaThumbProps {
  href: string;
  src: string;
  alt: string;
  title: string;
  meta?: string;
  aspect?: "square" | "video";
}

export function MediaThumb({ href, src, alt, title, meta, aspect = "square" }: MediaThumbProps) {
  const sizeClass = aspect === "video" ? "w-20 h-12 sm:w-24 sm:h-14" : "w-14 h-14 sm:w-16 sm:h-16";

  return (
    <Link href={href} className="flex gap-3 sm:gap-4 group">
      <div className={`media-frame relative shrink-0 ${sizeClass}`}>
        <ContentImage
          src={src}
          alt={alt}
          fill
          sizes={aspect === "video" ? "96px" : "64px"}
          className="transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-sm sm:text-[15px] font-medium group-hover:text-gold transition-colors line-clamp-2 leading-snug">
          {title}
        </p>
        {meta && <p className="text-xs text-muted mt-1">{meta}</p>}
      </div>
    </Link>
  );
}
