import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { ArticleForm } from "@/components/admin/article-form";
import { CollectionForm } from "@/components/admin/collection-form";
import { COLLECTION_LABELS, isValidCollection } from "@/lib/cms/collections";
import { ensureSeeded } from "@/lib/cms/seed";
import { getById } from "@/lib/cms/store";
import type { Article } from "@/types";

export default async function EditCollectionItemPage({
  params,
}: {
  params: Promise<{ collection: string; id: string }>;
}) {
  const { collection, id } = await params;
  if (!isValidCollection(collection)) notFound();

  await ensureSeeded();
  const item = await getById(collection, id);
  if (!item) notFound();

  const title =
    (item as { title?: string; name?: string }).title ||
    (item as { name?: string }).name ||
    "Edit Item";

  return (
    <>
      <AdminHeader
        title={`Edit: ${title}`}
        description={`Update this ${COLLECTION_LABELS[collection].toLowerCase().replace(/s$/, "")}`}
      />
      {collection === "articles" ? (
        <ArticleForm initialData={item as Article} />
      ) : (
        <CollectionForm
          collection={collection}
          initialData={item as Record<string, unknown>}
        />
      )}
    </>
  );
}
