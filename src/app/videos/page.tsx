import type { Metadata } from "next";
import Link from "next/link";
import { Play } from "lucide-react";
import { getVideos, getSocialVideos } from "@/data/content";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { SocialVideoSlider } from "@/components/home/social-video-slider";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Videos",
  description: "KTM Affairs video coverage — diplomacy, explainers, and event highlights.",
};

export default async function VideosPage() {
  const [videos, socialVideos] = await Promise.all([getVideos(), getSocialVideos()]);
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Videos" }]} />
        <PageHeader title="Videos" description="Visual journalism and documentary coverage from KTM Affairs." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden mb-4">
                <ContentImage src={video.thumbnail} alt={video.title} fill className="group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                <div className="absolute inset-0 bg-navy/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white fill-white" />
                </div>
                <span className="absolute bottom-2 right-2 bg-navy/90 text-white text-xs px-2 py-1">{video.duration}</span>
              </div>
              <p className="text-xs text-gold uppercase tracking-wider">{video.category}</p>
              <h2 className="font-serif text-lg font-bold mt-1 group-hover:text-gold transition-colors line-clamp-2">{video.title}</h2>
              <p className="text-xs text-muted mt-2">{formatDate(video.publishedAt)}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-border">
          <SocialVideoSlider
            videos={socialVideos}
            title="On Social"
            subtitle="Clips and explainers from our social channels"
            embedded
          />
        </div>
      </PageShell>
    </PageTransition>
  );
}
