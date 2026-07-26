import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats an ISO date string into an editorial dateline, e.g. "5 JULY 2026". */
export function formatDateline(iso: string) {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    .toUpperCase();
}

/** Formats an ISO date into a short form, e.g. "Jul 5, 2026". */
export function formatShortDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function readingTime(words: number) {
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
