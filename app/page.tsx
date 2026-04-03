import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { ProductCard } from "@/components/sections/ProductCard";
import { productCategories } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { companyInfo } from "@/data/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Factory, Shield, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "FIXONEX supplies FIX tile adhesives, block joining mortar, PU FIXO-999, epoxy grout, tile cleaners, and spacers from Ahmedabad—sold through dealers with product documentation.",
};

export default function HomePage() {
  const featured = productCategories.slice(0, 4);
  const previewFaqs = faqs.slice(0, 4);
  const previewTestimonials = testimonials.slice(0, 2);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <SectionHeading
            eyebrow="Company positioning"
            title="Specification-grade systems, field-tested discipline."
            description="FIXONEX supports contractors, dealers, and specifiers who own complex tile and stone packages. We prioritize batch consistency, documented performance bands, and technical dialogue before the first mix hits the substrate."
          />
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              From interior ceramics to exterior stone and pools, our catalogue spans the FIX adhesive series, block
              joining mortar, PU FIXO-999, stain-free epoxy grout, maintenance cleaners, and precision spacers—one coherent
              line-up for dealers and project teams.
            </p>
            <p>
              Whether the program is a retail rollout, a hospitality upgrade, a healthcare retrofit, or a premium
              residential tower, the expectation is the same: clear documentation, responsive dealer partners, and
              guidance that respects real site constraints.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Product categories"
            title="Everything from bond line to finished joint."
            description="Explore the full FIXONEX range. Each category includes application context, exposure notes, and links to detailed guidance."
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href="/products">View all categories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Why FIXONEX"
          title="Industrial mindset. Premium execution."
          className="mb-12 max-w-2xl"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Factory,
              title: "Manufacturing discipline",
              body: "Processes oriented around repeatability so crews experience the same handling properties bag after bag.",
            },
            {
              icon: Shield,
              title: "Risk-aware guidance",
              body: "We flag exposure mismatches early—especially for exteriors, wet service, and sensitive stone aesthetics.",
            },
            {
              icon: Wrench,
              title: "Installer-first ergonomics",
              body: "Open times, cleanup windows, and packaging formats respect real site pacing, not laboratory ideals only.",
            },
            {
              icon: Check,
              title: "Channel clarity",
              body: "Dealers receive predictable SKUs, while project teams get submittal-oriented documentation.",
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
      </section>

      <section className="border-t border-border bg-background py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Use cases"
            title="Where FIXONEX assemblies earn their place."
            className="mb-12"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "High-traffic retail floors with visible joint lines",
              "Hospital and laboratory corridors with aggressive cleaning",
              "Hospitality wet zones and pool deck adjacencies",
              "Corporate lobbies with large-format porcelain and stone",
              "Residential towers with repeating bathroom packages",
              "Industrial maintenance using PU and epoxy-class details",
            ].map((line) => (
              <li
                key={line}
                className="min-h-[3rem] border border-border bg-muted px-4 py-3 text-sm font-medium leading-snug text-foreground"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-surface-dark py-14 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Years in market", value: `Since ${companyInfo.yearEstablished}` },
              { label: "Product categories", value: "6" },
              { label: "Focus segments", value: "Commercial & residential" },
              { label: "Go-to-market", value: "Product sales + dealers" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-white/65">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Product guidance"
              title="Not sure where to start?"
              description="Use our guided selector to orient your adhesive, grout, and accessory shortlist based on environment, moisture, tile scale, and material."
            />
            <Button asChild className="mt-8 w-full sm:w-auto">
              <Link href="/get-help">Open product guidance</Link>
            </Button>
          </div>
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              <p>
                The guidance tool applies rule-based logic you can extend as SKUs evolve. It never replaces
                engineering judgment on structural substrates, waterproofing, or stone supplier constraints—but it
                gets your team aligned before specification hardens.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <CTASection
        title="Discuss products for your project"
        description="Ask which FIXONEX lines suit your specification, drawings, or dealer stocking—product guidance only; we do not perform on-site installation."
        primaryHref="/book-consultation"
        primaryLabel="Request product discussion"
        secondaryHref="/contact"
        secondaryLabel="Contact sales"
        variant="light"
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="What partners say about working with us."
          className="mb-12"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {previewTestimonials.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-6">
                <p className="text-sm text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-heading text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button variant="outline" asChild>
            <Link href="/testimonials">Read more</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-border bg-muted py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions, direct answers."
            className="mb-10"
          />
          <ul className="space-y-4">
            {previewFaqs.map((f) => (
              <li key={f.id} className="border-b border-border pb-4">
                <p className="font-heading text-sm font-semibold text-foreground">{f.question}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
              </li>
            ))}
          </ul>
          <Button variant="link" asChild className="mt-6 px-0">
            <Link href="/faq">View all FAQs</Link>
          </Button>
        </div>
      </section>

      <CTASection
        title="Ready to talk through your package?"
        description="Email, call, or message us. We respond with next steps—not generic brochures."
        primaryHref="/contact"
        primaryLabel="Contact FIXONEX"
        secondaryHref="/connect"
        secondaryLabel="Direct connect"
        variant="dark"
      />
    </>
  );
}
