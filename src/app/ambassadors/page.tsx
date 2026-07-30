import type { Metadata } from "next";
import { getAmbassadors } from "@/data/content";
import { AmbassadorCard } from "@/components/cards/ambassador-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Ambassadors",
  description: "Ambassador profiles and diplomatic corps coverage from KTM Affairs.",
};

export default async function AmbassadorsPage() {
  const ambassadors = await getAmbassadors();
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Ambassadors" }]} />
        <PageHeader
          title="Ambassadors"
          description="Profiles of diplomatic representatives serving in Kathmandu and key postings."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ambassadors.map((ambassador) => (
            <AmbassadorCard key={ambassador.id} ambassador={ambassador} />
          ))}
        </div>
      </PageShell>
    </PageTransition>
  );
}
