import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { ProductCard } from "@/components/sections/ProductCard";
import { productCategories } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { projects } from "@/data/projects";
import { companyInfo } from "@/data/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Factory, Shield, Wrench } from "lucide-react";
import { ExpandableAnswer } from "@/components/content/ExpandableAnswer";
import { cta, panelSurfaceClass, sectionBand } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "FIXONEX — tile adhesives, grouts, and fixing systems for homes and projects. Clear guidance, Support articles, and dealer network.",
};

const whyItems = [
  {
    icon: Factory,
    title: "Manufacturing discipline",
    body: "FIXONEX focuses on repeatability so each mix feels familiar on the trowel — fewer surprises when the crew is under pressure.",
  },
  {
    icon: Shield,
    title: "Risk-aware guidance",
    body: "We help you match exposure, stone risk, and wet areas early — so the right FIXONEX line is on the truck before rework starts.",
  },
  {
    icon: Wrench,
    title: "Built for real sites",
    body: "Heat, dust, and tight timelines are normal. FIXONEX products are specified with those conditions in mind, not only lab labels.",
  },
  {
    icon: Check,
    title: "Simple to understand, easy to use",
    body: "Whether you are a specifier, dealer, or first-time homeowner, FIXONEX copy and Support pages aim to answer “what do I buy?” without hiding behind jargon.",
  },
] as const;

