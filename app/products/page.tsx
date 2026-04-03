import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { ProductGridWithFilter } from "@/components/products/ProductGridWithFilter";
import { productCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "FIXONEX products: FIX tile adhesives (C1T–C2TES2), block joining mortar, PU FIXO-999, epoxy grout, tile cleaner, and spacers.",
};

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        title="Our products"
        subtitle="Professional systems for ceramic and vitrified tile, stone, AAC block, and demanding interiors and exteriors. Open a category for catalogue detail and exposure notes."
      />
      <PageSection>
        <ProductGridWithFilter products={productCategories} />
      </PageSection>
    </>
  );
}
