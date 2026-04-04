import type { ProductCategory } from "@/types";

export const productCategories: ProductCategory[] = [
  {
    slug: "tile-adhesives",
    title: "Tile adhesives",
    shortDescription:
      "FIXONEX FIX series: C1T through C2TES2 grey/white cementitious adhesives for ceramics, vitrified tile, stone, and demanding façades.",
    description:
      "The FIX range covers interior and exterior wall and floor fixing—from standard ceramics and vitrified tile to large-format ceramics, marble, granite, natural stone, swimming pools, and tile-on-tile. Each grade is aligned to EN 12004 and IS 15477:2019 classifications as marked on the pack and technical data sheet.",
    idealUseCases: [
      "Interior walls and floors with ceramic or vitrified tile",
      "Large-format ceramics and vitrified panels on interior or exterior walls",
      "Marble, granite, and natural stone where the specified FIX grade applies",
      "Exposed façades, wet areas, and swimming pools with C2TES-class systems",
    ],
    indoorOutdoor:
      "Types 1–2 focus on interior wall/floor; Types 3–5 extend to exterior walls, large tiles, stone, pools, and tile-on-tile per classification.",
    dryWetSuitability:
      "Select C2TE / C2TES1 / C2TES2 grades for exteriors, immersed, and high-demand wet zones. Always match the declared class to substrate, exposure, and tile supplier guidance.",
    sizesApplication:
      "Standard pack: 20 kg bags. Apply with notched trowels per specification; coverage depends on trowel, tile flatness, and substrate.",
    benefits: [
      "Clear step-up from C1T through C2TES2 for growing project complexity",
      "Documented alignment with EN 12004 and IS 15477:2019 where stated",
      "Grey and white options on selected grades for visible joints and stone",
    ],
    usageNotes: [
      "Prepare substrates clean, sound, and flat within tolerance before fixing.",
      "Do not change mix ratios or add unapproved additives.",
      "Allow adequate cure before grouting, trafficking, or filling pools.",
    ],
    heroImageAlt: "FIXONEX FIX tile adhesive bags for professional tiling",
    skus: [
      {
        name: "FIX (C1T) 111",
        variant: "Type 1 — grey adhesive",
        standards: "EN 12004: C1T | IS 15477:2019",
        application:
          "Suitable for fixing all types of ceramic tiles on interior wall and floor surfaces, and small / medium / regular sizes of vitrified tiles.",
        size: "20 kg",
      },
      {
        name: "FIX (C2T) 222",
        variant: "Type 2 — grey adhesive",
        standards: "EN 12004: C2T | IS 15477:2019",
        application:
          "Suitable for fixing all types of ceramic and vitrified tiles on interior wall and floor surfaces.",
        size: "20 kg",
      },
      {
        name: "FIX (C2TE) 333",
        variant: "Type 3 — grey / white adhesive",
        standards: "EN 12004: C2TE | IS 15477:2019",
        application:
          "Designed for interior and exterior wall installations of large-size ceramic tiles, vitrified tiles, semi-vitreous tiles, interior wall/floor surfaces, marble, granite, window sealing, door framing, natural stone, and tile-on-tile applications.",
        size: "20 kg",
      },
      {
        name: "FIX (C2TES1) 444",
        variant: "Type 4 — grey / white adhesive",
        standards: "EN 12004: C2TES1 | IS 15477:2019",
        application:
          "Designed for exterior wall installations of large-size ceramic tiles, vitrified tiles, semi-vitreous tiles, interior and external wall/floor surfaces, marble, granite, and natural stone.",
        size: "20 kg",
      },
      {
        name: "FIX (C2TES2) 555",
        variant: "Type 5 — grey / white adhesive",
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
    shortDescription:
      "Thin-bed mortar for AAC and cellular concrete blocks — interior and exterior block work.",
    description:
      "FIXONEX block joining mortar is formulated for preparing thin-bed mortar beds when laying AAC and cellular concrete blocks. It is suited to efficient site progress with reliable adhesion between courses.",
    idealUseCases: [
      "AAC block walls in residential and commercial shells",
      "Cellular concrete block partitions and infills",
      "Interior and exterior block work where a thin-bed system is specified",
    ],
    indoorOutdoor: "Suitable for interior and exterior block masonry per method statement.",
    dryWetSuitability:
      "Use in accordance with structural and weather-protection sequencing; follow packaging guidance for open time and protection during cure.",
    sizesApplication: "40 kg bags. Mix and place per technical instructions for bed thickness and open time.",
    benefits: [
      "Long working time for crew productivity",
      "No water curing required after block work is complete",
      "Economical, fast placement with improved adhesion between blocks",
    ],
    usageNotes: [
      "Do not exceed lift height or open time without engineer approval.",
      "Keep courses level and within plumb tolerance.",
      "Store bags dry and use within the stated shelf life.",
    ],
    heroImageAlt: "AAC block wall installation with thin-bed mortar",
    skus: [
      {
        name: "Block joining mortar",
        application:
          "For interior and exterior use when preparing thin-bed block mortar for AAC and cellular concrete blocks.",
        size: "40 kg",
        extras: [
          "Long working time",
          "No curing required after block work is done",
          "Fast and economical",
          "Improved adhesion between two blocks",
        ],
      },
    ],
  },
  {
    slug: "pu-products",
    title: "PU FIXO-999",
    shortDescription:
      "Two-component polyurethane thin-set adhesive (R2TE) for tile and stone on demanding substrates including metal, glass, and drywall.",
    description:
      "PU FIXO-999 is a multipurpose two-component polyurethane thin-set adhesive for fixing tiles and stone on interior and exterior walls and floors. It is suitable for various drywall and lightweight substrates including aluminium, plywood, metal, and glass—subject to system design and technical approval.",
    idealUseCases: [
      "Drywall and panel substrates where flexible bonding is required",
      "Interfaces involving metal, aluminium, or glass backings after compatibility checks",
      "Exterior and interior walls/floors where R2TE-class performance is specified",
    ],
    indoorOutdoor: "Interior and exterior use per classification and project details.",
    dryWetSuitability:
      "Confirm immersed or permanently wet service with FIXONEX technical data and waterproofing design.",
    sizesApplication: "5 kg kit (two-component). Mix only complete kits; observe pot life.",
    benefits: [
      "High-performance PU bond for non-standard substrates",
      "R2TE classification under EN 12004 | IS 15477:2019 (Type 5)",
      "Addresses metal, glass, and panel scenarios conventional cement adhesives cannot cover alone",
    ],
    usageNotes: [
      "Surface preparation and primer selection must follow the published sequence.",
      "Train crews on two-part mixing discipline and timing.",
      "Validate compatibility with substrate coatings and membranes before full scale-up.",
    ],
    heroImageAlt: "Two-component PU adhesive mixing for tile installation",
    skus: [
      {
        name: "PU FIXO-999",
        variant: "Type 5 — R2TE",
        standards: "EN 12004: R2TE | IS 15477:2019",
        application:
          "Multipurpose two-component polyurethane thin-set adhesive for fixing tiles and stone on interior and exterior wall and floor surfaces; suitable for various drywall substrates including aluminium, plywood, metal, and glass.",
        size: "5 kg",
      },
    ],
  },
  {
    slug: "epoxy-grout",
    title: "Epoxy grout",
    shortDescription:
      "Three-part stain-free epoxy grout for residential and commercial floors, walls, pools, and high-traffic areas.",
    description:
      "FIXONEX epoxy grout is supplied as a three-part stain-free system for durable, low-absorption joints. It suits aggressive cleaning regimes, underwater areas such as swimming pools, and high-traffic commercial surfaces when installed to manufacturer instructions.",
    idealUseCases: [
      "Commercial kitchens, corridors, and retail with intensive cleaning",
      "Swimming pools and waterline details after full system sign-off",
      "Premium residential wet rooms seeking long-term stain resistance",
    ],
    indoorOutdoor: "Interior and exterior applications where the system is rated for your exposure.",
    dryWetSuitability:
      "Designed for saturated and frequently cleaned environments once fully cured; verify stone sealing requirements with the stone supplier.",
    sizesApplication: "Available in 1 kg and 5 kg kits. Mix small batches on warm sites to manage pot life.",
    benefits: [
      "Stain-free three-part epoxy technology for long-lasting joint protection",
      "Broad designer colour palette for coordinated finishes",
      "Dense joints when placement and cleaning phases are executed correctly",
    ],
    usageNotes: [
      "Epoxy is time-critical—plan crew size and sequence before mixing.",
      "Sensitive natural stone may require pre-sealing per stone supplier + FIXONEX data.",
      "Use only compatible maintenance cleaners after cure.",
    ],
    heroImageAlt: "Epoxy grout installation for commercial tile joints",
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
        variant: "Stain-free system",
        application:
          "Interior and exterior residential and commercial floor and wall surfaces, underwater areas such as swimming pools, and high-traffic zones.",
        size: "1 kg and 5 kg",
      },
    ],
  },
  {
    slug: "tile-cleaners",
    title: "Tile cleaner",
    shortDescription:
      "Removes stains, kills germs, and helps preserve tile print and colour across ceramics, vitrified tile, granite, and sanitaryware.",
    description:
      "FIXONEX tile cleaner is formulated for routine and deep cleaning of finished tile and stone surfaces. It targets stains and hygiene while respecting factory finishes when used as directed.",
    idealUseCases: [
      "Post-handover cleaning of ceramic and vitrified floors",
      "Granite and sanitaryware in bathrooms and kitchens",
      "Interior and exterior wall and floor tile maintenance",
    ],
    indoorOutdoor: "Suitable for interior and exterior finished surfaces per label directions.",
    dryWetSuitability: "Use on cured, finished installations; follow rinse and dwell guidance.",
    sizesApplication: "Pack sizes as per SKU label; dilute and apply per technical data.",
    benefits: [
      "Removes stains and supports germ reduction when used as directed",
      "Helps preserve tile print and colour versus harsh generic chemicals",
      "Wide surface compatibility across common site finishes",
    ],
    usageNotes: [
      "Test on an inconspicuous area before full application.",
      "Keep out of reach of children.",
      "Use PPE and ventilation as indicated on the safety sheet.",
    ],
    heroImageAlt: "Professional tile and grout cleaning on installed flooring",
    skus: [
      {
        name: "Tile cleaner",
        extras: [
          "Removes stains",
          "Kills germs",
          "Preserves and maintains tile print and colour",
          "Can be used on ceramic tiles, vitrified tiles, granite, sanitaryware, wall and floor, interior and exterior",
          "Warning: keep out of the reach of children",
        ],
      },
    ],
  },
  {
    slug: "tile-spacers",
    title: "Tile spacers",
    shortDescription:
      "Precision spacers for consistent joints when fixing tiles and stone — 2 mm through 10 mm, white and yellow.",
    description:
      "FIXONEX tile spacers help installers maintain uniform joint width for grout performance and visual alignment. Multiple sizes support modular ceramics, vitrified tile, and stone layouts from fine joints to wider movement-tolerant courses.",
    idealUseCases: [
      "Grid layouts in residential and commercial tiling",
      "Stacked and staggered patterns needing repeatable joint width",
      "Site mock-ups and benchmark rooms before full production",
    ],
    indoorOutdoor: "Use on interior and exterior layouts; remove before grouting where the spacer type requires it.",
    dryWetSuitability:
      "Spacers are layout aids; final waterproofing and grout class define wet-area performance.",
    sizesApplication:
      "Available sizes: 2 mm, 3 mm, 4 mm, 5 mm, 6 mm, 8 mm, and 10 mm. Colours: white and yellow.",
    benefits: [
      "Predictable joint geometry for quality control",
      "Range of widths for small mosaic through large-format fields",
      "Pairs with FIXONEX adhesives and grouts",
    ],
    usageNotes: [
      "Do not force spacers that stress tile corners or lippage systems.",
      "Respect manufacturer minimum joint widths for large tiles.",
      "Dispose of site waste responsibly.",
    ],
    heroImageAlt: "Tile spacers maintaining joint width during floor installation",
    skus: [
      {
        name: "Tile spacers",
        application: "For fixing tiles and stones with proper, consistent spacing.",
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
