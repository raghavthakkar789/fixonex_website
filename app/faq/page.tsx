import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { FaqWithFilters } from "@/components/faq/FaqWithFilters";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about FIXONEX products, surface suitability, ordering through dealers, and product enquiries.",
};

export default function FaqPage() {
  return (
    <>
      <PageBanner
        title="Frequently asked questions"
        subtitle="Product selection, surface suitability, dealer channels, and how to reach the FIXONEX product team."
      />
      <PageSection size="narrow">
        <FaqWithFilters />
      </PageSection>
    </>
  );
}
