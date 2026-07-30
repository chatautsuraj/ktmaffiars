import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import { getVideoBySlug, getVideos } from "@/data/content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export const dynamicParams = true;

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) return { title: "Video Not Found" };
  return { title: video.title, description: video.description };
}

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((v) => ({ slug: v.slug }));
}

export default async function VideoDetailPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) notFound();

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Videos", href: "/videos" }, { label: video.title }]} />

        <div className="relative aspect-video max-w-4xl mx-auto mt-8 overflow-hidden bg-navy">
          <ContentImage src={video.thumbnail} alt={video.title} fill className="opacity-60" sizes="(max-width: 896px) 100vw, 896px" priority />
          <div className="absolute inset-0 flex items-center justify-center">
            <button type="button" className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gold text-navy font-semibold hover:bg-gold/90 transition-colors text-sm sm:text-base">
              <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
              Watch · {video.duration}
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <p className="text-gold text-sm uppercase tracking-wider">{video.category}</p>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4">{video.title}</h1>
          <p className="text-muted leading-relaxed">{video.description}</p>
          <p className="text-sm text-muted mt-4">{formatDate(video.publishedAt)}</p>
        </div>
      </PageShell>
    </PageTransition>
  );
}
