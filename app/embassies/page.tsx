import type { Metadata } from "next";
import { EmbassyDirectory } from "@/components/embassy-directory";

export const metadata: Metadata = {
  title: "Embassy Directory",
  description: "A verified directory of embassies, consulates, and diplomatic missions in Kathmandu and worldwide.",
};

export default function EmbassiesPage() {
  return (
    <div className="container-editorial py-10 sm:py-14">
      <header className="mb-10 max-w-3xl border-b border-hairline pb-8">
        <p className="eyebrow mb-3">Diplomatic Resource</p>
        <h1 className="font-display text-display-md leading-[1.03] text-ink sm:text-display-lg">
          Embassy Directory
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/60">
          Verified contact details for embassies, consulates, and missions — starting with Kathmandu, expanding
          worldwide.
        </p>
      </header>
      <EmbassyDirectory />
    </div>
  );
}
