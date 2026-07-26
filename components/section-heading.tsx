import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  href,
  hrefLabel = "View all",
  className,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex items-end justify-between border-b border-hairline pb-4", className)}>
      <div>
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="link-underline hidden shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wideish text-ink/60 hover:text-ink sm:flex"
        >
          {hrefLabel} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
