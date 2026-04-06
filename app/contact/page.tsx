import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinksGrid } from "@/components/sections/SocialLinksGrid";
import { socialLinks } from "@/data/social";
import { companyInfo } from "@/data/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { proseInlineLinkClass } from "@/lib/ui-constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FIXONEX — enquiry form, phone, email, WhatsApp. Quick replies in plain language.",
};

export default function ContactPage() {
  const wa = `https://wa.me/${companyInfo.whatsappNumber}`;

  return (
    <>
      <PageBanner
        title="Contact"
        subtitle="Send the form, call, email, or WhatsApp — we answer with clear next steps."
      />
      <PageSection>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <ContactForm />
          </div>
          <aside className="min-w-0 space-y-6 lg:pt-1">
            <Card>
              <CardContent className="space-y-5 p-6 text-sm text-muted-foreground">
                <p className="font-heading text-sm font-semibold text-foreground">Direct</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Phone</p>
                  <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className={proseInlineLinkClass}>
                    {companyInfo.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Email</p>
                  <a href={`mailto:${companyInfo.email}`} className={proseInlineLinkClass}>
                    {companyInfo.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Hours</p>
                  <p className="leading-relaxed">{companyInfo.businessHours}</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
                <p className="text-xs leading-relaxed">
                  Registered office &amp; map:{" "}
                  <Link href="/about#office" className={proseInlineLinkClass}>
                    About
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">Social</p>
          <div className="mt-4">
            <SocialLinksGrid links={socialLinks} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
