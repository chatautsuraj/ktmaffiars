import { NextResponse } from "next/server";
import { cmsErrorResponse, cmsWriteBlockedResponse } from "@/lib/cms/http";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";
import { revalidateCollection } from "@/lib/cms/revalidate";
import { ensureSeeded } from "@/lib/cms/seed";
import { readCollection, writeCollection } from "@/lib/cms/store";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Atomic bulk create for articles — one read/modify/write so Vercel Blob
 * eventual consistency cannot drop siblings during rapid sequential POSTs.
 */
export async function POST(request: Request) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_content");
  if (isDenied(gate)) return gate;

  try {
    await ensureSeeded();
    const body = await request.json();
    const incoming = Array.isArray(body?.articles)
      ? body.articles
      : Array.isArray(body)
        ? body
        : null;

    if (!incoming || incoming.length === 0) {
      return NextResponse.json({ error: "Expected { articles: [...] }" }, { status: 400 });
    }

    const existing = await readCollection<Record<string, unknown>>("articles");
    const seen = new Set(
      existing
        .flatMap((a) => [a.id, a.slug, a.sourceGuid, a.sourceUrl].filter(Boolean))
        .map(String)
    );
    const takenSlugs = new Set(existing.map((a) => String(a.slug || "")).filter(Boolean));

    const created: Record<string, unknown>[] = [];
    const skipped: string[] = [];

    for (const raw of incoming) {
      if (!raw || typeof raw !== "object") continue;
      const item = { ...(raw as Record<string, unknown>) };
      const id = String(item.id || crypto.randomUUID());
      const title = String(item.title || item.name || "Untitled");
      let slug = String(item.slug || slugify(title) || `story-${Date.now()}`);
      const sourceGuid = item.sourceGuid ? String(item.sourceGuid) : "";
      const sourceUrl = item.sourceUrl ? String(item.sourceUrl) : "";

      if (
        seen.has(id) ||
        (sourceGuid && seen.has(sourceGuid)) ||
        (sourceUrl && seen.has(sourceUrl))
      ) {
        skipped.push(title);
        continue;
      }

      let n = 2;
      const root = slug;
      while (takenSlugs.has(slug)) {
        slug = `${root}-${n}`;
        n += 1;
      }

      const next = { ...item, id, title, slug };
      created.push(next);
      seen.add(id);
      if (sourceGuid) seen.add(sourceGuid);
      if (sourceUrl) seen.add(sourceUrl);
      takenSlugs.add(slug);
    }

    if (created.length === 0) {
      return NextResponse.json({ created: 0, skipped: skipped.length, articles: [] });
    }

    const merged = [...created, ...existing];
    await writeCollection("articles", merged);
    revalidateCollection("articles");

    return NextResponse.json(
      {
        created: created.length,
        skipped: skipped.length,
        articles: created.map((a) => ({ id: a.id, slug: a.slug, title: a.title })),
      },
      { status: 201 }
    );
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
