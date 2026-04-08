import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProductGridWithFilter } from "@/components/products/ProductGridWithFilter";
import { ProductGuidanceSection } from "@/components/products/ProductGuidanceSection";
import { productCategories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cta, panelSurfaceClass, sectionBand } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "FIXONEX product hub — all ranges, simple filters, on-page guidance, and links to Support.",
};

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        importance="compact"
        title="FIXONEX products"
        subtitle="Every range in one place. Search by name, open a page for context, or use guidance below when you are not sure where to start."
      />
      <PageSection spacing="default" className="bg-muted">
        <SectionHeading
          eyebrow="Catalogue"
          title="Pick a range — we explain the job it is for"
          description="Each FIXONEX product page spells out where it belongs, what problem it solves, and what to watch on site."
          importance="primary"
          className="mb-8 max-w-2xl sm:mb-9"
        />
        <div className={panelSurfaceClass}>
          <ProductGridWithFilter products={productCategories} />
        </div>
      </PageSection>

      <ProductGuidanceSection visualWeight="featured" />

      <section className={cn("border-t border-border bg-canvas", sectionBand.tight)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="More help"
            title="Mixing, grout, safety, questions"
            description="Step-by-step articles and a searchable FAQ live on FIXONEX Support — linked from product pages when useful."
            importance="quiet"
            className="mb-5 max-w-lg sm:mb-6"
          />
          <Button asChild variant="outline" size="sm">
            <Link href="/support">{cta.goSupport}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
