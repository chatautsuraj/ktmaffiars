import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { getEvents } from "@/data/content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { ContentImage } from "@/components/ui/content-image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Diplomatic summits, forums, and workshops hosted and covered by KTM Affairs.",
};

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Events" }]} />
        <PageHeader
          title="Events"
          description="Conferences, summits, and diplomatic gatherings shaping international affairs."
        />

        <div className="space-y-8">
          {events.map((event) => (
            <article
              key={event.id}
              id={event.slug}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-border overflow-hidden hover:border-gold/50 transition-colors"
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[200px]">
                <ContentImage src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, 400px" />
              </div>
              <div className="md:col-span-2 p-6 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant="gold">{event.type}</Badge>
                  {event.isVirtual && <Badge variant="secondary">Virtual</Badge>}
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2">{event.title}</h2>
                <p className="text-muted text-sm mb-4">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gold" />
                    {formatDate(event.date)}
                    {event.endDate && ` – ${formatDate(event.endDate)}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gold" />
                    {event.location}
                  </span>
                </div>
                {event.registrationUrl && (
                  <Link href={event.registrationUrl} className="text-gold text-sm mt-4 hover:underline inline-block">
                    Register →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </PageShell>
    </PageTransition>
  );
}
