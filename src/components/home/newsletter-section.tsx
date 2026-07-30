"use client";

import { NewsletterForm } from "@/components/shared/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="container-editorial">
        <div className="max-w-2xl mx-auto text-center card-elevated px-8 py-12 md:px-14 md:py-14">
          <div className="gold-rule mx-auto mb-5" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">The Daily Briefing</h2>
          <p className="text-muted mb-8 text-[15px] leading-relaxed max-w-md mx-auto">
            Essential insights on diplomacy and global affairs, delivered each morning to your inbox.
          </p>
          <NewsletterForm variant="inline" className="justify-center" />
        </div>
      </div>
    </section>
  );
}
