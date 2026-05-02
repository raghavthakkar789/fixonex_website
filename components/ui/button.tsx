"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-primary bg-primary text-white hover:bg-primary-hover",
        primary: "border border-primary bg-primary text-white hover:bg-primary-hover",
        secondary: "border border-border-strong bg-white text-foreground hover:bg-muted",
        outline: "border border-border-strong bg-transparent text-foreground hover:bg-muted",
        dark: "border border-[#2b2b2b] bg-[#2b2b2b] text-white hover:bg-black",
        warm: "border border-terracotta bg-terracotta text-white hover:bg-terracotta-dark",
        ghost: "text-foreground hover:bg-muted",
        link: "h-auto p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
