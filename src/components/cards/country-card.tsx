"use client";

import Link from "next/link";
import type { Country } from "@/types";
import { ContentImage } from "@/components/ui/content-image";
import { cn } from "@/lib/utils";

interface CountryCardProps {
  country: Country;
  className?: string;
  index?: number;
}

export function CountryCard({ country, className }: CountryCardProps) {
  return (
    <Link
      href={`/country/${country.slug}`}
      className={cn("group block card-elevated overflow-hidden", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-light-gray">
        <ContentImage
          src={country.heroImage}
          alt={country.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl drop-shadow-sm">{country.flag}</span>
            <div className="min-w-0">
              <span className="text-white font-serif text-lg font-semibold block leading-tight truncate group-hover:text-gold-light transition-colors">{country.name}</span>
              <span className="text-white/70 text-[11px] uppercase tracking-[0.12em] font-medium">{country.region}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
