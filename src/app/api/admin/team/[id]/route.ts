import { NextResponse } from "next/server";
import { deleteAdminUser, findAdminUserById, updateAdminUser } from "@/lib/cms/admin-users";
import { cmsErrorResponse, cmsWriteBlockedResponse } from "@/lib/cms/http";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";
import { isAdminRole } from "@/lib/cms/roles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_team");
  if (isDenied(gate)) return gate;

  const { id } = await params;

  try {
    const body = await request.json();
    if (body.role !== undefined && !isAdminRole(body.role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }

    // Prevent locking yourself out of admin while editing your own row.
    if (gate.userId === id && body.role && body.role !== "admin") {
      return NextResponse.json(
        { error: "You cannot demote your own account." },
        { status: 400 }
      );
    }
    if (gate.userId === id && body.active === false) {
      return NextResponse.json(
        { error: "You cannot deactivate your own account." },
        { status: 400 }
      );
    }

    const updated = await updateAdminUser(id, {
      name: body.name !== undefined ? String(body.name) : undefined,
      role: body.role,
      active: body.active,
      password: body.password ? String(body.password) : undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return cmsErrorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_team");
  if (isDenied(gate)) return gate;

  const { id } = await params;

  if (gate.userId === id) {
    return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
  }

  const existing = await findAdminUserById(id);
  if (!existing) {
    return NextResponse.json({ error: "Team member not found." }, { status: 404 });
  }

  const deleted = await deleteAdminUser(id);
  if (!deleted) {
    return NextResponse.json({ error: "Team member not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
