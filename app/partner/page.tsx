import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { DealerInquiryForm } from "@/components/forms/DealerInquiryForm";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cta, panelSurfaceClass, proseInlineLinkClass } from "@/lib/ui-constants";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Partner with FIXONEX — distributors and dealers: steady supply, tender-ready documentation, and responsive channel support.",
};

export default function PartnerPage() {
  return (
    <>
      <PageBanner
        importance="compact"
        title="Partner with FIXONEX"
        subtitle="For distributors and project dealers who need consistent batches, paperwork that survives review, and a team that answers when the job changes direction."
      />
      <PageSection spacing="default" className="bg-muted">
        <p className="mb-7 max-w-xl space-y-2 text-sm leading-relaxed text-muted-foreground sm:mb-9">
          <span className="block font-medium text-foreground">Saath chalenge. Saath badhenge.</span>
          <span className="block">
            Share your territory, customer mix, and how you serve the market — we reply with a clear next step. One-off
            product questions without a channel conversation belong on{" "}
            <Link href="/contact" className={proseInlineLinkClass}>
              {cta.contactShort}
            </Link>
            .
          </span>
        </p>

        <SectionHeading
          eyebrow="Channel value"
          title="Why dealers stay with FIXONEX"
          description="Concrete points you can repeat to a specifier or site supervisor after the first delivery."
          importance="primary"
          className="mb-8 max-w-2xl sm:mb-10"
        />
        <div className="mb-10 grid gap-3 sm:mb-12 sm:grid-cols-2 sm:gap-4">
          {[
            "Material behaviour crews learn to trust — less batch-to-batch drama on site",
            "Labels and data sheets you can attach to a submittal without rewriting",
            "A FIXONEX line to call when exposure, stone, or logistics shifts mid-job",
            "Room to grow repeat business in your territory",
          ].map((line) => (
            <Card key={line} variant="quiet" className="bg-background">
              <CardContent className="flex gap-3 p-4 text-sm text-foreground sm:gap-3 sm:p-5">
                <Check className="h-5 w-5 shrink-0 text-subhead" aria-hidden />
                <span>{line}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={panelSurfaceClass}>
          <SectionHeading
            eyebrow="Inquiry"
            title="Partnership request"
            description="Tell us about your business — territory, warehouse or shop footprint, and which contractors you serve."
            importance="secondary"
            className="mb-6 max-w-2xl"
          />
          <div className="max-w-2xl">
            <DealerInquiryForm />
          </div>
        </div>
      </PageSection>
    </>
  );
}
