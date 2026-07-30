"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import type { Article } from "@/types";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

interface HeroSectionProps {
  article: Article;
  secondaryArticles?: Article[];
}

export function HeroSection({ article, secondaryArticles = [] }: HeroSectionProps) {
  return (
    <section className="border-b border-border bg-paper">
      <div className="container-editorial py-8 sm:py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Lead story — image always first on mobile */}
          <div className="lg:col-span-7 order-1">
            <Link href={`/article/${article.slug}`} className="group block">
              <div className="media-frame relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[200px] sm:min-h-[260px] mb-5 sm:mb-6">
                <ContentImage
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
                {article.isBreaking && (
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-destructive text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm z-10 shadow-sm">
                    Breaking
                  </span>
                )}
              </div>

              <p className="section-label mb-2 sm:mb-3">{article.category.name}</p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] font-bold text-navy dark:text-foreground leading-[1.08] tracking-[-0.02em] group-hover:text-gold transition-colors">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
                  {article.subtitle}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 sm:mt-5 text-sm text-muted">
                <span className="font-medium text-foreground/80">{article.author.name}</span>
                <span className="text-border hidden sm:inline">|</span>
                <span>{formatDate(article.publishedAt)}</span>
                <span className="text-border hidden sm:inline">|</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readingTime} min read
                </span>
              </div>
            </Link>
          </div>

          {/* Sidebar headlines */}
          <div className="lg:col-span-5 order-2 lg:border-l lg:border-border lg:pl-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="gold-rule" />
              <h2 className="section-label">Top Stories</h2>
            </div>
            <div className="divide-y divide-border">
              {secondaryArticles.slice(0, 5).map((item) => (
                <article key={item.id} className="group py-4 sm:py-5 first:pt-0 last:pb-0">
                  <Link href={`/article/${item.slug}`} className="flex gap-4 sm:block">
                    <div className="media-frame relative shrink-0 w-20 h-16 sm:hidden">
                      <ContentImage
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="section-label mb-1.5 sm:mb-2">{item.category.name}</p>
                      <h3 className="font-serif text-base sm:text-xl font-semibold leading-snug group-hover:text-gold transition-colors line-clamp-3">
                        {item.title}
                      </h3>
                      <p className="hidden sm:block text-sm text-muted mt-2 line-clamp-2">{item.excerpt}</p>
                      <p className="text-xs text-muted/80 mt-1.5 sm:mt-2">{formatDate(item.publishedAt)}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
