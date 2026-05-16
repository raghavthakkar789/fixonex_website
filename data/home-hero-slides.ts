/**
 * Home hero carousel — background images hosted on Google Drive (see Readme_img.md).
 */

import { HERO_DRIVE_IMAGES } from "@/data/google-drive-media";

export type HomeHeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2?: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    id: "brand",
    image: HERO_DRIVE_IMAGES.heroMain,
    imageAlt: "FIXONEX tile adhesive on site",
    eyebrow: "High-Performance Tile Adhesives",
    titleLine1: "Built for Every Bond.",
    titleLine2: "Built for Every Site.",
    description:
      "Certified adhesives and epoxy grout systems engineered for Indian construction sites.",
    primaryCta: { label: "Explore Products", href: "/products" },
    secondaryCta: { label: "Get in Touch", href: "/contact" },
  },
  {
    id: "tile-adhesives",
    image: HERO_DRIVE_IMAGES.tilesAdhesive,
    imageAlt: "FIXONEX tile adhesive range",
    eyebrow: "Tile adhesives",
    titleLine1: "Five grades. Every exposure.",
    description:
      "C1T through C2TES2 — interior ceramics, facades, stone, and immersed builds per EN 12004 and IS 15477:2019.",
    primaryCta: { label: "View tile adhesives", href: "/products/tiles-adhesive" },
  },
  {
    id: "epoxy-grout",
    image: HERO_DRIVE_IMAGES.epoxyGrouting,
    imageAlt: "FIXONEX epoxy grout",
    eyebrow: "Epoxy grout",
    titleLine1: "Stain-tough joints. Designer colours.",
    description:
      "Three-part epoxy for premium residential, commercial wet areas, and compatible immersed finishes — ask for the colour chart.",
    primaryCta: { label: "View epoxy grout", href: "/products/epoxy-grout" },
  },
  {
    id: "block-mortar",
    image: HERO_DRIVE_IMAGES.blockJoiningMontar,
    imageAlt: "FIXONEX block joining mortar",
    eyebrow: "Block joining mortar",
    titleLine1: "Thin, strong AAC and block joints.",
    description:
      "Factory-mixed mortar for cellular and lightweight block walls — fast build, plumb lines, 40 kg packs.",
    primaryCta: { label: "View block mortar", href: "/products/block-joining-mortar" },
  },
  /* PU FIXO-999 — temporarily out of home hero carousel
  {
    id: "pu-fixo-999",
    image: HERO_DRIVE_IMAGES.puFixo999Hero,
    ...
  },
  */
  {
    id: "tile-cleaner",
    image: HERO_DRIVE_IMAGES.tileCleanerHero,
    imageAlt: "FIXONEX tile cleaner",
    eyebrow: "Tile cleaner",
    titleLine1: "Keep finishes looking spec-grade.",
    description:
      "Maintain ceramic, vitrified, granite, and sanitary ware — dilute per label for light or deeper cleans.",
    primaryCta: { label: "View tile cleaner", href: "/products/tile-cleaner" },
  },
  {
    id: "tile-spacer",
    image: HERO_DRIVE_IMAGES.tilesSpacerHero,
    imageAlt: "FIXONEX tile spacers",
    eyebrow: "Tile spacers",
    titleLine1: "Uniform joints from 2 mm to 10 mm.",
    description:
      "White and yellow spacers for predictable joint width before grout — walls, floors, interior and exterior fixing.",
    primaryCta: { label: "View tile spacers", href: "/products/tile-spacer" },
  },
];

/** Maps `/products/[slug]` catalog slugs to home carousel slide ids (tile SKUs use the hub image). */
const CATALOG_SLUG_TO_HERO_SLIDE_ID: Record<string, string> = {
  "block-joining-mortar": "block-mortar",
  "pu-fixo-999": "pu-fixo-999",
  "epoxy-grout": "epoxy-grout",
  "tile-cleaner": "tile-cleaner",
  "tile-spacer": "tile-spacer",
};

function heroSlideImageById(slideId: string): string | undefined {
  return HOME_HERO_SLIDES.find((s) => s.id === slideId)?.image;
}

/** Full-bleed image for `PageHero` on standalone catalog product pages (not tile-adhesive SKUs). */
export function getHomeHeroImageForCatalogSlug(slug: string): string | undefined {
  const slideId = CATALOG_SLUG_TO_HERO_SLIDE_ID[slug];
  if (!slideId) return undefined;
  const fromCarousel = heroSlideImageById(slideId);
  if (fromCarousel) return fromCarousel;
  if (slug === "pu-fixo-999") return HERO_DRIVE_IMAGES.puFixo999Hero;
  return undefined;
}

/** Background for tiles-adhesive hub + FIX 111–555 detail routes. */
export function getHomeHeroImageForTileAdhesiveLine(): string {
  return heroSlideImageById("tile-adhesives")!;
}
