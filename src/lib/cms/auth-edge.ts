import type { AdminRole, AdminSession } from "./roles";
import { isAdminRole } from "./roles";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const DEV_SECRET = "ktm-affairs-dev-secret-change-in-production";

function getSecret(): string | null {
  const fromEnv = process.env.AUTH_SECRET?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return null;
  return DEV_SECRET;
}

function toBase64Url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(encoded: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encoded));
  return toBase64Url(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function verifySessionTokenEdge(token?: string | null): Promise<AdminSession | null> {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = await sign(encoded, secret);
  if (!timingSafeEqual(signature, expected)) return null;

  try {
    const json = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json);
    if (!payload.email || !payload.exp || payload.exp < Date.now()) return null;
    const role: AdminRole = isAdminRole(payload.role) ? payload.role : "admin";
    const userId = typeof payload.userId === "string" && payload.userId ? payload.userId : "bootstrap";
    return { email: payload.email, role, userId };
  } catch {
    return null;
  }
}

export { SESSION_MAX_AGE };
