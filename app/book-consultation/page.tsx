import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Request a FIXONEX product discussion: which adhesives, grouts, and accessories fit your specification. FIXONEX supplies products only and does not perform installation.",
};

export default function BookConsultationPage() {
  return (
    <>
      <PageBanner
        title="Book a consultation"
        subtitle="Share your project context and preferred time. A product specialist will follow up by phone or email. This is for product selection and documentation—not on-site installation work."
      />
      <PageSection size="narrow">
        <Card className="mb-8 border-primary/20">
          <CardContent className="p-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              We help shortlist FIXONEX adhesives, grouts, and accessories against your exposure, substrate, and finish
              schedule. Execution and labour remain with your contractor; we do not deploy installation crews.
            </p>
          </CardContent>
        </Card>
        <ConsultationForm />
      </PageSection>
    </>
  );
}
