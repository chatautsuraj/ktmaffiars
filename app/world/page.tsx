import type { Metadata } from "next";
import { SectionPage } from "@/components/section-page";
import { getArticlesBySection } from "@/lib/data";

export const metadata: Metadata = {
  title: "World News",
  description: "Breaking world news and on-the-ground reporting from every region, verified by the KTM Affairs desk.",
};

export default function WorldPage() {
  return (
    <SectionPage
      eyebrow="Dispatches"
      title="World News"
      description="Real-time reporting from correspondents across six continents — verified, contextualized, and free of spin."
      articles={getArticlesBySection("world")}
    />
  );
}
