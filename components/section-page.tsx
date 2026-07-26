import { ArticleCard } from "@/components/article-card";
import { Newsletter } from "@/components/newsletter";
import type { Article, Section } from "@/types";

export function SectionPage({
  eyebrow,
  title,
  description,
  articles,
}: {
  eyebrow: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;

  return (
    <div className="container-editorial py-10 sm:py-14">
      <header className="mb-10 max-w-3xl border-b border-hairline pb-8">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-display-md leading-[1.03] text-ink sm:text-display-lg">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/60">{description}</p>
      </header>

      {lead && (
        <div className="mb-14">
          <ArticleCard article={lead} variant="feature" priority />
        </div>
      )}

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>

      <div className="mt-20 border border-hairline bg-paper-dim p-8 sm:p-12">
        <Newsletter />
      </div>
    </div>
  );
}
