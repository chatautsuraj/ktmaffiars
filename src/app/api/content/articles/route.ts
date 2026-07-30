import { NextResponse } from "next/server";
import { getArticles } from "@/data/articles";

export async function GET() {
  const articles = (await getArticles()).map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: { name: a.category.name, slug: a.category.slug },
    publishedAt: a.publishedAt,
  }));
  return NextResponse.json(articles);
}
