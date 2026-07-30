import { NextResponse } from "next/server";
import { getSession } from "@/lib/cms/auth";
import { ROLE_LABELS } from "@/lib/cms/roles";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    email: session.email,
    role: session.role,
    userId: session.userId,
    roleLabel: ROLE_LABELS[session.role],
  });
}
