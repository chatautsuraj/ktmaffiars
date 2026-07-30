"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  description?: string;
  createHref?: string;
  createLabel?: string;
}

export function AdminHeader({ title, description, createHref, createLabel = "Create New" }: AdminHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted mt-1 text-sm">{description}</p>}
      </div>
      {createHref && (
        <Button asChild variant="gold">
          <Link href={createHref}>
            <Plus className="h-4 w-4" />
            {createLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}
