"use client";

import { useState } from "react";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { cn } from "@/lib/utils";

const newsletters = [
  {
    id: "daily-briefing",
    title: "The Daily Briefing",
    description: "Essential diplomatic and geopolitical news every morning.",
    frequency: "Daily · Weekdays",
  },
  {
    id: "global-affairs-weekly",
    title: "Global Affairs Weekly",
    description: "Deep analysis and long-form reporting from our editorial team.",
    frequency: "Every Friday",
  },
  {
    id: "himalayan-intelligence",
    title: "Himalayan Intelligence",
    description: "Exclusive coverage of Nepal, South Asia, and mountain geopolitics.",
    frequency: "Bi-weekly",
  },
  {
    id: "embassy-dispatch",
    title: "Embassy Dispatch",
    description: "Diplomatic corps updates, ambassador appointments, and embassy news.",
    frequency: "Monthly",
  },
];

export function NewsletterSubscribePanel() {
  const [selected, setSelected] = useState(newsletters[0].id);
  const active = newsletters.find((n) => n.id === selected) || newsletters[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
      <div>
        <h2 className="font-serif text-2xl font-bold mb-6">Our Briefings</h2>
        <div className="space-y-4">
          {newsletters.map((nl) => {
            const isActive = nl.id === selected;
            return (
              <button
                key={nl.id}
                type="button"
                onClick={() => setSelected(nl.id)}
                className={cn(
                  "w-full text-left p-6 border transition-colors",
                  isActive ? "border-gold bg-gold/5" : "border-border hover:border-gold/40"
                )}
              >
                <h3 className="font-serif text-lg font-semibold">{nl.title}</h3>
                <p className="text-sm text-muted mt-2">{nl.description}</p>
                <p className="text-xs text-gold mt-3 uppercase tracking-wider">{nl.frequency}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-8 border border-border bg-secondary/20 h-fit sticky top-28">
        <h2 className="font-serif text-2xl font-bold mb-2">Subscribe</h2>
        <p className="text-muted text-sm mb-2">
          You are joining <span className="text-foreground font-medium">{active.title}</span>.
        </p>
        <p className="text-muted text-sm mb-6">
          Free briefings for diplomats, policymakers, and global readers.
        </p>
        <NewsletterForm list={selected} source="newsletter-page" />
        <p className="text-xs text-muted mt-4">
          Unsubscribe anytime. We respect your privacy — see our{" "}
          <a href="/privacy" className="text-gold hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
