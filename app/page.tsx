import Link from "next/link";
import { Globe2, ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { WorldMap } from "@/components/world-map";
import { MembershipCTA } from "@/components/membership-cta";
import { Button } from "@/components/ui/button";
import { ARTICLES, getArticlesBySection, COUNTRIES } from "@/lib/data";
import { CountryCard } from "@/components/country-card";

export default function HomePage() {
  const featured = ARTICLES.filter((a) => a.featured);
  const lead = featured[0]!;
  const rest = featured.slice(1);
  const secondary = rest.slice(0, 3);

  const diplomacy = getArticlesBySection("diplomacy").slice(0, 3);
  const foreignPolicy = getArticlesBySection("foreign-policy").slice(0, 3);
  const worldNews = getArticlesBySection("world").slice(0, 4);
  const analysis = getArticlesBySection("analysis").slice(0, 3);
  const opinion = getArticlesBySection("opinion").slice(0, 3);
  const spotlightCountries = COUNTRIES.slice(0, 4);

  return (
    <>
      <Hero lead={lead} secondary={secondary} />

      {/* World News */}
      <section className="container-editorial py-14 sm:py-20">
        <SectionHeading eyebrow="Dispatches" title="World News" href="/world" />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {worldNews.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Diplomacy + Foreign Policy split */}
      <section className="border-t border-hairline bg-paper-dim">
        <div className="container-editorial grid gap-14 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Statecraft" title="Diplomacy" href="/diplomacy" />
            <div className="flex flex-col">
              {diplomacy.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="list" />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Strategy" title="Foreign Policy" href="/foreign-policy" />
            <div className="flex flex-col">
              {foreignPolicy.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive World Map */}
      <section className="container-editorial py-14 sm:py-20">
        <SectionHeading
          eyebrow="Geopolitical Atlas"
          title="The World, Mapped"
          href="/countries"
          hrefLabel="Full country index"
        />
        <WorldMap />
        <p className="mt-4 flex items-center gap-2 text-xs text-ink/40">
          <Globe2 className="h-3.5 w-3.5" />
          Marker color reflects our editorial risk assessment, updated weekly by the KTM Affairs research desk.
        </p>
      </section>

      {/* Country spotlight */}
      <section className="border-t border-hairline bg-paper-dim">
        <div className="container-editorial py-14 sm:py-20">
          <SectionHeading eyebrow="Country Profiles" title="Nations to Watch" href="/countries" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {spotlightCountries.map((c) => (
              <CountryCard key={c.slug} country={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Analysis feature strip */}
      <section className="container-editorial py-14 sm:py-20">
        <SectionHeading eyebrow="Long-Form" title="Analysis" href="/analysis" />
        <div className="grid gap-10 lg:grid-cols-3">
          {analysis.map((a, i) => (
            <ArticleCard key={a.slug} article={a} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* Opinion */}
      <section className="border-t border-hairline bg-ink text-paper">
        <div className="container-editorial py-14 sm:py-20">
          <div className="mb-8 flex items-end justify-between border-b border-paper/15 pb-4">
            <div>
              <p className="eyebrow">Perspectives</p>
              <h2 className="font-display text-3xl text-paper sm:text-4xl">Opinion</h2>
            </div>
            <Link href="/opinion" className="link-underline hidden font-mono text-xs uppercase tracking-wideish text-paper/60 hover:text-paper sm:flex items-center gap-1.5">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {opinion.map((a) => (
              <Link key={a.slug} href={`/article/${a.slug}`} className="focus-ring group">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest2 text-gold">{a.author.name}</p>
                <h3 className="mt-3 font-display text-2xl leading-snug text-paper transition-colors group-hover:text-gold-light">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-paper/60">{a.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Embassy Directory teaser */}
      <section className="container-editorial py-14 sm:py-20">
        <div className="grid items-center gap-10 border border-hairline p-8 sm:p-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Diplomatic Resource</p>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              The Embassy Directory
            </h2>
            <p className="mt-4 max-w-md text-ink/60">
              A comprehensive, continuously verified directory of embassies, consulates, and missions — ambassadors,
              addresses, and direct lines in one place.
            </p>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="/embassies">Browse Directory</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {["🇺🇸", "🇬🇧", "🇨🇳", "🇮🇳", "🇩🇪", "🇯🇵", "🇫🇷", "🇦🇺", "🇷🇺"].map((flag, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center border border-hairline text-3xl transition-colors hover:border-gold"
              >
                {flag}
              </div>
            ))}
          </div>
        </div>
      </section>

      <MembershipCTA />

      {/* Magazine teaser */}
      <section className="container-editorial py-14 sm:py-20">
        <SectionHeading eyebrow="Quarterly Print" title="Magazine Archive" href="/magazine" />
        <ArticleCard article={getArticlesBySection("magazine")[0]!} variant="horizontal" />
      </section>
    </>
  );
}
