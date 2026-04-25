"use client";

import type { LinkProps } from "next/link";
import Link from "next/link";
import { forwardRef, useCallback, type ReactNode, type ComponentProps, type MouseEvent } from "react";
import { useAppNavigate } from "@/lib/useNavigate";
import { cn } from "@/lib/utils";

type InternalProps = {
  children: ReactNode;
  className?: string;
  href: LinkProps["href"];
  prefetch?: boolean;
} & Omit<ComponentProps<"a">, "href" | "onClick" | "children" | "className"> & {
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * In-app link that uses the full page transition. External/mailto/tel use native navigation.
 */
export const TransitionLink = forwardRef<HTMLAnchorElement, InternalProps>(function TransitionLink(
  { href, onClick, children, className, prefetch = true, ...rest },
  ref,
) {
  const go = useAppNavigate();

  const handle = useCallback(
    async (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (typeof href !== "string") return;

      const u = (() => {
        try {
          return new URL(href, window.location.origin);
        } catch {
          return null;
        }
      })();
      if (!u) return;

      const isExternal = u.origin !== window.location.origin;
      if (u.protocol === "mailto:" || u.protocol === "tel:") return;
      if (isExternal) return;

      const here = new URL(window.location.href);
      if (u.pathname === here.pathname && u.search === here.search) {
        if (u.hash) {
          e.preventDefault();
          document.getElementById(u.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      e.preventDefault();
      await go(href);
    },
    [go, href, onClick],
  );

  return (
    <Link ref={ref} href={href} prefetch={prefetch} className={cn(className)} onClick={handle} {...rest}>
      {children}
    </Link>
  );
});
