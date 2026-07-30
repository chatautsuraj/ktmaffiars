import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { CollectionList } from "@/components/admin/collection-list";
import { COLLECTION_LABELS, isValidCollection } from "@/lib/cms/collections";
import { ensureSeeded } from "@/lib/cms/seed";
import { readCollection } from "@/lib/cms/store";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isValidCollection(collection)) notFound();

  await ensureSeeded();
  const items = await readCollection(collection);

  return (
    <>
      <AdminHeader
        title={COLLECTION_LABELS[collection]}
        description={`Manage ${COLLECTION_LABELS[collection].toLowerCase()} for the site`}
        createHref={`/admin/${collection}/new`}
      />
      <CollectionList collection={collection} initialItems={items as { id: string }[]} />
    </>
  );
}
