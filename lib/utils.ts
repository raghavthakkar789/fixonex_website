import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Compare pathnames when Next.js `trailingSlash: true`: `usePathname()` yields
 * `/segment/` while `new URL("/segment", origin).pathname` is `/segment`.
 */
export function pathnameKeysEqual(a: string, b: string): boolean {
  const key = (p: string) => {
    const t = (p || "/").trim();
    if (t === "/" || t === "") return "/";
    return t.replace(/\/+$/, "") || "/";
  };
  return key(a) === key(b);
}
