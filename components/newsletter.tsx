"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Newsletter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dark = variant === "dark";

  return (
    <div
      className={cn(
        "grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center",
        dark ? "text-paper" : "border border-hairline bg-paper-dim p-8 sm:p-12"
      )}
    >
      <div>
        <p className="eyebrow mb-3">The Morning Dispatch</p>
        <h3 className={cn("font-display text-3xl sm:text-4xl", dark ? "text-paper" : "text-ink")}>
          Diplomacy, decoded. Delivered daily.
        </h3>
        <p className={cn("mt-3 max-w-md text-sm", dark ? "text-paper/60" : "text-ink/60")}>
          Join 240,000 policymakers, diplomats, and global executives who start their morning with KTM Affairs.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        {submitted ? (
          <p className={cn("py-3 text-sm", dark ? "text-gold" : "text-ink")}>
            You&apos;re confirmed. Welcome to the Dispatch.
          </p>
        ) : (
          <>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.com"
              className={cn(dark && "border-paper/20 bg-transparent text-paper placeholder:text-paper/40")}
            />
            <Button type="submit" variant="gold" className="shrink-0">
              Sign Up <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
