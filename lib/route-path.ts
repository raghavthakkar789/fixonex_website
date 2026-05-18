/**
 * GitHub Pages project sites expose the browser pathname with a repo segment
 * (e.g. `/fixonex_website/about/`), while Next `Link`/`usePathname`/`router.push`
 * use paths relative to `basePath` (e.g. `/about/`). Compare only after
 * stripping the public base (`NEXT_PUBLIC_BASE_PATH`, set from `BASE_PATH` at build).
 */
export function getPublicBasePath(): string {
  const raw = typeof process.env.NEXT_PUBLIC_BASE_PATH === "string" ? process.env.NEXT_PUBLIC_BASE_PATH : "";
  return raw.replace(/\/+$/, "");
}

/** Normalize `window.location.pathname` (may include basePath) to a Next route path. */
export function toRoutePath(browserPathname: string): string {
  const base = getPublicBasePath();
  let p = browserPathname.trim() || "/";
  if (!base) return p;
  if (p === base || p === `${base}/`) return "/";
  if (p.startsWith(`${base}/`)) {
    const rest = p.slice(base.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return p;
}
