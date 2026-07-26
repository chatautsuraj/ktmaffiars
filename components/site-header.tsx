"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/data";
import { AISearch } from "@/components/ai-search";
import { Button } from "@/components/ui/button";
import { WorldClockStrip } from "@/components/world-clock-strip";
import { BreakingTicker } from "@/components/breaking-ticker";
import { formatDateline } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const today = formatDateline(new Date().toISOString());

  useEffect(() => {
    const SCROLL_THRESHOLD = 48; // px scrolled before switching to compact mode
    const HIDE_THRESHOLD = 120; // px scrolled before the header is allowed to slide away

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);

      const scrollingDown = y > lastScrollY.current;
      if (y < HIDE_THRESHOLD) {
        setHidden(false);
      } else if (scrollingDown) {
        setHidden(true);
        setOpen(false);
      } else {
        setHidden(false);
      }

      lastScrollY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-paper/95 backdrop-blur transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div
        className={cn(
          "overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid",
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        )}
      >
        <div className="min-h-0">
          <WorldClockStrip />
          <div className="container-editorial flex items-center justify-between border-b border-hairline py-2 text-[0.65rem] font-mono uppercase tracking-widest2 text-ink/40">
            <span suppressHydrationWarning>{today}</span>
            <span className="hidden sm:inline">Vol. IV — No. 214 — Kathmandu Edition</span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "container-editorial flex items-center justify-between transition-[padding] duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <button
          className="focus-ring -ml-2 flex items-center p-2 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="group flex flex-col items-center">
          <span
            className={cn(
              "font-display font-semibold tracking-tight text-ink transition-[font-size] duration-300",
              scrolled ? "text-2xl sm:text-2xl" : "text-3xl sm:text-4xl"
            )}
          >
            KTM <span className="text-gold">Affairs</span>
          </span>
          <span
            className={cn(
              "mt-0.5 hidden font-mono text-[0.6rem] uppercase tracking-widest2 text-ink/40 sm:block",
              scrolled && "sm:hidden"
            )}
          >
            {SITE.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <AISearch />
          <Button variant="gold" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/membership">Subscribe</Link>
          </Button>
        </div>
      </div>

      <nav className="hidden border-t border-hairline lg:block">
        <div className="container-editorial flex items-center gap-8 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline font-mono text-xs uppercase tracking-wideish text-ink/70 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <BreakingTicker />

      {open && (
        <div className="fixed inset-0 z-50 flex bg-ink-deep/60 backdrop-blur-sm lg:hidden">
          <div className="flex w-[85%] max-w-sm flex-col bg-paper p-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-2xl text-ink">
                KTM <span className="text-gold">Affairs</span>
              </span>
              <button className="focus-ring p-2" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring border-b border-hairline py-3 font-display text-xl text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button variant="gold" className="mt-8" asChild>
              <Link href="/membership" onClick={() => setOpen(false)}>
                Subscribe
              </Link>
            </Button>
          </div>
          <button
            className="flex-1"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
