import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import type { Article } from "@/types";
import { formatShortDate, readingTime, cn } from "@/lib/utils";

const sectionLabel: Record<string, string> = {
  diplomacy: "Diplomacy",
  "foreign-policy": "Foreign Policy",
  world: "World",
  analysis: "Analysis",
  opinion: "Opinion",
  magazine: "Magazine",
};

export function ArticleCard({
  article,
  variant = "vertical",
  priority = false,
}: {
  article: Article;
  variant?: "vertical" | "horizontal" | "list" | "feature";
  priority?: boolean;
}) {
  const meta = (
    <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wideish text-ink/40">
      <span className="text-gold">{sectionLabel[article.section]}</span>
      <span>·</span>
      <span>{formatShortDate(article.publishedAt)}</span>
      <span>·</span>
      <span>{readingTime(article.words)}</span>
    </div>
  );

  if (variant === "list") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="focus-ring group flex gap-5 border-b border-hairline py-5 first:pt-0 last:border-none"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden sm:h-24 sm:w-32">
          <Image src={article.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="128px" />
        </div>
        <div className="min-w-0">
          {meta}
          <h3 className="mt-1.5 line-clamp-2 font-display text-lg leading-snug text-ink transition-colors group-hover:text-gold sm:text-xl">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/article/${article.slug}`} className="focus-ring group grid grid-cols-5 gap-6">
        <div className="relative col-span-2 aspect-[4/3] overflow-hidden">
          <Image src={article.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="40vw" />
        </div>
        <div className="col-span-3 flex flex-col justify-center">
          {meta}
          <h3 className="mt-2 font-display text-xl leading-snug text-ink transition-colors group-hover:text-gold sm:text-2xl">
            {article.title}
          </h3>
          <p className="mt-2 hidden text-sm leading-relaxed text-ink/60 sm:block">{article.dek}</p>
        </div>
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <Link href={`/article/${article.slug}`} className="focus-ring group relative block overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
          <Image
            src={article.image}
            alt=""
            fill
            priority={priority}
            className="object-cover opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <div className="mb-3 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest2 text-gold">
              {article.premium && <Lock className="h-3 w-3" />}
              {sectionLabel[article.section]}
              <span className="text-paper/50">· {formatShortDate(article.publishedAt)}</span>
            </div>
            <h3 className="max-w-3xl font-display text-3xl leading-[1.05] text-paper transition-colors group-hover:text-gold-light sm:text-5xl">
              {article.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm text-paper/70 sm:text-base">{article.dek}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="focus-ring group flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image src={article.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        {article.premium && (
          <div className="absolute right-2 top-2 flex items-center gap-1 bg-ink/90 px-2 py-1 text-gold">
            <Lock className="h-3 w-3" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        {meta}
        <h3 className="mt-2 font-display text-xl leading-snug text-ink transition-colors group-hover:text-gold">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">{article.dek}</p>
      </div>
    </Link>
  );
}
