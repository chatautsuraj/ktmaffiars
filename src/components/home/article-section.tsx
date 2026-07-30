import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/cards/article-card";
import type { Article } from "@/types";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({ title, subtitle, href, linkLabel = "View all" }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-7 sm:mb-9">
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="gold-rule shrink-0" />
          <h2 className="font-serif text-2xl sm:text-[1.75rem] md:text-[2rem] font-bold tracking-[-0.02em]">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-muted text-sm sm:text-[15px] pl-[calc(2.5rem+0.75rem)]">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light transition-colors shrink-0 group pl-[calc(2.5rem+0.75rem)] sm:pl-0"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

interface ArticleSectionProps {
  title: string;
  subtitle?: string;
  articles: Article[];
  href?: string;
  variant?: "default" | "featured" | "horizontal";
  columns?: 2 | 3;
  embedded?: boolean;
  muted?: boolean;
}

export function ArticleSection({
  title,
  subtitle,
  articles,
  href,
  variant = "default",
  columns = 3,
  embedded = false,
  muted = false,
}: ArticleSectionProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  const content = (() => {
    if (variant === "featured" && articles.length >= 2) {
      return (
        <>
          <SectionHeader title={title} subtitle={subtitle} href={href} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ArticleCard article={articles[0]} variant="featured" />
            <div className="space-y-0 divide-y divide-border">
              {articles.slice(1, 4).map((article) => (
                <div key={article.id} className="py-4 sm:py-5 first:pt-0 last:pb-0">
                  <ArticleCard article={article} variant="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }

    if (variant === "horizontal") {
      return (
        <>
          <SectionHeader title={title} subtitle={subtitle} href={href} />
          <div className="divide-y divide-border">
            {articles.map((article) => (
              <div key={article.id} className="py-5 sm:py-6 first:pt-0 last:pb-0">
                <ArticleCard article={article} variant="horizontal" />
              </div>
            ))}
          </div>
        </>
      );
    }

    return (
      <>
        <SectionHeader title={title} subtitle={subtitle} href={href} />
        <div className={`grid ${gridCols[columns]} gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10`}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </>
    );
  })();

  if (embedded) return <div>{content}</div>;

  return (
    <section className={muted ? "section-y bg-light-gray/70 dark:bg-secondary/30" : "section-y"}>
      <div className="container-editorial">{content}</div>
    </section>
  );
}
