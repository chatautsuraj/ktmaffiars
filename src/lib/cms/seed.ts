import "server-only";
import fs from "fs/promises";
import path from "path";
import { articles as seedArticles } from "@/data/_seed/articles";
import { categories as seedCategories, authors as seedAuthors } from "@/data/_seed/authors";
import { countries as seedCountries } from "@/data/_seed/countries";
import {
  embassies as seedEmbassies,
  ambassadors as seedAmbassadors,
  organizations as seedOrganizations,
  events as seedEvents,
  podcasts as seedPodcasts,
  videos as seedVideos,
  socialVideos as seedSocialVideos,
  magazineIssues as seedMagazineIssues,
} from "@/data/_seed/content";
import type { Article } from "@/types";
import type { CmsCollection } from "./collections";
import { isCmsWritable } from "./runtime";
import { collectionExists, writeCollection } from "./store";

// Existing/manual articles default to published so the public site is unchanged.
const seededArticles: Article[] = seedArticles.map((a) => ({
  status: "published",
  source: "manual",
  ...a,
}));

const SEED_DATA: Record<CmsCollection, unknown[]> = {
  articles: seededArticles,
  categories: seedCategories,
  authors: seedAuthors,
  countries: seedCountries,
  embassies: seedEmbassies,
  ambassadors: seedAmbassadors,
  organizations: seedOrganizations,
  events: seedEvents,
  podcasts: seedPodcasts,
  videos: seedVideos,
  "social-videos": seedSocialVideos,
  "magazine-issues": seedMagazineIssues,
};

const CONTENT_DIR = path.join(process.cwd(), "content");

async function loadSeedPayload(collection: CmsCollection): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${collection}.json`), "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Fall through to in-code seed.
  }
  return SEED_DATA[collection];
}

let seedPromise: Promise<void> | null = null;

/**
 * Ensure each collection exists. On filesystem (local) or Blob (when writable),
 * missing collections are written once from committed `content/*.json` (preferred)
 * or in-code seed data. On serverless without Blob, skip — content must ship
 * with the deploy.
 */
export async function ensureSeeded() {
  if (!isCmsWritable()) return;

  if (!seedPromise) {
    seedPromise = (async () => {
      const collections = Object.keys(SEED_DATA) as CmsCollection[];
      for (const collection of collections) {
        if (!(await collectionExists(collection))) {
          await writeCollection(collection, await loadSeedPayload(collection));
        }
      }
    })();
  }

  try {
    await seedPromise;
  } catch (error) {
    seedPromise = null;
    throw error;
  }
}
