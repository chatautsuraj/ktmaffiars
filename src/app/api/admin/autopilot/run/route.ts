import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { AUTOPILOT_HALTED_MESSAGE, isAutopilotHalted } from "@/lib/autopilot/halt";
import { runAutopilot } from "@/lib/autopilot/pipeline";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Manual "Run now" trigger. Protected by admin auth + manage_settings.
export async function POST() {
  const gate = await requirePermission("manage_settings");
  if (isDenied(gate)) return gate;

  if (isAutopilotHalted()) {
    return NextResponse.json({ error: AUTOPILOT_HALTED_MESSAGE, halted: true }, { status: 503 });
  }

  const summary = await runAutopilot({ force: true });
  if (summary.created > 0) {
    revalidatePath("/admin/articles");
  }
  return NextResponse.json(summary);
}