export default function HomePage() {
  const featured = productCategories.slice(0, 4);
  const previewFaqs = faqs.slice(0, 4);
  const previewTestimonials = testimonials.slice(0, 2);
  const previewProjects = projects.slice(0, 3);

  return (
    <>
      <Hero />

      <section className={cn("border-b border-border bg-background", sectionBand.mainSoft)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Story"
            title="When the material hits site, the finish still has to read clean years later."
            description="Dealers, contractors, architects, homeowners — everyone needs a fixing system that holds up after handover, not only on day one."
            importance="secondary"
            className="mb-3 max-w-2xl"
          />
          <div className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            <p>
              On this page: why teams specify FIXONEX, core product families, a quick way to narrow a range, light proof, then
              ways to get help or talk to us.
            </p>
          </div>
        </div>
      </section>

      <section className={cn("border-y border-border bg-muted", sectionBand.main)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why FIXONEX"
            title="Industrial mindset. Premium execution."
            description="The habits behind every bag — so what you specify matches what the crew feels, shift after shift."
            importance="primary"
            className="mb-8 max-w-2xl sm:mb-10"
          />
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {whyItems.map((item) => (
              <Card key={item.title} variant="elevated" className="bg-background">
                <CardContent className="flex gap-4 p-5 sm:gap-5 sm:p-6">
                  <item.icon className="h-10 w-10 shrink-0 text-subhead" aria-hidden />
                  <div>
                    <h3 className="font-heading text-base font-bold tracking-tight text-foreground sm:text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={cn("border-b border-border bg-canvas", sectionBand.main)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Range"
            title="Four starting points across the FIXONEX catalogue"
            description="Each card links to a product hub page — where it belongs, why it exists, and what to watch on site."
            importance="primary"
            className="mb-8 max-w-2xl sm:mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-9 text-center sm:mt-11">
            <Button asChild size="lg">
              <Link href="/products">{cta.browseCatalogue}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className={cn("border-t border-border bg-muted", sectionBand.mainSoft)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className={panelSurfaceClass}>
            <SectionHeading
              eyebrow="Guidance"
              title="Not sure which range to open first?"
              description="On Products, four short questions point you to the right pages — environment, moisture, tile size, and material."
              importance="default"
              className="mb-5 max-w-2xl sm:mb-7"
            />
            <div className="flex flex-col gap-2.5 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:gap-3">
              <Button asChild size="lg">
                <Link href="/products#product-guidance">{cta.rangeFinder}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{cta.contact}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={cn("border-t border-border bg-background", sectionBand.stripe)}>
        <div className="mx-auto flex max-w-content flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8">
          <p className="max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
            <span className="font-medium text-foreground">Help centre — </span>
            step-by-step articles, site checklists, and FAQs on FIXONEX Support.
          </p>
          <Button asChild variant="outline" size="sm" className="w-full shrink-0 sm:w-auto">
            <Link href="/support">{cta.openSupport}</Link>
          </Button>
        </div>
      </section>

      <section id="projects" className={cn("scroll-mt-24 border-t border-border bg-muted", sectionBand.tight)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proof"
            title="Places where fixing has to hold"
            description="Examples of environments where adhesive, grout, and a clear plan earn trust."
            importance="quiet"
            className="mb-6 max-w-xl sm:mb-8"
          />
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {previewProjects.map((proj) => (
              <Card key={proj.id} variant="elevated" className="overflow-hidden bg-background">
                <div
                  className="aspect-[4/3] w-full border-b border-border bg-muted"
                  role="img"
                  aria-label={proj.imageAlt}
                />
                <CardContent className="p-4 sm:p-5">
                  <p className="text-[0.625rem] font-bold uppercase tracking-[0.12em] text-subhead">{proj.sector}</p>
                  <h3 className="mt-1 font-heading text-base font-bold tracking-tight text-foreground">{proj.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{proj.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className={cn("scroll-mt-24 border-t border-border bg-background", sectionBand.tight)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trust"
            title="What people say after the job"
            importance="quiet"
            className="mb-6 max-w-xl sm:mb-7"
          />
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            {previewTestimonials.map((t) => (
              <Card key={t.id} variant="quiet" className="bg-muted">
                <CardContent className="p-5 sm:p-6">
                  <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-3 font-heading text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={cn("scroll-mt-24 border-t border-border bg-muted", sectionBand.tight)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="A few common questions" importance="quiet" className="mb-5 max-w-xl" />
          <ul className="max-w-2xl space-y-2.5">
            {previewFaqs.map((f) => (
              <li key={f.id} className="border-b border-border pb-3 last:border-0">
                <p className="font-heading text-sm font-semibold text-foreground max-[639px]:text-[0.8125rem] max-[639px]:font-medium">
                  {f.question}
                </p>
                <ExpandableAnswer text={f.answer} maxChars={200} className="mt-2" textClassName="text-sm text-muted-foreground" />
              </li>
            ))}
          </ul>
          <Button variant="link" asChild className="mt-6 h-auto px-0 text-sm">
            <Link href="/support#faq">{cta.seeAllFaq}</Link>
          </Button>
        </div>
      </section>

      <section className={cn("scroll-mt-24 border-t border-border bg-background", sectionBand.follow)}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Help &amp; channels"
            title="Documentation, answers, partnerships"
            importance="quiet"
            className="mb-5 max-w-lg sm:mb-6"
          />
          <div className="max-w-xl space-y-4 text-xs leading-relaxed text-muted-foreground sm:space-y-5 sm:text-sm">
            <div>
              <p className="font-medium text-foreground">Help centre</p>
              <Button asChild className="mt-4" size="sm">
                <Link href="/support">{cta.brandSupport}</Link>
              </Button>
            </div>
            <div className="border-t border-border pt-6">
              <p className="font-medium text-foreground">Brand, legal, dealers</p>
              <p className="mt-2">
                Partner programmes:{" "}
                <Link href="/partner" className="font-medium text-foreground underline underline-offset-2 hover:text-subhead">
                  Partner
                </Link>
                . Company details:{" "}
                <Link href="/about" className="font-medium text-foreground underline underline-offset-2 hover:text-subhead">
                  About FIXONEX
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={cn("border-y border-border bg-foreground py-9 text-white sm:py-11")}>
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white/55 sm:mb-7">
            FIXONEX at a glance
          </p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {[
              { label: "Serving since", value: companyInfo.yearEstablished },
              { label: "Product families", value: String(productCategories.length) },
              { label: "Reach", value: "India" },
              { label: "Help", value: "Support · Guidance" },
            ].map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="font-heading text-[1.35rem] font-bold leading-tight text-white sm:text-2xl md:text-[1.65rem]">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a FIXONEX range — or just say hello"
        description="Tell us what you are tiling, or open the full catalogue. We reply in plain language."
        primaryHref="/contact"
        primaryLabel={cta.contact}
        secondaryHref="/products"
        secondaryLabel={cta.viewProducts}
        variant="light"
        className="bg-canvas border-border"
      />

      <CTASection
        title="Ready to specify or buy?"
        description="Use Contact for project questions, or Partner if you are building a dealer relationship."
        primaryHref="/contact"
        primaryLabel={cta.contact}
        secondaryHref="/partner"
        secondaryLabel={cta.partnerWithUs}
        variant="dark"
        emphasis="compact"
      />
    </>
  );
}
