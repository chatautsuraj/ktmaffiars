import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getOrganizationBySlug, getOrganizations } from "@/data/content";
import { getArticlesByCategory } from "@/data/articles";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticleCard } from "@/components/cards/article-card";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHero } from "@/components/shared/page-hero";
import { PageShell } from "@/components/layout/page-shell";

export const dynamicParams = true;

interface OrganizationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: OrganizationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const org = await getOrganizationBySlug(slug);
  if (!org) return { title: "Organization Not Found" };
  return { title: org.name, description: org.overview.slice(0, 160) };
}

export async function generateStaticParams() {
  const organizations = await getOrganizations();
  return organizations.map((o) => ({ slug: o.slug }));
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { slug } = await params;
  const org = await getOrganizationBySlug(slug);
  if (!org) notFound();

  const articles = (await getArticlesByCategory("analysis")).slice(0, 3);

  return (
    <PageTransition>
      <PageHero src={org.heroImage} alt={org.name}>
        <div className="flex items-end gap-4 sm:gap-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-sm flex items-center justify-center shrink-0">
            <span className="font-serif text-xl sm:text-2xl font-bold text-navy">{org.acronym}</span>
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">{org.name}</h1>
            <p className="text-white/70 mt-1 text-sm sm:text-base">{org.headquarters} · Founded {org.founded}</p>
          </div>
        </div>
      </PageHero>

      <PageShell>
        <Breadcrumbs
          items={[
            { label: "Organizations", href: "/organizations" },
            { label: org.acronym },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted leading-relaxed">{org.overview}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Nepal&apos;s Role</h2>
              <p className="text-muted leading-relaxed">{org.nepalRole}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Key Initiatives</h2>
              <ul className="space-y-3">
                {org.keyInitiatives.map((initiative, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gold mt-1">●</span>
                    <span className="text-muted">{initiative}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Related Coverage</h2>
              <div className="space-y-6">
                {articles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="p-6 border border-border bg-secondary/30">
              <h3 className="font-serif text-lg font-bold mb-4">At a Glance</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted">Type</dt><dd>{org.type}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Members</dt><dd>{org.members}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Founded</dt><dd>{org.founded}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">HQ</dt><dd>{org.headquarters}</dd></div>
              </dl>
            </section>

            <a
              href={org.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 border border-border hover:border-gold/50 transition-colors text-sm font-medium"
            >
              Official Website <ExternalLink className="h-4 w-4" />
            </a>
          </aside>
        </div>
      </PageShell>
    </PageTransition>
  );
}
