import { NextResponse } from "next/server";
import {
  createAdminUser,
  listAdminUsers,
  toPublicUser,
} from "@/lib/cms/admin-users";
import { cmsErrorResponse, cmsWriteBlockedResponse } from "@/lib/cms/http";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";
import { ADMIN_ROLES, isAdminRole } from "@/lib/cms/roles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const gate = await requirePermission("manage_team");
  if (isDenied(gate)) return gate;

  const users = await listAdminUsers();
  return NextResponse.json(users.map(toPublicUser));
}

export async function POST(request: Request) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_team");
  if (isDenied(gate)) return gate;

  try {
    const body = await request.json();
    const role = body.role;
    if (!isAdminRole(role) || !ADMIN_ROLES.includes(role)) {
      return NextResponse.json({ error: "Role must be admin, manager, or editor." }, { status: 400 });
    }

    const user = await createAdminUser({
      email: String(body.email || ""),
      name: String(body.name || ""),
      role,
      password: String(body.password || ""),
      createdBy: gate.email,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return cmsErrorResponse(error);
  }
}
