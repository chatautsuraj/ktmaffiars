import "server-only";
import type { Country } from "@/types";
import { ensureSeeded } from "@/lib/cms/seed";
import { readCollection } from "@/lib/cms/store";
import { resolveImageUrl, resolveImageUrls } from "@/lib/images";

function normalizeCountry(country: Country): Country {
  return {
    ...country,
    heroImage: resolveImageUrl(country.heroImage),
    gallery: resolveImageUrls(country.gallery),
  };
}

async function loadCountries(): Promise<Country[]> {
  await ensureSeeded();
  return (await readCollection<Country>("countries")).map(normalizeCountry);
}

export async function getCountries(): Promise<Country[]> {
  return loadCountries();
}

export async function getCountryBySlug(slug: string) {
  return (await loadCountries()).find((c) => c.slug === slug);
}
