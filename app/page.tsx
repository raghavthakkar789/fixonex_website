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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "FIXONEX — tile adhesives, grouts, and fixing systems for homes, shops, and projects. Guidance, support, and dealer network.",
};

const whyItems = [
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
    title: "Made for real site conditions",
    body: "Heat, dust, time pressure — our products are designed for actual working environments.",
  },
  {
    icon: Check,
    title: "Simple to understand, easy to use",
    body: "Clear guidance that works for both professionals and first-time users.",
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

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Story"
          title="Built for what happens after the material reaches site."
          description="Contractors, dealers, architects, homeowners — same standard: the finish should still read clean years later, not only on opening day."
          className="mb-6 max-w-3xl"
        />
        <div className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <p>
            On the rest of this page: a glimpse of the range, how we think about risk and repeatability, proof from real
            environments, then straightforward ways to narrow a line or talk to us.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Range"
            title="From fixing through finishing."
            description="Four entry points — the full catalogue lives on Products."
            className="mb-12 max-w-2xl"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href="/products">Open the product hub</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How we work"
            title="Industrial mindset. Premium execution."
            description="The operating habits behind every bag — so what you specify is what the crew feels, shift after shift."
            className="mb-12 max-w-2xl"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {whyItems.map((item) => (
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
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 border-t border-border bg-muted/30 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proof"
            title="Where fixing has to hold"
            description="Retail, hospitality, housing — environments where adhesive, grout, and discipline either earn trust or invite callbacks."
            className="mb-10 max-w-2xl"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {previewProjects.map((proj) => (
              <Card key={proj.id}>
                <div
                  className="aspect-[4/3] w-full bg-[repeating-linear-gradient(135deg,#E0E0E0_0,#E0E0E0_1px,transparent_1px,transparent_10px)]"
                  role="img"
                  aria-label={proj.imageAlt}
                />
                <CardContent className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{proj.sector}</p>
                  <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{proj.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{proj.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="scroll-mt-24 border-t border-border bg-muted py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trust"
            title="What people say after the job"
            description="Dealers and crews — how the material and the conversation hold up once we are off site."
            className="mb-12 max-w-2xl"
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
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-border bg-background py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Clarity"
            title="Questions we hear often"
            description="A short preview — the full library sits on Support."
            className="mb-10 max-w-2xl"
          />
          <ul className="space-y-4">
            {previewFaqs.map((f) => (
              <li key={f.id} className="border-b border-border pb-4">
                <p className="font-heading text-sm font-semibold text-foreground">{f.question}</p>
                <ExpandableAnswer text={f.answer} maxChars={200} className="mt-2" textClassName="text-sm text-muted-foreground" />
              </li>
            ))}
          </ul>
          <Button variant="link" asChild className="mt-6 px-0">
            <Link href="/support#faq">Browse all FAQs</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-border bg-muted/50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Next — narrow the line"
            title="Not sure which range to open first?"
            description="On Products, a short guided sequence turns environment and tile size into a sensible starting point."
            className="mb-8 max-w-2xl"
          />
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/products#product-guidance">Open range finder</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Speak to the team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-t border-border bg-background py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Help & channels"
            title="Documentation, answers, partnerships"
            description="One brand voice across self-serve help, tender paperwork, and dealer programmes."
            className="mb-8 max-w-2xl"
          />
          <div className="max-w-2xl space-y-8 text-sm leading-relaxed text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Help centre</p>
              <p className="mt-2">
                Articles, checklists, and FAQs — written to be used on a phone at the mixing station.
              </p>
              <Button asChild className="mt-4">
                <Link href="/support">Go to Support</Link>
              </Button>
            </div>
            <div className="border-t border-border pt-8">
              <p className="font-medium text-foreground">Brand, legal, dealers</p>
              <p className="mt-2">
                Tender-friendly documentation, repeatable batches for channels, and distributor programmes via{" "}
                <Link href="/partner" className="font-medium text-primary underline-offset-2 hover:underline">
                  Partner
                </Link>
                . Company story and registered office:{" "}
                <Link href="/about" className="font-medium text-primary underline-offset-2 hover:underline">
                  About
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-dark py-14 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-10 text-center text-sm text-white/70">FIXONEX in brief — before you reach out.</p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Serving since", value: companyInfo.yearEstablished },
              { label: "Product families", value: String(productCategories.length) },
              { label: "Reach", value: "India" },
              { label: "Help", value: "Support · Guidance" },
            ].map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="font-heading text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-white/65">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a product — or a conversation"
        description="Message us for a steer, open the full catalogue, or use WhatsApp if that is faster. Plain-language replies either way."
        primaryHref="/contact"
        primaryLabel="Contact"
        secondaryHref="/products"
        secondaryLabel="Products"
        variant="light"
      />
    </>
  );
}
