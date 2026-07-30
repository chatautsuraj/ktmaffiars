"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import { SectionHeader } from "@/components/home/article-section";
import { ContentImage } from "@/components/ui/content-image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn, formatDate } from "@/lib/utils";
import type { SocialPlatform, SocialVideo } from "@/types";

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
};

interface SocialVideoSliderProps {
  videos: SocialVideo[];
  title?: string;
  subtitle?: string;
  embedded?: boolean;
}

function SocialVideoCard({
  video,
  onSelect,
}: {
  video: SocialVideo;
  onSelect: (video: SocialVideo) => void;
}) {
  const hasEmbed = Boolean(video.embedUrl);

  return (
    <article className="snap-start shrink-0 w-[min(85vw,280px)] sm:w-[300px] md:w-[320px]">
      <button
        type="button"
        onClick={() => onSelect(video)}
        className="group w-full text-left card-elevated overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        aria-label={`${hasEmbed ? "Play" : "Open"} ${video.title} on ${PLATFORM_LABELS[video.platform]}`}
      >
        <div className="relative aspect-[9/16] sm:aspect-video overflow-hidden bg-navy/5">
          <ContentImage
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 85vw, 320px"
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/35 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition-transform group-hover:scale-110">
              {hasEmbed ? (
                <Play className="h-5 w-5 fill-navy ml-0.5" aria-hidden />
              ) : (
                <ExternalLink className="h-5 w-5" aria-hidden />
              )}
            </span>
          </div>
          <span className="absolute top-3 left-3 section-label bg-navy/85 text-white px-2.5 py-1 rounded-sm backdrop-blur-sm">
            {PLATFORM_LABELS[video.platform]}
          </span>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted truncate">{video.platformHandle}</p>
          <h3 className="font-serif text-base font-semibold mt-1 leading-snug line-clamp-2 group-hover:text-gold transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-muted mt-2">{formatDate(video.publishedAt)}</p>
        </div>
      </button>
    </article>
  );
}

export function SocialVideoSlider({
  videos,
  title = "On Social",
  subtitle = "Short-form coverage across our social channels",
  embedded = false,
}: SocialVideoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SocialVideo | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, videos.length]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleSelect = (video: SocialVideo) => {
    if (video.embedUrl) {
      setSelected(video);
      return;
    }
    window.open(video.videoUrl, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  if (videos.length === 0) return null;

  const section = (
    <>
      <SectionHeader title={title} subtitle={subtitle} href="/videos" linkLabel="All videos" />

      <div className="relative">
        <div className="hidden md:flex absolute -top-14 right-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Scroll social videos left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Scroll social videos right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Social media videos"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex gap-4 overflow-x-auto pb-2 -mx-1 px-1",
            "snap-x snap-mandatory scroll-smooth scrollbar-hide",
            "md:snap-none"
          )}
        >
          {videos.map((video) => (
            <SocialVideoCard key={video.id} video={video} onSelect={handleSelect} />
          ))}
        </div>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-border">
          <DialogTitle className="sr-only">{selected?.title}</DialogTitle>
          {selected?.embedUrl && (
            <div className="relative aspect-video w-full bg-navy">
              <iframe
                src={selected.embedUrl}
                title={selected.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <div className="p-4 sm:p-6 border-t border-border">
            <p className="section-label mb-1">{selected && PLATFORM_LABELS[selected.platform]}</p>
            <h3 className="font-serif text-xl font-semibold">{selected?.title}</h3>
            {selected?.description && (
              <p className="text-sm text-muted mt-2">{selected.description}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

  if (embedded) {
    return <div>{section}</div>;
  }

  return (
    <section className="section-y border-t border-border">
      <div className="container-editorial">{section}</div>
    </section>
  );
}
