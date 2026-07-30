import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, basePath, query = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams({ ...query, page: String(page) });
    return `${basePath}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm border border-border hover:border-gold transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Link>
      )}

      {pages.map((page, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="text-muted px-1">…</span>}
            <Link
              href={buildHref(page)}
              className={cn(
                "min-w-[2.5rem] h-10 flex items-center justify-center text-sm border transition-colors",
                page === currentPage
                  ? "bg-navy text-white border-navy"
                  : "border-border hover:border-gold"
              )}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          </span>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm border border-border hover:border-gold transition-colors"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
