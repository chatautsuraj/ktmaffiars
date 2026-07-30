import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { findAdminUserByEmail, verifyPassword } from "./admin-users";
import type { AdminRole, AdminSession } from "./roles";
import { isAdminRole } from "./roles";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const DEV_SECRET = "ktm-affairs-dev-secret-change-in-production";
const DEV_EMAIL = "editor@ktmaffairs.com";
const DEV_PASSWORD = "ktm-admin-2026";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `${name} is required in production. Set it in the host environment before starting the server.`
    );
  }
  return value;
}

function getSecret() {
  if (isProduction()) return requireEnv("AUTH_SECRET");
  return process.env.AUTH_SECRET?.trim() || DEV_SECRET;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function getAdminCredentials() {
  if (isProduction()) {
    return {
      email: requireEnv("ADMIN_EMAIL"),
      password: requireEnv("ADMIN_PASSWORD"),
    };
  }
  return {
    email: process.env.ADMIN_EMAIL?.trim() || DEV_EMAIL,
    password: process.env.ADMIN_PASSWORD?.trim() || DEV_PASSWORD,
  };
}

export function createSessionToken(session: {
  email: string;
  role: AdminRole;
  userId: string;
}) {
  const payload = JSON.stringify({
    email: session.email,
    role: session.role,
    userId: session.userId,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token?: string | null): AdminSession | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  let expected: string;
  try {
    expected = sign(encoded);
  } catch {
    return null;
  }

  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
    if (!payload.email || !payload.exp || payload.exp < Date.now()) return null;
    // Legacy cookies (pre-RBAC) only had email — treat as bootstrap admin.
    const role: AdminRole = isAdminRole(payload.role) ? payload.role : "admin";
    const userId = typeof payload.userId === "string" && payload.userId ? payload.userId : "bootstrap";
    return { email: payload.email, role, userId };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function clearSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

function safeEqualString(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

function matchesBootstrapCredentials(email: string, password: string): boolean {
  try {
    const creds = getAdminCredentials();
    const emailOk = safeEqualString(email.trim().toLowerCase(), creds.email.toLowerCase());
    const passwordOk = safeEqualString(password, creds.password);
    return emailOk && passwordOk;
  } catch {
    return false;
  }
}

/** @deprecated Prefer authenticateUser — kept for scripts that only check env admin. */
export function validateCredentials(email: string, password: string) {
  return matchesBootstrapCredentials(email, password);
}

/**
 * Authenticate bootstrap env admin or an invited team member.
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<AdminSession | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) return null;

  if (matchesBootstrapCredentials(normalized, password)) {
    return {
      email: getAdminCredentials().email.toLowerCase(),
      role: "admin",
      userId: "bootstrap",
    };
  }

  const user = await findAdminUserByEmail(normalized);
  if (!user || !user.active) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;

  return {
    email: user.email,
    role: user.role,
    userId: user.id,
  };
}
