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
        default:
          "bg-primary text-white shadow-[0_8px_22px_rgba(211,47,47,0.28)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-red-dk hover:shadow-[0_14px_32px_rgba(211,47,47,0.38),12px_16px_40px_rgba(255,94,108,0.22),-10px_12px_36px_rgba(56,189,248,0.14),0_0_48px_rgba(251,191,36,0.12)]",
        primary:
          "bg-primary text-white shadow-[0_8px_22px_rgba(211,47,47,0.28)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-red-dk hover:shadow-[0_14px_32px_rgba(211,47,47,0.38),12px_16px_40px_rgba(255,94,108,0.22),-10px_12px_36px_rgba(56,189,248,0.14),0_0_48px_rgba(251,191,36,0.12)]",
        secondary:
          "border border-[rgba(193,178,164,0.5)] bg-[#f7f4f1] text-[#111111] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,background-color] duration-300 hover:bg-[#ede5df] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06),10px_14px_36px_rgba(167,139,250,0.12),-8px_16px_32px_rgba(52,211,153,0.1)]",
        outline:
          "border border-[rgba(193,178,164,0.5)] bg-[#f7f4f1] text-[#111111] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,background-color] duration-300 hover:bg-[#ede5df] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06),10px_14px_36px_rgba(167,139,250,0.12),-8px_16px_32px_rgba(52,211,153,0.1)]",
        outlineNeutral:
          "border border-[rgba(193,178,164,0.5)] bg-transparent text-[#111111] shadow-none transition-[transform,box-shadow,background-color] duration-300 hover:bg-[#ede5df] hover:shadow-[0_10px_26px_rgba(0,0,0,0.05),8px_12px_32px_rgba(56,189,248,0.1),-6px_14px_28px_rgba(251,191,36,0.08)]",
        ghost: "group bg-transparent text-[#111111] hover:text-[#3a3a3a]",
        link: "group bg-transparent px-0 text-red hover:text-red-dk",
        dark: "bg-[#3a3a3a] text-white hover:bg-[#2b2b2b]",
        warm:
          "bg-[#c1b2a4] text-[#111111] shadow-[0_4px_16px_rgba(193,178,164,0.35)] transition-[transform,box-shadow,background-color] duration-300 hover:bg-[rgb(208,200,193)] hover:shadow-[0_12px_30px_rgba(193,178,164,0.45),14px_10px_36px_rgba(255,94,108,0.12),-8px_18px_34px_rgba(56,189,248,0.1)]",
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

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

function addRipple(clientX: number, clientY: number, node: HTMLElement, variant: ButtonVariant | null | undefined) {
  const r = node.getBoundingClientRect();
  const x = clientX - r.left;
  const y = clientY - r.top;
  const isRed = variant === "primary" || variant === "default";
  const color = isRed ? "rgba(255,255,255,0.4)" : "rgba(193,178,164,0.5)";
  const sp = document.createElement("span");
  sp.setAttribute("aria-hidden", "true");
  sp.className = "pointer-events-none absolute z-[1] rounded-full";
  sp.style.cssText = `left:${x}px;top:${y}px;width:1px;height:1px;transform:translate(-50%,-50%) scale(0);opacity:0.4;background:${color};animation:fixonex-ripple 0.6s cubic-bezier(0.16,1,0.3,1) forwards;`;
  node.appendChild(sp);
  window.setTimeout(() => sp.remove(), 600);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const reduced = useReducedMotion();
    const x = useSpring(0, { stiffness: 300, damping: 20 });
    const y = useSpring(0, { stiffness: 300, damping: 20 });
    const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
      y.set(((e.clientY - rect.top) / rect.height - 0.5) * 8);
    };
    const v = (variant ?? "primary") as ButtonVariant;
    const isGhost = v === "ghost";

    if (asChild) {
      const Comp = Slot;
      const onSlotClick: React.MouseEventHandler<HTMLElement> = (e) => {
        const t = e.currentTarget;
        addRipple(e.clientX, e.clientY, t, v);
        (onClick as React.MouseEventHandler<HTMLElement> | undefined)?.(e);
      };
      return (
        <motion.span
          className="inline-flex"
          style={reduced ? undefined : { x, y }}
          onMouseMove={onMove}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
        >
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref as never}
            onClick={onSlotClick}
            {...(props as object)}
          />
        </motion.span>
      );
    }

    return (
      <motion.span
        whileHover={reduced ? undefined : { scale: 1.02 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        className="inline-flex"
        style={reduced ? undefined : { x, y }}
        onMouseMove={onMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <button
          type="button"
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onClick={(e) => {
            addRipple(e.clientX, e.clientY, e.currentTarget, v);
            onClick?.(e);
          }}
          {...props}
        >
          {props.children}
          {isGhost && <span className="absolute bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" aria-hidden />}
        </button>
      </motion.span>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
