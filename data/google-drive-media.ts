/**
 * All marketing images & catalog URLs — Google Drive (see Readme_img.md).
 *
 * Prefer the thumbnail endpoint: `drive.google.com/uc?export=view` is unreliable
 * for hotlinking. Thumbnails scale with `sz=wN` — use the **smallest** width that
 * still matches how the asset is rendered to cut bytes and server-side latency.
 */

function extractDriveFileId(shareUrl: string): string | null {
  const u = shareUrl.trim();
  const m = u.match(/\/d\/([^/]+)/);
  return m?.[1] ?? null;
}

function clampDriveThumbW(px: number): number {
  return Math.min(2048, Math.max(64, Math.round(px)));
}

/**
 * Raster thumbnail from a Drive sharing link (`/file/d/{id}/...`).
 * `maxWidthPx` ≈ largest CSS width × device pixel ratio (cap via clamp).
 */
export function driveThumbnailFromShare(shareUrl: string, maxWidthPx: number): string {
  const id = extractDriveFileId(shareUrl);
  if (!id) return shareUrl;
  const w = clampDriveThumbW(maxWidthPx);
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
}

/** Display-tier widths — avoid one global w2560 for every asset. */
const W = {
  /** Cert / small logo strip (~h-24, narrow). */
  certLogo: 320,
  /** Navbar / footer lockup (~200 CSS px × 2× DPR). */
  navbarLogo: 512,
  /** Product grid, cards, selector (~half column @ 2×). */
  productCard: 960,
  /** About / Why large in-content photos. */
  editorial: 1280,
  /** Full-bleed heroes, carousel, PageHero. */
  hero: 1920,
} as const;

/** Open in browser tab (catalog PDF / any file viewer). */
export function driveFileViewUrl(shareUrl: string): string {
  const id = extractDriveFileId(shareUrl);
  if (!id) return shareUrl;
  return `https://drive.google.com/file/d/${id}/view?usp=drive_link`;
}

/* ─── Catalog ─────────────────────────────────────────────────────────── */
export const CATALOG_DRIVE_SHARE =
  "https://drive.google.com/file/d/1DfbkfiGDq5zEWOcE5ogva2VyYevLf7e_/view?usp=sharing";

/* ─── About ────────────────────────────────────────────────────────────── */
export const ABOUT_IMAGES = {
  betterTilingExperience: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1zWI5iFLZhu6oo28HbD6-19zMYaaMEJD2/view?usp=sharing",
    W.editorial,
  ),
  drivingExcellence: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1kyfPAnFf5HyRRhoVwSl0u-iQUoUUMIla/view?usp=sharing",
    W.editorial,
  ),
} as const;

/* ─── Certificates (marquee) ─────────────────────────────────────────────── */
export const CERT_IMAGE_URLS = {
  ISI_logo: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1KSNwELQmdyS7HufedfipyduO89hdfIph/view?usp=sharing",
    W.certLogo,
  ),
  ISO_logo: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1_2LDKJC1kja4nJ1u69_fWdSmTPsOUfQ2/view?usp=sharing",
    W.certLogo,
  ),
  MakeInIndia: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1ZMiv5M93P1RCc9-xC7qZPB5sVBTxHRCq/view?usp=sharing",
    W.certLogo,
  ),
  IGBC_logo: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1b9ldgRwAL5RuGxU2NmWVncOVq4OWY8Ar/view?usp=sharing",
    W.certLogo,
  ),
  CE_logo: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1qu3BmuCIXLJNfEUD1ma7CtCi_rzr8qGC/view?usp=sharing",
    W.certLogo,
  ),
  IAF_logo: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1nF7kJcet25EibrZfVbgvdmdA8SjwUGal/view?usp=sharing",
    W.certLogo,
  ),
} as const;

