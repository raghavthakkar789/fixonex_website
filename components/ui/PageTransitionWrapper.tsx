"use client";

import { type ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export function PageTransitionWrapper({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}

export function pageEnterTransition() {
  return {
    initial: {} as const,
    animate: {} as const,
    exit: {} as const,
    tEnter: { duration: 0 } as const,
    tExit: { duration: 0 } as const,
  };
}
