import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { DealerInquiryForm } from "@/components/forms/DealerInquiryForm";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Partner with FIXONEX — distributors and dealers: consistent supply, tender-ready documentation, and clear channel support.",
};

export default function PartnerPage() {
  return (
    <>
      <PageBanner
        title="Partner"
        subtitle="For distributors and project dealers who need repeatable batches, paperwork that stands up in review, and a team that answers when the job shifts."
      />
      <PageSection size="narrow">
        <p className="mb-10 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
          <span className="block font-medium text-foreground">Saath chalenge. Saath badhenge.</span>
          <span className="block">
            Share your territory, customer mix, and how you sell — we respond with a concrete next step. Product or site
            questions without a channel discussion belong on{" "}
          <Link
            href="/contact"
            className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Contact
          </Link>
          .
          </span>
        </p>

        <SectionHeading
          eyebrow="Channel value"
          title="Why dealers stay with FIXONEX"
          description="What you can tell a specifier or foreman after the first truck leaves."
          className="mb-8 max-w-2xl"
        />
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {[
            "Batches crews learn to trust — less variation, fewer arguments on site",
            "Labels and data sheets you can attach without rewriting",
            "A line to us when exposure, stone, or logistics change mid-job",
            "Room to build repeat business in your patch",
          ].map((line) => (
            <Card key={line}>
              <CardContent className="flex gap-3 p-4 text-sm text-foreground">
                <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>{line}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <SectionHeading
          eyebrow="Inquiry"
          title="Partnership request"
          description="Tell us about your business — territory, warehouse or shop footprint, and typical contractor segments."
          className="mb-6 max-w-2xl"
        />
        <DealerInquiryForm />
      </PageSection>
    </>
  );
}
