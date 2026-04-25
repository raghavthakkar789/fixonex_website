"use client";

import { useRef, useCallback, type ReactNode, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { easingsWAAPI } from "@/lib/animations";

const darkRipple = "rgba(193,178,164,0.5)";
const redRipple = "rgba(255,255,255,0.4)";

type ButtonLikeProps = {
  className?: string;
  children: ReactNode;
  /** "light" = dark buttons (warm/neutral) — use warm-tinted ripple. "red" = primary CTA. */
  rippleVariant?: "light" | "red";
} & (
  | (ComponentProps<"button"> & { href?: never })
  | (ComponentProps<"a"> & { href: string; type?: never })
);

export function RippleButton({ className, children, rippleVariant = "red", onClick, ...rest }: ButtonLikeProps) {
  const hostRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const color = rippleVariant === "red" ? redRipple : darkRipple;

  const addRipple = useCallback(
    (clientX: number, clientY: number) => {
      const el = hostRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      const sp = document.createElement("span");
      sp.setAttribute("aria-hidden", "true");
      sp.className = "pointer-events-none absolute rounded-full";
      sp.style.cssText = `left:${x}px;top:${y}px;width:1px;height:1px;transform:translate(-50%,-50%) scale(0);opacity:0.4;background:${color};z-index:1;animation:fixonex-ripple 0.6s ${easingsWAAPI.easeOutExpoCss} forwards;`;
      el.appendChild(sp);
      window.setTimeout(() => {
        sp.remove();
      }, 600);
    },
    [color],
  );

  if ("href" in rest && rest.href) {
    return (
      <a
        ref={hostRef as React.Ref<HTMLAnchorElement>}
        className={cn("relative overflow-hidden", className)}
        onClick={(e) => {
          addRipple(e.clientX, e.clientY);
          (rest as { onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void }).onClick?.(e);
        }}
        {...(rest as ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={hostRef as React.Ref<HTMLButtonElement>}
      type="button"
      className={cn("relative overflow-hidden", className)}
      onClick={(e) => {
        addRipple(e.clientX, e.clientY);
        (onClick as React.MouseEventHandler<HTMLButtonElement> | undefined)?.(e);
      }}
      {...(rest as ComponentProps<"button">)}
    >
      {children}
    </button>
  );
}
