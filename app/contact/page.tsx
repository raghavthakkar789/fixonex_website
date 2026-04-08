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
import {
  asideMicroHeadingClass,
  cta,
  panelSurfaceClass,
  proseInlineLinkClass,
} from "@/lib/ui-constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FIXONEX — form, phone, email, WhatsApp. Straight answers on products and projects.",
};

export default function ContactPage() {
  const wa = `https://wa.me/${companyInfo.whatsappNumber}`;

  return (
    <>
      <PageBanner
        importance="compact"
        title="Contact FIXONEX"
        subtitle="Use the form, call, email, or WhatsApp — a few details are enough for us to help."
      />
      <PageSection spacing="spacious" className="bg-canvas">
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mb-8">
          Share your project type, city, and what you need — we reply with clear next steps. For dealer programmes, use{" "}
          <Link href="/partner" className={proseInlineLinkClass}>
            Partner
          </Link>
          .
        </p>

        <div className="grid min-w-0 gap-7 sm:gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,24rem)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <div className={panelSurfaceClass}>
              <ContactForm />
            </div>
          </div>
          <aside className="min-w-0 lg:pt-0">
            <Card variant="quiet">
              <CardContent className="space-y-4 p-5 text-sm text-muted-foreground sm:space-y-5 sm:p-6">
                <p className={asideMicroHeadingClass}>Direct contact</p>
                <div>
                  <p className={asideMicroHeadingClass}>Phone</p>
                  <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className={proseInlineLinkClass}>
                    {companyInfo.phone}
                  </a>
                </div>
                <div>
                  <p className={asideMicroHeadingClass}>Email</p>
                  <a href={`mailto:${companyInfo.email}`} className={proseInlineLinkClass}>
                    {companyInfo.email}
                  </a>
                </div>
                <div>
                  <p className={asideMicroHeadingClass}>Hours</p>
                  <p className="leading-relaxed">{companyInfo.businessHours}</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    {cta.whatsApp}
                  </a>
                </Button>
                <p className="text-xs leading-relaxed">
                  Registered office &amp; map:{" "}
                  <Link href="/about#office" className={proseInlineLinkClass}>
                    About FIXONEX
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="mt-10 border-t border-border pt-7 sm:mt-12 sm:pt-8">
          <p className={asideMicroHeadingClass}>Social</p>
          <div className="mt-3">
            <SocialLinksGrid links={socialLinks} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
