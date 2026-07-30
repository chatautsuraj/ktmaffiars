import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";

export const metadata: Metadata = {
  title: "About",
  description: "About KTM Affairs — premium international affairs journalism from Kathmandu.",
};

const team = [
  {
    name: "Dr. Anisha Sharma",
    role: "Editor-in-Chief",
    bio: "Former diplomat and scholar of South Asian geopolitics.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
  },
  {
    name: "Rajesh Thapa",
    role: "Managing Editor",
    bio: "Award-winning journalist with two decades covering Himalayan affairs.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
  },
  {
    name: "Elena Vasquez",
    role: "International Editor",
    bio: "Previously at Foreign Policy and The Economist covering global security.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "About" }]} />
        <PageHeader
          title="About KTM Affairs"
          description="KTM Affairs is a premium international affairs publication headquartered in Kathmandu, dedicated to illuminating Nepal's place in global diplomacy, geopolitics, and economic policy."
        />

        <p className="text-muted leading-relaxed max-w-3xl mb-16">
          Founded on the belief that mountain nations deserve world-class foreign policy journalism,
          we serve diplomats, policymakers, researchers, business leaders, and curious global citizens
          with rigorous reporting, elegant analysis, and authoritative country intelligence.
        </p>

        <section className="mb-16 py-12 border-y border-border">
          <h2 className="font-serif text-2xl font-bold mb-8 text-center">Editorial Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-40 mx-auto mb-4 overflow-hidden">
                  <ContentImage src={member.image} alt={member.name} fill sizes="128px" />
                </div>
                <h3 className="font-serif text-lg font-semibold">{member.name}</h3>
                <p className="text-gold text-sm">{member.role}</p>
                <p className="text-sm text-muted mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted leading-relaxed italic font-serif text-lg">
            &ldquo;Where Nepal Meets the World&rdquo; — we bridge local expertise with global perspective,
            delivering journalism worthy of the international stage.
          </p>
        </section>
      </PageShell>
    </PageTransition>
  );
}
