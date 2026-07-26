import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-wideish transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-ink-light",
        gold: "bg-gold text-ink hover:bg-gold-light",
        outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
        ghost: "text-ink hover:text-gold",
        link: "text-ink underline-offset-4 hover:underline",
        inverse: "bg-paper text-ink hover:bg-gold hover:text-ink",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[0.65rem]",
        lg: "h-14 px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
