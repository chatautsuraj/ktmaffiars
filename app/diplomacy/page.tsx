import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { getArticlesBySection } from "@/lib/data";

export const metadata: Metadata = {
  title: "Diplomacy",
  description: "Inside the negotiations, summits, and backchannels shaping the modern diplomatic order.",
};

export default function DiplomacyPage() {
  return (
    <SectionPage
      eyebrow="Statecraft"
      title="Diplomacy"
      description="From closed-door negotiations to public summitry — how states talk to each other, and what it costs when they stop."
      articles={getArticlesBySection("diplomacy")}
    />
  );
}
