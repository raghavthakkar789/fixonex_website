export type ProductCategorySlug =
  | "tile-adhesives"
  | "block-joining-mortar"
  | "pu-products"
  | "epoxy-grout"
  | "tile-cleaners"
  | "tile-spacers";

export interface ProductSku {
  /** Primary product name / code shown as heading */
  name: string;
  /** e.g. Type 1, grey */
  variant?: string;
  standards?: string;
  application?: string;
  size?: string;
  /** Advantages, warnings, taglines — rendered as bullets */
  extras?: string[];
}

export interface ProductCategory {
  slug: ProductCategorySlug;
  title: string;
  shortDescription: string;
  description: string;
  idealUseCases: string[];
  indoorOutdoor: string;
  dryWetSuitability: string;
  sizesApplication: string;
  benefits: string[];
  usageNotes: string[];
  heroImageAlt: string;
  /** Detailed catalogue lines (SKUs) for this category */
  skus?: ProductSku[];
  /** Named colour options (e.g. epoxy grout range) */
  colorOptions?: string[];
  /** Optional tagline under colour list */
  colorTagline?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "products" | "surfaces" | "consultation" | "support";
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  sector: string;
  description: string;
  imageAlt: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  /** Lucide icon name key */
  icon: "instagram" | "linkedin" | "youtube" | "facebook" | "whatsapp";
}

export type HelpEnvironment = "indoor" | "outdoor";
export type HelpMoisture = "dry" | "wet" | "immersed";
export type HelpTileSize = "small" | "medium" | "large" | "heavy";
export type HelpMaterial =
  | "ceramic-porcelain"
  | "natural-stone"
  | "glass-block"
  | "mixed";

export interface HelpRecommendationRule {
  id: string;
  match: Partial<{
    environment: HelpEnvironment;
    moisture: HelpMoisture;
    tileSize: HelpTileSize;
    material: HelpMaterial;
  }>;
  productSlugs: ProductCategorySlug[];
  headline: string;
  rationale: string;
}
