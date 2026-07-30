import type { Metadata } from "next";
import Link from "next/link";
import { getOrganizations } from "@/data/content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";

export const metadata: Metadata = {
  title: "Organizations",
  description: "International organizations — UN, World Bank, IMF, SAARC, BIMSTEC, and Nepal's role.",
};

export default async function OrganizationsPage() {
  const organizations = await getOrganizations();
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Organizations" }]} />
        <PageHeader
          title="Organizations"
          description="Multilateral institutions and regional bodies shaping global governance and Nepal's international engagement."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {organizations.map((org) => (
            <Link
              key={org.id}
              href={`/organization/${org.slug}`}
              className="group grid grid-cols-[80px_1fr] gap-4 sm:gap-6 p-5 sm:p-6 border border-border hover:border-gold/50 transition-colors"
            >
              <div className="relative w-20 h-20 bg-white p-2 border border-border">
                <ContentImage src={org.logo} alt={org.acronym} fill className="object-contain p-1" sizes="80px" />
              </div>
              <div>
                <p className="text-xs text-gold uppercase tracking-wider">{org.acronym} · {org.type}</p>
                <h2 className="font-serif text-lg sm:text-xl font-bold mt-1 group-hover:text-gold transition-colors">{org.name}</h2>
                <p className="text-sm text-muted mt-2 line-clamp-2">{org.overview}</p>
              </div>
            </Link>
          ))}
        </div>
      </PageShell>
    </PageTransition>
  );
}
