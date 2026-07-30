import { NextResponse } from "next/server";
import { addSubscriber, type SubscriptionKind } from "@/lib/subscribers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isKind(value: unknown): value is SubscriptionKind {
  return value === "newsletter" || value === "membership";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  const kind = isKind(body.kind) ? body.kind : "newsletter";
  const listOrPlan =
    typeof body.listOrPlan === "string"
      ? body.listOrPlan
      : kind === "membership"
        ? "professional"
        : "daily-briefing";
  const name = typeof body.name === "string" ? body.name : undefined;
  const organization = typeof body.organization === "string" ? body.organization : undefined;
  const source = typeof body.source === "string" ? body.source : undefined;

  try {
    const { record, created } = await addSubscriber({
      email,
      kind,
      listOrPlan,
      name,
      organization,
      source,
    });

    return NextResponse.json({
      success: true,
      created,
      message: created
        ? kind === "membership"
          ? "Thanks — your membership request is in. We will follow up by email."
          : "You are subscribed. Welcome to KTM Affairs."
        : "You are already on this list.",
      id: record.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not complete subscription.";
    const status = message.includes("valid email") ? 400 : 503;
    return NextResponse.json({ error: message }, { status });
  }
}
