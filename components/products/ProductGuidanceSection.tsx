import { SectionHeading } from "@/components/sections/SectionHeading";
import { RecommendationWizard } from "@/components/get-help/RecommendationWizard";

export function ProductGuidanceSection() {
  return (
    <section id="product-guidance" className="scroll-mt-24 border-t border-border bg-muted/50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guidance"
          title="Find a starting range"
          description="Answer four questions — environment, moisture, tile scale, material — and we point you to the right product pages to read next."
          className="mb-10 max-w-2xl"
        />
        <RecommendationWizard />
      </div>
    </section>
  );
}
