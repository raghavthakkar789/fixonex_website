"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (ref == null) continue;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

const variantClasses: Record<string, string> = {
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  primary:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  secondary:
    "border border-border-strong bg-elevated text-foreground hover:bg-zinc-50",
  outline: "border border-border-strong bg-transparent text-foreground shadow-none hover:bg-secondary/60",
  outlineNeutral: "border border-border-strong bg-transparent text-foreground hover:bg-elevated/80",
  ghost: "group border-transparent bg-transparent text-foreground hover:bg-elevated/90",
  link: "border-transparent px-0 text-primary underline-offset-4 hover:underline hover:text-primary-dark",
  dark:
    "border-transparent bg-secondary text-foreground hover:bg-secondary/95 active:shadow-neo-inset",
  warm: "border border-border-strong bg-band-alt text-foreground hover:bg-zinc-100",
};

const sizeClasses: Record<string, string> = {
  default: "px-7 py-3.5",
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5",
  lg: "px-9 py-[18px] text-base",
  icon: "h-11 w-11 p-0",
};

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl border font-sans text-[15px] font-semibold transition-[background-color,color,border-color,transform] duration-200 active:shadow-neo-inset disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0";

export type ButtonVariant = keyof typeof variantClasses | null | undefined;
export type ButtonSize = keyof typeof sizeClasses | null | undefined;

function buttonClassName(variant: ButtonVariant, size: ButtonSize, className?: string) {
  const v = variant ?? "primary";
  const s = size ?? "md";
  return cn(baseClasses, variantClasses[v] ?? variantClasses.primary, sizeClasses[s] ?? sizeClasses.md, className);
}

function addRipple(clientX: number, clientY: number, node: HTMLElement, variant: string | null | undefined) {
  const r = node.getBoundingClientRect();
  const x = clientX - r.left;
  const y = clientY - r.top;
  const isPrimary = variant === "primary" || variant === "default";
  const color = isPrimary ? "rgba(255,255,255,0.35)" : "rgba(43,43,43,0.14)";
  const sp = document.createElement("span");
  sp.setAttribute("aria-hidden", "true");
  sp.className = "pointer-events-none absolute z-[1] rounded-full";
  sp.style.cssText = `left:${x}px;top:${y}px;width:1px;height:1px;transform:translate(-50%,-50%) scale(0);opacity:0.4;background:${color};animation:fixonex-ripple 0.55s cubic-bezier(0.16,1,0.3,1) forwards;`;
  if (variant === "primary" || variant === "default") {
    node.appendChild(sp);
    window.setTimeout(() => sp.remove(), 600);
  }
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, children, ...props }, ref) => {
    const v = (variant ?? "primary") as string;
    const isGhost = v === "ghost";
    const classes = buttonClassName(variant, size, className);

    if (asChild) {
      const child = React.Children.only(children);
      if (!React.isValidElement(child)) {
        throw new Error("[Button] asChild expects exactly one valid React element.");
      }
      const childProps = child.props as {
        className?: string;
        onClick?: React.MouseEventHandler<Element>;
        ref?: React.Ref<Element>;
      };
      const onMergedClick: React.MouseEventHandler = (e) => {
        childProps.onClick?.(e);
        if (e.defaultPrevented) return;
        const node = e.currentTarget as HTMLElement;
        addRipple(e.clientX, e.clientY, node, v);
        (onClick as React.MouseEventHandler | undefined)?.(e);
      };
      return React.cloneElement(child, {
        ...props,
        className: cn(classes, childProps.className),
        onClick: onMergedClick,
        ref: composeRefs(ref as React.Ref<HTMLElement>, childProps.ref as React.Ref<HTMLElement>),
      } as never);
    }

    return (
      <button
        type="button"
        className={classes}
        ref={ref}
        onClick={(e) => {
          addRipple(e.clientX, e.clientY, e.currentTarget, v);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
        {isGhost && (
          <span className="absolute bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" aria-hidden />
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
