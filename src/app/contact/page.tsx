import type { Metadata } from "next";
import { MapPin, Mail, Phone } from "lucide-react";
import { PageHeader, PageShell } from "@/components/layout/page-shell";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KTM Affairs — editorial inquiries, partnerships, and membership.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageShell>
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          <div>
            <PageHeader
              title="Contact Us"
              description="For editorial inquiries, partnership opportunities, institutional membership, or press requests, reach out to our team."
            />

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-sm text-muted">Durbar Marg, Kathmandu 44600, Nepal</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a href="mailto:editorial@ktmaffairs.com" className="hover:text-gold transition-colors">
                  editorial@ktmaffairs.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <span className="text-muted">+977-1-4440000</span>
              </li>
            </ul>
          </div>

          <form className="p-8 border border-border bg-secondary/20 space-y-4">
            <h2 className="font-serif text-xl font-bold mb-2">Send a Message</h2>
            <p className="text-sm text-muted">
              This form is a preview. For now, email{" "}
              <a href="mailto:editorial@ktmaffairs.com" className="text-gold hover:underline">
                editorial@ktmaffairs.com
              </a>{" "}
              directly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="First name" disabled />
              <Input placeholder="Last name" disabled />
            </div>
            <Input type="email" placeholder="Email address" disabled />
            <Input placeholder="Subject" disabled />
            <textarea
              placeholder="Your message"
              disabled
              rows={5}
              className="flex w-full border border-border bg-background px-3 py-2 text-sm opacity-60"
            />
            <Button type="button" variant="default" className="w-full" disabled>
              Form coming soon
            </Button>
          </form>
        </div>
      </PageShell>
    </PageTransition>
  );
}
