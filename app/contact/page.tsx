import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { companyInfo } from "@/data/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const linkClass =
  "font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact FIXONEX for product inquiries, technical data, and dealer information.",
};

export default function ContactPage() {
  const wa = `https://wa.me/${companyInfo.whatsappNumber}`;

  return (
    <>
      <PageBanner
        title="Contact us"
        subtitle="Send a structured inquiry or reach us directly. Technical questions are routed to the right representative."
      />
      <PageSection>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <ContactForm />
          </div>
          <div className="min-w-0 space-y-6">
            <Card>
              <CardContent className="space-y-5 p-6 text-sm text-muted-foreground">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Phone</p>
                  <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className={linkClass}>
                    {companyInfo.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Email</p>
                  <a href={`mailto:${companyInfo.email}`} className={linkClass}>
                    {companyInfo.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Hours</p>
                  <p className="leading-relaxed">{companyInfo.businessHours}</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    Message on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/connect">All social &amp; direct links</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageSection>
    </>
  );
}
