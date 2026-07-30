import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthorBySlug, getAuthors } from "@/data/authors";
import { getArticles } from "@/data/articles";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticleCard } from "@/components/cards/article-card";
import { PageTransition } from "@/components/shared/page-transition";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";

export const dynamicParams = true;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };
  return { title: author.name, description: author.bio.slice(0, 160) };
}

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const authorArticles = (await getArticles()).filter((a) => a.author.slug === slug);

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Authors", href: "/authors" }, { label: author.name }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden mx-auto lg:mx-0 mb-6">
              <ContentImage src={author.avatar} alt={author.name} fill priority sizes="192px" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">{author.name}</h1>
            <p className="text-gold mt-1">{author.title}</p>
            <p className="text-sm text-muted mt-4">{author.articleCount} articles</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
              {author.expertise.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-secondary text-muted rounded-sm">{tag}</span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="font-serif text-2xl font-bold mb-4">About</h2>
              <p className="text-muted leading-relaxed">{author.bio}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-6">Articles by {author.name}</h2>
              {authorArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {authorArticles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              ) : (
                <p className="text-muted">No articles published yet.</p>
              )}
            </section>
          </div>
        </div>
      </PageShell>
    </PageTransition>
  );
}
