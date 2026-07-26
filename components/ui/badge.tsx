import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest2 px-2.5 py-1",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper",
        gold: "bg-gold text-ink",
        outline: "border border-ink/30 text-ink",
        subtle: "bg-paper-dim text-ink/70",
        live: "bg-transparent text-gold before:content-[''] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gold before:animate-pulse",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
