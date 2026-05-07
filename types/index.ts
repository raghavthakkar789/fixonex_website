export type ProductCategorySlug =
  | "tile-adhesives"
  | "block-joining-mortar"
  | "pu-products"
  | "epoxy-grout"
  | "tile-cleaners"
  | "tile-spacers";

export interface ProductColorOption {
  name: string;
  /** CSS colour value (e.g. hex) shown beside the name */
  swatch: string;
}

export interface ProductSku {
  /** Primary product name / code shown as heading */
  name: string;
  image?: string;
  /** e.g. Type 1, grey */
  variant?: string;
  standards?: string;
  application?: string;
  size?: string;
  /** Advantages, warnings, taglines — rendered as bullets */
  extras?: string[];
  dimensions?: { width: number; height: number };
  familySlug?: string;
  subSlug?: string;
}

export interface ProductCategory {
  slug: ProductCategorySlug;
  title: string;
  image?: string;
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
  /** Named colour options (e.g. epoxy grout range), with optional swatch for UI */
  colorOptions?: ProductColorOption[];
  /** Optional tagline under colour list */
  colorTagline?: string;
  familySlug?: string;
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
  icon: "instagram" | "linkedin" | "facebook" | "whatsapp";
  /** When true, the icon button is rendered but non-interactive
   *  (e.g. a profile that hasn't been published yet). */
  disabled?: boolean;
}
