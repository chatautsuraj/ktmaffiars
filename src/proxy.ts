import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionTokenEdge } from "@/lib/cms/auth-edge";
import { canAccessAdminPath } from "@/lib/cms/roles";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = await verifySessionTokenEdge(request.cookies.get("admin_session")?.value);
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (!canAccessAdminPath(session.role, pathname)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) {
    const session = await verifySessionTokenEdge(request.cookies.get("admin_session")?.value);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!canAccessAdminPath(session.role, pathname)) {
      return NextResponse.json(
        { error: "You do not have permission to perform this action." },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
