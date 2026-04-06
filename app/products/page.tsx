import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProductGridWithFilter } from "@/components/products/ProductGridWithFilter";
import { ProductGuidanceSection } from "@/components/products/ProductGuidanceSection";
import { productCategories } from "@/data/products";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Products",
  description:
    "FIXONEX product hub — all ranges, filters, on-page guidance, and links to Support guides and FAQs.",
};

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        title="Products"
        subtitle="The full FIXONEX catalogue — filter by name, open any range for usage detail, or use guidance below when you want a narrowed list first."
      />
      <PageSection>
        <SectionHeading
          eyebrow="Catalogue"
          title="Every range in one grid"
          description="Each product page spells out where it belongs, exposure limits, and why crews reach for it — so you can defend the choice on site or in a tender."
          className="mb-10 max-w-2xl"
        />
        <ProductGridWithFilter products={productCategories} />
      </PageSection>

      <ProductGuidanceSection />

      <section className="border-t border-border bg-muted/40 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Deep help"
            title="Mixing, grout, safety, FAQs"
            description="When you need procedure-level notes or a searchable FAQ — Support keeps everything in one place, linked from product pages too."
            className="mb-6 max-w-2xl"
          />
          <Button asChild variant="outline">
            <Link href="/support">Open Support</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
