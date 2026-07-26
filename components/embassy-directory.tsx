"use client";

import { useMemo, useState } from "react";
import { Search, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EMBASSIES } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function EmbassyDirectory() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | "Embassy" | "Consulate" | "Mission">("All");

  const filtered = useMemo(() => {
    return EMBASSIES.filter((e) => {
      const matchesQuery =
        e.country.toLowerCase().includes(query.toLowerCase()) ||
        e.city.toLowerCase().includes(query.toLowerCase()) ||
        e.ambassador.toLowerCase().includes(query.toLowerCase());
      const matchesType = type === "All" || e.type === type;
      return matchesQuery && matchesType;
    });
  }, [query, type]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 border border-hairline bg-white px-4 focus-within:border-gold">
          <Search className="h-4 w-4 text-ink/40" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by country, city, or ambassador…"
            className="border-none px-0 focus-visible:ring-0"
          />
        </div>
        <div className="flex gap-2">
          {(["All", "Embassy", "Consulate", "Mission"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`focus-ring border px-3 py-2 font-mono text-xs uppercase tracking-wideish transition-colors ${
                type === t ? "border-ink bg-ink text-paper" : "border-hairline text-ink/60 hover:border-gold"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 font-mono text-xs uppercase tracking-wideish text-ink/40">
        {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
      </p>

      <div className="divide-y divide-hairline border-t border-hairline">
        {filtered.map((e) => (
          <div key={`${e.country}-${e.city}`} className="grid gap-4 py-6 sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl text-ink">{e.country}</h3>
                <Badge variant="subtle">{e.type}</Badge>
              </div>
              <p className="mt-1 text-sm text-ink/50">Ambassador {e.ambassador}</p>
            </div>
            <div className="flex items-start gap-2 text-sm text-ink/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {e.address}
            </div>
            <div className="flex items-center gap-2 text-sm text-ink/70">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              {e.phone}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-ink/50">No listings match your search.</p>
        )}
      </div>
    </div>
  );
}
