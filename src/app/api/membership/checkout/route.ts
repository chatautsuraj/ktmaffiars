import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Optional Stripe Checkout for Professional membership.
 * If STRIPE_SECRET_KEY + STRIPE_PRICE_ID are unset, the membership UI
 * falls back to the interest waitlist via /api/subscribe.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  const priceId = process.env.STRIPE_PRICE_ID?.trim();

  if (!secret || !priceId) {
    return NextResponse.json(
      {
        error: "Stripe is not configured. Use the membership waitlist instead.",
        stripeConfigured: false,
      },
      { status: 503 }
    );
  }

  let body: { email?: string; successUrl?: string; cancelUrl?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const successUrl = body.successUrl || `${origin}/membership?status=success`;
  const cancelUrl = body.cancelUrl || `${origin}/membership?status=cancelled`;

  const params = new URLSearchParams();
  params.set("mode", "subscription");
  params.set("success_url", successUrl);
  params.set("cancel_url", cancelUrl);
  params.set("line_items[0][price]", priceId);
  params.set("line_items[0][quantity]", "1");
  if (body.email) params.set("customer_email", body.email);
  params.set("allow_promotion_codes", "true");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !data.url) {
    return NextResponse.json(
      { error: data.error?.message || "Could not start Stripe Checkout." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: data.url, id: data.id });
}
