import type { Metadata } from "next";
import { getAuthors } from "@/data/authors";
import { AuthorCard } from "@/components/cards/author-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Authors",
  description: "KTM Affairs journalists and contributors covering international affairs.",
};

export default async function AuthorsPage() {
  const authors = await getAuthors();
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Authors" }]} />
        <PageHeader
          title="Authors"
          description="Our correspondents, analysts, and editors reporting from Kathmandu and around the world."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </PageShell>
    </PageTransition>
  );
}
