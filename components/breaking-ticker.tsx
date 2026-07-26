import { BREAKING_HEADLINES } from "@/lib/data";

export function BreakingTicker() {
  const items = [...BREAKING_HEADLINES, ...BREAKING_HEADLINES];
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-ink-deep text-paper">
      <div className="flex items-center">
        <div className="z-10 flex shrink-0 items-center gap-2 bg-gold px-4 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-widest2 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
          Breaking
        </div>
        <div className="group flex overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-10 py-2 pl-8 group-hover:[animation-play-state:paused]">
            {items.map((headline, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap text-xs tracking-wide text-paper/90">
                {headline}
                <span className="text-gold">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
