# KTM Affairs

A premium international affairs & diplomacy news platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**-style components. Designed to sit alongside The Economist, Financial Times, Bloomberg, and Foreign Policy in editorial polish, with a navy / white / gold palette and an emphasis on typography, whitespace, and restrained motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # eslint
npm run typecheck
```

> **Note on fonts:** the layout uses `next/font/google` (Fraunces, Inter, IBM Plex Mono), which fetches font files at build time. This requires outbound network access to `fonts.googleapis.com` / `fonts.gstatic.com`. If you're building in a fully offline/sandboxed environment, swap the `next/font/google` imports in `app/layout.tsx` for local font files or system fonts.

## Design System

- **Palette:** deep navy (`#0B1E3D`), near-black navy (`#071429`), warm paper white (`#FAF8F3`), brass gold (`#B9922F`) — see `tailwind.config.ts`.
- **Type:** Fraunces (display/serif headlines), Inter (body), IBM Plex Mono (datelines, tickers, labels, UI chrome) — evokes wire-service datelines and terminal-style data readouts.
- **Signature element:** the live **World Clock Strip** + **Global Risk Index** ticker beneath the masthead — a restrained nod to Bloomberg-terminal data density, tied directly to the subject matter (diplomacy runs on time zones and risk indices).

## Architecture

```
app/
  layout.tsx              Root layout: fonts, metadata, header/footer shell
  page.tsx                 Homepage (hero, section rails, world map, CTAs)
  world/                   World News section
  diplomacy/                Diplomacy section
  foreign-policy/           Foreign Policy section
  analysis/                 Analysis section
  opinion/                  Opinion section
  magazine/                 Magazine archive (print issues)
  membership/               Pricing / plans page
  countries/                Country directory
  countries/[slug]/         Dynamic country profile pages
  embassies/                Embassy directory (client-side search/filter)
  article/[slug]/           Premium article template with paywall treatment
  search/                   Full-text search page
  sitemap.ts / robots.ts     SEO
  not-found.tsx              Custom 404

components/
  ui/                       Reusable shadcn-style primitives (Button, Card, Badge, Input, Dialog, Tabs, Accordion, Separator)
  site-header.tsx           Masthead, nav, mobile drawer
  world-clock-strip.tsx      Live capital-city clocks + risk ticker (client component)
  breaking-ticker.tsx        Scrolling breaking-news marquee
  ai-search.tsx              AI research assistant search dialog (placeholder UI, wire up to your LLM backend)
  hero.tsx, article-card.tsx, section-heading.tsx, section-page.tsx
  world-map.tsx              Interactive dot-grid world map with country markers
  country-card.tsx, embassy-directory.tsx, newsletter.tsx, membership-cta.tsx

lib/
  data.ts                    Mock content layer (articles, countries, embassies, ticker data) — swap for a CMS/API
  utils.ts                   cn(), date/reading-time formatters

types/
  index.ts                   Shared TypeScript types
```

## Swapping in real content

All content currently lives in `lib/data.ts` as typed mock data so every page renders end-to-end out of the box. To connect a real backend:

1. Replace the exported constants/functions in `lib/data.ts` (`ARTICLES`, `COUNTRIES`, `EMBASSIES`, `getArticle`, etc.) with calls to your CMS or database (Contentful, Sanity, a headless API, etc.).
2. Keep the return shapes matching `types/index.ts` and every page/component continues to work unchanged.
3. Wire `components/ai-search.tsx` to your LLM/RAG backend (it currently only manages local UI state).
4. Replace `Newsletter`'s local `setSubmitted` stub with a real email-provider call (Mailchimp, ConvertKit, your own API route).

## Accessibility & Performance

- Semantic landmarks, skip-to-content link, visible focus rings (`focus-ring` utility) throughout.
- `prefers-reduced-motion` respected globally in `globals.css`.
- Images use `next/image` with explicit `sizes` for responsive loading.
- Static generation (`generateStaticParams`) for all article and country routes; dynamic metadata per page for SEO/social sharing.
- `sitemap.ts` / `robots.ts` generate a real sitemap and robots file from the same content source as the pages.

## License

Provided as a starting scaffold for your own project — replace placeholder imagery, ambassador/embassy data, and copy before using in production.
