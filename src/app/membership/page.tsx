import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { MembershipPlans } from "@/components/membership/membership-plans";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join KTM Affairs Premium for exclusive analysis, research access, and member events.",
};

export default function MembershipPage() {
  return (
    <PageTransition>
      <div className="bg-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-gold text-sm uppercase tracking-widest mb-4">KTM Affairs Premium</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Membership</h1>
          <p className="text-white/70 text-lg">
            Join the global community of readers shaping international affairs discourse.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs items={[{ label: "Membership" }]} />
        <div className="mt-12">
          <Suspense fallback={<p className="text-sm text-muted text-center">Loading plans…</p>}>
            <MembershipPlans />
          </Suspense>
        </div>
      </div>
    </PageTransition>
  );
}
