import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "KTM Affairs terms of use.",
};

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <Breadcrumbs items={[{ label: "Terms of Use" }]} />
        <h1 className="font-serif text-4xl font-bold mb-6">Terms of Use</h1>
        <div className="prose-editorial text-muted space-y-4">
          <p>
            By accessing KTM Affairs, you agree to use our content for personal, non-commercial
            purposes unless you hold a valid membership or license agreement.
          </p>
          <p>
            Premium articles, intelligence reports, and member-only features require an active
            subscription. Redistribution of our journalism without permission is prohibited.
          </p>
          <p>
            For licensing inquiries, contact{" "}
            <a href="mailto:editorial@ktmaffairs.com" className="text-gold hover:underline">
              editorial@ktmaffairs.com
            </a>
            .
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
