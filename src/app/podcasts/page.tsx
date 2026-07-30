import type { Metadata } from "next";
import { getPodcasts } from "@/data/content";
import { PodcastListCard } from "@/components/cards/podcast-list-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "KTM Affairs podcasts — diplomatic analysis and global affairs conversations.",
};

export default async function PodcastsPage() {
  const podcasts = await getPodcasts();
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Podcasts" }]} />
        <PageHeader
          title="Podcasts"
          description="In-depth conversations on diplomacy, geopolitics, and Nepal's global role."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {podcasts.map((podcast) => (
            <PodcastListCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </PageShell>
    </PageTransition>
  );
}
