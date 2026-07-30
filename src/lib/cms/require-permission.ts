import { NextResponse } from "next/server";
import { getSession } from "@/lib/cms/auth";
import type { AdminPermission, AdminSession } from "@/lib/cms/roles";
import { hasPermission } from "@/lib/cms/roles";

export async function requireSession(): Promise<AdminSession | NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}

export async function requirePermission(
  permission: AdminPermission
): Promise<AdminSession | NextResponse> {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  if (!hasPermission(session.role, permission)) {
    return NextResponse.json(
      { error: "You do not have permission to perform this action." },
      { status: 403 }
    );
  }
  return session;
}

export function isDenied(result: AdminSession | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}
