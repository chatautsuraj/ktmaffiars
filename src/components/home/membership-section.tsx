import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Unlimited premium analysis and intelligence reports",
  "Ad-free reading across all devices",
  "Member-only events and roundtables",
  "Full archive access",
];

export function MembershipSection() {
  return (
    <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_50%,_#c9a45a_0%,_transparent_50%)]" />
      <div className="container-editorial relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-gold-light mb-4">Membership</p>
          <h2 className="font-serif text-3xl md:text-[2.5rem] font-bold mb-5 leading-tight">
            KTM Affairs Premium
          </h2>
          <p className="text-white/65 mb-10 leading-relaxed text-[15px] max-w-lg mx-auto">
            Join diplomats, policymakers, and researchers who rely on our analysis.
          </p>
          <p className="font-serif text-5xl md:text-6xl font-bold text-gold-light mb-10">
            $12<span className="text-xl text-white/50 font-sans font-normal">/month</span>
          </p>
          <ul className="text-left max-w-sm mx-auto space-y-3.5 mb-12">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-white/75">
                <Check className="h-4 w-4 text-gold-light shrink-0 mt-1" />
                {b}
              </li>
            ))}
          </ul>
          <Button asChild variant="gold" size="lg">
            <Link href="/membership">Become a Member</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
