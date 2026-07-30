import { NextResponse } from "next/server";
import { authenticateUser, createSessionToken, sessionCookieOptions } from "@/lib/cms/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await authenticateUser(email, password);
    if (!session) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createSessionToken(session);
    const cookie = sessionCookieOptions(token);
    const response = NextResponse.json({
      success: true,
      email: session.email,
      role: session.role,
    });
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      path: cookie.path,
      maxAge: cookie.maxAge,
    });
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication is not configured on this server.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
