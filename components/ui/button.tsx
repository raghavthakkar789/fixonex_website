"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg font-body font-semibold transition-all duration-300 ease-[var(--ease-default)] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-[0_8px_20px_rgba(211,47,47,0.24)] hover:-translate-y-0.5 hover:bg-red-dk",
        primary: "bg-primary text-white shadow-[0_8px_20px_rgba(211,47,47,0.24)] hover:-translate-y-0.5 hover:bg-red-dk",
        secondary: "border border-[rgba(193,178,164,0.5)] bg-[#f7f4f1] text-[#111111] hover:bg-[#ede5df]",
        outline: "border border-[rgba(193,178,164,0.5)] bg-[#f7f4f1] text-[#111111] hover:bg-[#ede5df]",
        outlineNeutral: "border border-[rgba(193,178,164,0.5)] bg-transparent text-[#111111] hover:bg-[#ede5df]",
        ghost: "group bg-transparent text-[#111111] hover:text-[#3a3a3a]",
        link: "group bg-transparent px-0 text-red hover:text-red-dk",
        dark: "bg-[#3a3a3a] text-white hover:bg-[#2b2b2b]",
        warm: "bg-[#c1b2a4] text-[#111111] hover:bg-[rgb(208,200,193)]",
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
    const reduced = useReducedMotion();
    const x = useSpring(0, { stiffness: 300, damping: 20 });
    const y = useSpring(0, { stiffness: 300, damping: 20 });
    const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
      y.set(((e.clientY - rect.top) / rect.height - 0.5) * 12);
    };

    if (asChild) {
      const Comp = Slot;
      return (
        <motion.span className="inline-flex" style={reduced ? undefined : { x, y }} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
          <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
        </motion.span>
      );
    }

    const isGhost = variant === "ghost";
    return (
      <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-flex" style={reduced ? undefined : { x, y }} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={(e) => {
            const button = e.currentTarget;
            const rect = button.getBoundingClientRect();
            button.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
            button.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
            button.classList.remove("ripple-active");
            requestAnimationFrame(() => button.classList.add("ripple-active"));
            props.onClick?.(e);
          }}
          {...props}
        >
          {props.children}
          <span
            aria-hidden
            className={cn(
              "ripple-dot pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full opacity-0 transition-all duration-500",
              variant === "primary" || variant === "default" ? "bg-white/70" : "bg-warm/70",
              "left-[var(--ripple-x)] top-[var(--ripple-y)]",
            )}
          />
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
