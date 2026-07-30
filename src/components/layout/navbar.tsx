"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Bookmark, ChevronDown } from "lucide-react";
import { navItems } from "@/lib/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchModal } from "@/components/shared/search-modal";
import { ReadingListPanel } from "@/components/shared/reading-list-panel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRIMARY_NAV = navItems.filter((item) =>
  ["Home", "News", "Diplomacy", "Foreign Policy", "Opinion", "Analysis", "Countries", "Magazine"].includes(item.label)
);

interface NavMenusProps {
  pathname: string;
  onSearchOpen: () => void;
  onReadingListOpen: () => void;
}

function NavMenus({ pathname, onSearchOpen, onReadingListOpen }: NavMenusProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-border">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-[4.25rem] gap-6">
          <Link href="/" className="group shrink-0 min-w-0">
            <span className="font-serif text-xl sm:text-[1.65rem] font-bold text-navy dark:text-foreground tracking-tight group-hover:text-gold transition-colors block truncate">
              KTM Affairs
            </span>
            <span className="hidden md:block text-[11px] text-muted tracking-wide mt-0.5">
              Where Nepal Meets the World
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
            {PRIMARY_NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && openDropdown(item.label)}
                onMouseLeave={() => item.children && scheduleClose()}
              >
                <Link
                  href={item.href}
                  data-active={pathname === item.href}
                  className={cn(
                    "nav-underline px-3 py-2 text-[13px] font-medium transition-colors",
                    pathname === item.href
                      ? "text-gold"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    {item.label}
                    {item.children && <ChevronDown className="h-3 w-3 opacity-40" />}
                  </span>
                </Link>

                {item.children && openMenu === item.label && (
                  <div
                    className="absolute top-full left-0 pt-2 z-50"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="min-w-[210px] bg-paper border border-border rounded-md py-1.5 overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={onSearchOpen} aria-label="Search" className="text-foreground/70">
              <Search className="h-[1.1rem] w-[1.1rem]" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-foreground/70" onClick={onReadingListOpen} aria-label="Reading list">
              <Bookmark className="h-[1.1rem] w-[1.1rem]" />
            </Button>
            <ThemeToggle />
            <Button asChild variant="gold" size="sm" className="hidden md:inline-flex ml-1">
              <Link href="/membership">Subscribe</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="xl:hidden border-t border-border bg-paper max-h-[75vh] overflow-y-auto" aria-label="Mobile navigation">
          <div className="container-editorial py-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-border/60 last:border-0">
                <Link
                  href={item.href}
                  className={cn(
                    "block py-3.5 text-[15px] font-medium transition-colors",
                    pathname === item.href ? "text-gold" : "hover:text-gold"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pb-3 pl-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-1.5 text-sm text-muted hover:text-gold transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button asChild variant="gold" className="w-full">
                <Link href="/membership">Subscribe</Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [readingListOpen, setReadingListOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <NavMenus
        key={pathname}
        pathname={pathname}
        onSearchOpen={() => setSearchOpen(true)}
        onReadingListOpen={() => setReadingListOpen(true)}
      />

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <ReadingListPanel open={readingListOpen} onOpenChange={setReadingListOpen} />
    </>
  );
}
