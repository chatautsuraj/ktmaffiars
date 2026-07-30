"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContentImage } from "@/components/ui/content-image";
import type { Country } from "@/types";

interface CountrySpotlightProps {
  country: Country;
}

export function CountrySpotlight({ country }: CountrySpotlightProps) {
  return (
    <section className="relative py-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] order-2 lg:order-1">
          <ContentImage
            src={country.heroImage}
            alt={country.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-navy/20 lg:bg-transparent" />
        </div>

        <div className="relative bg-navy text-white p-10 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
          <div className="absolute inset-0 pattern-dots pointer-events-none" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold via-gold-light to-transparent" />

          <div className="relative">
            <span className="editorial-caps text-gold-light mb-4 block">Country Spotlight</span>
            <span className="text-5xl mb-5 block">{country.flag}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight">{country.name}</h2>
            <p className="text-white/70 leading-relaxed mb-8 line-clamp-4 text-lg">{country.overview}</p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {country.stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold pl-5">
                  <p className="editorial-caps text-white/45 text-[10px] mb-1">{stat.label}</p>
                  <p className="font-serif text-2xl md:text-3xl font-bold text-gold-light">{stat.value}</p>
                </div>
              ))}
            </div>

            <Link
              href={`/country/${country.slug}`}
              className="inline-flex items-center gap-2 editorial-caps text-gold-light hover:text-white transition-colors group"
            >
              Explore Full Profile
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorldRegionsSection({ countries }: { countries: Country[] }) {
  const regions = [...new Set(countries.map((c) => c.region))];

  return (
    <section className="py-14 md:py-20 border-y border-border">
      <div className="container-editorial">
        <div className="flex items-end justify-between mb-10 pb-5 border-b border-border/80">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="gold-line-long" />
              <span className="editorial-caps text-gold">Regions</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">World Regions</h2>
            <p className="text-muted mt-2 text-sm">Explore coverage by geographic region</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, i) => {
            const regionCountries = countries.filter((c) => c.region === region);
            return (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group border border-border bg-card p-6 hover:border-gold/40 hover:shadow-[var(--shadow-editorial)] transition-all duration-400"
              >
                <h3 className="font-serif text-xl font-bold mb-5 pb-3 border-b border-border/60 group-hover:text-gold transition-colors">
                  {region}
                </h3>
                <ul className="space-y-3">
                  {regionCountries.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/country/${c.slug}`}
                        className="text-sm text-muted hover:text-gold transition-colors flex items-center gap-2.5"
                      >
                        <span className="text-lg">{c.flag}</span>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/search?region=${encodeURIComponent(region)}`}
                  className="inline-block mt-5 editorial-caps text-gold text-[10px] hover:underline"
                >
                  View Coverage →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
