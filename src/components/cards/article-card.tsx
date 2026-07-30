"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import type { Article } from "@/types";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "horizontal";
  className?: string;
  index?: number;
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <article className={cn("group flex gap-4 sm:gap-5", className)}>
        <Link
          href={`/article/${article.slug}`}
          className="media-frame relative shrink-0 w-24 h-[4.5rem] sm:w-32 sm:h-24 block"
        >
          <ContentImage
            src={article.featuredImage}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 96px, 128px"
            className="transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="section-label mb-1.5">{article.category.name}</p>
          <Link href={`/article/${article.slug}`}>
            <h3 className="font-serif text-base sm:text-lg font-semibold leading-snug group-hover:text-gold transition-colors line-clamp-3">
              {article.title}
            </h3>
          </Link>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted">
            <span>{formatDate(article.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime} min
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className={cn("group", className)}>
        <Link href={`/article/${article.slug}`} className="block">
          <div className="media-frame relative aspect-[16/10] mb-5">
            <ContentImage
              src={article.featuredImage}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <p className="section-label mb-2">{article.category.name}</p>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight group-hover:text-gold transition-colors">
            {article.title}
          </h3>
          {article.subtitle && (
            <p className="text-muted mt-3 line-clamp-2 leading-relaxed">{article.subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted">
            <span className="font-medium text-foreground/80">{article.author.name}</span>
            <span>·</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group", className)}>
      <Link href={`/article/${article.slug}`} className="block">
        <div className="media-frame relative aspect-[3/2] mb-4">
          <ContentImage
            src={article.featuredImage}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <p className="section-label mb-2">{article.category.name}</p>
        <h3 className="font-serif text-lg sm:text-xl font-semibold leading-snug group-hover:text-gold transition-colors line-clamp-3">
          {article.title}
        </h3>
        <p className="text-sm sm:text-[15px] text-muted mt-2.5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
        <p className="text-xs text-muted mt-3">{formatDate(article.publishedAt)}</p>
      </Link>
    </article>
  );
}
