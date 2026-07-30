import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { AUTOPILOT_HALTED_MESSAGE, isAutopilotHalted } from "@/lib/autopilot/halt";
import { runAutopilot } from "@/lib/autopilot/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Scheduled trigger for external schedulers (cron/curl). Protected by CRON_SECRET.
 * Auth accepts either of:
 *   - Header:  x-cron-secret: <secret>
 *   - Header:  Authorization: Bearer <secret>
 */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("x-cron-secret");
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return header === secret || bearer === secret;
}

async function handle(request: NextRequest) {
  if (isAutopilotHalted()) {
    return NextResponse.json({ error: AUTOPILOT_HALTED_MESSAGE, halted: true }, { status: 503 });
  }

  if (!process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured on the server." },
      { status: 500 }
    );
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await runAutopilot();
  if (summary.created > 0) {
    revalidatePath("/admin/articles");
  }
  return NextResponse.json(summary);
}

export async function POST(request: NextRequest) {
  return handle(request);
}

export async function GET(request: NextRequest) {
  return handle(request);
}