/* ─── Hero backgrounds ──────────────────────────────────────────────────── */
export const HERO_DRIVE_IMAGES = {
  heroMain: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1SRMMDmGPSiP3uRlB3ng_1H3IqOeqZ68o/view?usp=sharing",
    W.hero,
  ),
  productsHero: driveThumbnailFromShare(
    "https://drive.google.com/file/d/13H473q1AizFX0MuIWs77cxyZoPO41tq5/view?usp=sharing",
    W.hero,
  ),
  tilesAdhesive: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1XG6AOvig6VGivfSgEXZRZOyMH6PYcGLq/view?usp=drive_link",
    W.hero,
  ),
  epoxyGrouting: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1UV_zor-QSzEvwoj1eqnNsmkZ5FPpVo_W/view?usp=sharing",
    W.hero,
  ),
  blockJoiningMontar: driveThumbnailFromShare(
    "https://drive.google.com/file/d/13cUMPBpyuJcn2l28DObGdukcgQ-5zN-h/view?usp=sharing",
    W.hero,
  ),
  puFixo999Hero: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1gteAGQd4A-hQ7oEwGmxC8GKvePq3wO9W/view?usp=sharing",
    W.hero,
  ),
  tileCleanerHero: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1xFe7eA0A_T4cF8YNXcOeFuMgDulfIQP-/view?usp=sharing",
    W.hero,
  ),
  tilesSpacerHero: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1YUL7J8ovU1IWgNyR3ZQM20yIEezJi9FN/view?usp=sharing",
    W.hero,
  ),
} as const;

/* ─── Brand logo (navbar/footer/hero watermark) ──────────────────────────── */
export const LOGO_DRIVE_URL = driveThumbnailFromShare(
  "https://drive.google.com/file/d/1QSeCxYyJdbnGukwCjzWEz2Vi9WtrGBWO/view?usp=sharing",
  W.navbarLogo,
);

/** No Drive assets supplied for illustrated team placeholders — reuse logo silhouette. */
export const TEAM_DRIVE_PLACEHOLDER = LOGO_DRIVE_URL;

/* ─── Product packshots ───────────────────────────────────────────────────── */
export const PRODUCT_DRIVE_IMAGES = {
  "fix-111": driveThumbnailFromShare(
    "https://drive.google.com/file/d/14WGQWqflCyK4BLasLe_GlcgtaO6sHPU-/view?usp=sharing",
    W.productCard,
  ),
  "fix-222": driveThumbnailFromShare(
    "https://drive.google.com/file/d/1YT9o4mE1NlmfSehoyp__3loTOOnIxA1r/view?usp=sharing",
    W.productCard,
  ),
  "fix-333": driveThumbnailFromShare(
    "https://drive.google.com/file/d/1ykd6u6XCBdLhxibr0h_iBEr39gkCLaui/view?usp=sharing",
    W.productCard,
  ),
  "fix-444": driveThumbnailFromShare(
    "https://drive.google.com/file/d/12LTgYeCXUUOSRHJM5OTj-TgeX3bZ0aHn/view?usp=sharing",
    W.productCard,
  ),
  "fix-555": driveThumbnailFromShare(
    "https://drive.google.com/file/d/1tqZHZd7ck7bp_8jS3ychBS67VtaehENM/view?usp=sharing",
    W.productCard,
  ),
  "block-mortar": driveThumbnailFromShare(
    "https://drive.google.com/file/d/1IajioEOzs8sKhY3SueiHNnQtlLtT8Zjd/view?usp=sharing",
    W.productCard,
  ),
  "epoxy-grout": driveThumbnailFromShare(
    "https://drive.google.com/file/d/1bHKFUMKP7yJCiazaOOIP0qg-K8DjIhX0/view?usp=sharing",
    W.productCard,
  ),
  "pu-fixo-999": driveThumbnailFromShare(
    "https://drive.google.com/file/d/1DQkt9pRfeJ4POVEoIB0APpQKplz0202t/view?usp=sharing",
    W.productCard,
  ),
  "tile-cleaner": driveThumbnailFromShare(
    "https://drive.google.com/file/d/1j7xNqHDrY8_ZacRnIHVh7VVB7X_5d6if/view?usp=sharing",
    W.productCard,
  ),
  "tile-spacer": driveThumbnailFromShare(
    "https://drive.google.com/file/d/15XLvb-clSJZEI0kDGv1WN2e8nBTfVvrn/view?usp=sharing",
    W.productCard,
  ),
} as const;

/* ─── Why FIXONEX page ─────────────────────────────────────────────────────── */
export const WHY_FIXONEX_IMAGES = {
  decadeOfExpertise: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1m5XUV1Mcgm08Kbg49gErRa1Tak90GlcJ/view?usp=sharing",
    W.editorial,
  ),
  whyAdhesive: driveThumbnailFromShare(
    "https://drive.google.com/file/d/1WZ7Rt02o2bEBNRvl-800oRgNyL6griBa/view?usp=sharing",
    W.editorial,
  ),
} as const;
