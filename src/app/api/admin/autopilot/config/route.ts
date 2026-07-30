import { NextResponse } from "next/server";
import { getAutopilotConfig, saveAutopilotConfig } from "@/lib/autopilot/config";
import { AUTOPILOT_HALTED_MESSAGE, isAutopilotHalted } from "@/lib/autopilot/halt";
import { isAIConfigured, aiModelLabel } from "@/lib/autopilot/summarize";
import type { AutopilotConfig } from "@/lib/autopilot/types";
import { isDenied, requirePermission } from "@/lib/cms/require-permission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const gate = await requirePermission("manage_settings");
  if (isDenied(gate)) return gate;

  return NextResponse.json({
    config: getAutopilotConfig(),
    halted: isAutopilotHalted(),
    ai: { configured: isAIConfigured(), model: aiModelLabel() },
  });
}

export async function PUT(request: Request) {
  const gate = await requirePermission("manage_settings");
  if (isDenied(gate)) return gate;

  if (isAutopilotHalted()) {
    return NextResponse.json({ error: AUTOPILOT_HALTED_MESSAGE, halted: true }, { status: 503 });
  }

  const body = (await request.json()) as AutopilotConfig;
  const saved = saveAutopilotConfig(body);
  return NextResponse.json({ config: saved });
}
