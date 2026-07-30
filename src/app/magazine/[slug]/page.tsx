import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMagazineIssueBySlug, getMagazineIssues } from "@/data/content";
import { getArticleBySlug } from "@/data/articles";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export const dynamicParams = true;

interface MagazineIssuePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MagazineIssuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getMagazineIssueBySlug(slug);
  if (!issue) return { title: "Issue Not Found" };
  return { title: issue.title, description: issue.description };
}

export async function generateStaticParams() {
  const magazineIssues = await getMagazineIssues();
  return magazineIssues.map((m) => ({ slug: m.slug }));
}

export default async function MagazineIssuePage({ params }: MagazineIssuePageProps) {
  const { slug } = await params;
  const issue = await getMagazineIssueBySlug(slug);
  if (!issue) notFound();

  const issueArticles = (
    await Promise.all(issue.articles.map((s) => getArticleBySlug(s)))
  ).filter(Boolean);

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Magazine", href: "/magazine" }, { label: issue.title }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
          <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 w-full overflow-hidden shadow-xl">
            <ContentImage src={issue.coverImage} alt={issue.title} fill sizes="300px" priority />
          </div>
          <div className="lg:col-span-2">
            <p className="text-gold text-sm uppercase tracking-wider">
              {formatDate(issue.publishedAt, { month: "long", year: "numeric" })}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-4">{issue.title}</h1>
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">{issue.description}</p>

            <h2 className="font-serif text-xl font-bold mb-6 border-b border-border pb-4">In This Issue</h2>
            <ul className="space-y-6">
              {issueArticles.map((article) => article && (
                <li key={article.id}>
                  <Link href={`/article/${article.slug}`} className="group block">
                    <p className="text-xs text-gold uppercase tracking-wider">{article.category.name}</p>
                    <h3 className="font-serif text-xl font-semibold group-hover:text-gold transition-colors mt-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted mt-2 line-clamp-2">{article.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageShell>
    </PageTransition>
  );
}
