import Link from "next/link";
import { navItems } from "@/lib/navigation";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export function Footer() {
  const footerLinks = [
    { title: "Sections", links: navItems.slice(1, 7).map((i) => ({ label: i.label, href: i.href })) },
    {
      title: "Resources",
      links: [
        { label: "Countries", href: "/countries" },
        { label: "Embassies", href: "/embassies" },
        { label: "Ambassadors", href: "/ambassadors" },
        { label: "Authors", href: "/authors" },
        { label: "Magazine", href: "/magazine" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-white mt-auto border-t-2 border-gold/60">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="font-serif text-3xl font-bold hover:text-gold-light transition-colors">
              KTM Affairs
            </Link>
            <p className="text-white/55 mt-3 mb-5 text-[15px] leading-relaxed max-w-xs">
              Premium international affairs journalism from Kathmandu and beyond.
            </p>
            <p className="text-sm text-white/45 italic">Where Nepal Meets the World.</p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="section-label text-gold-light mb-5">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${index}`}>
                    <Link href={link.href} className="text-[15px] text-white/65 hover:text-gold-light transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4">
            <h3 className="section-label text-gold-light mb-5">Newsletter</h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              The essential daily briefing on diplomacy and global affairs.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/35">
          <p suppressHydrationWarning>© {new Date().getFullYear()} KTM Affairs. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-gold-light transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-light transition-colors">Terms</Link>
            <Link href="/feed.xml" className="hover:text-gold-light transition-colors">RSS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
