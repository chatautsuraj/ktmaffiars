import { NextResponse } from "next/server";
import { isValidCollection } from "@/lib/cms/collections";
import { cmsErrorResponse, cmsWriteBlockedResponse } from "@/lib/cms/http";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";
import { revalidateCollection } from "@/lib/cms/revalidate";
import { ensureSeeded } from "@/lib/cms/seed";
import { createItem, readCollection } from "@/lib/cms/store";
import { slugify } from "@/lib/utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const gate = await requirePermission("manage_content");
  if (isDenied(gate)) return gate;

  const { collection } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  await ensureSeeded();
  const items = await readCollection(collection);
  return NextResponse.json(items);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_content");
  if (isDenied(gate)) return gate;

  const { collection } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    await ensureSeeded();
    const body = await request.json();
    const id = body.id || crypto.randomUUID();
    const title = body.title || body.name || "Untitled";
    const slug = body.slug || slugify(title);

    const item = await createItem(collection, { ...body, id, slug });
    revalidateCollection(collection);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
