import { NextResponse } from "next/server";
import {
  CMS_READ_ONLY_MESSAGE,
  isCmsWritable,
  isServerlessHost,
} from "@/lib/cms/runtime";

export function cmsWriteBlockedResponse() {
  if (isCmsWritable()) return null;
  return NextResponse.json(
    { error: CMS_READ_ONLY_MESSAGE, readOnly: true },
    { status: 503 }
  );
}

export function cmsErrorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "CMS write failed";
  const readOnly =
    !isCmsWritable() ||
    message.includes("BLOB_READ_WRITE_TOKEN") ||
    message.includes("read-only") ||
    (isServerlessHost() && message.includes("Vercel"));
  return NextResponse.json(
    { error: message, readOnly },
    { status: readOnly ? 503 : 500 }
  );
}
