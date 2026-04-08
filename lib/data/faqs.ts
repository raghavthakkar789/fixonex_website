export type FAQ = {
  question: string;
  answer: string;
  category: "general" | "application" | "product" | "safety";
};

export const faqs: FAQ[] = [
  {
    question: "How do I choose the right adhesive for my tiles?",
    answer: "Start with tile size, substrate, and exposure conditions. If moisture, heat, or movement risk is high, use performance-grade adhesive and ask for recommendation before purchase.",
    category: "general",
  },
  {
    question: "Can I use one product for both floor and wall?",
    answer: "Not always. Wall applications need better anti-slip performance while floors may need higher compressive stability. Match product to placement for reliable results.",
    category: "product",
  },
  {
    question: "How much time should I allow before grouting?",
    answer: "Follow the product data sheet, but most installations need adequate cure time before grouting. Rushing this stage can compromise bond and final finish.",
    category: "application",
  },
  {
    question: "Do I need waterproofing before bathroom tiling?",
    answer: "Yes, especially for wet zones. Waterproofing helps prevent seepage, protects substrate, and extends tile assembly life.",
    category: "general",
  },
  {
    question: "What is the ideal surface preparation before application?",
    answer: "The surface must be clean, firm, and free from dust, oil, and weak material. Correct surface preparation is often the difference between a quick fix and lasting performance.",
    category: "application",
  },
  {
    question: "Can FIXONEX products handle outdoor weather exposure?",
    answer: "Selected ranges are designed for external use. Always verify exposure rating and movement tolerance in technical details before application.",
    category: "product",
  },
  {
    question: "How do I avoid tile lippage and hollow sounds?",
    answer: "Use correct trowel notch, maintain proper adhesive bed, and ensure full back contact where required. Good leveling practices and open-time control are critical.",
    category: "application",
  },
  {
    question: "Is personal protective equipment required during use?",
    answer: "Yes. Use gloves, eye protection, and dust control during mixing and application. Follow all safety instructions on packaging and technical sheets.",
    category: "safety",
  },
  {
    question: "How should adhesives be stored on site?",
    answer: "Store in dry, ventilated areas away from direct moisture and heat. Keep packs sealed and stacked as recommended.",
    category: "safety",
  },
  {
    question: "What if a product is not available in my city?",
    answer: "Our team can route through nearby dealer networks and suggest nearest alternatives without compromising application suitability.",
    category: "general",
  },
  {
    question: "How do I estimate material quantity for a project?",
    answer: "Material depends on surface evenness, tile size, notch depth, and wastage factor. Share project details and get an accurate recommendation from our team.",
    category: "general",
  },
  {
    question: "How do I dispose of leftover material safely?",
    answer: "Do not flush material into drains. Follow local disposal norms and product safety guidance for responsible waste handling.",
    category: "safety",
  },
];
