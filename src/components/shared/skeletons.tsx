import { cn } from "@/lib/utils";

export function ArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="skeleton h-3 w-20" />
      <div className="skeleton h-5 w-full" />
      <div className="skeleton h-5 w-3/4" />
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 max-w-3xl">
      <div className="skeleton h-3 w-24" />
      <div className="skeleton h-12 w-full" />
      <div className="skeleton h-4 w-2/3" />
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}
