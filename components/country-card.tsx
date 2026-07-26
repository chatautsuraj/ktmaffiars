import Link from "next/link";
import type { Country } from "@/types";
import { cn } from "@/lib/utils";

const riskStyle: Record<Country["riskLevel"], string> = {
  Low: "text-emerald-600 border-emerald-600/30",
  Guarded: "text-gold border-gold/40",
  Elevated: "text-amber-600 border-amber-600/30",
  High: "text-rose-600 border-rose-600/30",
};

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="focus-ring group flex flex-col justify-between border border-hairline p-6 transition-colors hover:border-gold"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-3xl">{country.flagEmoji}</span>
          <span
            className={cn(
              "border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wideish",
              riskStyle[country.riskLevel]
            )}
          >
            {country.riskLevel}
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl text-ink transition-colors group-hover:text-gold">
          {country.name}
        </h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-wideish text-ink/40">{country.region}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{country.summary}</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-hairline pt-4 text-xs">
        <div>
          <p className="text-ink/40">Capital</p>
          <p className="mt-0.5 font-medium text-ink">{country.capital}</p>
        </div>
        <div>
          <p className="text-ink/40">GDP</p>
          <p className="mt-0.5 font-medium text-ink">{country.gdp}</p>
        </div>
      </div>
    </Link>
  );
}
