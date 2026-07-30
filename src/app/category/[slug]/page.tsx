import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategories } from "@/data/authors";
import { getArticlesByCategory } from "@/data/articles";
import { ArticleSection } from "@/components/home/article-section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";

export const dynamicParams = true;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryArticles = await getArticlesByCategory(slug);

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: category.name }]} />
        <PageHeader title={category.name} description={category.description} />
      </PageShell>

      {categoryArticles.length > 0 ? (
        <ArticleSection
          title={`Latest in ${category.name}`}
          articles={categoryArticles}
          columns={3}
        />
      ) : (
        <PageShell>
          <p className="text-muted text-center py-8">No articles in this category yet. Check back soon.</p>
        </PageShell>
      )}
    </PageTransition>
  );
}
