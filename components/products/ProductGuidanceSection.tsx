import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { RecommendationWizard } from "@/components/get-help/RecommendationWizard";
import { panelEditorialClass, panelMutedClass, sectionBand, sectionChapterGapClass } from "@/lib/ui-constants";

type ProductGuidanceSectionProps = {
  /** featured = second-highest weight on Products page */
  visualWeight?: "default" | "featured";
  /** Sit inside a parent gradient zone — no extra section shell or top rule */
  pageFlow?: boolean;
};

export function ProductGuidanceSection({ visualWeight = "default", pageFlow = false }: ProductGuidanceSectionProps) {
  const featured = visualWeight === "featured";
  const panelClass = pageFlow ? panelEditorialClass : panelMutedClass;

  return (
    <section
      id="product-guidance"
      className={cn(
        "scroll-mt-24",
        pageFlow
          ? cn("border-0 bg-transparent pb-0", sectionChapterGapClass)
          : cn("border-t border-border/40 bg-background", featured ? sectionBand.main : sectionBand.relaxed),
      )}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className={cn(panelClass, pageFlow && "border-border/40")}>
          <div className="min-w-0">
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
      </div>
    </section>
  );
}
