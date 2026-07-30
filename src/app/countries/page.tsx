import type { Metadata } from "next";
import { getCountries } from "@/data/countries";
import { CountryCard } from "@/components/cards/country-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Countries",
  description: "Country profiles, Nepal relations, trade data, and diplomatic intelligence.",
};

export default async function CountriesPage() {
  const countries = await getCountries();
  const regions = [...new Set(countries.map((c) => c.region))];

  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Countries" }]} />
        <PageHeader
          title="Countries"
          description="Comprehensive profiles covering diplomacy, trade, embassies, and bilateral relations with Nepal."
        />

        {regions.map((region) => (
          <section key={region} className="mb-12 sm:mb-16">
            <h2 className="font-serif text-xl sm:text-2xl font-bold mb-5 sm:mb-6 pb-2 border-b border-border">
              {region}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {countries.filter((c) => c.region === region).map((country) => (
                <CountryCard key={country.id} country={country} />
              ))}
            </div>
          </section>
        ))}
      </PageShell>
    </PageTransition>
  );
}
