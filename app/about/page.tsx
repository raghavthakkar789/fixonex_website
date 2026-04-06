import type { Metadata } from "next";

import Link from "next/link";

import { PageBanner } from "@/components/sections/PageBanner";

import { PageSection } from "@/components/layout/PageSection";

import { SectionHeading } from "@/components/sections/SectionHeading";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { BRAND } from "@/lib/brand";

import { proseInlineLinkClass } from "@/lib/ui-constants";

import { companyInfo } from "@/data/company";

import { FOUNDERS_PLACEHOLDER } from "@/data/founders";

import { Check, Factory, Shield, Wrench } from "lucide-react";

import { ExpandableParagraphs } from "@/components/content/ExpandableParagraphs";

export const metadata: Metadata = {

  title: "About FIXONEX",

  description:

    "About FIXONEX — brand story, why teams trust us, what we supply, vision and mission, leadership, and registered company details.",

};



export default function AboutPage() {

  const addr = companyInfo.registeredAddress;



  return (

    <>

      <PageBanner

        title="About FIXONEX"

        subtitle="Brand, substance, and the paperwork — who we are, why crews and specifiers stay with us, and where to verify the company."

      />



      <PageSection>

        <SectionHeading

          eyebrow="Brand"

          title="Finish that lasts as good as day one"

          description="Construction chemicals built around supply-chain discipline — from batch repeatability to how we answer when a tender changes mid-stream."

          className="mb-8 max-w-3xl"

        />

        <ExpandableParagraphs

          className="max-w-3xl"

          previewCount={1}

          firstParagraphClassName="text-foreground"

          paragraphs={[

            `${BRAND.name} was built on a simple idea: the installation should age as well as the design promises.`,

            "We have watched projects fail from the wrong bag in the right room — not from bad intent, but from unclear guidance. That gap is where we put our weight.",

            "Contractors, dealers, architects, and owners get straight answers on exposure, stone risk, and which line earns its place on the delivery note.",

          ]}

        />

      </PageSection>



      <PageSection className="border-t border-border bg-muted/25">

        <SectionHeading

          eyebrow="Trust"

          title="Why teams standardise on FIXONEX"

          description="What you gain when the material is explainable to the foreman and defensible in a submittal."

          className="mb-10 max-w-2xl"

        />

        <div className="grid gap-6 md:grid-cols-2">

          {[

            {

              icon: Factory,

              title: "Reliable from bag to bag",

              body: "Consistent material means fewer surprises on site and better finishing results.",

            },

            {

              icon: Shield,

              title: "Right product, before problems start",

              body: "We help you avoid wrong choices early — saving time, cost, and rework.",

            },

            {

              icon: Wrench,

              title: "Made for real site conditions",

              body: "Heat, dust, time pressure — our products are designed for actual working environments.",

            },

            {

              icon: Check,

              title: "Simple to understand, easy to use",

              body: "Clear guidance that works for both professionals and first-time users.",

            },

          ].map((item) => (

            <Card key={item.title}>

              <CardContent className="flex gap-4 p-6">

                <item.icon className="h-10 w-10 shrink-0 text-primary" aria-hidden />

                <div>

                  <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      </PageSection>



      <PageSection className="border-t border-border bg-background">

        <div id="what-we-do" className="scroll-mt-24">

          <SectionHeading

            eyebrow="Operations"

            title="What we supply and support"

            description="Fixing systems sold through dealers, backed by documentation and plain-language help."

            className="mb-8 max-w-2xl"

          />

          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">

            <p className="text-foreground">

              Tile adhesives, block joining mortar, PU systems, epoxy grout, cleaners, and spacers — ranges with declared

              performance when the job is serious.

            </p>

            <ul className="list-inside list-disc space-y-2">

              <li>Channel support for distributors and project dealers</li>

              <li>Support centre for on-site questions · Contact for tender or partnership conversations</li>

              <li>Growth programmes under Partner</li>

            </ul>

            <Button asChild variant="outline" className="mt-4">

              <Link href="/products">View the product hub</Link>

            </Button>

          </div>

        </div>

      </PageSection>



      <PageSection className="border-t border-border bg-muted/30">

        <SectionHeading

          eyebrow="Positioning"

          title="FIXONEX Adhesive — market narrative"

          description="Formal positioning for readers who need the longer company story after the practical summary above."

          className="mb-8 max-w-3xl"

        />

        <ExpandableParagraphs

          className="max-w-3xl"

          previewCount={1}

          paragraphs={[

            "FIXONEX Adhesive is a forward-thinking construction chemical brand specializing in high-performance tile adhesives and epoxy solutions for modern construction and interior applications. With more than a decade of experience in the tiles and ceramic industry, the brand is built on deep market knowledge, technical expertise, and a commitment to quality.",

            "Our products are developed using advanced formulations to deliver superior bonding strength, durability, and reliability across various tile and surface applications. FIXONEX focuses on providing solutions that simplify installation while ensuring long-term performance and structural integrity.",

            "Driven by innovation, quality control, and customer trust, FIXONEX aims to support architects, builders, contractors, and tile installers with dependable products that enhance both functionality and aesthetics. Our mission is to become a trusted partner in tile installation solutions, contributing to stronger and more durable spaces across the construction industry.",

          ]}

        />

      </PageSection>



      <PageSection className="border-t border-border bg-muted/20">

        <SectionHeading

          eyebrow="Direction"

          title="Vision and mission"

          description="Two lines you can share with a specifier or partner when they ask where the brand is headed."

          className="mb-8 max-w-2xl"

        />

        <div className="grid gap-8 md:grid-cols-2">

          <Card>

            <CardHeader>

              <CardTitle className="text-lg">Vision</CardTitle>

            </CardHeader>

            <CardContent className="text-sm leading-relaxed text-muted-foreground">

              <p>

                To establish FIXONEX as a trusted and innovative brand in tile installation solutions by delivering

                high-performance tile adhesives and construction chemicals that ensure superior bonding strength,

                durability, and long-lasting results.

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle className="text-lg">Mission</CardTitle>

            </CardHeader>

            <CardContent className="text-sm leading-relaxed text-muted-foreground">

              <p>

                With over a decade of experience in the ceramic industry, FIXONEX aims to provide reliable tile

                adhesive and epoxy solutions that enhance tile strength, durability, and aesthetics. We are committed to

                consistent quality, innovation, and supporting architects, contractors, and dealers with dependable

                installation solutions.

              </p>

            </CardContent>

          </Card>

        </div>

      </PageSection>



      <PageSection className="border-t border-border bg-background">

        <SectionHeading

          title={FOUNDERS_PLACEHOLDER.heading}

          description="Leadership profiles ship here when names and roles are final."

          className="mb-6 max-w-2xl"

        />

        <div className="max-w-3xl rounded-sm border border-dashed border-border bg-muted/40 p-8 text-sm leading-relaxed text-muted-foreground">

          <p>{FOUNDERS_PLACEHOLDER.intro}</p>

          {FOUNDERS_PLACEHOLDER.people.length > 0 ? (

            <ul className="mt-6 space-y-4">

              {FOUNDERS_PLACEHOLDER.people.map((person) => (

                <li key={person.name}>

                  <p className="font-heading font-semibold text-foreground">{person.name}</p>

                  <p className="text-primary">{person.role}</p>

                  {person.note ? <p className="mt-1">{person.note}</p> : null}

                </li>

              ))}

            </ul>

          ) : (

            <p className="mt-4 text-xs italic text-muted-foreground">

              Profile cards can be added in code when names and roles are final.

            </p>

          )}

        </div>

      </PageSection>



      <PageSection className="border-t border-border bg-muted/40">

        <div id="office" className="scroll-mt-24">

          <SectionHeading

            eyebrow="Registered"

            title="Company information"

            description="Address for paperwork, direct contacts, map, and compliance note — when you need to verify the legal entity."

            className="mb-10 max-w-2xl"

          />

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

                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Support</p>

                  <a href={`mailto:${companyInfo.supportEmail}`} className={proseInlineLinkClass}>

                    {companyInfo.supportEmail}

                  </a>

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Hours</p>

                  <p className="leading-relaxed">{companyInfo.businessHours}</p>

                </div>

                <Button asChild className="w-full sm:w-auto">

                  <Link href="/contact">Contact</Link>

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

                  If the map does not load, use &ldquo;Open in Google Maps&rdquo; above.

                </p>

              </CardContent>

            </Card>

          </div>



          <div className="mt-10 rounded-sm border border-border bg-background p-6 text-sm leading-relaxed text-muted-foreground">

            <p className="font-heading font-semibold text-foreground">Compliance note</p>

            <p className="mt-2">{companyInfo.certificationsNote}</p>

          </div>

        </div>

      </PageSection>



      <PageSection className="border-t border-border pt-12">

        <p className="max-w-3xl border-l-4 border-primary pl-4 text-base font-medium text-foreground">

          Saath chalne wala partner.

          <span className="mt-2 block text-sm font-normal text-muted-foreground">

            A partner that stays till the finish holds true.

          </span>

        </p>

      </PageSection>

    </>

  );

}

