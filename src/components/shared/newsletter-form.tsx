"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "default" | "footer" | "inline";
  className?: string;
  /** Defaults to daily-briefing */
  list?: string;
  source?: string;
}

export function NewsletterForm({
  variant = "default",
  className,
  list = "daily-briefing",
  source = "newsletter-form",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          kind: "newsletter",
          listOrPlan: list,
          source,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Could not subscribe. Please try again.");
        return;
      }
      setStatus("success");
      setMessage(data.message || "You are subscribed.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not connect. Please try again.");
    }
  };

  if (status === "success") {
    return <p className={cn("text-sm text-gold", className)}>{message}</p>;
  }

  const error = status === "error" ? <p className="text-sm text-destructive mt-2">{message}</p> : null;
  const busy = status === "loading";

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={busy}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
        <Button type="submit" variant="gold" size="sm" className="w-full" disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {busy ? "Subscribing..." : "Subscribe"}
        </Button>
        {error}
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-2", className)}>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={busy}
            className="flex-1"
          />
          <Button type="submit" variant="gold" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
          </Button>
        </div>
        {error}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4 max-w-md", className)}>
      <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={busy}
      />
      <Button type="submit" variant="gold" className="w-full" disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {busy ? "Subscribing..." : "Subscribe to KTM Affairs"}
      </Button>
      {error}
      <p className="text-xs text-muted">
        Daily briefing on diplomacy, geopolitics, and global affairs. Unsubscribe anytime.
      </p>
    </form>
  );
}
