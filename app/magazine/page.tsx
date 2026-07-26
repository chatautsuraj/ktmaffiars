import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Newsletter } from "@/components/newsletter";

export const metadata: Metadata = {
  title: "Magazine Archive",
  description: "Twenty years of quarterly print issues, fully digitized and searchable.",
};

const ISSUES = [
  { season: "Summer 2026", theme: "Who Writes the Rules Now?", cover: ARTICLES[12]!.image, slug: ARTICLES[12]!.slug },
  { season: "Spring 2026", theme: "The New Non-Alignment", cover: ARTICLES[0]!.image, slug: ARTICLES[0]!.slug },
  { season: "Winter 2025", theme: "Currency of Power", cover: ARTICLES[9]!.image, slug: ARTICLES[9]!.slug },
  { season: "Autumn 2025", theme: "The Sanctions Decade", cover: ARTICLES[5]!.image, slug: ARTICLES[5]!.slug },
  { season: "Summer 2025", theme: "Water, Ice, and War", cover: ARTICLES[8]!.image, slug: ARTICLES[8]!.slug },
  { season: "Spring 2025", theme: "Silicon Statecraft", cover: ARTICLES[1]!.image, slug: ARTICLES[1]!.slug },
];

export default function MagazinePage() {
  return (
    <div className="container-editorial py-10 sm:py-14">
      <header className="mb-12 max-w-3xl border-b border-hairline pb-8">
        <p className="eyebrow mb-3">Quarterly Print</p>
        <h1 className="font-display text-display-md leading-[1.03] text-ink sm:text-display-lg">
          The Magazine Archive
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/60">
          Every quarterly print issue since our founding — fully digitized, searchable, and free for members.
        </p>
      </header>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {ISSUES.map((issue) => (
          <Link key={issue.season} href={`/article/${issue.slug}`} className="focus-ring group">
            <div className="relative aspect-[3/4] overflow-hidden border border-hairline bg-ink">
              <Image
                src={issue.cover}
                alt={`${issue.season} cover`}
                fill
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <Badge variant="gold">{issue.season}</Badge>
                <h3 className="mt-3 font-display text-2xl leading-snug text-paper">{issue.theme}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 border border-hairline bg-paper-dim p-8 sm:p-12">
        <Newsletter />
      </div>
    </div>
  );
}
