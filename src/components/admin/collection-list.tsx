"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge, SourceBadge } from "@/components/admin/status-badge";
import { formatCellValue, getListColumns } from "@/lib/cms/field-schemas";
import type { CmsCollection } from "@/lib/cms/collections";

interface CollectionListProps {
  collection: CmsCollection;
  initialItems: { id: string }[];
}

export function CollectionList({ collection, initialItems }: CollectionListProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const columns = getListColumns(collection).map((col) => ({
    key: col.key,
    label: col.label,
    render: (item: { id: string }) => {
      const record = item as Record<string, unknown>;
      if (col.key === "status") {
        return <StatusBadge status={record.status as string | undefined} />;
      }
      if (col.key === "source") {
        return <SourceBadge source={record.source as string | undefined} />;
      }
      return formatCellValue(record, col.key);
    },
  }));

  return (
    <DataTable
      items={items}
      columns={columns}
      collection={collection}
      onDelete={(id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        router.refresh();
      }}
    />
  );
}
