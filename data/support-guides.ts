import {
  howToGuides,
  usageSteps,
  safetyNotes,
  type HowToGuideSection,
} from "@/data/how-to-use";

export type SupportGuide = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** Related product range slugs for deep links from product pages */
  relatedProductSlugs: string[];
  sections: HowToGuideSection[];
  takeaways?: string[];
};

/** Article-style guides for Support (source entries live in `how-to-use.ts`). */
export const supportGuides: SupportGuide[] = howToGuides.map((g) => {
  const categoryLabels: Record<string, string> = {
    adhesives: "Adhesives",
    grout: "Grout",
    cleaning: "Cleaning",
    safety: "Safety",
    stone: "Stone",
    "glass-block": "Glass block",
  };
  const related: Record<string, string[]> = {
    v1: ["tile-adhesives", "block-joining-mortar"],
    v2: ["tile-adhesives"],
    v3: ["epoxy-grout", "tile-adhesives"],
    v4: ["epoxy-grout"],
    v5: ["tile-cleaners", "epoxy-grout"],
    v6: ["pu-products", "epoxy-grout", "tile-adhesives"],
    v7: ["tile-adhesives"],
    v8: ["tile-adhesives"],
    v9: ["tile-adhesives", "tile-spacers"],
    v10: ["tile-adhesives", "epoxy-grout"],
    v11: ["tile-adhesives", "pu-products"],
    v12: ["pu-products"],
    v13: ["block-joining-mortar"],
    v14: ["tile-adhesives", "tile-spacers", "epoxy-grout"],
    v15: ["tile-adhesives"],
    v16: ["epoxy-grout", "tile-cleaners", "tile-adhesives"],
    v17: ["tile-adhesives", "epoxy-grout"],
    v18: ["tile-adhesives", "epoxy-grout"],
    v19: ["tile-adhesives", "pu-products"],
    v20: ["tile-adhesives"],
    v21: ["tile-cleaners", "tile-adhesives"],
    v22: ["epoxy-grout", "tile-adhesives"],
    v23: ["tile-adhesives", "tile-spacers"],
    v24: ["tile-adhesives", "epoxy-grout"],
    v25: ["tile-cleaners", "epoxy-grout", "tile-adhesives"],
    v26: ["tile-adhesives", "epoxy-grout"],
    v27: ["epoxy-grout", "tile-adhesives"],
    v28: ["tile-adhesives"],
    v29: ["tile-adhesives", "pu-products"],
    v30: ["tile-adhesives", "epoxy-grout"],
    v31: ["tile-adhesives"],
    v32: ["tile-adhesives", "pu-products"],
    v33: ["pu-products", "epoxy-grout", "tile-adhesives"],
    v34: ["tile-cleaners", "tile-adhesives"],
    v35: ["epoxy-grout", "tile-adhesives"],
    v36: ["tile-cleaners", "pu-products", "epoxy-grout"],
    v37: ["tile-adhesives", "tile-spacers"],
  };
  return {
    id: g.id,
    title: g.title,
    excerpt: g.description,
    category: categoryLabels[g.category] ?? g.category,
    relatedProductSlugs: related[g.id] ?? [],
    sections: g.sections,
    takeaways: g.takeaways,
  };
});

export function guidesForProductSlug(slug: string): SupportGuide[] {
  return supportGuides.filter((g) => g.relatedProductSlugs.includes(slug));
}

export { usageSteps, safetyNotes };
