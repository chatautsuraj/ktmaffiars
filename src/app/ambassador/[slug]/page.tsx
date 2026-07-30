import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAmbassadorBySlug, getAmbassadors } from "@/data/content";
import { getArticlesByCategory } from "@/data/articles";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticleCard } from "@/components/cards/article-card";
import { PageTransition } from "@/components/shared/page-transition";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export const dynamicParams = true;

interface AmbassadorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AmbassadorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ambassador = await getAmbassadorBySlug(slug);
  if (!ambassador) return { title: "Ambassador Not Found" };
  return { title: ambassador.name, description: ambassador.bio.slice(0, 160) };
}

export async function generateStaticParams() {
  const ambassadors = await getAmbassadors();
  return ambassadors.map((a) => ({ slug: a.slug }));
}

export default async function AmbassadorPage({ params }: AmbassadorPageProps) {
  const { slug } = await params;
  const ambassador = await getAmbassadorBySlug(slug);
  if (!ambassador) notFound();

  const articles = (await getArticlesByCategory("diplomacy")).slice(0, 3);

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs
          items={[
            { label: "Ambassadors", href: "/ambassadors" },
            { label: ambassador.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
          <div className="lg:col-span-1">
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none overflow-hidden mb-6">
              <ContentImage src={ambassador.photo} alt={ambassador.name} fill priority sizes="(max-width: 1024px) 80vw, 400px" />
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted text-xs uppercase tracking-wider">Appointed</p>
                <p className="font-medium">{formatDate(ambassador.appointed)}</p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-wider">Languages</p>
                <p>{ambassador.languages.join(", ")}</p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-wider">Previous Posts</p>
                <ul className="mt-1 space-y-1">
                  {ambassador.previousPosts.map((post, i) => (
                    <li key={i} className="text-muted">{post}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold">{ambassador.name}</h1>
              <p className="text-gold mt-2">{ambassador.title}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href={`/country/${ambassador.countrySlug}`} className="text-sm text-muted hover:text-gold">
                  {ambassador.country} Profile →
                </Link>
                <Link href={`/embassy/${ambassador.embassySlug}`} className="text-sm text-muted hover:text-gold">
                  Embassy →
                </Link>
              </div>
            </div>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">Biography</h2>
              <p className="text-muted leading-relaxed">{ambassador.bio}</p>
            </section>

            {ambassador.speeches && ambassador.speeches.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold mb-6">Speeches</h2>
                <div className="space-y-4">
                  {ambassador.speeches.map((speech, i) => (
                    <div key={i} className="p-4 border border-border">
                      <p className="text-xs text-gold">{formatDate(speech.date)}</p>
                      <h3 className="font-serif font-semibold mt-1">{speech.title}</h3>
                      <p className="text-sm text-muted mt-2 italic">&ldquo;{speech.excerpt}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Related Coverage</h2>
              <div className="space-y-6">
                {articles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </PageShell>
    </PageTransition>
  );
}
