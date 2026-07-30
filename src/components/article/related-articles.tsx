import { ArticleCard } from "@/components/cards/article-card";
import type { Article } from "@/types";

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
}

export function RelatedArticles({ articles, title = "Related Stories" }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h3 className="font-serif text-2xl font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article, i) => (
          <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />
        ))}
      </div>
    </section>
  );
}
