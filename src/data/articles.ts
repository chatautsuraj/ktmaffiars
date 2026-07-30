import "server-only";
import type { Article } from "@/types";
import { ensureSeeded } from "@/lib/cms/seed";
import { readCollection } from "@/lib/cms/store";
import { resolveImageUrl } from "@/lib/images";

function normalizeArticle(article: Article): Article {
  return {
    ...article,
    featuredImage: resolveImageUrl(article.featuredImage),
    author: {
      ...article.author,
      avatar: resolveImageUrl(article.author.avatar),
    },
  };
}

/**
 * An article is public unless it is explicitly a draft. Missing/undefined
 * status is treated as "published" so pre-existing and manually created
 * articles stay visible. This is the single choke point that keeps Autopilot
 * drafts out of every public read path (homepage, categories, article detail,
 * generateStaticParams, search, sitemap, RSS, related, etc.).
 */
function isPublished(article: Article): boolean {
  return article.status !== "draft";
}

async function loadArticles(): Promise<Article[]> {
  await ensureSeeded();
  return (await readCollection<Article>("articles")).filter(isPublished).map(normalizeArticle);
}

export async function getArticles(): Promise<Article[]> {
  return loadArticles();
}

export async function getArticleBySlug(slug: string) {
  return (await loadArticles()).find((a) => a.slug === slug);
}

export async function getArticlesByCategory(categorySlug: string) {
  return (await loadArticles()).filter((a) => a.category.slug === categorySlug);
}

export async function getFeaturedArticles() {
  return (await loadArticles()).filter((a) => a.isFeatured);
}

export async function getBreakingNews() {
  return (await loadArticles()).filter((a) => a.isBreaking);
}

export async function getLatestArticles(limit = 10) {
  return [...(await loadArticles())]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getRelatedArticles(article: Article, limit = 4) {
  return (await loadArticles())
    .filter((a) => a.id !== article.id && a.category.slug === article.category.slug)
    .slice(0, limit);
}

export async function searchArticles(query: string) {
  const q = query.toLowerCase();
  return (await loadArticles()).filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}
