import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description: "Compare KTM Affairs membership plans for individuals, teams, and institutions.",
};

const PLANS = [
  {
    name: "Digital",
    price: "$18",
    cadence: "/ month",
    description: "Full digital access for the independent reader.",
    features: [
      "Unlimited premium articles",
      "Daily Morning Dispatch newsletter",
      "Interactive world map & country profiles",
      "Mobile & tablet reading",
    ],
    cta: "Start Digital",
  },
  {
    name: "Complete",
    price: "$32",
    cadence: "/ month",
    description: "Everything in Digital, plus the quarterly print magazine.",
    features: [
      "Everything in Digital",
      "Quarterly print magazine, delivered worldwide",
      "Full 20-year magazine archive",
      "Member-only briefings & Q&As",
      "Ad-free reading experience",
    ],
    highlight: true,
    cta: "Start Complete",
  },
  {
    name: "Institutional",
    price: "Custom",
    cadence: "",
    description: "Team seats, single sign-on, and briefing access for organizations.",
    features: [
      "Everything in Complete",
      "Unlimited team seats",
      "SSO & centralized billing",
      "Private briefings with our editors",
      "API access to our data desk",
    ],
    cta: "Talk to Sales",
  },
];

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Digital and Complete plans are billed monthly or annually and can be cancelled at any time from your account settings.",
  },
  {
    q: "Do you offer student or academic pricing?",
    a: "Yes — verified students and academic institutions receive 50% off Digital and Complete plans.",
  },
  {
    q: "Is the print magazine available outside major cities?",
    a: "The Complete plan ships the quarterly print magazine to more than 140 countries, including Nepal and the wider Himalayan region.",
  },
];

export default function MembershipPage() {
  return (
    <div>
      <div className="border-b border-hairline bg-ink text-paper">
        <div className="container-editorial py-16 text-center sm:py-20">
          <p className="eyebrow">Membership</p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-[1.05] sm:text-5xl">
            Independent journalism, built for decision-makers.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-paper/60">
            Choose the plan that matches how you engage with the world — as a reader, a team, or an institution.
          </p>
        </div>
      </div>

      <div id="compare" className="container-editorial py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col border p-8",
                plan.highlight ? "border-gold bg-paper-dim shadow-lg" : "border-hairline"
              )}
            >
              {plan.highlight && (
                <span className="mb-4 w-fit bg-gold px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest2 text-ink">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl text-ink">{plan.name}</h3>
              <p className="mt-2 text-sm text-ink/60">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl text-ink">{plan.price}</span>
                <span className="text-sm text-ink/50">{plan.cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlight ? "gold" : "outline"} className="mt-8">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline bg-paper-dim">
        <div className="container-editorial max-w-3xl py-14 sm:py-20">
          <h2 className="mb-8 font-display text-3xl text-ink">Frequently Asked</h2>
          <div className="divide-y divide-hairline">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="font-display text-xl text-ink">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
