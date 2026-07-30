"use client";

import Link from "next/link";
import type { Ambassador } from "@/types";
import { ContentImage } from "@/components/ui/content-image";

export function AmbassadorCard({ ambassador }: { ambassador: Ambassador }) {
  return (
    <Link
      href={`/ambassador/${ambassador.slug}`}
      className="group block card-elevated p-5 sm:p-6"
    >
      <div className="relative w-full aspect-[3/4] max-w-[120px] overflow-hidden rounded-sm mb-4 bg-light-gray">
        <ContentImage src={ambassador.photo} alt={ambassador.name} fill sizes="120px" />
      </div>
      <p className="section-label mb-1.5">{ambassador.country}</p>
      <h2 className="font-serif text-lg sm:text-xl font-bold group-hover:text-gold transition-colors">
        {ambassador.name}
      </h2>
      <p className="text-sm text-muted mt-2 line-clamp-2">{ambassador.title}</p>
    </Link>
  );
}
