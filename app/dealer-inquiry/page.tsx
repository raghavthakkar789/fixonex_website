import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { DealerInquiryForm } from "@/components/forms/DealerInquiryForm";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dealer & Distributor Inquiry",
  description:
    "Partner with FIXONEX: distributor and dealer inquiries for stocking, territories, and contractor segments.",
};

export default function DealerInquiryPage() {
  return (
    <>
      <PageBanner
        title="Dealer & distributor inquiry"
        subtitle="Share your footprint, logistics capacity, and contractor segments. Our channel team follows up with qualification steps and territory alignment."
      />
      <PageSection size="narrow">
        <Card className="mb-10 border-primary/20">
          <CardContent className="p-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              FIXONEX partners with organizations that value documentation discipline, training alignment, and
              predictable SKU management. Specifier-only inquiries belong on the{" "}
              <Link href="/contact" className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                contact
              </Link>{" "}
              page.
            </p>
          </CardContent>
        </Card>
        <DealerInquiryForm />
      </PageSection>
    </>
  );
}
