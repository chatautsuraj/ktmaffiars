"use client";

import { useState } from "react";
import Link from "next/link";
import { COUNTRIES } from "@/lib/data";
import { cn } from "@/lib/utils";

const riskColor: Record<string, string> = {
  Low: "bg-emerald-400",
  Guarded: "bg-gold",
  Elevated: "bg-amber-500",
  High: "bg-rose-500",
};

/** A stylised dot-grid world silhouette used purely as decorative texture behind the markers. */
function DotGrid() {
  const cols = 60;
  const rows = 30;
  const dots = [];
  // A very rough land-mass mask so the dot field reads as "world map" rather than noise.
  const mask = (x: number, y: number) => {
    const bands = [
      { yMin: 4, yMax: 11, xMin: 8, xMax: 30 }, // N. America
      { yMin: 12, yMax: 20, xMin: 14, xMax: 24 }, // S. America
      { yMin: 4, yMax: 10, xMin: 33, xMax: 50 }, // Europe
      { yMin: 10, yMax: 20, xMin: 35, xMax: 50 }, // Africa
      { yMin: 4, yMax: 16, xMin: 50, xMax: 80 }, // Asia
      { yMin: 22, yMax: 27, xMin: 70, xMax: 82 }, // Australia
    ];
    return bands.some((b) => x >= b.xMin && x <= b.xMax && y >= b.yMin && y <= b.yMax);
  };
  // Deterministic pseudo-random thinning (seeded by index) so server and client render identically.
  const pseudoRandom = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mask(c, r) && pseudoRandom(r * cols + c) > 0.35) {
        dots.push({ x: (c / cols) * 100, y: (r / rows) * 100 });
      }
    }
  }
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={0.28} className="fill-paper/15" />
      ))}
    </svg>
  );
}

export function WorldMap() {
  const [active, setActive] = useState<string | null>(null);
  const activeCountry = COUNTRIES.find((c) => c.slug === active);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink sm:aspect-[2/1]">
      <DotGrid />
      {COUNTRIES.map((country) => (
        <button
          key={country.slug}
          onMouseEnter={() => setActive(country.slug)}
          onMouseLeave={() => setActive((a) => (a === country.slug ? null : a))}
          onFocus={() => setActive(country.slug)}
          className="focus-ring group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${country.coordinates.x}%`, top: `${country.coordinates.y}%` }}
          aria-label={`View ${country.name} country profile`}
        >
          <span
            className={cn(
              "block h-2.5 w-2.5 rounded-full ring-2 ring-ink transition-transform group-hover:scale-150",
              riskColor[country.riskLevel]
            )}
          />
          <span className="absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-wideish text-paper/70 group-hover:block">
            {country.name}
          </span>
        </button>
      ))}

      {activeCountry && (
        <div className="absolute bottom-4 left-4 right-4 flex flex-col justify-between gap-3 border border-paper/15 bg-ink-deep/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:p-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest2 text-gold">
              <span>{activeCountry.flagEmoji}</span>
              {activeCountry.region}
              <span
                className={cn(
                  "ml-2 rounded-full px-2 py-0.5 text-[0.6rem] text-ink",
                  riskColor[activeCountry.riskLevel]
                )}
              >
                {activeCountry.riskLevel} risk
              </span>
            </div>
            <h4 className="mt-1 font-display text-xl text-paper">{activeCountry.name}</h4>
            <p className="mt-1 max-w-lg text-xs text-paper/60 line-clamp-2 sm:text-sm">{activeCountry.summary}</p>
          </div>
          <Link
            href={`/countries/${activeCountry.slug}`}
            className="focus-ring shrink-0 border border-gold px-4 py-2 text-center font-mono text-xs uppercase tracking-wideish text-gold hover:bg-gold hover:text-ink"
          >
            Full Profile
          </Link>
        </div>
      )}

      {!activeCountry && (
        <div className="absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-widest2 text-paper/40">
          Hover a marker to preview a country profile
        </div>
      )}
    </div>
  );
}
