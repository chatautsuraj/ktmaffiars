import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types";
import { formatDateline, readingTime } from "@/lib/utils";

export function Hero({ lead, secondary }: { lead: Article; secondary: Article[] }) {
  return (
    <section className="border-b border-hairline">
      <div className="container-editorial grid gap-10 py-8 lg:grid-cols-[1.6fr_1fr] lg:gap-14 lg:py-14">
        <Link href={`/article/${lead.slug}`} className="focus-ring group animate-fade-up">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest2 text-gold">Lead Story</span>
          </div>
          <h1 className="font-display text-display-md leading-[1.02] text-ink transition-colors group-hover:text-ink/80 sm:text-display-lg lg:text-display-xl">
            {lead.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">{lead.dek}</p>
          <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wideish text-ink/50">
            <span>{lead.author.name}</span>
            <span>·</span>
            <span>{readingTime(lead.words)}</span>
          </div>
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden bg-ink">
            <Image
              src={lead.image}
              alt=""
              fill
              priority
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </Link>

        <div className="animate-fade-up [animation-delay:150ms]">
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-[0.7rem] uppercase tracking-widest2 text-ink/40">
              {formatDateline(new Date().toISOString())}
            </span>
          </div>
          <div className="flex flex-col divide-y divide-hairline">
            {secondary.map((article, i) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="focus-ring group flex gap-4 py-5 first:pt-0"
              >
                <span className="font-display text-2xl text-gold/70">0{i + 1}</span>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-wideish text-ink/40">
                    {article.section.replace("-", " ")}
                  </p>
                  <h3 className="mt-1 font-display text-lg leading-snug text-ink transition-colors group-hover:text-gold">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/world"
            className="link-underline mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wideish text-ink/60 hover:text-ink"
          >
            More world coverage <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
