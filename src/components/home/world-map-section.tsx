"use client";

import Link from "next/link";
import { CountryCard } from "@/components/cards/country-card";
import { SectionHeader } from "@/components/home/article-section";
import type { Country } from "@/types";

interface WorldMapSectionProps {
  countries: Country[];
}

export function WorldMapSection({ countries }: WorldMapSectionProps) {
  const positions = [
    { cx: 580, cy: 180 },
    { cx: 620, cy: 150 },
    { cx: 180, cy: 160 },
    { cx: 680, cy: 170 },
  ];

  return (
    <section className="py-14 md:py-20 section-alt">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Global Relations"
          subtitle="Explore bilateral ties and diplomatic profiles"
          href="/countries"
          linkLabel="All Countries"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 relative border border-border bg-card p-8 shadow-[var(--shadow-editorial)] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-navy" />
            <div className="relative w-full aspect-[4/3]">
              <svg viewBox="0 0 800 400" className="w-full h-full" aria-label="Interactive world map">
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect fill="url(#mapGlow)" className="text-navy" width="800" height="400" rx="2" />
                <path
                  d="M100,200 Q200,120 350,180 T550,160 T750,200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border"
                  strokeDasharray="4 4"
                />
                {countries.map((country, i) => {
                  const pos = positions[i] || { cx: 400, cy: 200 };
                  return (
                    <Link key={country.id} href={`/country/${country.slug}`}>
                      <g className="cursor-pointer group">
                        <circle cx={pos.cx} cy={pos.cy} r="16" className="fill-gold/20 map-ping" />
                        <circle
                          cx={pos.cx}
                          cy={pos.cy}
                          r="6"
                          className="fill-gold stroke-navy stroke-2 group-hover:r-8 transition-all"
                        />
                        <text
                          x={pos.cx}
                          y={pos.cy + 22}
                          textAnchor="middle"
                          className="fill-foreground text-[11px] font-medium group-hover:fill-gold transition-colors"
                        >
                          {country.name}
                        </text>
                      </g>
                    </Link>
                  );
                })}
              </svg>
            </div>
            <p className="text-xs text-muted mt-6 text-center editorial-caps">
              Click a marker to explore relations
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {countries.slice(0, 4).map((country, i) => (
              <CountryCard key={country.id} country={country} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
