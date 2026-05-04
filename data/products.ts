import type { ProductCategory } from "@/types";
import { productImageUrls } from "@/data/product-images";

export const productCategories: ProductCategory[] = [
  {
    slug: "tile-adhesives",
    familySlug: "tilesAdhesive",
    title: "Tile adhesives",
    image: productImageUrls.fix111,
    shortDescription:
      "FIXONEX bonds tile and stone properly — from simple indoor floors to large tiles, outdoor walls, and wet areas. Pick the grade that matches the job, not guesswork.",
    description:
      "FIXONEX tile adhesives hold your finish together. This range is made for situations where standard glue is not enough — larger tiles, exterior walls, or areas that see water. Better grip and stability mean fewer failures over time. Grades are marked on the pack so you know what you are buying.",
    idealUseCases: [
      "Homes — bathrooms, kitchens, living areas with ceramic or vitrified tile",
      "Feature walls and big tiles that need a strong, even bed",
      "Marble and granite where the wrong adhesive can stain the stone",
      "Balconies, wet rooms, and pools where rain or water is in play",
    ],
    indoorOutdoor:
      "Types 1–2 focus on interior wall/floor; Types 3–5 extend to exterior walls, large tiles, stone, pools, and tile-on-tile per classification.",
    dryWetSuitability:
      "Select C2TE / C2TES1 / C2TES2 grades for exteriors, immersed, and high-demand wet zones. Always match the declared class to substrate, exposure, and tile supplier guidance.",
    sizesApplication:
      "Usually 20 kg bags. Spread with a notched trowel sized to the tile; coverage depends on how flat the floor or wall is.",
    benefits: [
      "Clear step-up from C1T through C2TES2 for growing project complexity",
      "Performance is stated on pack and sheet for serious jobs",
      "Grey and white choices for visible joints and sensitive stone",
    ],
    usageNotes: [
      "Surface must be clean, solid, and flat enough before you start.",
      "Mix as the sheet says — do not add extra water or random additives.",
      "Let adhesive cure before grouting, heavy traffic, or filling a pool.",
    ],
    heroImageAlt: "FIXONEX tile adhesive",
    skus: [
      {
        name: "FIX (C1T) 111",
        image: productImageUrls.fix111,
        familySlug: "tiles-adhesive",
        subSlug: "fix-111",
        dimensions: { width: 2655, height: 4333 },
        variant: "Type 1 — grey",
        standards: "EN 12004: C1T | IS 15477:2019",
        application:
          "Suitable for fixing all types of ceramic tiles on interior wall and floor surfaces, and small / medium / regular sizes of vitrified tiles.",
        size: "20 kg",
      },
      {
        name: "FIX (C2T) 222",
        image: productImageUrls.fix222,
        familySlug: "tiles-adhesive",
        subSlug: "fix-222",
        dimensions: { width: 2655, height: 4333 },
        variant: "Type 2 — grey",
        standards: "EN 12004: C2T | IS 15477:2019",
        application:
          "Suitable for fixing all types of ceramic and vitrified tiles on interior wall and floor surfaces.",
        size: "20 kg",
      },
      {
        name: "FIX (C2TE) 333",
        image: productImageUrls.fix333,
        familySlug: "tiles-adhesive",
        subSlug: "fix-333",
        dimensions: { width: 2655, height: 4333 },
        variant: "Type 3 — grey / white",
        standards: "EN 12004: C2TE | IS 15477:2019",
        application:
          "Designed for interior and exterior wall installations of large-size ceramic tiles, vitrified tiles, semi-vitreous tiles, interior wall/floor surfaces, marble, granite, window sealing, door framing, natural stone, and tile-on-tile applications.",
        size: "20 kg",
      },
      {
        name: "FIX (C2TES1) 444",
        image: productImageUrls.fix444,
        familySlug: "tiles-adhesive",
        subSlug: "fix-444",
        dimensions: { width: 2655, height: 4333 },
        variant: "Type 4 — grey / white",
        standards: "EN 12004: C2TES1 | IS 15477:2019",
        application:
          "Designed for exterior wall installations of large-size ceramic tiles, vitrified tiles, semi-vitreous tiles, interior and external wall/floor surfaces, marble, granite, and natural stone.",
        size: "20 kg",
      },
      {
        name: "FIX (C2TES2) 555",
        image: productImageUrls.fix555,
        familySlug: "tiles-adhesive",
        subSlug: "fix-555",
        dimensions: { width: 2655, height: 4333 },
        variant: "Type 5 — grey / white",
        standards: "EN 12004: C2TES2 | IS 15477:2019",
        application:
          "Designed for exterior walls and all sizes of ceramic tile, vitrified tile, porcelain tile, marble, granite, natural stone, and swimming pool environments.",
        size: "20 kg",
      },
    ],
  },
  {
    slug: "block-joining-mortar",
    title: "Block joining mortar",
    image: productImageUrls.blockMortar,
    shortDescription:
      "FIXONEX thin-bed mortar for AAC and cellular concrete blocks — neat courses, solid joints, and less rework on fast-moving sites.",
    description:
      "FIXONEX block joining mortar is formulated for thin, even joints on AAC and cellular concrete blocks—inside or outside—enabling fast, reliable course adhesion for efficient progress, so each layer grips the next even on the quickest jobs.",
    idealUseCases: [
      "Residential and commercial block shells",
      "Partitions and infills where speed and straight joints matter",
      "Indoor and outdoor block walls built with a thin-bed method",
    ],
    indoorOutdoor: "Works indoors and outdoors when you follow normal curing and weather protection.",
    dryWetSuitability: "Keep rises and working time within safe limits; protect fresh work from rain as your engineer directs.",
    sizesApplication: "40 kg bags. Mix and spread per the sheet for bed thickness and open time.",
    benefits: [
      "Comfortable working time on busy sites",
      "No water curing round after the wall is up",
      "Economical placement with better grip between blocks",
    ],
    usageNotes: [
      "Do not rush lift height beyond what is approved.",
      "Keep courses level and plumb.",
      "Store bags dry and use within shelf life.",
    ],
    heroImageAlt: "Block wall with thin-bed mortar",
    skus: [
      {
        name: "Block joining mortar",
        image: productImageUrls.blockMortar,
        dimensions: { width: 2655, height: 4333 },
        application: "Thin-bed joints for AAC and cellular concrete blocks, indoor and outdoor walls.",
        size: "40 kg",
        extras: [
          "Comfortable working time",
          "No post-work water curing",
          "Fast placement",
          "Better adhesion course to course",
        ],
      },
    ],
  },
  {
    slug: "pu-products",
    title: "PU FIXO-999",
    image: productImageUrls.puFixo999,
    shortDescription:
      "FIXONEX PU FIXO-999 — two-part PU adhesive for panels, metal, glass, and other difficult surfaces that cement-based adhesives can’t handle.",
    description:
      "FIXONEX PU FIXO-999 is a multipurpose two-component polyurethane thin-set adhesive for fixing tiles and stone on interior and exterior walls and floors. It is suitable for various drywall and lightweight substrates including aluminium, plywood, metal, and glass—subject to system design and technical approval.",
    idealUseCases: [
      "Panel and board walls with movement",
      "Metal, aluminium, or glass interfaces after compatibility checks",
      "Indoor and outdoor floors and walls when the job calls for PU FIXO-999",
    ],
    indoorOutdoor: "Indoor and outdoor per project approval.",
    dryWetSuitability: "Constant underwater use only with clear sign-off from technical and waterproofing design.",
    sizesApplication: "5 kg kit (two parts). Mix full kits only; respect pot life.",
    benefits: [
      "Strong bond on difficult backs",
      "Declared R2TE class on pack where applicable",
      "Covers cases cement adhesives alone were not built for",
    ],
    usageNotes: [
      "Follow prep and primer in the published sequence.",
      "Train crew on two-part mixing and timing.",
      "Check primers and membranes before full-scale work.",
    ],
    heroImageAlt: "PU adhesive mixing",
    skus: [
      {
        name: "PU FIXO-999",
        image: productImageUrls.puFixo999,
        dimensions: { width: 3962, height: 3611 },
        variant: "Type 5 — R2TE",
        standards: "EN 12004: R2TE | IS 15477:2019",
        application:
          "Two-part PU for tile and stone on walls and floors; approved backgrounds include aluminium, plywood, metal, and glass systems.",
        size: "5 kg",
      },
    ],
  },
  {
    slug: "epoxy-grout",
    title: "Epoxy grout",
    image: productImageUrls.epoxyGrout,
    shortDescription:
      "FIXONEX epoxy grout — strong, stain-resistant joints for kitchens, shops, clinics, and pools. Easy to clean and stays looking good when installed right.",
    description:
      "Where cleaning is aggressive or water never leaves, ordinary grout can struggle. FIXONEX three-part epoxy grout gives dense joints and long-term stain resistance — with a colour range to match the tile. It needs correct timing and cleanup; plan the crew before you open the kit.",
    idealUseCases: [
      "Commercial kitchens, corridors, retail with heavy cleaning",
      "Pools and waterline work after system approval",
      "Premium bathrooms where owners expect the joint to age well",
    ],
    indoorOutdoor: "Indoor and outdoor where the rated exposure fits your detail.",
    dryWetSuitability: "Good for frequent wetting and scrubbing after full cure; check sensitive stone with the supplier.",
    sizesApplication: "1 kg and 5 kg kits. On hot days use small mixes to stay inside pot life.",
    benefits: [
      "Stain-resistant chemistry where maintenance is tough",
      "Wide colour choice",
      "Solid joints when applied and washed correctly",
    ],
    usageNotes: [
      "Plan labour and sequence before mixing.",
      "Some stone may need sealing first — follow supplier and FIXONEX notes.",
      "After cure, use cleaners that match the joint.",
    ],
    heroImageAlt: "Epoxy grout joint",
    colorTagline: "Engineered with advanced epoxy technology for long-lasting joint protection.",
    colorOptions: [
      { name: "Moon Light Grey", swatch: "#d6d3ce" },
      { name: "Mist Grey", swatch: "#9d9b97" },
      { name: "Fantasy Chocolate", swatch: "#6b5040" },
      { name: "Coco Brown", swatch: "#4a3529" },
      { name: "Quarry Red", swatch: "#a85c45" },
      { name: "Canova Red", swatch: "#8b3d35" },
      { name: "Jaisalmer Stone", swatch: "#c4a063" },
      { name: "Sahara Desert", swatch: "#d9bf9a" },
      { name: "Royal Red", swatch: "#722f2f" },
      { name: "Sky Blue", swatch: "#6baed6" },
      { name: "Urban Verde", swatch: "#5a7a5c" },
      { name: "Real Ivory", swatch: "#f0e8dc" },
      { name: "Wild Berry", swatch: "#7a3d58" },
      { name: "Ivory Pearl", swatch: "#e8e2d6" },
      { name: "Rum Berry", swatch: "#5c3240" },
      { name: "Basil Green", swatch: "#3f6b4e" },
      { name: "Deep Blue", swatch: "#1c3a5c" },
      { name: "Snow White", swatch: "#f4f4f4" },
      { name: "Zed Black", swatch: "#1a1a1a" },
      { name: "Ash Grey", swatch: "#8f8f8a" },
    ],
    skus: [
      {
        name: "Epoxy grout (3-part)",
        image: productImageUrls.epoxyGrout,
        dimensions: { width: 3883, height: 3817 },
        variant: "Stain-free system",
        application: "Floors, walls, pool areas, and busy spaces that need resilient joints.",
        size: "1 kg and 5 kg",
      },
    ],
  },
  {
    slug: "tile-cleaners",
    title: "Tile cleaner",
    image: productImageUrls.tileCleaner,
    shortDescription:
      "FIXONEX tile cleaner — clean tile and stone without attacking the finish — everyday and deep clean when diluted as directed.",
    description:
      "Harsh chemicals can dull glaze or harm grout. FIXONEX tile cleaner is meant to lift dirt and hygiene concerns on common ceramic, vitrified, granite, and sanitary surfaces when you dilute, dwell, and rinse per guidance.",
    idealUseCases: [
      "After handover cleaning of ceramic and vitrified floors",
      "Kitchens, bathrooms, and public corridors",
      "Indoor and outdoor wall and floor upkeep",
    ],
    indoorOutdoor: "Indoor and outdoor cured surfaces per label dilution.",
    dryWetSuitability: "Only on finished, cured tiling; follow dwell and rinse times.",
    sizesApplication: "Pack sizes on label; dilute per sheet for the task.",
    benefits: [
      "Lifts stains and supports hygiene when used as directed",
      "Helps preserve tile print and colour versus harsh generic chemicals",
      "Works across typical site materials when you check first",
    ],
    usageNotes: [
      "Trial a small hidden spot first.",
      "Keep away from children; read safety advice.",
      "Use gloves/PPE and ventilation as recommended.",
    ],
    heroImageAlt: "Tile cleaning",
    skus: [
      {
        name: "Tile cleaner",
        image: productImageUrls.tileCleaner,
        dimensions: { width: 2562, height: 5273 },
        extras: [
          "Removes stains",
          "Kills germs",
          "Preserves and maintains tile print and colour",
          "Ceramic, vitrified, granite, sanitary — walls and floors, indoor and outdoor",
          "Warning: keep out of the reach of children and pets",
        ],
      },
    ],
  },
  {
    slug: "tile-spacers",
    title: "Tile spacers",
    image: productImageUrls.tileSpacer,
    shortDescription:
      "FIXONEX tile spacers — precision spacers for consistent joints when fixing tiles and stone — 2 mm through 10 mm, white and yellow.",
    description:
      "FIXONEX tile spacers set joint width so grout fills evenly and the field reads clean. Use the size to your comfort — from fine mosaic to bold slabs.",
    idealUseCases: [
      "Homes and commercial floors where line matters",
      "Stacked or staggered patterns needing the same gap",
      "Sample rooms before full production",
    ],
    indoorOutdoor: "Indoor and outdoor layouts; remove before grouting if the spacer type says so.",
    dryWetSuitability: "Spacers are layout aids; final waterproofing and grout type define wet-area performance.",
    sizesApplication: "2 mm, 3 mm, 4 mm, 5 mm, 6 mm, 8 mm, and 10 mm; white and yellow.",
    benefits: [
      "Even joints — easier grout and cleaner sight lines",
      "Wide size range for small modules to large tile",
      "Matches FIXONEX adhesives and grouts for consistent system",
    ],
    usageNotes: [
      "Do not force spacers that twist or crack corners.",
      "Respect minimum joint width from the tile manufacturer.",
      "Dispose of site waste responsibly.",
    ],
    heroImageAlt: "Tile spacers",
    skus: [
      {
        name: "Tile spacers",
        image: productImageUrls.tileSpacer,
        application: "For fixing tiles and stones with proper, consistent joint spacing.",
        extras: ["Colours: white, yellow"],
      },
    ],
  },
];

export function getProductBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return productCategories.map((p) => p.slug);
}
