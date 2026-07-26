import Link from "next/link";
import { NAV, SITE } from "@/lib/data";
import { Newsletter } from "@/components/newsletter";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Coverage",
    links: NAV.map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: "Company",
    links: [
      { label: "About KTM Affairs", href: "/about" },
      { label: "Editorial Standards", href: "/standards" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Membership",
    links: [
      { label: "Subscribe", href: "/membership" },
      { label: "Corporate & Institutional", href: "/membership#institutional" },
      { label: "Gift a Subscription", href: "/membership#gift" },
      { label: "Magazine Archive", href: "/magazine" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Cookie Settings", href: "/cookies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-ink-deep text-paper">
      <div className="container-editorial py-16">
        <Newsletter variant="dark" />
      </div>
      <div className="hairline-rule border-paper/10" />
      <div className="container-editorial grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-mono text-[0.65rem] uppercase tracking-widest2 text-gold">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-paper/70 transition-colors hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10">
        <div className="container-editorial flex flex-col items-center justify-between gap-4 py-6 text-xs text-paper/40 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span className="font-mono uppercase tracking-widest2">Kathmandu · London · Washington · Singapore</span>
        </div>
      </div>
    </footer>
  );
}
