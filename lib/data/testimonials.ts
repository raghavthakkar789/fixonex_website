export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/** Credible roles; quotes reference real product/context (no generic praise). */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We specified FIX C2TES2 on a Jaipur facade after two failed imports. Joints stayed true through last monsoon—batch labels matched site samples.",
    name: "Kiran Mehta",
    role: "Site engineer · 14 years contracting",
  },
  {
    quote:
      "Epoxy grout on our showroom floor: colour matched the sample board, joints stayed stain-free six months into retail traffic—not ‘pretty words,’ repeatable.",
    name: "Ananya Retail",
    role: "Store owner · Ahmedabad",
  },
  {
    quote:
      "Our crew opens the same SKU every podium deck job. Drum-to-drum viscosity is predictable—less rework between pours.",
    name: "Vikram Solanki",
    role: "Foreman · commercial slabs",
  },
];
