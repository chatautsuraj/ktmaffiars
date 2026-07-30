import type { Metadata } from "next";
import Link from "next/link";
import { getMagazineIssues } from "@/data/content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Magazine",
  description: "KTM Affairs magazine archive — long-form international affairs journalism.",
};

export default async function MagazinePage() {
  const magazineIssues = await getMagazineIssues();
  return (
    <PageTransition>
      <div className="bg-navy text-white py-12 sm:py-16">
        <div className="container-editorial text-center">
          <p className="text-gold text-sm uppercase tracking-widest mb-4">Long-Form Journalism</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">Magazine</h1>
        </div>
      </div>

      <PageShell>
        <Breadcrumbs items={[{ label: "Magazine" }]} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-8">
          {magazineIssues.map((issue) => (
            <Link
              key={issue.id}
              href={`/magazine/${issue.slug}`}
              className="group grid grid-cols-1 sm:grid-cols-2 gap-6 border border-border p-5 sm:p-6 hover:border-gold/50 transition-colors"
            >
              <div className="relative aspect-[3/4] overflow-hidden shadow-lg max-w-xs mx-auto sm:max-w-none w-full">
                <ContentImage src={issue.coverImage} alt={issue.title} fill className="group-hover:scale-105 transition-transform duration-500" sizes="200px" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs text-gold uppercase tracking-wider">{formatDate(issue.publishedAt, { month: "long", year: "numeric" })}</p>
                <h2 className="font-serif text-xl sm:text-2xl font-bold mt-2 group-hover:text-gold transition-colors">{issue.title}</h2>
                <p className="text-sm text-muted mt-3 line-clamp-3">{issue.description}</p>
                <span className="text-sm text-gold mt-4">Read Issue →</span>
              </div>
            </Link>
          ))}
        </div>
      </PageShell>
    </PageTransition>
  );
}
