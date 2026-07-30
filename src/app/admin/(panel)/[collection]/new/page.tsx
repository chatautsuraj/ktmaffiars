import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { ArticleForm } from "@/components/admin/article-form";
import { CollectionForm } from "@/components/admin/collection-form";
import { COLLECTION_LABELS, isValidCollection } from "@/lib/cms/collections";

export default async function NewCollectionItemPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isValidCollection(collection)) notFound();

  return (
    <>
      <AdminHeader
        title={`New ${COLLECTION_LABELS[collection].replace(/s$/, "")}`}
        description={`Create a new entry in ${COLLECTION_LABELS[collection].toLowerCase()}`}
      />
      {collection === "articles" ? (
        <ArticleForm isNew />
      ) : (
        <CollectionForm collection={collection} isNew />
      )}
    </>
  );
}
