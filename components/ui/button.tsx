"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold font-heading tracking-tight transition-[background-color,border-color,box-shadow,color,opacity] duration-150 ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm shadow-black/10 ring-1 ring-inset ring-white/15 hover:bg-primary-hover",
        outline:
          "border-2 border-foreground bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        ghost: "text-foreground underline-offset-4 hover:bg-muted hover:underline",
        link: "font-semibold text-primary underline-offset-4 hover:underline",
        dark: "bg-subhead text-white shadow-sm shadow-black/15 ring-1 ring-inset ring-white/10 hover:opacity-[0.93]",
      },
      size: {
        default: "h-10 px-5 py-2 sm:h-11 sm:px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-11 px-7 text-[0.9375rem] sm:h-12 sm:px-8 sm:text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** Explicit unions — avoids `VariantProps` resolving to `{}` in some TS/IDE setups. */
export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
