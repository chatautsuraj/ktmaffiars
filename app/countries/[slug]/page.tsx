import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COUNTRIES, ARTICLES, getCountry } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const country = getCountry(params.slug);
  if (!country) return {};
  return {
    title: `${country.name} — Country Profile`,
    description: country.summary,
  };
}

const riskStyle: Record<string, string> = {
  Low: "text-emerald-600 border-emerald-600/30",
  Guarded: "text-gold border-gold/40",
  Elevated: "text-amber-600 border-amber-600/30",
  High: "text-rose-600 border-rose-600/30",
};

export default function CountryProfilePage({ params }: { params: { slug: string } }) {
  const country = getCountry(params.slug);
  if (!country) return notFound();

  const headlines = ARTICLES.filter((a) => country.headlineSlugs.includes(a.slug));

  return (
    <div className="container-editorial py-10 sm:py-14">
      <Link
        href="/countries"
        className="focus-ring mb-8 flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-wideish text-ink/50 hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All Countries
      </Link>

      <header className="grid gap-8 border-b border-hairline pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-5xl">{country.flagEmoji}</span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest2 text-gold">{country.region}</p>
              <h1 className="font-display text-display-md leading-none text-ink sm:text-display-lg">
                {country.name}
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/60">{country.summary}</p>
        </div>
        <Badge className={cn("border px-3 py-1.5 text-sm", riskStyle[country.riskLevel])} variant="outline">
          {country.riskLevel} Risk
        </Badge>
      </header>

      <dl className="grid grid-cols-2 gap-8 border-b border-hairline py-10 sm:grid-cols-4">
        {[
          { label: "Capital", value: country.capital },
          { label: "Population", value: country.population },
          { label: "Government", value: country.government },
          { label: "GDP (Nominal)", value: country.gdp },
        ].map((item) => (
          <div key={item.label}>
            <dt className="font-mono text-[0.65rem] uppercase tracking-widest2 text-ink/40">{item.label}</dt>
            <dd className="mt-1 font-display text-xl text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      <section className="py-10">
        <h2 className="mb-6 font-display text-2xl text-ink">Related Coverage</h2>
        {headlines.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {headlines.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink/50">
            No dedicated coverage yet for {country.name}. Check{" "}
            <Link href="/world" className="link-underline text-ink">
              World News
            </Link>{" "}
            for the latest.
          </p>
        )}
      </section>
    </div>
  );
}
