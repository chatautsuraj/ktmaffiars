"use client";

import { ContentImage } from "@/components/ui/content-image";

interface PageHeroProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
  minHeight?: string;
}

export function PageHero({ src, alt, children, minHeight = "min-h-[240px] sm:min-h-[300px]" }: PageHeroProps) {
  return (
    <div className={`relative h-[38vh] sm:h-[42vh] md:h-[45vh] ${minHeight} w-full bg-light-gray`}>
      <ContentImage src={src} alt={alt} fill priority sizes="100vw" />
      <div className="absolute inset-0 gradient-overlay pointer-events-none" />
      {children && (
        <div className="absolute bottom-0 left-0 right-0 container-editorial pb-6 sm:pb-8 z-10">
          {children}
        </div>
      )}
    </div>
  );
}
