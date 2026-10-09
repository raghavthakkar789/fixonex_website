/** Marketing images served from public/assets/images; catalogue remains on Drive.
 * Existing export names are retained for compatibility with page consumers.
 */
function imageAsset(filename: string): string {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  return `${basePath}/assets/images/${filename}`;
}

/** Open the catalogue in the Drive file viewer. */
export function driveFileViewUrl(shareUrl: string): string {
  const id = shareUrl.trim().match(/\/d\/([^/]+)/)?.[1];
  return id ? `https://drive.google.com/file/d/${id}/view?usp=drive_link` : shareUrl;
}

/* ─── Catalog ─────────────────────────────────────────────────────────── */
export const CATALOG_DRIVE_SHARE =
  "https://drive.google.com/file/d/1DfbkfiGDq5zEWOcE5ogva2VyYevLf7e_/view?usp=sharing";

/* ─── About ────────────────────────────────────────────────────────────── */
export const ABOUT_IMAGES = {
  betterTilingExperience: imageAsset("bettertiling-experience.jpg"),
  drivingExcellence: imageAsset("drivingexcellenceintileinstallition.jpg"),
} as const;

/* ─── Certificates (marquee) ─────────────────────────────────────────────── */
export const CERT_IMAGE_URLS = {
  ISI_logo: imageAsset("isi-logo.png"),
  ISO_logo: imageAsset("iso-logo.png"),
  MakeInIndia: imageAsset("makeinindia.png"),
  IGBC_logo: imageAsset("igbc-logo.jpg"),
  CE_logo: imageAsset("ce-logo.png"),
  IAF_logo: imageAsset("iaf-logo.png"),
} as const;

/* ─── Hero backgrounds ──────────────────────────────────────────────────── */
export const HERO_DRIVE_IMAGES = {
  heroMain: imageAsset("hero-main.jpg"),
  productsHero: imageAsset("products-hero.png"),
  tilesAdhesive: imageAsset("tiles-adhesive-heroimage.jpg"),
  epoxyGrouting: imageAsset("epoxy-grouting-heroimage.png"),
  blockJoiningMontar: imageAsset("block-joining-montar-heroimage.jpg"),
  puFixo999Hero: imageAsset("pu-fixo-999-heroimage.png"),
  tileCleanerHero: imageAsset("tilecleaner-heroimage.jpg"),
  tilesSpacerHero: imageAsset("tilesspacer-heroimage.jpg"),
} as const;

/* ─── Brand logo (navbar/footer/hero watermark) ──────────────────────────── */
export const LOGO_DRIVE_URL = imageAsset("logo.png");

/** No portraits supplied for illustrated team placeholders — reuse logo silhouette. */
export const TEAM_DRIVE_PLACEHOLDER = LOGO_DRIVE_URL;

/* ─── Product packshots ───────────────────────────────────────────────────── */
export const PRODUCT_DRIVE_IMAGES = {
  "fix-111": imageAsset("fix-111.png"),
  "fix-222": imageAsset("fix-222.png"),
  "fix-333": imageAsset("fix-333.png"),
  "fix-444": imageAsset("fix-444.png"),
  "fix-555": imageAsset("fix-555.png"),
  "block-mortar": imageAsset("block-mortar.png"),
  "epoxy-grout": imageAsset("epoxy-grout.png"),
  "pu-fixo-999": imageAsset("pu-fixo-999.png"),
  "tile-cleaner": imageAsset("tile-cleaner.png"),
  "tile-spacer": imageAsset("tile-spacer.jpg"),
} as const;

/* ─── Why FIXONEX page ─────────────────────────────────────────────────────── */
export const WHY_FIXONEX_IMAGES = {
  decadeOfExpertise: imageAsset("a-decade-of-expertise.jpg"),
  whyAdhesive: imageAsset("why-adhesive.jpg"),
} as const;
