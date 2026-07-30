import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" | "gold" | "breaking" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-navy text-white",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border text-foreground",
    gold: "text-gold font-semibold tracking-widest uppercase text-[10px]",
    breaking: "bg-destructive text-white rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
  };

  return (
    <div
      ref={ref}
      className={cn("inline-flex items-center", variants[variant], className)}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
