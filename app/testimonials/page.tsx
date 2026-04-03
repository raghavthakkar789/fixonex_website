import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { testimonials } from "@/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Client and partner feedback on FIXONEX products, documentation, and dealer collaboration.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageBanner
        title="Testimonials"
        subtitle="Voices from retail programs, architecture practices, facilities teams, and distribution partners."
      />
      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-8">
                <p className="text-base text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="font-heading font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </>
  );
}
