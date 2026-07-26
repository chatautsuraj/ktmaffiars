"use client";

import { useEffect, useState } from "react";
import { WORLD_CLOCKS, RISK_TICKER } from "@/lib/data";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return now;
}

const trendIcon = {
  up: <ArrowUpRight className="h-3 w-3" />,
  down: <ArrowDownRight className="h-3 w-3" />,
  flat: <Minus className="h-3 w-3" />,
};

const trendColor = {
  up: "text-emerald-400",
  down: "text-rose-400",
  flat: "text-paper/40",
};

export function WorldClockStrip() {
  const now = useNow();

  return (
    <div className="hidden border-b border-hairline bg-ink font-mono text-paper lg:block">
      <div className="container-editorial flex items-center justify-between py-2 text-[0.7rem] tracking-wide">
        <div className="flex items-center divide-x divide-paper/15">
          {WORLD_CLOCKS.map((c) => (
            <div key={c.city} className="flex items-center gap-2 px-4 first:pl-0">
              <span className="text-paper/50">{c.city}</span>
              <span suppressHydrationWarning className="text-gold">
                {now
                  ? new Intl.DateTimeFormat("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: c.tz,
                    }).format(now)
                  : "--:--"}
              </span>
            </div>
          ))}
        </div>
        <div className="hidden items-center divide-x divide-paper/15 xl:flex">
          {RISK_TICKER.slice(0, 3).map((t) => (
            <div key={t.label} className="flex items-center gap-2 px-4 last:pr-0">
              <span className="text-paper/50">{t.label}</span>
              <span className="text-paper">{t.value}</span>
              <span className={trendColor[t.trend]}>{trendIcon[t.trend]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
