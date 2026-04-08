import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { RecommendationWizard } from "@/components/get-help/RecommendationWizard";
import { panelMutedClass, sectionBand } from "@/lib/ui-constants";

type ProductGuidanceSectionProps = {
  /** featured = second-highest weight on Products page */
  visualWeight?: "default" | "featured";
};

export function ProductGuidanceSection({ visualWeight = "default" }: ProductGuidanceSectionProps) {
  const featured = visualWeight === "featured";
  return (
    <section
      id="product-guidance"
      className={cn(
        "scroll-mt-24 border-t border-border bg-background",
        featured ? sectionBand.main : sectionBand.relaxed,
      )}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className={panelMutedClass}>
          <SectionHeading
            eyebrow="Guidance"
            title="Not sure which FIXONEX product fits?"
            description="Answer four everyday questions — inside or outside, dry or wet, tile size, and material — and we suggest sensible FIXONEX pages to read next."
            importance={featured ? "primary" : "default"}
            className={cn("mb-6 max-w-2xl sm:mb-8", featured && "sm:mb-9")}
          />
          <RecommendationWizard />
        </div>
      </div>
    </section>
  );
}
