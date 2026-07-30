"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReadingList } from "@/components/providers/reading-list-provider";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  slug: string;
  className?: string;
}

export function BookmarkButton({ slug, className }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useReadingList();
  const { toast } = useToast();
  const saved = isBookmarked(slug);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("h-8 w-8", className)}
      aria-label={saved ? "Remove from reading list" : "Save to reading list"}
      onClick={() => {
        toggleBookmark(slug);
        toast(saved ? "Removed from reading list" : "Saved to reading list");
      }}
    >
      <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-gold text-gold")} />
    </Button>
  );
}
