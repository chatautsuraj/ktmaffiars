import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { SearchResults } from "@/components/search/search-results";
import { GridSkeleton } from "@/components/shared/skeletons";
import { getCategories } from "@/data/authors";

export const metadata: Metadata = {
  title: "Search",
  description: "Search KTM Affairs for articles, countries, embassies, and organizations.",
};

export default async function SearchPage() {
  const categories = await getCategories();

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Search" }]} />
        <PageHeader title="Search" description="Explore our archive of international affairs coverage." />

        <Suspense fallback={<GridSkeleton count={6} />}>
          <SearchResults categories={categories} />
        </Suspense>
      </PageShell>
    </PageTransition>
  );
}
