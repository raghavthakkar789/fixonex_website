import type {
  HelpEnvironment,
  HelpMaterial,
  HelpMoisture,
  HelpRecommendationRule,
  HelpTileSize,
} from "@/types";

/**
 * Rule order matters: first matching rule wins (top to bottom).
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
