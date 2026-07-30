import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import fs from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import { cmsWriteBlockedResponse } from "@/lib/cms/http";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";
import { isBlobConfigured } from "@/lib/cms/runtime";
import {
  IMAGE_MIME_TYPES,
  VIDEO_MIME_TYPES,
  formatBytes,
  maxBytesFor,
  type UploadKind,
} from "@/lib/cms/upload-config";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function isUploadKind(value: unknown): value is UploadKind {
  return value === "image" || value === "video";
}

function sanitizeBaseName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  return (
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "file"
  );
}

export async function POST(request: Request) {
  const blocked = cmsWriteBlockedResponse();
  if (blocked) return blocked;

  const gate = await requirePermission("manage_content");
  if (isDenied(gate)) return gate;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  const file = formData.get("file");
  const kindRaw = formData.get("kind");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!isUploadKind(kindRaw)) {
    return NextResponse.json({ error: "Invalid upload kind" }, { status: 400 });
  }
  const kind: UploadKind = kindRaw;

  const allowed = kind === "video" ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES;
  const extension = allowed[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: `Unsupported file type. Allowed: ${Object.values(allowed).join(", ")}` },
      { status: 400 }
    );
  }

  const maxBytes = maxBytesFor(kind);
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: `File too large. Max size is ${formatBytes(maxBytes)}` },
      { status: 400 }
    );
  }

  const filename = `${Date.now()}-${randomBytes(4).toString("hex")}-${sanitizeBaseName(file.name)}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isBlobConfigured()) {
    const blob = await put(`uploads/${filename}`, buffer, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url }, { status: 201 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
}
