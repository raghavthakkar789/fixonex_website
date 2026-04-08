"use client";

import { usePathname } from "next/navigation";

export function useActiveNav(href: string) {
  const pathname = usePathname();
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
