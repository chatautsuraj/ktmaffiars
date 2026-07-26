import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { getArticlesBySection } from "@/lib/data";

export const metadata: Metadata = {
  title: "Foreign Policy",
  description: "Strategy, doctrine, and the long arc of national interest — how governments decide, and why.",
};

export default function ForeignPolicyPage() {
  return (
    <SectionPage
      eyebrow="Strategy"
      title="Foreign Policy"
      description="The doctrines, alliances, and strategic bets that define how nations project power and pursue interest."
      articles={getArticlesBySection("foreign-policy")}
    />
  );
}
