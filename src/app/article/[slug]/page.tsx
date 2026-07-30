import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { getArticleBySlug, getArticles, getRelatedArticles } from "@/data/articles";
import { ArticleHeroImage } from "@/components/article/article-hero-image";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AuthorCard } from "@/components/cards/author-card";
import { SocialShare } from "@/components/shared/social-share";
import { BookmarkButton } from "@/components/article/bookmark-button";
import { RelatedArticles } from "@/components/article/related-articles";
import { ReadingProgressBar } from "@/components/article/reading-progress-bar";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { PageTransition } from "@/components/shared/page-transition";
import { formatDate } from "@/lib/utils";

export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [{ url: article.featuredImage, width: 1600, height: 900 }],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: "KTM Affairs" },
  };

  return (
    <PageTransition>
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <ArticleHeroImage src={article.featuredImage} alt={article.title} />

        <div className="container-editorial -mt-20 sm:-mt-24 md:-mt-32 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs
              items={[
                { label: article.category.name, href: `/category/${article.category.slug}` },
                { label: article.title },
              ]}
            />

            <Badge variant="gold" className="mb-4">{article.category.name}</Badge>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-3 sm:mb-4">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-lg text-white/80 mb-6">{article.subtitle}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-8">
              <Link href={`/author/${article.author.slug}`} className="hover:text-gold transition-colors">
                By {article.author.name}
              </Link>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>

        <div className="container-editorial py-8 sm:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <SocialShare title={article.title} />
                <BookmarkButton slug={article.slug} />
              </div>
              <div className="flex gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-secondary text-muted rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xl font-serif italic text-navy dark:text-gold leading-relaxed mb-8 border-l-4 border-gold pl-6">
              {article.excerpt}
            </p>

            <div
              className="prose-editorial"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.pullQuotes?.map((quote, i) => (
              <blockquote key={i} className="my-8 border-l-4 border-gold pl-6">
                <p className="font-serif text-2xl italic text-navy dark:text-gold leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            ))}

            <div className="my-12 p-6 bg-secondary/50 border border-border">
              <AuthorCard author={article.author} />
            </div>

            <div className="my-12 p-8 bg-navy text-white text-center">
              <h3 className="font-serif text-2xl font-bold mb-2">Stay Informed</h3>
              <p className="text-white/70 mb-6 text-sm">Get the daily briefing delivered to your inbox.</p>
              <NewsletterForm variant="inline" className="max-w-md mx-auto" />
            </div>

            {/* Comments placeholder */}
            <section className="mt-12 pt-8 border-t border-border">
              <h3 className="font-serif text-2xl font-bold mb-6">Discussion</h3>
              <p className="text-muted text-sm">
                Member comments are coming soon.{" "}
                <Link href="/membership" className="text-gold hover:underline">Join today</Link>{" "}
                to get notified when the conversation opens.
              </p>
            </section>

            <RelatedArticles articles={related} />
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
