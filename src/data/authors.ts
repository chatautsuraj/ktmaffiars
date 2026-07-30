import "server-only";
import type { Author, Category } from "@/types";
import { ensureSeeded } from "@/lib/cms/seed";
import { readCollection } from "@/lib/cms/store";
import { resolveImageUrl } from "@/lib/images";

async function loadCategories(): Promise<Category[]> {
  await ensureSeeded();
  return readCollection<Category>("categories");
}

async function loadAuthors(): Promise<Author[]> {
  await ensureSeeded();
  return (await readCollection<Author>("authors")).map((a) => ({
    ...a,
    avatar: resolveImageUrl(a.avatar),
  }));
}

export async function getCategories(): Promise<Category[]> {
  return loadCategories();
}

export async function getHomepageCategories(): Promise<Category[]> {
  return (await loadCategories())
    .filter((c) => c.showOnHomepage)
    .sort((a, b) => (a.homepageOrder ?? 0) - (b.homepageOrder ?? 0));
}

export async function getAuthors(): Promise<Author[]> {
  return loadAuthors();
}

export async function getCategoryBySlug(slug: string) {
  return (await loadCategories()).find((c) => c.slug === slug);
}

export async function getAuthorBySlug(slug: string) {
  return (await loadAuthors()).find((a) => a.slug === slug);
}
