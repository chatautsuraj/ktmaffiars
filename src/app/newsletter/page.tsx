import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { NewsletterSubscribePanel } from "@/components/newsletter/newsletter-subscribe-panel";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to KTM Affairs briefings — daily diplomacy, weekly analysis, and special reports.",
};

export default function NewsletterPage() {
  return (
    <PageTransition>
      <div className="bg-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-gold text-sm uppercase tracking-widest mb-4">Stay Informed</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Newsletter</h1>
          <p className="text-white/70 text-lg">
            Curated intelligence for diplomats, policymakers, and global readers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs items={[{ label: "Newsletter" }]} />
        <NewsletterSubscribePanel />
      </div>
    </PageTransition>
  );
}
