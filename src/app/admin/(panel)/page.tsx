import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { AdminHeader } from "@/components/admin/header";
import { CMS_COLLECTIONS, COLLECTION_LABELS } from "@/lib/cms/collections";
import { ensureSeeded } from "@/lib/cms/seed";
import { readCollection } from "@/lib/cms/store";
import { getSession } from "@/lib/cms/auth";
import { ROLE_LABELS } from "@/lib/cms/roles";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  await ensureSeeded();
  const session = await getSession();
  const roleLabel = session ? ROLE_LABELS[session.role] : null;

  const counts = await Promise.all(
    CMS_COLLECTIONS.map(async (collection) => ({
      collection,
      label: COLLECTION_LABELS[collection],
      count: (await readCollection(collection)).length,
    }))
  );

  const recentArticles = (await readCollection<{ id: string; title: string; publishedAt: string; slug: string }>("articles"))
    .slice(0, 5);

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description={`Welcome back${session?.email ? `, ${session.email.split("@")[0]}` : ""}${roleLabel ? ` (${roleLabel})` : ""}. Manage your editorial content.`}
        createHref="/admin/articles/new"
        createLabel="New Article"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {counts.slice(0, 4).map(({ collection, label, count }) => (
          <Link
            key={collection}
            href={`/admin/${collection}`}
            className="border border-border p-5 hover:border-gold/50 transition-colors group"
          >
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
            <p className="font-serif text-3xl font-bold mt-1 group-hover:text-gold transition-colors">{count}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold">Recent Articles</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/articles">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="border border-border divide-y divide-border">
            {recentArticles.length === 0 ? (
              <p className="p-6 text-muted text-sm">No articles yet.</p>
            ) : (
              recentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className="flex items-center gap-3 p-4 hover:bg-light-gray/30 transition-colors"
                >
                  <FileText className="h-4 w-4 text-muted shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{article.title}</p>
                    <p className="text-xs text-muted">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold mb-4">All Collections</h2>
          <div className="border border-border divide-y divide-border">
            {counts.map(({ collection, label, count }) => (
              <Link
                key={collection}
                href={`/admin/${collection}`}
                className="flex items-center justify-between p-4 hover:bg-light-gray/30 transition-colors"
              >
                <span>{label}</span>
                <span className="text-muted text-sm">{count} items</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 p-4 border border-gold/30 bg-gold/5 text-sm">
        <p className="font-medium">Quick tip</p>
        <p className="text-muted mt-1">
          Changes save to the CMS store (local <code className="text-xs bg-light-gray px-1">content/</code> or Vercel Blob) and appear on the live site after revalidation.
          Start with <Link href="/admin/articles/new" className="text-gold hover:underline">a new article</Link> or manage{" "}
          <Link href="/admin/categories" className="text-gold hover:underline">categories</Link> and{" "}
          <Link href="/admin/authors" className="text-gold hover:underline">authors</Link> first.
        </p>
      </div>
    </>
  );
}
