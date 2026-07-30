"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PlanId = "reader" | "professional" | "institutional";

const plans: Array<{
  id: PlanId;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}> = [
  {
    id: "reader",
    name: "Reader",
    price: "Free",
    period: "",
    description: "Essential access to public journalism",
    features: ["Daily news coverage", "Newsletter subscriptions", "Limited article archive"],
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$12",
    period: "/month",
    description: "For diplomats, analysts, and researchers",
    features: [
      "Unlimited article access",
      "Premium analysis & intelligence",
      "Country & embassy profiles",
      "Member comments & discussions",
      "Monthly research briefings",
      "Ad-free reading experience",
    ],
    highlighted: true,
  },
  {
    id: "institutional",
    name: "Institutional",
    price: "Custom",
    period: "",
    description: "For embassies, think tanks, and organizations",
    features: [
      "Everything in Professional",
      "Multi-seat licensing",
      "API access to research data",
      "Custom briefings",
      "Event sponsorship opportunities",
      "Dedicated account manager",
    ],
    highlighted: false,
  },
];

export function MembershipPlans() {
  const searchParams = useSearchParams();
  const checkoutStatus = searchParams.get("status");

  const [activePlan, setActivePlan] = useState<PlanId | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const banner = useMemo(() => {
    if (checkoutStatus === "success") {
      return "Payment received — welcome to KTM Affairs Professional. Check your email for next steps.";
    }
    if (checkoutStatus === "cancelled") {
      return "Checkout cancelled. You can subscribe anytime.";
    }
    return "";
  }, [checkoutStatus]);

  const startProfessional = async () => {
    setBusy(true);
    setError("");
    setMessage("");

    try {
      const checkout = await fetch("/api/membership/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined }),
      });
      const checkoutData = (await checkout.json().catch(() => ({}))) as {
        url?: string;
        stripeConfigured?: boolean;
        error?: string;
      };

      if (checkout.ok && checkoutData.url) {
        window.location.href = checkoutData.url;
        return;
      }

      // Stripe not configured — capture interest / waitlist
      if (!email) {
        setActivePlan("professional");
        setBusy(false);
        setError("Enter your email to join the Professional waitlist.");
        return;
      }

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          kind: "membership",
          listOrPlan: "professional",
          source: "membership-page",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Could not submit your request.");
        setBusy(false);
        return;
      }
      setMessage(data.message || "Thanks — we will follow up by email.");
      setActivePlan(null);
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const submitInstitutional = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          organization: organization || undefined,
          kind: "membership",
          listOrPlan: "institutional",
          source: "membership-page",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Could not submit your request.");
        return;
      }
      setMessage(data.message || "Thanks — our team will contact you.");
      setActivePlan(null);
      setEmail("");
      setName("");
      setOrganization("");
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {banner ? (
        <p className="mb-8 text-sm text-center text-gold border border-gold/30 bg-gold/5 px-4 py-3">
          {banner}
        </p>
      ) : null}
      {message ? (
        <p className="mb-8 text-sm text-center text-gold border border-gold/30 bg-gold/5 px-4 py-3">
          {message}
        </p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-8 border flex flex-col ${
              plan.highlighted
                ? "border-gold bg-navy text-white shadow-xl md:scale-[1.02]"
                : "border-border bg-background"
            }`}
          >
            {plan.highlighted ? (
              <span className="text-xs text-gold uppercase tracking-widest mb-4">Most Popular</span>
            ) : null}
            <h2 className="font-serif text-2xl font-bold">{plan.name}</h2>
            <p className={`text-sm mt-2 ${plan.highlighted ? "text-white/70" : "text-muted"}`}>
              {plan.description}
            </p>
            <div className="my-6">
              <span className="font-serif text-4xl font-bold">{plan.price}</span>
              <span className={plan.highlighted ? "text-white/60" : "text-muted"}>{plan.period}</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
                  <span className={plan.highlighted ? "text-white/90" : ""}>{feature}</span>
                </li>
              ))}
            </ul>

            {plan.id === "reader" ? (
              <Button asChild variant="outline" className="w-full">
                <Link href="/newsletter">Get the free newsletter</Link>
              </Button>
            ) : null}

            {plan.id === "professional" ? (
              <div className="space-y-3">
                {(activePlan === "professional" || email) && (
                  <Input
                    type="email"
                    placeholder="Email for membership"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={plan.highlighted ? "bg-white/10 border-white/20 text-white placeholder:text-white/40" : ""}
                    required
                  />
                )}
                <Button
                  type="button"
                  variant="gold"
                  className="w-full"
                  disabled={busy}
                  onClick={() => {
                    if (!email && activePlan !== "professional") {
                      setActivePlan("professional");
                      return;
                    }
                    void startProfessional();
                  }}
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {busy ? "Please wait..." : "Subscribe"}
                </Button>
              </div>
            ) : null}

            {plan.id === "institutional" ? (
              activePlan === "institutional" ? (
                <form onSubmit={submitInstitutional} className="space-y-3">
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                  <Button type="submit" variant="outline" className="w-full" disabled={busy}>
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {busy ? "Sending..." : "Request a quote"}
                  </Button>
                  <button
                    type="button"
                    className="text-xs text-muted underline w-full"
                    onClick={() => setActivePlan(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setActivePlan("institutional")}
                >
                  Contact Sales
                </Button>
              )
            ) : null}
          </div>
        ))}
      </div>

      {error ? <p className="mt-6 text-sm text-center text-destructive">{error}</p> : null}

      <p className="mt-10 text-center text-sm text-muted max-w-xl mx-auto">
        Professional subscriptions process via Stripe when configured. Until then, we collect your
        request and follow up by email. Institutional plans are quoted manually.
      </p>
    </div>
  );
}
