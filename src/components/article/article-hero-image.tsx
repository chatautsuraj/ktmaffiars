"use client";

import { ContentImage } from "@/components/ui/content-image";

interface ArticleHeroImageProps {
  src: string;
  alt: string;
}

export function ArticleHeroImage({ src, alt }: ArticleHeroImageProps) {
  return (
    <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[280px] w-full bg-light-gray">
      <ContentImage
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 gradient-overlay pointer-events-none" />
    </div>
  );
}
