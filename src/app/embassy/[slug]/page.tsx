import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { getEmbassyBySlug, getAmbassadorBySlug, getEmbassies } from "@/data/content";
import { getArticlesByCategory } from "@/data/articles";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticleCard } from "@/components/cards/article-card";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHero } from "@/components/shared/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { Badge } from "@/components/ui/badge";

export const dynamicParams = true;

interface EmbassyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EmbassyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const embassy = await getEmbassyBySlug(slug);
  if (!embassy) return { title: "Embassy Not Found" };
  return { title: embassy.name, description: `${embassy.name} in ${embassy.city}, Nepal` };
}

export async function generateStaticParams() {
  const embassies = await getEmbassies();
  return embassies.map((e) => ({ slug: e.slug }));
}

export default async function EmbassyPage({ params }: EmbassyPageProps) {
  const { slug } = await params;
  const embassy = await getEmbassyBySlug(slug);
  if (!embassy) notFound();

  const ambassador = embassy.ambassadorSlug ? await getAmbassadorBySlug(embassy.ambassadorSlug) : null;
  const news = (await getArticlesByCategory("diplomacy")).slice(0, 3);

  // Newly-created CMS records may leave complex JSON fields blank (stored as
  // `{}`), so coerce to safe shapes to avoid crashing on empty records.
  const cooperationProjects = Array.isArray(embassy.cooperationProjects)
    ? embassy.cooperationProjects
    : [];
  const coordinates = embassy.coordinates;
  const hasCoordinates =
    !!coordinates &&
    typeof coordinates.lat === "number" &&
    typeof coordinates.lng === "number";

  return (
    <PageTransition>
      <PageHero src={embassy.heroImage} alt={embassy.name}>
        <Badge variant="gold" className="mb-3">{embassy.type}</Badge>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">{embassy.name}</h1>
        <p className="text-white/70 mt-1 text-sm sm:text-base">{embassy.city}, Nepal · Est. {embassy.established}</p>
      </PageHero>

      <PageShell>
        <Breadcrumbs
          items={[
            { label: "Embassies", href: "/embassies" },
            { label: embassy.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-10">
            {ambassador && (
              <section className="flex flex-col sm:flex-row gap-6 p-6 border border-border">
                <div className="relative w-32 h-40 shrink-0 overflow-hidden mx-auto sm:mx-0">
                  <ContentImage src={ambassador.photo} alt={ambassador.name} fill sizes="128px" priority />
                </div>
                <div>
                  <Link href={`/ambassador/${ambassador.slug}`}>
                    <h2 className="font-serif text-2xl font-bold hover:text-gold transition-colors">{ambassador.name}</h2>
                  </Link>
                  <p className="text-gold text-sm mt-1">{ambassador.title}</p>
                  <p className="text-muted text-sm mt-3 leading-relaxed line-clamp-3">{ambassador.bio}</p>
                  <Link href={`/ambassador/${ambassador.slug}`} className="text-sm text-gold hover:underline mt-2 inline-block">
                    View Profile →
                  </Link>
                </div>
              </section>
            )}

            {cooperationProjects.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold mb-6">Cooperation Projects</h2>
                <div className="space-y-4">
                  {cooperationProjects.map((project, i) => (
                    <div key={i} className="p-4 border border-border flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted mt-1">{project.description}</p>
                      </div>
                      <Badge variant={project.status === "active" ? "gold" : "secondary"}>{project.status}</Badge>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Visa Information</h2>
              <p className="text-muted leading-relaxed">{embassy.visaInfo}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Related News</h2>
              <div className="space-y-6">
                {news.map((article, i) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="p-6 border border-border bg-secondary/30">
              <h3 className="font-serif text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span>{embassy.address}, {embassy.city}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gold shrink-0" />
                  <a href={`tel:${embassy.phone}`} className="hover:text-gold">{embassy.phone}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gold shrink-0" />
                  <a href={`mailto:${embassy.email}`} className="hover:text-gold">{embassy.email}</a>
                </li>
                {embassy.website && (
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gold shrink-0" />
                    <a href={embassy.website} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Website</a>
                  </li>
                )}
              </ul>
            </section>

            <section className="p-6 border border-border min-h-[200px] bg-navy/5 flex flex-col items-center justify-center">
              <MapPin className="h-8 w-8 text-gold mb-2" />
              {hasCoordinates && (
                <p className="text-sm text-muted text-center">Map: {coordinates.lat}, {coordinates.lng}</p>
              )}
              <p className="text-xs text-muted mt-1">Interactive map placeholder</p>
            </section>

            <Link
              href={`/country/${embassy.countrySlug}`}
              className="block p-6 border border-border hover:border-gold/50 transition-colors"
            >
              <p className="text-xs text-gold uppercase tracking-wider mb-1">Country Profile</p>
              <p className="font-serif text-lg font-semibold">{embassy.country}</p>
            </Link>
          </aside>
        </div>
      </PageShell>
    </PageTransition>
  );
}
