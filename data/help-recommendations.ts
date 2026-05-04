import type {
  HelpEnvironment,
  HelpMaterial,
  HelpMoisture,
  HelpRecommendationRule,
  HelpTileSize,
} from "@/types";

/**
 * Rule order matters: first matching rule wins (top to bottom).
 * Used by the legacy help panel.
 */
export const helpRecommendationRules: HelpRecommendationRule[] = [
  {
    id: "glass-wet",
    match: { material: "glass-block" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "tile-spacers"],
    headline: "Glass and specialty panel assemblies",
    rationale:
      "High-performance adhesives (including PU options on approved substrates), epoxy-class jointing where specified, and spacer discipline help control coursing and finish. Structural and movement details must follow engineering.",
  },
  {
    id: "stone-wet",
    match: { material: "natural-stone", moisture: "wet" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "pu-products"],
    headline: "Natural stone in wet conditions",
    rationale:
      "Pick a FIXONEX adhesive rated for stone and wet use, add epoxy grout where cleaning will be harsh, and use PU only where the drawing calls for it. Check every step with the stone supplier.",
  },
  {
    id: "stone-dry",
    match: { material: "natural-stone" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "tile-cleaners"],
    headline: "Natural stone — general orientation",
    rationale:
      "White or grey FIX adhesives matched to stone type, epoxy or cementitious jointing per joint width, and compatible cleaners for maintenance.",
  },
  {
    id: "outdoor-large",
    match: { environment: "outdoor", tileSize: "large" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "pu-products"],
    headline: "Exterior large-format installations",
    rationale:
      "C2TE / C2TES-class adhesives for exposure and format, epoxy grout where the schedule requires it, and PU for perimeter or engineered movement details.",
  },
  {
    id: "outdoor-medium",
    match: { environment: "outdoor" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "tile-spacers"],
    headline: "Exterior standard tiling",
    rationale:
      "Use a FIXONEX adhesive graded for exterior work, jointing that suits sun and rain, and spacers so movement stays tidy.",
  },
  {
    id: "immersed",
    match: { moisture: "immersed" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "pu-products"],
    headline: "Pools, tanks, and immersed service",
    rationale:
      "C2TES2 and compatible systems for immersed tile and stone, epoxy grout for waterline and submerged joints where specified—always integrate waterproofing and engineering review.",
  },
  {
    id: "wet-heavy",
    match: { moisture: "wet", tileSize: "heavy" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "pu-products"],
    headline: "Heavy tile in wet environments",
    rationale:
      "C2TE / C2TES-class adhesives for heavy stone, epoxy grout where cleaning is tough, and PU only on engineered movement details.",
  },
  {
    id: "wet-standard",
    match: { moisture: "wet" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "tile-cleaners"],
    headline: "Wet-area ceramic and porcelain",
    rationale:
      "Polymer-modified FIXONEX adhesive for bond in splash zones, epoxy grout when the finish schedule demands it, and tile cleaners that suit the joint later on.",
  },
  {
    id: "large-interior",
    match: { tileSize: "large" },
    productSlugs: ["tile-adhesives", "tile-spacers", "epoxy-grout"],
    headline: "Large-format interior walls and floors",
    rationale:
      "Flat backgrounds matter, pick the right FIXONEX adhesive and trowel, use spacers for joint width, and match grout to joint size and traffic.",
  },
  {
    id: "heavy-panels",
    match: { tileSize: "heavy" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "pu-products"],
    headline: "Heavy units and demanding bonds",
    rationale:
      "Verify adhesive class for unit weight; epoxy for joint performance where specified; PU for elastic details per engineering.",
  },
  {
    id: "mixed-default",
    match: { material: "mixed" },
    productSlugs: ["tile-adhesives", "epoxy-grout", "pu-products"],
    headline: "Mixed-material sites need a short technical review",
    rationale:
      "Send FIXONEX a short note — we help you line up adhesive, grout, PU interfaces, and cleaning into one clear package.",
  },
  {
    id: "default-ceramic",
    match: {},
    productSlugs: ["tile-adhesives", "epoxy-grout", "tile-spacers"],
    headline: "Baseline ceramic and porcelain workflow",
    rationale:
      "Start with a FIXONEX adhesive matched to exposure, add epoxy grout when stains would be a problem, use spacers for neat joints, and grab block mortar if AAC walls are on the same job.",
  },
];

