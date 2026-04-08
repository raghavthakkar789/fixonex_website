"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-display font-semibold transition-all duration-300 ease-[var(--ease-default)] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-red text-white hover:bg-red-dk hover:shadow-red",
        primary: "bg-red text-white hover:bg-red-dk hover:shadow-red",
        secondary: "bg-brand text-white hover:bg-dark",
        outline: "border-2 border-warm bg-transparent text-warm hover:bg-warm hover:text-brand",
        outlineNeutral: "border-2 border-black bg-white text-black hover:bg-light",
        ghost: "group bg-transparent text-red hover:text-red-dk",
        link: "group bg-transparent px-0 text-red hover:text-red-dk",
        dark: "bg-brand text-white hover:bg-dark",
        warm: "bg-warm text-brand hover:bg-[#b5a596]",
      },
      size: {
        default: "px-7 py-3.5 text-[15px]",
        sm: "px-5 py-2.5 text-sm",
        md: "px-7 py-3.5 text-[15px]",
        lg: "px-9 py-[18px] text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
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
    if (asChild) {
      const Comp = Slot;
      return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
    }

    const isGhost = variant === "ghost";
    return (
      <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-flex">
        <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {props.children}
          {isGhost && (
            <span className="absolute bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" aria-hidden />
          )}
        </button>
      </motion.span>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
