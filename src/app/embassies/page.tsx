import type { Metadata } from "next";
import { getEmbassies } from "@/data/content";
import { EmbassyCard } from "@/components/cards/embassy-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Embassies",
  description: "Embassy directory — diplomatic missions in Kathmandu and Nepal's missions abroad.",
};

export default async function EmbassiesPage() {
  const embassies = await getEmbassies();
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Embassies" }]} />
        <PageHeader
          title="Embassy Directory"
          description="Searchable directory of diplomatic missions, ambassadors, and cooperation projects."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {embassies.map((embassy) => (
            <EmbassyCard key={embassy.id} embassy={embassy} />
          ))}
        </div>
      </PageShell>
    </PageTransition>
  );
}
