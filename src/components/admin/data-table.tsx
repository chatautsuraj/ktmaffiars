"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  items: T[];
  columns: Column<T>[];
  collection: string;
  titleKey?: keyof T;
  onDelete?: (id: string) => void;
}

export function DataTable<T extends { id: string }>({
  items,
  columns,
  collection,
  onDelete,
}: DataTableProps<T>) {
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/${collection}/${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    if (res.ok) {
      onDelete?.(id);
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    alert(data.error || `Failed to delete (${res.status})`);
  };

  if (items.length === 0) {
    return (
      <div className="border border-border p-12 text-center text-muted">
        No items yet. Create your first entry to get started.
      </div>
    );
  }

  return (
    <div className="border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-light-gray/50 border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="text-left px-4 py-3 font-medium text-muted uppercase text-xs tracking-wider">
                {col.label}
              </th>
            ))}
            <th className="text-right px-4 py-3 font-medium text-muted uppercase text-xs tracking-wider w-28">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-light-gray/30 transition-colors">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key as string] ?? "—")}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <Link href={`/admin/${collection}/${item.id}`}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
