import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { RecommendationWizard } from "@/components/get-help/RecommendationWizard";

export const metadata: Metadata = {
  title: "Get Help With Our Products",
  description:
    "Interactive FIXONEX product guidance: indoor/outdoor, moisture exposure, tile size, and material-based recommendations.",
};

export default function GetHelpPage() {
  return (
    <>
      <PageBanner
        title="Get help with our products"
        subtitle="Answer a short sequence of questions to orient your adhesive, grout, and accessory shortlist. Refine outcomes with our team before you lock specifications."
      />
      <PageSection>
        <RecommendationWizard />
      </PageSection>
    </>
  );
}
