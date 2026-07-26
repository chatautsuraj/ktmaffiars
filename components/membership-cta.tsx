import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MembershipCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 bg-navy-vignette" />
      <div className="container-editorial relative flex flex-col items-center gap-6 py-20 text-center sm:py-28">
        <p className="eyebrow">Membership</p>
        <h2 className="max-w-2xl font-display text-4xl leading-[1.05] sm:text-5xl">
          Unlock every briefing, dispatch, and archive issue.
        </h2>
        <p className="max-w-xl text-paper/60">
          Full access to premium analysis, the quarterly print magazine, member-only briefings, and our complete
          20-year archive — from $18/month.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button variant="gold" size="lg" asChild>
            <Link href="/membership">Become a Member</Link>
          </Button>
          <Button variant="inverse" size="lg" asChild className="border border-paper/20 bg-transparent text-paper hover:bg-paper hover:text-ink">
            <Link href="/membership#compare">Compare Plans</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
