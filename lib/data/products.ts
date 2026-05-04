import type { LucideIcon } from "lucide-react";
import { Droplets, Gem, Layers, Shield } from "lucide-react";
import { productImageUrls } from "@/data/product-images";

export type ProductColorSwatch = { name: string; hex: string };

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  type: string;
  badge: string;
  standard: string;
  applicationShort: string;
  application: string;
  whatItIs: string;
  whereToUse: string[];
  whyBenefits: Array<{ icon: LucideIcon; title: string; text: string }>;
  usageSteps: string[];
  sizesLine: string;
  variants: string[];
  colorSwatches?: ProductColorSwatch[];
  image: string;
  dimensions?: { width: number; height: number };
  familySlug?: string;
  subSlug?: string;
  relatedSlugs: string[];
};

export const epoxyGroutColors: ProductColorSwatch[] = [
  { name: "Moon Light Grey", hex: "#C8C4BE" },
  { name: "Mist Grey", hex: "#B0AEAA" },
  { name: "Fantasy Chocolate", hex: "#5D4037" },
  { name: "Coco Brown", hex: "#6D4C41" },
  { name: "Quarry Red", hex: "#A52A2A" },
  { name: "Canova Red", hex: "#B85450" },
  { name: "Jaisalmer Stone", hex: "#D4A574" },
  { name: "Sahara Desert", hex: "#C2956C" },
  { name: "Royal Red", hex: "#D32F2F" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Urban Verde", hex: "#5D8A6B" },
  { name: "Real Ivory", hex: "#EDE7DC" },
  { name: "Wild Berry", hex: "#8E4585" },
  { name: "Ivory Pearl", hex: "#F5F0E6" },
  { name: "Rum Berry", hex: "#7B3F5C" },
  { name: "Basil Green", hex: "#6B8E23" },
  { name: "Deep Blue", hex: "#1E3A5F" },
  { name: "Snow White", hex: "#F8F8F8" },
  { name: "Zed Black", hex: "#1A1A1A" },
  { name: "Ash Grey", hex: "#9E9E9E" },
];

export const products: CatalogProduct[] = [
  {
    id: "fix-111",
    slug: "fix-c1t-111",
    name: "FIX (C1T) 111",
    type: "Type-1 Grey Adhesive",
    badge: "Type-1 Adhesive",
    standard: "EN 12004: C1T | IS 15477:2019",
    applicationShort: "Standard ceramic tiles on interior walls and floors — 20 kg bags.",
    application:
      "Suitable for fixing all types of ceramic tiles on interior wall and floor surfaces, and small / medium / regular sizes of vitrified tiles.",
    whatItIs:
      "FIX (C1T) 111 is a cementitious tile adhesive for interior ceramic work and modest vitrified formats when C1T classification satisfies the specification.",
    whereToUse: [
      "Interior walls — bathrooms, kitchens, living areas with ceramic tile",
      "Interior floors with ceramic and small to regular vitrified tile",
      "Light commercial interiors where tile and substrate match Type-1 scope",
    ],
    whyBenefits: [
      { icon: Shield, title: "Certified formulation", text: "Performance aligned with EN 12004 C1T and IS 15477:2019." },
      { icon: Layers, title: "Reliable bedding", text: "Predictable mix and workability for confident fixing." },
      { icon: Gem, title: "Right grade", text: "Cost-effective where exposure and format are within Type-1 limits." },
    ],
    usageSteps: [
      "Prepare substrate: clean, solid, and dimensionally suitable.",
      "Mix with the stated water ratio to a smooth, workable paste.",
      "Spread with a notched trowel sized to the tile; maintain directional ribs.",
      "Bed tiles within open time, beat in, and cure before grouting or traffic.",
    ],
    sizesLine: "Available in: 20 kg",
    variants: ["Grey — 20 kg"],
    image: productImageUrls.fix111,
    dimensions: { width: 2655, height: 4333 },
    familySlug: "tiles-adhesive",
    subSlug: "fix-111",
    relatedSlugs: ["fix-c2t-222", "fix-c2te-333", "epoxy-grout"],
  },
  {
    id: "fix-222",
    slug: "fix-c2t-222",
    name: "FIX (C2T) 222",
    type: "Type-2 Grey Adhesive",
    badge: "Type-2 Adhesive",
    standard: "EN 12004: C2T | IS 15477:2019",
    applicationShort: "Ceramic and vitrified tiles on interior walls and floors — 20 kg.",
    application:
      "Suitable for fixing all types of ceramic and vitrified tiles on interior wall and floor surfaces.",
    whatItIs:
      "FIX (C2T) 222 delivers higher bond class than Type-1 for interior ceramic and vitrified installations that call for C2T-rated adhesion.",
    whereToUse: [
      "Interior walls and floors — ceramic and vitrified",
      "Homes and offices where consultants specify C2T",
      "Medium-format tile on prepared cementitious substrates",
    ],
    whyBenefits: [
      { icon: Layers, title: "C2T adhesion", text: "Step-up bond class for broader interior ceramic/vitrified use." },
      { icon: Shield, title: "Certified", text: "EN 12004 C2T and IS 15477:2019 for spec sheets and approvals." },
      { icon: Gem, title: "Installer-friendly", text: "Controlled consistency for clean ribs and bedding." },
    ],
    usageSteps: [
      "Check substrate flatness and porosity; prime if required.",
      "Mix batch-wise; allow slake if recommended before final mix.",
      "Comb adhesive uniformly; avoid skinning before tile placement.",
      "Protect curing bed from premature drying or water exposure.",
    ],
    sizesLine: "Available in: 20 kg",
    variants: ["Grey — 20 kg"],
    image: productImageUrls.fix222,
    dimensions: { width: 2655, height: 4333 },
    familySlug: "tiles-adhesive",
    subSlug: "fix-222",
    relatedSlugs: ["fix-c1t-111", "fix-c2te-333", "epoxy-grout"],
  },
  {
    id: "fix-333",
    slug: "fix-c2te-333",
    name: "FIX (C2TE) 333",
    type: "Type-3 Grey/White Adhesive",
    badge: "Type-3 Adhesive",
    standard: "EN 12004: C2TE | IS 15477:2019",
    applicationShort: "Large tiles, exteriors, stone, tile-on-tile — 20 kg.",
    application:
      "Designed for interior and exterior wall installations of large-size ceramic tiles, vitrified tiles, semi-vitreous tiles, interior wall/floor surfaces, marble, granite, window sealing, door framing, natural stone, and tile-on-tile applications.",
    whatItIs:
      "FIX (C2TE) 333 is a deformable, enhanced-adhesion adhesive for large-format tile and stone plus many exterior wall and tile-on-tile situations within its class.",
    whereToUse: [
      "Large-format ceramic and vitrified on walls and floors",
      "Exterior walls where C2TE suitability is confirmed for the assembly",
      "Marble, granite, and natural stone with compatible background preparation",
    ],
    whyBenefits: [
      { icon: Layers, title: "Deformable performance", text: "C2TE characteristics for movement-tolerant installations per declaration." },
      { icon: Droplets, title: "Extended application scope", text: "Interior/exterior wall coverage per classification — verify exposure with specs." },
      { icon: Shield, title: "Certified clarity", text: "EN 12004 C2TE and IS 15477:2019 on pack documentation." },
    ],
    usageSteps: [
      "Confirm movement joints, waterproofing, and tile vendor limits before fixing.",
      "Select grey or white to suit stone sensitivity and grout colour.",
      "Use correct trowel depth for large modules; back-butter if required.",
      "Protect open-bed adhesive from sun and wind until tiles are set.",
    ],
    sizesLine: "Available in: 20 kg",
    variants: ["Grey — 20 kg", "White — 20 kg"],
    image: productImageUrls.fix333,
    dimensions: { width: 2655, height: 4333 },
    familySlug: "tiles-adhesive",
    subSlug: "fix-333",
    relatedSlugs: ["fix-c2tes1-444", "fix-c2tes2-555", "epoxy-grout"],
  },
  {
    id: "fix-444",
    slug: "fix-c2tes1-444",
    name: "FIX (C2TES1) 444",
    type: "Type-4 Grey/White Adhesive",
    badge: "Type-4 Adhesive",
    standard: "EN 12004: C2TES1 | IS 15477:2019",
    applicationShort: "Exterior walls, large tiles, stone — 20 kg.",
    application:
      "Designed for exterior wall installations of large-size ceramic tiles, vitrified tiles, semi-vitreous tiles, interior and external wall/floor surfaces, marble, granite, and natural stone.",
    whatItIs:
      "FIX (C2TES1) 444 supports demanding façades and floors where C2TES1 performance is required — including large modules and natural stone on compatible builds.",
    whereToUse: [
      "Exterior walls with heavy tile, stone, or porcelain systems",
      "Interior/exterior floors requiring C2TES1 class per design",
      "Natural stone installations with suitable priming and movement design",
    ],
    whyBenefits: [
      { icon: Shield, title: "High performance class", text: "C2TES1 rating for specified exterior and heavy-duty assemblies." },
      { icon: Gem, title: "Stone-ready", text: "Suitable for marble and granite when workmanship matches TDS." },
      { icon: Droplets, title: "System approach", text: "Pair with correct grout, joints, and waterproofing for exposed areas." },
    ],
    usageSteps: [
      "Substrate flatness, anchors, and movement joints as per structural and tile designer input.",
      "Apply adhesive in workable lifts; maintain ridge geometry.",
      "Beat tiles to achieve transfer; check lippage while adhesive is fresh.",
      "Follow extended cure before shock, traffic, or wet commissioning.",
    ],
    sizesLine: "Available in: 20 kg",
    variants: ["Grey — 20 kg", "White — 20 kg"],
    image: productImageUrls.fix444,
    dimensions: { width: 2655, height: 4333 },
    familySlug: "tiles-adhesive",
    subSlug: "fix-444",
    relatedSlugs: ["fix-c2te-333", "fix-c2tes2-555", "pu-fixo-999"],
  },
  {
    id: "fix-555",
    slug: "fix-c2tes2-555",
    name: "FIX (C2TES2) 555",
    type: "Type-5 Grey/White Adhesive",
    badge: "Type-5 Adhesive",
    standard: "EN 12004: C2TES2 | IS 15477:2019",
    applicationShort: "Exteriors, large porcelain, pools, tile-on-tile — 20 kg.",
    application:
      "Designed for exterior walls and all sizes of ceramic tile, vitrified tile, porcelain tile, marble, granite, natural stone, and swimming pool environments.",
    whatItIs:
      "FIX (C2TES2) 555 is the maximum declared cementitious class in the range — for immersion, exteriors, large porcelain, and critical stone applications within its certification.",
    whereToUse: [
      "Swimming pools and constantly wet immersed surfaces when the full assembly complies",
      "Exterior façades with heavy format porcelain and stone",
      "Tile-on-tile renovation using compatible backgrounds",
    ],
    whyBenefits: [
      { icon: Droplets, title: "Immersion-ready class", text: "C2TES2 for submerged/wet zone projects subject to design review." },
      { icon: Shield, title: "Peak bond class", text: "Highest cementitious tier in the FIXONEX adhesive system." },
      { icon: Layers, title: "Large-format confidence", text: "Engineered bed for demanding modules and exposure." },
    ],
    usageSteps: [
      "Treat pool shells and tanks to manufacturer + TDS sequences for wet areas.",
      "Plan movement joints, water stops, and curing before filling.",
      "Use white or grey adhesive to suit stone translucency and finish.",
      "Extend cure times for immersed service before flood testing.",
    ],
    sizesLine: "Available in: 20 kg",
    variants: ["Grey — 20 kg", "White — 20 kg"],
    image: productImageUrls.fix555,
    dimensions: { width: 2655, height: 4333 },
    familySlug: "tiles-adhesive",
    subSlug: "fix-555",
    relatedSlugs: ["pu-fixo-999", "epoxy-grout", "fix-c2tes1-444"],
  },
  {
    id: "block-mortar",
    slug: "block-joining-mortar",
    name: "Block Joining Mortar",
    type: "AAC & Cellular Block Mortar",
    badge: "Masonry System",
    standard: "Engineered masonry mortar — refer pack TDS",
    applicationShort: "Thin-bed joints for AAC and cellular concrete blocks — 40 kg.",
    application:
      "For joining AAC blocks, cellular concrete, and lightweight masonry with thin, strong joints that support fast, plumb wall construction.",
    whatItIs:
      "Block Joining Mortar is a pre-mixed dry mortar designed for high productivity in AAC and cellular block walls with reliable bond and grip.",
    whereToUse: [
      "AAC / fly-ash / cellular block internal and external walls",
      "Residential and commercial block-infill where product TDS matches design",
      "Projects needing clean thin joints versus site-mixed mortar variance",
    ],
    whyBenefits: [
      { icon: Layers, title: "Consistent joints", text: "Factory blend for uniform strength and workability." },
      { icon: Gem, title: "Speed on site", text: "Rapid spreading and build height per good practice." },
      { icon: Shield, title: "Compatible system", text: "Pair with FIXONEX waterproofing and finishes as specified." },
    ],
    usageSteps: [
      "Level bed course; dampen blocks only as guidance allows.",
      "Mix to ribbonable consistency; avoid over-watering.",
      "Fill vertical joints fully; remove squeeze before skinning.",
      "Allow curing before loading, chases, or adhesive tiling.",
    ],
    sizesLine: "Available in: 40 kg",
    variants: ["40 kg bag"],
    image: productImageUrls.blockMortar,
    dimensions: { width: 2655, height: 4333 },
    relatedSlugs: ["fix-c2te-333", "tile-cleaner", "tile-spacer"],
  },
  {
    id: "pu-999",
    slug: "pu-fixo-999",
    name: "PU FIXO-999",
    type: "Two-Component PU Adhesive",
    badge: "PU Adhesive",
    standard: "Refer technical datasheet for declaration",
    applicationShort: "Critical bonds including metal, wood, and tile-on-tile — 5 kg unit.",
    application:
      "Two-component polyurethane adhesive for demanding elasticity and adhesion where cementitious systems are not specified — metal, wood, difficult substrates, and selected tile-on-tile builds per TDS.",
    whatItIs:
      "PU FIXO-999 chemically cures to a tough, flexible film, transferring stress for specialty substrates and retrofit tile overlays when engineering approves PU technology.",
    whereToUse: [
      "Metal or plywood backgrounds needing compliant PU fixing",
      "Tile-on-tile situations approved for PU chemistry",
      "Interfaces where movement tolerance exceeds cement-only scope",
    ],
    whyBenefits: [
      { icon: Layers, title: "Elastic bond", text: "PU toughness for dynamic backgrounds per application rules." },
      { icon: Gem, title: "Specialty grab", text: "Problem-solving adhesive alongside the cementitious range." },
      { icon: Droplets, title: "Two-part accuracy", text: "Metered mix for repeatable cure and strength." },
    ],
    usageSteps: [
      "Read TDS for ratios, pot life, and open time at ambient temperature.",
      "Mix Part A + Part B thoroughly; use batch-complete volumes.",
      "Apply within working window; press components for wet contact.",
      "Protect from traffic until cured; record batch for traceability.",
    ],
    sizesLine: "Available in: 5 kg",
    variants: ["5 kg kit"],
    image: productImageUrls.puFixo999,
    dimensions: { width: 3962, height: 3611 },
    relatedSlugs: ["fix-c2tes2-555", "epoxy-grout", "tile-spacer"],
  },
  {
    id: "epoxy",
    slug: "epoxy-grout",
    name: "Epoxy Grout",
    type: "3-Part Stain-Free Grout",
    badge: "Epoxy Grout",
    standard: "High performance epoxy grout — refer pack",
    applicationShort: "Stain-resistant joints — residential to immersed areas — 5 kg / 1 kg.",
    application:
      "Three-part epoxy grout for durable, hygienic, stain-resistant joints — residential kitchens and baths through commercial wet areas when the assembly is designed for epoxy.",
    whatItIs:
      "FIXONEX Epoxy Grout is a resin system that locks joints against stains and chemicals while supporting designer colour across the FIXONEX palette.",
    whereToUse: [
      "Kitchen, bathroom, and living spaces needing premium joint integrity",
      "Commercial and institutional wet zones per specifier approval",
      "Swimming pool and fountain finishes when epoxy is called for in the system",
    ],
    whyBenefits: [
      { icon: Gem, title: "20+ designer colours", text: "Palette from Snow White to Zed Black for coordinated interiors." },
      { icon: Shield, title: "Stain resistance", text: "Epoxy chemistry for aggressive spills and cleaning regimens." },
      { icon: Droplets, title: "Wet-area suitability", text: "Use with compatible adhesives and movement joints per TDS." },
    ],
    usageSteps: [
      "Ensure joints are clean, cured, and dimensionally stable before packing.",
      "Mix base, hardener, and filler exactly as ratios state.",
      "Pack diagonally across joints; sponge clean without dragging residue.",
      "Control cure temperature windows; protect from premature wash-down.",
    ],
    sizesLine: "Available in: 5 kg / 1 kg",
    variants: ["1 kg set", "5 kg set"],
    colorSwatches: epoxyGroutColors,
    image: productImageUrls.epoxyGrout,
    dimensions: { width: 3883, height: 3817 },
    relatedSlugs: ["fix-c2tes2-555", "tile-cleaner", "fix-c2te-333"],
  },
  {
    id: "cleaner",
    slug: "tile-cleaner",
    name: "Tile Cleaner",
    type: "Multi-surface Maintenance",
    badge: "Maintenance",
    standard: "Maintenance grade — follow label dilution",
    applicationShort: "Routine and deep cleaning for ceramic, vitrified, granite, and sanitary ware.",
    application:
      "Multi-surface tile maintenance product — dilute per task to lift soil and residues without harming glaze or grout when used as directed.",
    whatItIs:
      "FIXONEX Tile Cleaner helps maintain showroom appearance on finished tile and stone through controlled chemistry and correct dwell time.",
    whereToUse: [
      "Post-handover cleaning and periodic home maintenance",
      "Commercial corridors, bathrooms, and food-prep adjacencies per safety rules",
      "Outdoor cladding wash-down with rinsing as directed",
    ],
    whyBenefits: [
      { icon: Gem, title: "Finish-safe", text: "Respects most factory glazes when dilution is respected." },
      { icon: Droplets, title: "Flexible dilution", text: "Light clean to deeper scrub per guidance." },
      { icon: Shield, title: "Professional upkeep", text: "Part of a full FIXONEX install-and-care loop." },
    ],
    usageSteps: [
      "Test a discreet area; wear PPE and ventilate.",
      "Dilute per label; pre-wet absorbent joints on porous stone if advised.",
      "Agitate gently; rinse thoroughly to remove residues.",
      "Store sealed away from children and incompatible chemicals.",
    ],
    sizesLine: "Pack sizes on label",
    variants: ["As labelled"],
    image: productImageUrls.tileCleaner,
    dimensions: { width: 2562, height: 5273 },
    relatedSlugs: ["epoxy-grout", "tile-spacer", "fix-c1t-111"],
  },
  {
    id: "spacer",
    slug: "tile-spacer",
    name: "Tile Spacer",
    type: "2 mm – 10 mm",
    badge: "Tile Spacer",
    standard: "Layout accessory",
    applicationShort: "White & yellow spacers — 2 mm through 10 mm sizes.",
    application:
      "Precision spacers for consistent joint width when fixing tiles and stone — sizes from 2 mm to 10 mm in white and yellow for visibility on varied beds.",
    whatItIs:
      "FIXONEX Tile Spacers keep joints uniform so grout packs evenly and sight lines stay true from small mosaic modules to large slabs.",
    whereToUse: [
      "Wall and floor layouts needing uniform joint width",
      "Stacked, staggered, or grid patterns for QC alignment",
      "Indoor and outdoor fixing where spacer removal timing follows spec",
    ],
    whyBenefits: [
      { icon: Layers, title: "Even joints", text: "Predictable gaps for grout selection and stress design." },
      { icon: Gem, title: "Wide size range", text: "2–10 mm coverage for detail to bold grout lines." },
      { icon: Shield, title: "Pairs with system", text: "Designed alongside FIXONEX adhesives and epoxy grout." },
    ],
    usageSteps: [
      "Select spacer size to tile manufacturer minimum joint.",
      "Place square to intersections without twisting corners.",
      "Remove or snap per type before grout packs hard (if removable type).",
      "Dispose site waste responsibly after finishing.",
    ],
    sizesLine: "Various sizes — 2 mm to 10 mm",
    variants: ["2 mm – 10 mm — White", "2 mm – 10 mm — Yellow"],
    image: productImageUrls.tileSpacer,
    relatedSlugs: ["epoxy-grout", "fix-c2te-333", "tile-cleaner"],
  },
];

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getTileAdhesiveProducts(): CatalogProduct[] {
  return products.filter((p) => p.familySlug === "tiles-adhesive");
}

export function getTileAdhesiveBySubSlug(subSlug: string): CatalogProduct | undefined {
  return products.find((p) => p.familySlug === "tiles-adhesive" && p.subSlug === subSlug);
}
