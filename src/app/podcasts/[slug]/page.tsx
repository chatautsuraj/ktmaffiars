import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import { getPodcastBySlug, getPodcasts } from "@/data/content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export const dynamicParams = true;

interface PodcastPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PodcastPageProps): Promise<Metadata> {
  const { slug } = await params;
  const podcast = await getPodcastBySlug(slug);
  if (!podcast) return { title: "Podcast Not Found" };
  return { title: podcast.title, description: podcast.description };
}

export async function generateStaticParams() {
  const podcasts = await getPodcasts();
  return podcasts.map((p) => ({ slug: p.slug }));
}

export default async function PodcastDetailPage({ params }: PodcastPageProps) {
  const { slug } = await params;
  const [podcast, podcasts] = await Promise.all([getPodcastBySlug(slug), getPodcasts()]);
  if (!podcast) notFound();

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Podcasts", href: "/podcasts" }, { label: podcast.title }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full overflow-hidden">
            <ContentImage src={podcast.image} alt={podcast.title} fill sizes="(max-width: 1024px) 80vw, 400px" priority />
          </div>
          <div>
            <p className="text-gold text-sm uppercase tracking-wider">
              Season {podcast.season} · Episode {podcast.episode}
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4">{podcast.title}</h1>
            <p className="text-muted leading-relaxed mb-6">{podcast.description}</p>
            <p className="text-sm text-muted mb-6">{formatDate(podcast.publishedAt)} · {podcast.duration}</p>

            {podcast.guests && (
              <div className="mb-8">
                <p className="text-xs text-gold uppercase tracking-wider mb-2">Guests</p>
                <p className="text-sm">{podcast.guests.join(", ")}</p>
              </div>
            )}

            <button
              type="button"
              className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-white hover:bg-navy/90 transition-colors"
            >
              <Play className="h-5 w-5 fill-current" />
              Play Episode
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="font-serif text-xl font-bold mb-4">More Episodes</h2>
          <div className="space-y-4">
            {podcasts.filter((p) => p.slug !== slug).map((p) => (
              <Link key={p.id} href={`/podcasts/${p.slug}`} className="block text-sm hover:text-gold transition-colors">
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </PageShell>
    </PageTransition>
  );
}
