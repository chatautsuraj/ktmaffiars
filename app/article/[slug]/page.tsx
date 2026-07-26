import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { ARTICLES, getArticle, getRelated, generateBody } from "@/lib/data";
import { formatDateline, readingTime } from "@/lib/utils";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sectionLabel: Record<string, string> = {
  diplomacy: "Diplomacy",
  "foreign-policy": "Foreign Policy",
  world: "World",
  analysis: "Analysis",
  opinion: "Opinion",
  magazine: "Magazine",
};

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      images: [{ url: article.image }],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) return notFound();

  const body = generateBody(article);
  const visible = article.premium ? body.slice(0, 2) : body;
  const locked = article.premium ? body.slice(2) : [];
  const related = getRelated(article);

  return (
    <article className="pb-20">
      <div className="container-editorial max-w-3xl py-10 sm:py-14">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href={`/${article.section}`}
            className="font-mono text-xs uppercase tracking-widest2 text-gold hover:underline"
          >
            {sectionLabel[article.section]}
          </Link>
          {article.premium && (
            <span className="flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-wideish text-ink/40">
              <Lock className="h-3 w-3" /> Premium
            </span>
          )}
        </div>

        <h1 className="font-display text-display-md leading-[1.03] text-ink sm:text-display-lg">
          {article.title}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-ink/60">{article.dek}</p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-hairline py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm text-paper">
              {article.author.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{article.author.name}</p>
              <p className="text-xs text-ink/50">{article.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wideish text-ink/40">
            <span suppressHydrationWarning>{formatDateline(article.publishedAt)}</span>
            <span>{readingTime(article.words)}</span>
          </div>
        </div>
      </div>

      <div className="container-editorial max-w-5xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink">
          <Image src={article.image} alt="" fill priority className="object-cover" sizes="100vw" />
        </div>
      </div>

      <div className="container-editorial mt-10 grid max-w-5xl gap-10 lg:grid-cols-[3rem_1fr]">
        <div className="hidden flex-col items-center gap-4 lg:flex">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest2 text-ink/40">Share</p>
          {[Twitter, Facebook, Linkedin, LinkIcon].map((Icon, i) => (
            <button key={i} className="focus-ring text-ink/40 transition-colors hover:text-gold" aria-label="Share article">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="prose-editorial mx-auto w-full max-w-2xl">
          {visible.map((p, i) => (
            <p key={i} className="mb-6 text-lg leading-[1.8] text-ink/85 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-gold first:first-letter:float-left first:first-letter:mr-3 first:first-letter:leading-[0.85]">
              {p}
            </p>
          ))}

          {article.premium && locked.length > 0 && (
            <div className="relative mt-10">
              <div className="pointer-events-none select-none space-y-6 opacity-30 blur-[2px]">
                {locked.map((p, i) => (
                  <p key={i} className="text-lg leading-[1.8] text-ink/85">
                    {p}
                  </p>
                ))}
              </div>
              <div className="absolute inset-x-0 -top-4 flex flex-col items-center gap-4 bg-gradient-to-t from-paper via-paper/95 to-transparent pt-16 pb-4 text-center">
                <Lock className="h-6 w-6 text-gold" />
                <h3 className="font-display text-2xl text-ink">This story continues for members</h3>
                <p className="max-w-sm text-sm text-ink/60">
                  Subscribe to KTM Affairs for full access to premium analysis, the print magazine, and our complete
                  archive.
                </p>
                <Button variant="gold" size="lg" asChild>
                  <Link href="/membership">Continue Reading</Link>
                </Button>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="border border-hairline px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wideish text-ink/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-editorial mt-20 max-w-5xl">
        <Separator className="mb-10" />
        <h2 className="mb-8 font-display text-3xl text-ink">Related Coverage</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </article>
  );
}