export function evaluateHelpSelection(input: {
  environment: HelpEnvironment;
  moisture: HelpMoisture;
  tileSize: HelpTileSize;
  material: HelpMaterial;
}): HelpRecommendationRule {
  const matches = (rule: HelpRecommendationRule): boolean => {
    const m = rule.match;
    if (m.environment && m.environment !== input.environment) return false;
    if (m.moisture && m.moisture !== input.moisture) return false;
    if (m.tileSize && m.tileSize !== input.tileSize) return false;
    if (m.material && m.material !== input.material) return false;
    return true;
  };

  for (const rule of helpRecommendationRules) {
    if (matches(rule)) return rule;
  }

  return helpRecommendationRules[helpRecommendationRules.length - 1];
}

// ─────────────────────────────────────────────────────────────────────────────
// Product Guidance Wizard
// ─────────────────────────────────────────────────────────────────────────────

export type InstallArea = "indoor" | "outdoor";
export type WizardMoisture = "dry" | "splash" | "water";
export type SizeType = "small" | "large" | "heavy";
export type WizardMaterial = "ceramic" | "stone" | "glass" | "mixed";

export interface GuidanceAnswers {
  area: InstallArea;
  moisture: WizardMoisture;
  size: SizeType;
  material: WizardMaterial;
}

export type WizardProductSlug =
  | "tile-adhesives"
  | "pu-products"
  | "epoxy-grout"
  | "tile-cleaners"
  | "block-joining-mortar"
  | "tile-spacers";

export interface RecommendationOutcome {
  slugs: WizardProductSlug[];
  rationale: string;
}

/** Stable display order for suggested slugs */
const SLUG_ORDER: WizardProductSlug[] = [
  "tile-adhesives",
  "pu-products",
  "epoxy-grout",
  "tile-cleaners",
  "block-joining-mortar",
  "tile-spacers",
];

/** Display metadata for each product category slug */
export const wizardCategoryMeta: Record<
  WizardProductSlug,
  { title: string; desc: string; href: string }
> = {
  "tile-adhesives": {
    title: "Tile Adhesives",
    desc: "Five certified grades — C1T through C2TES2 — for every surface and exposure.",
    href: "/products/tiles-adhesive",
  },
  "pu-products": {
    title: "PU Systems",
    desc: "Flexible polyurethane bond for specialty substrates and engineered movement joints.",
    href: "/products",
  },
  "epoxy-grout": {
    title: "Epoxy Grout",
    desc: "Stain-resistant, chemical-proof joints in 20+ colourways — pool to kitchen.",
    href: "/products/epoxy-grout",
  },
  "tile-cleaners": {
    title: "Tile Cleaners",
    desc: "Compatible maintenance cleaners safe for grout, natural stone, and epoxy joints.",
    href: "/products",
  },
  "block-joining-mortar": {
    title: "Block Joining Mortar",
    desc: "Consistent bed mortar for AAC and masonry wall systems on the same job.",
    href: "/products",
  },
  "tile-spacers": {
    title: "Tile Spacers",
    desc: "Precision spacers for uniform joint width and accurate coursing on any format.",
    href: "/products",
  },
};

