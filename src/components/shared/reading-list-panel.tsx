"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReadingList } from "@/components/providers/reading-list-provider";

interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  category: { name: string };
}

interface ReadingListPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReadingListPanel({ open, onOpenChange }: ReadingListPanelProps) {
  const { bookmarks, toggleBookmark } = useReadingList();
  const [articles, setArticles] = useState<ArticleSummary[]>([]);

  useEffect(() => {
    if (!open) return;
    fetch("/api/content/articles")
      .then((r) => r.json())
      .then(setArticles);
  }, [open]);

  const savedArticles = articles.filter((a) => bookmarks.includes(a.slug));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={() => onOpenChange(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-border z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-gold" />
                <h2 className="font-serif text-lg font-bold">Reading List</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {savedArticles.length === 0 ? (
                <p className="text-sm text-muted text-center py-12">
                  No saved articles yet. Bookmark stories to read later.
                </p>
              ) : (
                <ul className="space-y-4">
                  {savedArticles.map((article) => (
                    <li key={article.id} className="group border-b border-border pb-4">
                      <Link
                        href={`/article/${article.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="block"
                      >
                        <p className="text-xs text-gold uppercase tracking-wider mb-1">
                          {article.category.name}
                        </p>
                        <h3 className="font-serif font-semibold group-hover:text-gold transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(article.slug)}
                        className="text-xs text-muted hover:text-gold mt-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
