export interface HowToVideoPlaceholder {
  id: string;
  title: string;
  description: string;
  /** Replace with your YouTube/Vimeo embed URL or hosted file */
  embedUrl: string | null;
  category:
    | "adhesives"
    | "grout"
    | "cleaning"
    | "safety"
    | "stone"
    | "glass-block";
}

export const howToVideos: HowToVideoPlaceholder[] = [
  {
    id: "v1",
    title: "Mixing and open time discipline for tile adhesive",
    description:
      "How to achieve a homogeneous mix, manage open time on warm days, and avoid over-retempering on site.",
    embedUrl: null,
    category: "adhesives",
  },
  {
    id: "v2",
    title: "Trowel selection and coverage check",
    description:
      "Why notch size matters for large-format tile and how to verify transfer to the back of the tile.",
    embedUrl: null,
    category: "adhesives",
  },
  {
    id: "v3",
    title: "Grouting sequence for commercial floors",
    description:
      "Joint packing, wash timing, and protection of adjacent trades during grout cure windows.",
    embedUrl: null,
    category: "grout",
  },
  {
    id: "v4",
    title: "Epoxy grout: batching and cleanup",
    description:
      "Working in teams, pot life awareness, and safe handling during application.",
    embedUrl: null,
    category: "grout",
  },
  {
    id: "v5",
    title: "Post-install cleaning without haze return",
    description:
      "Balancing grout cure protection with timely haze removal using FIXONEX cleaners.",
    embedUrl: null,
    category: "cleaning",
  },
  {
    id: "v6",
    title: "PPE and ventilation essentials",
    description:
      "Baseline site safety expectations when mixing powders, using epoxies, or applying PU systems.",
    embedUrl: null,
    category: "safety",
  },
];

export const usageSteps = [
  {
    step: 1,
    title: "Read the data sheet first",
    body: "Confirm substrate, exposure limits, mix ratios, and temperature bands before mobilizing crews.",
  },
  {
    step: 2,
    title: "Prepare substrates methodically",
    body: "Remove contaminants, verify flatness tolerances for large tile, and prime only when specified.",
  },
  {
    step: 3,
    title: "Control batching and logistics",
    body: "Mix to full bags where required, keep consistent water discipline, and stage materials to reduce idle mixed product.",
  },
  {
    step: 4,
    title: "Protect the work",
    body: "Sequence traffic, curing, and adjacent wet trades so fresh installations are not compromised.",
  },
];

export const safetyNotes = [
  "Use gloves and eye protection when handling cementitious powders and chemical systems.",
  "Provide ventilation in enclosed volumes, especially with reactive chemistries.",
  "Store bags and pails off damp floors; reseal partial units per label guidance.",
  "Keep children and unauthorized personnel away from active mixing areas.",
  "Dispose of empty containers per local regulations; never reuse food containers.",
];
