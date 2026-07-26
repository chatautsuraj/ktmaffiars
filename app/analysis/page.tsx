import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { getArticlesBySection } from "@/lib/data";

export const metadata: Metadata = {
  title: "Analysis",
  description: "Rigorous, long-form analysis of the forces reshaping the global order.",
};

export default function AnalysisPage() {
  return (
    <SectionPage
      eyebrow="Long-Form"
      title="Analysis"
      description="Deep, structural reporting on the economic, security, and technological currents beneath the daily headlines."
      articles={getArticlesBySection("analysis")}
    />
  );
}
