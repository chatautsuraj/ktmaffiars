import type { Metadata } from "next";
import { CountryCard } from "@/components/country-card";
import { WorldMap } from "@/components/world-map";
import { COUNTRIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Country Profiles",
  description: "In-depth country profiles with government, economic, and risk data, cross-referenced with our reporting.",
};

export default function CountriesPage() {
  return (
    <div className="container-editorial py-10 sm:py-14">
      <header className="mb-10 max-w-3xl border-b border-hairline pb-8">
        <p className="eyebrow mb-3">Geopolitical Atlas</p>
        <h1 className="font-display text-display-md leading-[1.03] text-ink sm:text-display-lg">Country Profiles</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/60">
          Government, economic, and risk data for every country we cover — continuously updated by our research desk.
        </p>
      </header>

      <div className="mb-14">
        <WorldMap />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COUNTRIES.map((c) => (
          <CountryCard key={c.slug} country={c} />
        ))}
      </div>
    </div>
  );
}
