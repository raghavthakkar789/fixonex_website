import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/data/company";

const linkClass =
  "font-medium text-primary underline-offset-2 transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export const metadata: Metadata = {
  title: "Company Information",
  description:
    "FIXONEX registered address at Narayan Exotica, Ahmedabad, customer care, email, hours, and map.",
};

export default function CompanyInfoPage() {
  const addr = companyInfo.registeredAddress;

  return (
    <>
      <PageBanner
        title="Company information"
        subtitle="Official contact points and location for SWASTIK ENTERPRISES / FIXONEX at Narayan Exotica, Ahmedabad."
      />
      <PageSection>
        <p className="mb-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Details are maintained in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">data/company.ts</code>.
          Update the map embed there if you switch to a Google Place embed URL.
        </p>

        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle>Registered address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p className="font-heading font-semibold text-foreground">{companyInfo.legalName}</p>
              <p>
                {addr.line1}
                <br />
                {addr.city}, {addr.state} {addr.postalCode}
                <br />
                {addr.country}
              </p>
              <Button variant="outline" asChild className="mt-2 w-full sm:w-auto">
                <a href={companyInfo.mapsLink} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader>
              <CardTitle>Direct contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
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
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Support</p>
                <a href={`mailto:${companyInfo.supportEmail}`} className={linkClass}>
                  {companyInfo.supportEmail}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Hours</p>
                <p className="leading-relaxed">{companyInfo.businessHours}</p>
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">Send an inquiry</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle>Location map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full min-h-[200px] overflow-hidden rounded-sm border border-border bg-muted">
                <iframe
                  title="FIXONEX location map"
                  src={companyInfo.mapsEmbedUrl}
                  className="h-full w-full min-h-[200px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                If the map does not load, verify the embed URL in{" "}
                <code className="rounded bg-muted px-1 font-mono text-[0.7rem]">data/company.ts</code>.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 rounded-sm border border-border bg-muted p-6 text-sm leading-relaxed text-muted-foreground">
          <p className="font-heading font-semibold text-foreground">Compliance note</p>
          <p className="mt-2">{companyInfo.certificationsNote}</p>
        </div>
      </PageSection>
    </>
  );
}
