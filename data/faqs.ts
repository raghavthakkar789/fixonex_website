import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    id: "1",
    category: "products",
    question: "How do I choose between standard tile adhesive and a polymer-modified grade?",
    answer:
      "Start with substrate type, tile size, and exposure. Standard beds on stable interior drywall or plaster may use a baseline cementitious adhesive when tile and joint widths are moderate. Polymer-modified grades improve adhesion and flexibility for exteriors, wet areas, large-format tile, and substrates with higher movement risk. If you share your scenario, our team can shortlist compatible FIXONEX lines.",
  },
  {
    id: "2",
    category: "surfaces",
    question: "Can I install large-format tile on a plywood subfloor?",
    answer:
      "Only when the assembly is engineered to limit deflection and the substrate is prepared per manufacturer and code guidance—often involving overlays, decoupling strategies, or alternative substrates. Adhesive class and trowel sizing must match tile weight and flatness tolerances. Request product guidance if your drawings specify large panels over timber.",
  },
  {
    id: "3",
    category: "products",
    question: "What is the difference between cementitious grout and epoxy grout?",
    answer:
      "Cementitious grouts are economical, widely used, and appropriate for many commercial and residential joints when exposure and cleaning regimes are moderate. Epoxy grouts offer very low absorption and strong chemical resistance when mixed and placed correctly—common in commercial kitchens and aggressive cleaning environments. Cost, crew skill, and maintenance plan should drive the choice.",
  },
  {
    id: "4",
    category: "consultation",
    question: "What happens after I book a consultation?",
    answer:
      "We confirm your preferred contact channel, review your project type and timeline, and connect you with a product specialist. FIXONEX supplies materials only—we do not perform installation or site work. For complex applications we may request substrate details, tile schedules, or photos. You receive written guidance on compatible FIXONEX product shortlists and data-sheet references for your specifier or contractor.",
  },
  {
    id: "5",
    category: "support",
    question: "Do you provide on-site visits or installation?",
    answer:
      "No. FIXONEX sells products only; we do not dispatch teams for on-site work or installation. Use the contact form or phone for product selection, technical data sheets, and compatibility questions—we respond remotely.",
  },
  {
    id: "6",
    category: "surfaces",
    question: "How should I prepare a wet room before tiling?",
    answer:
      "Wet rooms require a tanked envelope with correctly detailed penetrations, falls to drain, and movement accommodation at perimeters. Adhesive and grout selection must align with immersion and cleaning agents in use. We can recommend compatible FIXONEX product lines against your waterproofing specification and detail drawings—execution remains with your licensed contractor.",
  },
  {
    id: "7",
    category: "products",
    question: "Can marble be fixed with the same adhesive as ceramic tile?",
    answer:
      "Not always. Light and translucent stones are sensitive to staining and moisture transport from gray adhesives. FIXONEX recommends white or specialty stone adhesives with guidance from the stone supplier. Always verify compatibility and perform a mock-up when aesthetics are critical.",
  },
  {
    id: "8",
    category: "support",
    question: "Where can I find safety and technical data?",
    answer:
      "Safety handling, storage, and first-aid information accompany product shipments and can be provided digitally on request. Technical data sheets outline mix ratios, open time, coverage guidance, and limitations. For submittal packages, email our team with the list of SKUs.",
  },
  {
    id: "9",
    category: "consultation",
    question: "Do you work with dealers and distributors?",
    answer:
      "Yes. We partner with stocking distributors and project dealers who serve contractor networks. Use the dealer inquiry page to share your business profile, territories, and logistics capabilities. Our team evaluates fit and follow-up steps.",
  },
  {
    id: "10",
    category: "products",
    question: "How long should adhesive cure before grouting?",
    answer:
      "Cure time depends on product line, substrate porosity, ambient temperature, and tile coverage. As a discipline, follow the technical data sheet for the specific FIXONEX adhesive—not generic rules of thumb. Premature grouting can lock in moisture and weaken the assembly.",
  },
];

export function faqsByCategory(category: FaqItem["category"]): FaqItem[] {
  return faqs.filter((f) => f.category === category);
}
