import { NextResponse } from "next/server";
import { isValidCollection } from "@/lib/cms/collections";
import { cmsErrorResponse, cmsWriteBlockedResponse } from "@/lib/cms/http";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";
import { revalidateCollection } from "@/lib/cms/revalidate";
import { ensureSeeded } from "@/lib/cms/seed";
import { deleteItem, getById, updateItem } from "@/lib/cms/store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const gate = await requirePermission("manage_content");
  if (isDenied(gate)) return gate;

  const { collection, id } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  await ensureSeeded();
  const item = await getById(collection, id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_content");
  if (isDenied(gate)) return gate;

  const { collection, id } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    await ensureSeeded();
    const body = await request.json();
    const updated = await updateItem(collection, id, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateCollection(collection);
    return NextResponse.json(updated);
  } catch (error) {
    return cmsErrorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_content");
  if (isDenied(gate)) return gate;

  const { collection, id } = await params;
  if (!isValidCollection(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }

  try {
    await ensureSeeded();
    const deleted = await deleteItem(collection, id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateCollection(collection);
    return NextResponse.json({ success: true });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
