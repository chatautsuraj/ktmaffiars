import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import fs from "fs";
import path from "path";
import type { AdminRole, PublicAdminUser } from "./roles";
import { isAdminRole } from "./roles";

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export type { PublicAdminUser };

const CONTENT_FILE = path.join(process.cwd(), "content", "admin-users.json");
const BLOB_PATHNAME = "cms/admin-users.json";

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [algo, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  try {
    const computed = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    if (computed.length !== expected.length) return false;
    return timingSafeEqual(computed, expected);
  } catch {
    return false;
  }
}

export function toPublicUser(user: AdminUserRecord): PublicAdminUser {
  const { passwordHash: _passwordHash, ...rest } = user;
  return rest;
}

async function readFromBlob(): Promise<AdminUserRecord[]> {
  const { list } = await import("@vercel/blob");
  const result = await list({ prefix: BLOB_PATHNAME, limit: 10 });
  const match = result.blobs.find((b) => b.pathname === BLOB_PATHNAME);
  if (!match) return [];
  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as AdminUserRecord[];
  return Array.isArray(data) ? data : [];
}

async function writeToBlob(records: AdminUserRecord[]) {
  const { put } = await import("@vercel/blob");
  await put(BLOB_PATHNAME, JSON.stringify(records, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function readFromFs(): AdminUserRecord[] {
  if (!fs.existsSync(CONTENT_FILE)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    return Array.isArray(data) ? (data as AdminUserRecord[]) : [];
  } catch {
    return [];
  }
}

function writeToFs(records: AdminUserRecord[]) {
  fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export async function listAdminUsers(): Promise<AdminUserRecord[]> {
  if (hasBlobToken()) {
    try {
      return await readFromBlob();
    } catch {
      return readFromFs();
    }
  }
  return readFromFs();
}

async function saveAdminUsers(records: AdminUserRecord[]) {
  if (hasBlobToken()) {
    await writeToBlob(records);
    return;
  }
  writeToFs(records);
}

export async function findAdminUserByEmail(email: string): Promise<AdminUserRecord | null> {
  const normalized = normalizeEmail(email);
  const users = await listAdminUsers();
  return users.find((u) => u.email === normalized) || null;
}

export async function findAdminUserById(id: string): Promise<AdminUserRecord | null> {
  const users = await listAdminUsers();
  return users.find((u) => u.id === id) || null;
}

export async function createAdminUser(input: {
  email: string;
  name: string;
  role: AdminRole;
  password: string;
  createdBy?: string;
}): Promise<PublicAdminUser> {
  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (!isAdminRole(input.role)) {
    throw new Error("Invalid role.");
  }
  if (!input.password || input.password.length < 10) {
    throw new Error("Password must be at least 10 characters.");
  }
  if (!input.name.trim()) {
    throw new Error("Name is required.");
  }

  const users = await listAdminUsers();
  if (users.some((u) => u.email === email)) {
    throw new Error("A team member with this email already exists.");
  }

  const now = new Date().toISOString();
  const record: AdminUserRecord = {
    id: crypto.randomUUID(),
    email,
    name: input.name.trim(),
    role: input.role,
    passwordHash: hashPassword(input.password),
    active: true,
    createdAt: now,
    updatedAt: now,
    createdBy: input.createdBy,
  };

  users.push(record);
  await saveAdminUsers(users);
  return toPublicUser(record);
}

export async function updateAdminUser(
  id: string,
  patch: {
    name?: string;
    role?: AdminRole;
    active?: boolean;
    password?: string;
  }
): Promise<PublicAdminUser | null> {
  const users = await listAdminUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index < 0) return null;

  const current = users[index];
  if (patch.role !== undefined && !isAdminRole(patch.role)) {
    throw new Error("Invalid role.");
  }
  if (patch.password !== undefined && patch.password.length < 10) {
    throw new Error("Password must be at least 10 characters.");
  }

  const next: AdminUserRecord = {
    ...current,
    name: patch.name?.trim() || current.name,
    role: patch.role ?? current.role,
    active: patch.active ?? current.active,
    passwordHash: patch.password ? hashPassword(patch.password) : current.passwordHash,
    updatedAt: new Date().toISOString(),
  };

  users[index] = next;
  await saveAdminUsers(users);
  return toPublicUser(next);
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  const users = await listAdminUsers();
  const next = users.filter((u) => u.id !== id);
  if (next.length === users.length) return false;
  await saveAdminUsers(next);
  return true;
}
