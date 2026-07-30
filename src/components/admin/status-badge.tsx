import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status?: string }) {
  const isDraft = status === "draft";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
        isDraft
          ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
      )}
    >
      {isDraft ? "Draft" : "Published"}
    </span>
  );
}

export function SourceBadge({ source }: { source?: string }) {
  if (source !== "autopilot") {
    return <span className="text-xs text-muted">Manual</span>;
  }
  return (
    <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy dark:bg-gold/20 dark:text-gold">
      Autopilot
    </span>
  );
}
