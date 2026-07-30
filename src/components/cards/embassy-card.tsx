import Link from "next/link";
import type { Embassy } from "@/types";

interface EmbassyCardProps {
  embassy: Embassy;
}

export function EmbassyCard({ embassy }: EmbassyCardProps) {
  return (
    <Link
      href={`/embassy/${embassy.slug}`}
      className="group block card-elevated p-6"
    >
      <p className="section-label mb-2">{embassy.country}</p>
      <h3 className="font-serif text-lg font-semibold group-hover:text-gold transition-colors">
        {embassy.name}
      </h3>
      <p className="text-sm text-muted mt-2">{embassy.address}, {embassy.city}</p>
      <p className="text-xs text-muted mt-3 capitalize">{embassy.type} · Est. {embassy.established}</p>
    </Link>
  );
}
