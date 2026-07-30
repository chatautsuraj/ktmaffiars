import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { getCountryBySlug, getCountries } from "@/data/countries";
import { getArticlesByCategory } from "@/data/articles";
import { getEmbassyBySlug, getAmbassadorBySlug } from "@/data/content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Timeline } from "@/components/shared/timeline";
import { StatCard, SectorChart } from "@/components/shared/charts";
import { ArticleCard } from "@/components/cards/article-card";
import { PageTransition } from "@/components/shared/page-transition";
import { formatDate } from "@/lib/utils";

export const dynamicParams = true;

interface CountryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) return { title: "Country Not Found" };
  return {
    title: `${country.name} — Country Profile`,
    description: country.overview.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map((c) => ({ slug: c.slug }));
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) notFound();

  const embassy = country.embassySlug ? await getEmbassyBySlug(country.embassySlug) : null;
  const ambassador = embassy?.ambassadorSlug ? await getAmbassadorBySlug(embassy.ambassadorSlug) : null;
  const relatedArticles = (await getArticlesByCategory("diplomacy")).slice(0, 4);

  // Newly-created CMS records may leave complex JSON fields blank, which the
  // admin form stores as `{}`. Coerce to safe shapes so sections that map over
  // arrays or read nested props degrade gracefully instead of crashing.
  const stats = Array.isArray(country.stats) ? country.stats : [];
  const timeline = Array.isArray(country.timeline) ? country.timeline : [];
  const agreements = Array.isArray(country.agreements) ? country.agreements : [];
  const gallery = Array.isArray(country.gallery) ? country.gallery : [];
  const sectors = Array.isArray(country.investment?.sectors) ? country.investment.sectors : [];
  const tradeData = country.tradeData;
  const hasTradeData = !!tradeData && Object.keys(tradeData).length > 0;
  const investment = country.investment;
  const hasInvestment = !!investment && Object.keys(investment).length > 0;

  return (
    <PageTransition>
      <PageHero src={country.heroImage} alt={country.name}>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-4xl sm:text-5xl">{country.flag}</span>
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white">{country.name}</h1>
            <p className="text-white/70 mt-1 text-sm sm:text-base">{country.capital} · {country.region}</p>
          </div>
        </div>
      </PageHero>

      <PageShell>
        <Breadcrumbs items={[{ label: "Countries", href: "/countries" }, { label: country.name }]} />

        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} change={stat.change} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted leading-relaxed">{country.overview}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Nepal Relations</h2>
              <p className="text-muted leading-relaxed">{country.nepalRelations}</p>
            </section>

            {timeline.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold mb-6">Timeline</h2>
                <Timeline events={timeline} />
              </section>
            )}

            {agreements.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold mb-6">Agreements</h2>
                <div className="space-y-4">
                  {agreements.map((agreement, i) => (
                    <div key={i} className="p-4 border border-border">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif font-semibold">{agreement.title}</h3>
                          <p className="text-sm text-muted mt-1">{agreement.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs text-gold uppercase">{agreement.type}</span>
                          <p className="text-xs text-muted mt-1">{formatDate(agreement.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {gallery.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden">
                      <ContentImage src={img} alt={`${country.name} gallery ${i + 1}`} fill sizes="400px" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            {hasTradeData && (
              <section className="p-6 border border-border bg-secondary/30">
                <h3 className="font-serif text-lg font-bold mb-4">Trade Data</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Exports to Nepal</dt>
                    <dd className="font-medium">${((tradeData.exports ?? 0) / 1e9).toFixed(1)}B</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Imports from Nepal</dt>
                    <dd className="font-medium">${((tradeData.imports ?? 0) / 1e9).toFixed(2)}B</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Trade Balance</dt>
                    <dd className="font-medium">${((tradeData.balance ?? 0) / 1e9).toFixed(1)}B</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">YoY Growth</dt>
                    <dd className="font-medium text-green-600">+{tradeData.yearOverYear ?? 0}%</dd>
                  </div>
                </dl>
              </section>
            )}

            {hasInvestment && (
              <section className="p-6 border border-border">
                <h3 className="font-serif text-lg font-bold mb-4">Investment Sectors</h3>
                <SectorChart data={sectors} />
                <p className="text-sm text-muted mt-4">
                  Total FDI: ${((investment.totalFDI ?? 0) / 1e6).toFixed(0)}M across {investment.projects ?? 0} projects
                </p>
              </section>
            )}

            {embassy && (
              <section className="p-6 border border-border">
                <h3 className="font-serif text-lg font-bold mb-4">Embassy in Kathmandu</h3>
                <Link href={`/embassy/${embassy.slug}`} className="hover:text-gold transition-colors">
                  <p className="font-medium">{embassy.name}</p>
                </Link>
                <p className="text-sm text-muted mt-2">{embassy.address}, {embassy.city}</p>
                <p className="text-sm text-muted">{embassy.phone}</p>
              </section>
            )}

            {ambassador && (
              <section className="p-6 border border-border">
                <h3 className="font-serif text-lg font-bold mb-4">Ambassador</h3>
                <Link href={`/ambassador/${ambassador.slug}`} className="flex items-center gap-3 group">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <ContentImage src={ambassador.photo} alt={ambassador.name} fill sizes="64px" />
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-gold transition-colors">{ambassador.name}</p>
                    <p className="text-xs text-muted">{ambassador.title}</p>
                  </div>
                </Link>
              </section>
            )}

            <section className="p-6 border border-border">
              <h3 className="font-serif text-lg font-bold mb-4">Key Facts</h3>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-muted inline">Population: </dt><dd className="inline">{(country.population / 1e9).toFixed(2)}B</dd></div>
                <div><dt className="text-muted inline">GDP: </dt><dd className="inline">${(country.gdp / 1e6).toFixed(1)}T</dd></div>
                <div><dt className="text-muted inline">Capital: </dt><dd className="inline">{country.capital}</dd></div>
                <div><dt className="text-muted inline">Region: </dt><dd className="inline">{country.region}</dd></div>
              </dl>
            </section>
          </aside>
        </div>
      </PageShell>
    </PageTransition>
  );
}
