import type { Metadata } from "next";

import Link from "next/link";

import { PageBanner } from "@/components/sections/PageBanner";

import { PageSection } from "@/components/layout/PageSection";

import { SectionHeading } from "@/components/sections/SectionHeading";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { BRAND } from "@/lib/brand";

import { cn } from "@/lib/utils";

import { asideMicroHeadingClass, cta, panelMutedClass, proseInlineLinkClass } from "@/lib/ui-constants";

import { companyInfo } from "@/data/company";

import { FOUNDERS_PLACEHOLDER } from "@/data/founders";

import { Check, Factory, Shield, Wrench } from "lucide-react";

import { ExpandableParagraphs } from "@/components/content/ExpandableParagraphs";

export const metadata: Metadata = {
  title: "About FIXONEX",

  description:
    "About FIXONEX — brand story, why teams standardise on the range, what we supply, vision and mission, leadership, and registered company details.",
};

export default function AboutPage() {
  const addr = companyInfo.registeredAddress;

  return (
    <>
      <PageBanner
        importance="compact"
        title="About FIXONEX"
        subtitle="Who we are, what we supply, why teams continue to specify FIXONEX, and where to verify the legal entity."
      />

      {/* Company introduction — highest narrative weight */}
      <PageSection spacing="spacious">
        <SectionHeading
          eyebrow="Brand"
          title="Installations that age as well as the design promised"
          description="FIXONEX builds construction chemical lines around disciplined supply — predictable batches, clear documentation, and answers when a tender or site condition changes."
          importance="primary"
          className="mb-8 max-w-3xl"
        />

        <ExpandableParagraphs
          className="max-w-3xl"
          previewCount={1}
          firstParagraphClassName="text-foreground"
          paragraphs={[
            `${BRAND.name} was founded on one idea: the finished tile work should look and perform years later, not only on opening day.`,
            "We have seen failures from the wrong line in the right room — usually from unclear guidance, not bad intent. FIXONEX invests in making exposure, stone risk, and product choice easier to defend.",
            "Contractors, dealers, architects, and owners receive direct answers on which FIXONEX product belongs on the delivery note for a given exposure.",
          ]}
        />
      </PageSection>

      {/* What we do — structural context before trust deep-dive */}
      <PageSection spacing="default" className="border-t border-border bg-muted">
        <div id="what-we-do" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Operations"
            title="What FIXONEX supplies and supports"
            description="Fixing systems sold through dealers, backed by technical documents and plain-language help."
            importance="secondary"
            className="mb-7 max-w-2xl"
          />

          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p className="text-foreground">
              Tile adhesives, block joining mortar, PU FIXO-999, epoxy grout, tile cleaner, and spacers — each FIXONEX line
              carries declared performance for jobs where guessing is not acceptable.
            </p>

            <ul className="list-inside list-disc space-y-2">
              <li>Channel support for distributors and project dealers</li>

              <li>Support articles for site questions · Contact for tenders or partnerships</li>

              <li>Growth programmes outlined on Partner</li>
            </ul>

            <Button asChild variant="outline" size="default" className="mt-4">
              <Link href="/products">{cta.browseCatalogue}</Link>
            </Button>
          </div>
        </div>
      </PageSection>

      {/* Why FIXONEX — co-primary trust */}
      <PageSection spacing="spacious" className="border-t border-border bg-background">
        <SectionHeading
          eyebrow="Trust"
          title="Why teams standardise on FIXONEX"
          description="What you gain when the material is explainable on site and supportable in a submittal."
          importance="primary"
          className="mb-10 max-w-2xl"
        />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {[
            {
              icon: Factory,
              title: "Predictable from bag to bag",
              body: "Consistent FIXONEX batches reduce on-site surprises and help finishing crews stay on rhythm.",
            },

            {
              icon: Shield,
              title: "The right line before failure appears",
              body: "We focus on exposure and compatibility early so rework, delays, and arguments shrink.",
            },

            {
              icon: Wrench,
              title: "Engineered for working sites",
              body: "Heat, dust, and schedule pressure are normal inputs — FIXONEX products are chosen with those realities in view.",
            },

            {
              icon: Check,
              title: "Documentation and language you can share",
              body: "Data sheets and guidance that specifiers, dealers, and foreman can read without translation layers.",
            },
          ].map((item) => (
            <Card key={item.title} variant="quiet" className="bg-background">
              <CardContent className="flex gap-3 p-5 sm:gap-4 sm:p-6">
                <item.icon className="h-10 w-10 shrink-0 text-subhead" aria-hidden />

                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection spacing="relaxed" className="border-t border-border bg-canvas">
        <SectionHeading
          eyebrow="Positioning"
          title="FIXONEX in the market"
          description="A concise company narrative for readers who need context after the practical summary above."
          importance="quiet"
          className="mb-7 max-w-3xl"
        />

        <ExpandableParagraphs
          className="max-w-3xl"
          previewCount={1}
          paragraphs={[
            "FIXONEX Adhesive is a construction chemicals brand focused on tile adhesives, epoxy jointing, and related fixing products for contemporary building and interior work. Drawing on more than a decade around tiles and ceramics, FIXONEX combines technical grounding with field feedback.",
            "Formulations target dependable bonding, service life, and honest labelling — so architects, contractors, and installers can match SKU to substrate, format, and exposure.",
            "The aim is straightforward: equip professionals with dependable FIXONEX products and guidance that keep installations serviceable and visually sound across years of use.",
          ]}
        />
      </PageSection>

      <PageSection spacing="compact" className="border-t border-border bg-background">
        <SectionHeading
          eyebrow="Direction"
          title="Vision and mission"
          description="Two statements you can forward to a partner or specifier when they ask where FIXONEX is headed."
          importance="quiet"
          className="mb-6 max-w-2xl"
        />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card variant="quiet" className="border-border bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Vision</CardTitle>
            </CardHeader>

            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              <p>
                To be the FIXONEX name professionals associate with dependable tile installation systems — adhesives and
                joint solutions that hold under real exposure and stay understandable on site and on paper.
              </p>
            </CardContent>
          </Card>

          <Card variant="quiet" className="border-border bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Mission</CardTitle>
            </CardHeader>

            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              <p>
                With longstanding exposure to ceramics and construction sites, FIXONEX supplies tile adhesive, epoxy, and
                companion lines that protect tile performance and appearance. We combine controlled manufacturing,
                steady innovation, and dealer support so architects, contractors, and distributors receive installation
                materials they can specify with confidence.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection spacing="compact" className="border-t border-border bg-background">
        <SectionHeading
          title={FOUNDERS_PLACEHOLDER.heading}
          description="Leadership profiles will appear here once names, roles, and imagery are final."
          importance="quiet"
          className="mb-5 max-w-2xl"
        />

        <div className={cn("max-w-3xl text-sm leading-relaxed text-muted-foreground", panelMutedClass)}>
          <p>{FOUNDERS_PLACEHOLDER.intro}</p>

          {FOUNDERS_PLACEHOLDER.people.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {FOUNDERS_PLACEHOLDER.people.map((person) => (
                <li key={person.name}>
                  <p className="font-heading font-semibold text-foreground">{person.name}</p>

                  <p className="text-subhead font-medium">{person.role}</p>

                  {person.note ? <p className="mt-1">{person.note}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-xs italic text-muted-foreground">
              Profile cards can be added when FIXONEX leadership details are ready to publish.
            </p>
          )}
        </div>
      </PageSection>

      <PageSection spacing="compact" className="border-t border-border bg-muted">
        <div id="office" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Registered"
            title="Company information"
            description="Address, contacts, map, and compliance note for paperwork."
            importance="quiet"
            className="mb-7 max-w-2xl"
          />

          <div className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-2">
            <Card variant="quiet" className="min-w-0 bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Registered address</CardTitle>
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

            <Card variant="quiet" className="min-w-0 bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Direct contact</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm text-muted-foreground">
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
                  <p className={asideMicroHeadingClass}>Support</p>

                  <a href={`mailto:${companyInfo.supportEmail}`} className={proseInlineLinkClass}>
                    {companyInfo.supportEmail}
                  </a>
                </div>

                <div>
                  <p className={asideMicroHeadingClass}>Hours</p>

                  <p className="leading-relaxed">{companyInfo.businessHours}</p>
                </div>

                <Button asChild className="w-full sm:w-auto" size="default">
                  <Link href="/contact">{cta.contact}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 min-w-0">
            <Card variant="quiet" className="bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Location map</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="aspect-video w-full min-h-[200px] overflow-hidden rounded-md border border-border bg-muted">
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
                  If the map does not load, use &ldquo;Open in Google Maps&rdquo; above.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className={cn("mt-8 text-sm leading-relaxed text-muted-foreground", panelMutedClass)}>
            <p className={asideMicroHeadingClass}>Compliance note</p>

            <p className="mt-2">{companyInfo.certificationsNote}</p>
          </div>
        </div>
      </PageSection>

      <PageSection spacing="compact" className="border-t border-border">
        <p className="max-w-2xl border-l-4 border-foreground pl-4 text-sm font-medium text-foreground sm:text-base">
          Saath chalne wala partner.

          <span className="mt-1.5 block text-xs font-normal leading-relaxed text-muted-foreground sm:text-sm">
            A FIXONEX partner stays with you until the finish reads right.
          </span>
        </p>
      </PageSection>
    </>
  );
}
