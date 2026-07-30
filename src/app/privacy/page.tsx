import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "KTM Affairs privacy policy.",
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
        <h1 className="font-serif text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose-editorial text-muted space-y-4">
          <p>
            KTM Affairs respects your privacy. We collect only the information necessary to deliver
            our newsletters, membership services, and editorial content.
          </p>
          <p>
            Email addresses provided for newsletter subscriptions are never sold to third parties.
            You may unsubscribe at any time using the link in any email we send.
          </p>
          <p>
            For questions about this policy, contact{" "}
            <a href="mailto:privacy@ktmaffairs.com" className="text-gold hover:underline">
              privacy@ktmaffairs.com
            </a>
            .
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