/** The four wizard questions with their options */
export const guidanceQuestions = [
  {
    id: "area" as const,
    step: 1,
    label: "Where is the installation?",
    options: [
      { value: "indoor" as InstallArea, label: "Indoor" },
      { value: "outdoor" as InstallArea, label: "Outdoor" },
    ],
  },
  {
    id: "moisture" as const,
    step: 2,
    label: "What is the moisture exposure?",
    options: [
      { value: "dry" as WizardMoisture, label: "Mostly dry" },
      { value: "splash" as WizardMoisture, label: "Splash / damp" },
      { value: "water" as WizardMoisture, label: "Long-term water exposure" },
    ],
  },
  {
    id: "size" as const,
    step: 3,
    label: "What size or type?",
    options: [
      { value: "small" as SizeType, label: "Small / regular tile" },
      { value: "large" as SizeType, label: "Large tile / slab" },
      { value: "heavy" as SizeType, label: "Heavy stone / special material" },
    ],
  },
  {
    id: "material" as const,
    step: 4,
    label: "What material?",
    options: [
      { value: "ceramic" as WizardMaterial, label: "Ceramic / vitrified tile" },
      { value: "stone" as WizardMaterial, label: "Natural stone" },
      { value: "glass" as WizardMaterial, label: "Glass / specialty substrates" },
      { value: "mixed" as WizardMaterial, label: "Mixed" },
    ],
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Specific product recommendation (single SKU-level result)
// ─────────────────────────────────────────────────────────────────────────────

export interface SpecificRecommendation {
  name: string;        // e.g. "FIX 333"
  grade: string;       // e.g. "C2TE · Type-3"
  badge: string;       // Short label for the chip
  application: string; // One-line application context
  rationale: string;   // Why this product was chosen
  href: string;        // Direct link to product page
  image: string;       // Product image path
}

// Product definitions used by the decision engine
const PRODUCTS = {
  fix111: {
    name: "FIX 111",
    grade: "C2T · Type-1",
    badge: "C1T",
    application: "Interior ceramic wall and floor tiles — standard dry conditions.",
    href: "/products/tiles-adhesive/fix-111",
    image: "/images/products/fix-111.png",
  },
  fix222: {
    name: "FIX 222",
    grade: "C2T · Type-2",
    badge: "C2T",
    application: "Interior ceramic and vitrified tiles, damp zones and larger formats.",
    href: "/products/tiles-adhesive/fix-222",
    image: "/images/products/fix-222.png",
  },
  fix333: {
    name: "FIX 333",
    grade: "C2TE · Type-3",
    badge: "C2TE",
    application: "Large-format tiles, marble, granite, and natural stone — interior and exterior.",
    href: "/products/tiles-adhesive/fix-333",
    image: "/images/products/fix-333.png",
  },
  fix444: {
    name: "FIX 444",
    grade: "C2TES1 · Type-4",
    badge: "C2TES1",
    application: "Exterior walls, facades, large-format tiles, and natural stone.",
    href: "/products/tiles-adhesive/fix-444",
    image: "/images/products/fix-444.png",
  },
  fix555: {
    name: "FIX 555",
    grade: "C2TES2 · Type-5",
    badge: "C2TES2",
    application: "Swimming pools, permanently wet zones, exterior porcelain, and tile-on-tile.",
    href: "/products/tiles-adhesive/fix-555",
    image: "/images/products/fix-555.png",
  },
  puFixo: {
    name: "PU FIXO-999",
    grade: "Polyurethane",
    badge: "PU Adhesive",
    application: "Glass, metal, wood, tile-on-tile, and non-porous specialty substrates.",
    href: "/products/pu-fixo-999",
    image: "/images/products/pu-fixo-999.png",
  },
} as const;

/**
 * Decision-tree recommendation engine.
 * Returns a single specific product with rationale for the given answers.
 */
export function getSpecificRecommendation(answers: GuidanceAnswers): SpecificRecommendation {
  const { area, moisture, size, material } = answers;

  // Glass / specialty substrates — PU is always the answer
  if (material === "glass") {
    return {
      ...PRODUCTS.puFixo,
      rationale:
        "Glass and non-porous specialty substrates are not compatible with cementitious adhesives. PU FIXO-999 provides the flexible, chemical-resistant bond these materials require.",
    };
  }

  // Long-term water exposure — highest waterproofing grade
  if (moisture === "water") {
    return {
      ...PRODUCTS.fix555,
      rationale:
        "Permanently wet, submerged, or pool environments require C2TES2 classification with the highest deformability rating. FIX 555 is rated for waterline and submerged service.",
    };
  }

  // Outdoor installation — C2TES1 minimum
  if (area === "outdoor") {
    if (size === "heavy") {
      return {
        ...PRODUCTS.fix444,
        rationale:
          "Heavy stone on exterior substrates needs a C2TES1 grade that handles both thermal movement and load — FIX 444 is rated for facade stone and large exterior formats.",
      };
    }
    if (size === "large") {
      return {
        ...PRODUCTS.fix444,
        rationale:
          "Exterior large-format tiling requires a C2TES1 adhesive for dimensional stability and thermal cycling. FIX 444 covers outdoor facades and large-format porcelain.",
      };
    }
    return {
      ...PRODUCTS.fix444,
      rationale:
        "Any outdoor installation requires at minimum a C2TES1 grade to withstand rain, UV, and thermal cycling. FIX 444 is certified for all standard exterior tiling scenarios.",
    };
  }

  // Indoor — heavy stone or natural stone material
  if (size === "heavy" || material === "stone") {
    return {
      ...PRODUCTS.fix333,
      rationale:
        "Heavy stone and natural materials need a C2TE grade with extended open time for full back-buttering and precise placement. FIX 333 is calibrated for marble, granite, and oversized slabs.",
    };
  }

  // Indoor — large format
  if (size === "large") {
    return {
      ...PRODUCTS.fix333,
      rationale:
        "Large-format tiles demand C2TE grade with improved adhesion and controlled slip. FIX 333 supports oversized vitrified and porcelain formats indoors without sagging.",
    };
  }

  // Indoor — damp / splash zones or mixed material
  if (moisture === "splash" || material === "mixed") {
    return {
      ...PRODUCTS.fix222,
      rationale:
        "Damp areas and mixed tile types benefit from a polymer-modified C2T adhesive. FIX 222 gives stronger bond strength and moisture resistance for bathrooms, kitchens, and varied formats.",
    };
  }

  // Default — standard indoor ceramic in dry conditions
  return {
    ...PRODUCTS.fix111,
    rationale:
      "For standard interior ceramic tiling in dry conditions, FIX 111 (C1T) provides reliable, cost-effective adhesion meeting EN 12004 and IS 15477:2019.",
  };
}

export const defaultGuidanceAnswers: GuidanceAnswers = {
  area: "indoor",
  moisture: "dry",
  size: "small",
  material: "ceramic",
};

/**
 * Additive recommendation logic (category-level, legacy).
 * Returns ordered product category slugs and a human-readable rationale.
 */
export function getRecommendations(answers: GuidanceAnswers): RecommendationOutcome {
  const { area, moisture, size, material } = answers;
  const set = new Set<WizardProductSlug>();

  // Base — always included
  set.add("tile-adhesives");
  set.add("tile-spacers");

  // Epoxy grout: any demanding condition
  if (size === "large" || size === "heavy" || moisture !== "dry" || area === "outdoor") {
    set.add("epoxy-grout");
  }

  // PU systems: water, specialty, or heavy stone
  if (moisture === "water" || material === "glass" || size === "heavy") {
    set.add("pu-products");
  }

  // Tile cleaners: outdoor or damp conditions
  if (area === "outdoor" || moisture !== "dry") {
    set.add("tile-cleaners");
  }

  // Block mortar: outdoor jobs with non-small formats (likely AAC walls on site)
  if (area === "outdoor" && size !== "small") {
    set.add("block-joining-mortar");
  }

  // Sort by stable preference order
  const slugs = SLUG_ORDER.filter((s) => set.has(s));

  // Fallback (should not happen with current rules)
  if (slugs.length === 0) {
    return {
      slugs: ["tile-adhesives"],
      rationale:
        "Start with our certified tile adhesive range and confirm the right grade with our team.",
    };
  }

  // Build rationale
  let rationale =
    "Based on your inputs, we suggest starting with the following FIXONEX product categories.";

  if (moisture === "water") {
    rationale +=
      " For long-term water or submerged exposure, waterproofing integration and immersion-rated systems are essential — review each TDS carefully.";
  } else if (moisture === "splash") {
    rationale +=
      " In splash and damp areas, polymer-modified adhesives and epoxy grout improve durability and long-term joint hygiene.";
  }

  if (material === "glass") {
    rationale +=
      " Glass and specialty substrates often require flexible or multi-material systems — confirm suitability with the FIXONEX team before ordering.";
  }

  rationale +=
    " Always confirm slab size tolerances and substrate preparation requirements on site before installation.";

  return { slugs, rationale };
}
