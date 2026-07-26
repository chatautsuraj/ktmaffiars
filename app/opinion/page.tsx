import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { getArticlesBySection } from "@/lib/data";

export const metadata: Metadata = {
  title: "Opinion",
  description: "Independent commentary and argument from diplomats, scholars, and practitioners.",
};

export default function OpinionPage() {
  return (
    <SectionPage
      eyebrow="Perspectives"
      title="Opinion"
      description="Sharp, independent argument from ambassadors, scholars, and policymakers — signed, sourced, and never anonymous."
      articles={getArticlesBySection("opinion")}
    />
  );
}
