"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

interface ReadingListContextValue {
  bookmarks: string[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (slug: string) => void;
}

const ReadingListContext = createContext<ReadingListContextValue | null>(null);
const STORAGE_KEY = "ktm-affairs-reading-list";

const EMPTY_BOOKMARKS: string[] = [];

const listeners = new Set<() => void>();

function readBookmarksFromStorage(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

let bookmarksCache: string[] | null = null;

function getBookmarksSnapshot(): string[] {
  if (bookmarksCache === null) {
    bookmarksCache = readBookmarksFromStorage();
  }
  return bookmarksCache;
}

function getServerBookmarksSnapshot(): string[] {
  return EMPTY_BOOKMARKS;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function updateBookmarks(next: string[] | ((prev: string[]) => string[])) {
  const current = getBookmarksSnapshot();
  bookmarksCache = typeof next === "function" ? next(current) : next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarksCache));
  listeners.forEach((listener) => listener());
}

export function useReadingList() {
  const ctx = useContext(ReadingListContext);
  if (!ctx) throw new Error("useReadingList must be used within ReadingListProvider");
  return ctx;
}

export function ReadingListProvider({ children }: { children: React.ReactNode }) {
  const bookmarks = useSyncExternalStore(subscribe, getBookmarksSnapshot, getServerBookmarksSnapshot);

  const isBookmarked = useCallback((slug: string) => bookmarks.includes(slug), [bookmarks]);

  const toggleBookmark = useCallback((slug: string) => {
    updateBookmarks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  return (
    <ReadingListContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </ReadingListContext.Provider>
  );
}
