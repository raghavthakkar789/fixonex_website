/**
 * GitHub Pages project sites expose the browser pathname with a repo segment
 * (e.g. `/fixonex_website/about/`), while Next `Link`/`usePathname`/`router.push`
 * use paths relative to `basePath` (e.g. `/about/`).
 *
 * `NEXT_PUBLIC_BASE_PATH` is inlined at build from `BASE_PATH` (see `next.config.mjs`).
 * If a deploy ever omits that (or old cached bundles), we infer `/<repo>` from
 * the first `/_next/` script or stylesheet URL.
 */

function normalizeBase(b: string): string {
  return b.replace(/\/+$/, "");
}

let _cachedInferredBase: string | undefined;

function getInferredBaseMemo(): string {
  if (typeof document === "undefined") return "";
  if (_cachedInferredBase !== undefined) return _cachedInferredBase;
  _cachedInferredBase = normalizeBase(inferBaseFromNextAssets());
  return _cachedInferredBase;
}

function inferBaseFromNextAssets(): string {
  if (typeof document === "undefined") return "";

  const urls: string[] = [];
  for (const s of Array.from(document.scripts)) {
    if (s.src && s.src.includes("/_next/")) urls.push(s.src);
  }
  for (const l of Array.from(document.querySelectorAll('link[rel="stylesheet"][href*="_next"]'))) {
    const h = (l as HTMLLinkElement).href;
    if (h) urls.push(h);
  }
  for (const u of urls) {
    try {
      const pathname = new URL(u, window.location.href).pathname;
      const i = pathname.indexOf("/_next/");
      if (i > 0) {
        const raw = pathname.slice(0, i);
        const n = normalizeBase(raw);
        if (n.startsWith("/")) return n;
      }
    } catch {
      /* skip */
    }
  }
  return "";
}

export function getPublicBasePath(): string {
  const raw = typeof process.env.NEXT_PUBLIC_BASE_PATH === "string" ? process.env.NEXT_PUBLIC_BASE_PATH : "";
  const baked = normalizeBase(raw);
  if (baked) return baked;
  if (typeof document === "undefined") return "";
  return getInferredBaseMemo();
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

/**
 * Full browser URL for an internal Next href (e.g. `/about?q=1`), including
 * `basePath` when deployed under `username.github.io/repo/`.
 */
export function internalHrefToLocationUrl(href: string): string {
  if (typeof window === "undefined") return href;
  let u: URL;
  try {
    u = new URL(href, window.location.origin);
  } catch {
    return href;
  }
  const base = getPublicBasePath();
  let path = u.pathname;
  if (!path.startsWith("/")) path = `/${path}`;
  if (!base) return `${window.location.origin}${path}${u.search}${u.hash}`;
  if (path === "/") return `${window.location.origin}${base}/`;
  return `${window.location.origin}${base}${path}${u.search}${u.hash}`;
}
