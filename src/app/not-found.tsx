import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Latest News", href: "/category/diplomacy" },
  { label: "Countries", href: "/countries" },
  { label: "Search", href: "/search" },
  { label: "About", href: "/about" },
];

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-gold text-sm uppercase tracking-widest mb-4">404</p>
      <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Page Not Found</h1>
      <p className="text-muted max-w-md mx-auto mb-10">
        The page you are looking for may have been moved, archived, or does not exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-navy text-white text-sm uppercase tracking-wider hover:bg-navy/90 transition-colors mb-12"
      >
        Return Home
      </Link>
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-muted hover:text-gold transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
