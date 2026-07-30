#!/usr/bin/env node
/**
 * One-shot bulk import: pull international RSS feeds and create PUBLISHED
 * articles on the live site via the admin API. Autopilot stays halted.
 *
 * Usage:
 *   node scripts/bulk-import-articles.mjs
 *
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD from .env.admin.local or the environment.
 * Optional:
 *   BULK_IMPORT_LIMIT=40
 *   BULK_IMPORT_URL=https://ktm-affairs.vercel.app
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Parser = require("rss-parser");

const ROOT = process.cwd();
const BASE = (process.env.BULK_IMPORT_URL || "https://ktm-affairs.vercel.app").replace(/\/$/, "");
const LIMIT = Math.min(80, Math.max(5, Number(process.env.BULK_IMPORT_LIMIT || 40)));

const FEEDS = [
  { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml", category: "nepal-world" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml", category: "nepal-world" },
  { name: "The Guardian World", url: "https://www.theguardian.com/world/rss", category: "nepal-world" },
  { name: "NPR World", url: "https://feeds.npr.org/1004/rss.xml", category: "foreign-policy" },
  { name: "UN News", url: "https://news.un.org/feed/subscribe/en/news/all/rss.xml", category: "diplomacy" },
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&h=900&fit=crop";

const CATEGORY_KEYWORDS = [
  { slug: "security", words: ["war", "military", "defense", "defence", "attack", "troop", "missile", "conflict", "strike"] },
  { slug: "economy", words: ["economy", "economic", "trade", "market", "inflation", "gdp", "finance", "tariff"] },
  { slug: "climate", words: ["climate", "environment", "emission", "flood", "drought", "carbon", "warming"] },
  { slug: "diplomacy", words: ["diploma", "summit", "embassy", "treaty", "ambassador", "united nations", "un "] },
  { slug: "foreign-policy", words: ["election", "president", "minister", "policy", "government", "sanction"] },
];

function loadEnvFile(file) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, "utf-8").split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    let value = (match[2] || "").trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}

loadEnvFile(".env.admin.local");
loadEnvFile(".env.local");
loadEnvFile(".env");

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function stripHtml(input) {
  return String(input || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(input) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pickCategorySlug(title, summary, feedCategory) {
  const haystack = `${title} ${summary}`.toLowerCase();
  for (const { slug, words } of CATEGORY_KEYWORDS) {
    if (words.some((w) => haystack.includes(w))) return slug;
  }
  return feedCategory || "nepal-world";
}

function extractImage(item) {
  if (item.enclosure?.url) return item.enclosure.url;
  const media = item["media:content"] || item.mediaContent;
  if (media) {
    const arr = Array.isArray(media) ? media : [media];
    for (const m of arr) {
      const url = m?.$?.url || m?.url;
      if (url && /^https?:\/\//.test(url)) return url;
    }
  }
  return undefined;
}

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "KTMAffairs-BulkImport/1.0 (+https://ktmaffairs.com)" },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
    ],
  },
});

async function api(cookieJar, method, urlPath, body) {
  const res = await fetch(`${BASE}${urlPath}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieJar,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const setCookie = res.headers.getSetCookie?.() || [];
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text.slice(0, 200) };
  }
  return { ok: res.ok, status: res.status, data, setCookie };
}

function mergeCookies(existing, setCookie) {
  const map = new Map();
  for (const part of String(existing || "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)) {
    const i = part.indexOf("=");
    if (i > 0) map.set(part.slice(0, i), part.slice(i + 1));
  }
  for (const raw of setCookie) {
    const first = raw.split(";")[0];
    const i = first.indexOf("=");
    if (i > 0) map.set(first.slice(0, i), first.slice(i + 1));
  }
  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function fetchFeedItems(feed) {
  const parsed = await parser.parseURL(feed.url);
  return (parsed.items || [])
    .map((item) => {
      const link = (item.link || "").trim();
      const guid = (item.guid || link || "").trim();
      const title = (item.title || "").trim();
      if (!title || !guid) return null;
      const summary = stripHtml(item.contentSnippet || item.summary || item.content || "");
      return {
        guid,
        title,
        link: link || guid,
        summary,
        imageUrl: extractImage(item),
        isoDate: item.isoDate || item.pubDate,
        feedName: feed.name,
        feedCategory: feed.category,
      };
    })
    .filter(Boolean);
}

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (e.g. in .env.admin.local)");
    process.exit(1);
  }

  console.log(`Target: ${BASE}`);
  console.log(`Limit:  ${LIMIT} published articles`);

  let cookieJar = "";
  const login = await api("", "POST", "/api/admin/auth/login", { email, password });
  cookieJar = mergeCookies(cookieJar, login.setCookie);
  if (!login.ok) {
    console.error("Login failed:", login.status, login.data);
    process.exit(1);
  }
  console.log("Logged in.");

  const [articlesRes, categoriesRes, authorsRes] = await Promise.all([
    api(cookieJar, "GET", "/api/admin/articles"),
    api(cookieJar, "GET", "/api/admin/categories"),
    api(cookieJar, "GET", "/api/admin/authors"),
  ]);
  if (!articlesRes.ok || !categoriesRes.ok || !authorsRes.ok) {
    console.error("Failed to load CMS data", {
      articles: articlesRes.status,
      categories: categoriesRes.status,
      authors: authorsRes.status,
    });
    process.exit(1);
  }

  const existing = Array.isArray(articlesRes.data) ? articlesRes.data : [];
  const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
  const authors = Array.isArray(authorsRes.data) ? authorsRes.data : [];
  if (!categories.length || !authors.length) {
    console.error("Need at least one category and author in the CMS.");
    process.exit(1);
  }

  const author = authors[0];
  const seen = new Set(
    existing
      .flatMap((a) => [a.sourceGuid, a.sourceUrl, a.slug].filter(Boolean))
      .map(String)
  );
  const takenSlugs = new Set(existing.map((a) => a.slug).filter(Boolean));

  const pool = [];
  for (const feed of FEEDS) {
    try {
      const items = await fetchFeedItems(feed);
      console.log(`Fetched ${items.length} from ${feed.name}`);
      pool.push(...items);
    } catch (err) {
      console.warn(`Feed failed (${feed.name}):`, err.message || err);
    }
  }

  // Prefer variety across feeds
  const byFeed = new Map();
  for (const item of pool) {
    const list = byFeed.get(item.feedName) || [];
    list.push(item);
    byFeed.set(item.feedName, list);
  }
  const interleaved = [];
  let added = true;
  while (added) {
    added = false;
    for (const [, list] of byFeed) {
      if (list.length) {
        interleaved.push(list.shift());
        added = true;
      }
    }
  }

  // Build the full batch first, then one atomic write — sequential POSTs race
  // on Vercel Blob and silently overwrite each other.
  const batch = [];
  let skipped = 0;

  for (const item of interleaved) {
    if (batch.length >= LIMIT) break;
    if (seen.has(item.guid) || seen.has(item.link)) {
      skipped += 1;
      continue;
    }

    const catSlug = pickCategorySlug(item.title, item.summary, item.feedCategory);
    const category =
      categories.find((c) => c.slug === catSlug) ||
      categories.find((c) => c.slug === "nepal-world") ||
      categories[0];

    let baseSlug = slugify(item.title) || `story-${Date.now()}`;
    let slug = baseSlug;
    let n = 2;
    while (takenSlugs.has(slug)) {
      slug = `${baseSlug}-${n}`;
      n += 1;
    }

    const excerpt = item.summary
      ? item.summary.slice(0, 280)
      : `Coverage from ${item.feedName}.`;
    const content =
      `<p>${escapeHtml(excerpt)}</p>\n` +
      `<p class="autopilot-attribution"><em>This summary was compiled by KTM Affairs from reporting by ` +
      `${escapeHtml(item.feedName)}. Read the full story at ` +
      `<a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(item.feedName)}</a>.</em></p>`;

    batch.push({
      id: crypto.randomUUID(),
      title: item.title,
      slug,
      excerpt,
      content,
      featuredImage: item.imageUrl || FALLBACK_IMAGE,
      category,
      author,
      publishedAt: item.isoDate ? new Date(item.isoDate).toISOString() : new Date().toISOString(),
      readingTime: Math.max(1, Math.round(excerpt.split(/\s+/).length / 200)),
      tags: [item.feedName, category.name].filter(Boolean),
      status: "published",
      source: "autopilot",
      sourceName: item.feedName,
      sourceUrl: item.link,
      sourceGuid: item.guid,
      isPremium: false,
      isBreaking: false,
      isFeatured: batch.length < 3,
    });

    seen.add(item.guid);
    seen.add(item.link);
    takenSlugs.add(slug);
    console.log(`[prep ${batch.length}/${LIMIT}] ${item.feedName}: ${item.title.slice(0, 70)}`);
  }

  if (batch.length === 0) {
    console.log("\nNothing new to import.");
    console.log(JSON.stringify({ created: 0, skipped, errors: 0, totalNowEstimate: existing.length }, null, 2));
    return;
  }

  console.log(`\nUploading ${batch.length} articles in one atomic write…`);
  const res = await api(cookieJar, "POST", "/api/admin/articles/bulk", { articles: batch });
  if (!res.ok) {
    console.error("Bulk create failed:", res.status, res.data?.error || res.data);
    process.exit(1);
  }

  const created = Number(res.data?.created || 0);
  const serverSkipped = Number(res.data?.skipped || 0);

  // Confirm persistence (Blob can briefly lag on read)
  let totalNow = existing.length + created;
  for (let attempt = 0; attempt < 8; attempt++) {
    await new Promise((r) => setTimeout(r, 800 + attempt * 400));
    const check = await api(cookieJar, "GET", "/api/admin/articles");
    if (check.ok && Array.isArray(check.data)) {
      totalNow = check.data.length;
      const autopilot = check.data.filter((a) => a.source === "autopilot").length;
      console.log(`Verify read #${attempt + 1}: total=${totalNow}, autopilot=${autopilot}`);
      if (totalNow >= existing.length + created - 2) break;
    }
  }

  console.log("\nDone.");
  console.log(
    JSON.stringify(
      {
        created,
        skipped: skipped + serverSkipped,
        errors: 0,
        totalNow,
      },
      null,
      2
    )
  );
  console.log("Autopilot remains halted — this was a one-shot import.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
