import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FaqWithFilters } from "@/components/faq/FaqWithFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supportGuides, usageSteps, safetyNotes } from "@/data/support-guides";
import { getProductBySlug } from "@/data/products";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Support",
  description:
    "FIXONEX Support — how-to articles, on-site checklists, safety notes, and FAQs for adhesives, grout, and finishing.",
};

export default function SupportPage() {
  return (
    <>
      <PageBanner
        title="Support"
        subtitle="Your knowledge base: readable how-tos, numbered site steps, safety reminders, and a filterable FAQ — designed for use beside the bucket, not the play button."
      />
      <PageSection>
        <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Start with an article when you want context; drop to the checklist when you just need sequence; use the FAQ when
          you are comparing options. Everything links back to product ranges where it helps.
        </p>

        <div
          id="guides"
          className="scroll-mt-24 rounded-sm border border-border bg-muted/35 p-6 sm:p-8 lg:p-10"
        >
          <SectionHeading
            eyebrow="Library"
            title="How-to articles"
            description="Open a guide for the full article, or jump to related ranges from each card."
            className="mb-10 max-w-2xl"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {supportGuides.map((g) => (
              <Card key={g.id} id={`guide-${g.id}`} className="scroll-mt-24 border-border bg-background">
                <CardHeader className="pb-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{g.category}</p>
                  <CardTitle className="text-base">
                    <Link
                      href={`/support/guides/${g.id}`}
                      className="text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {g.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>{g.excerpt}</p>
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                    <Link href={`/support/guides/${g.id}`}>Read full guide</Link>
                  </Button>
                  {g.relatedProductSlugs.length > 0 ? (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Related ranges</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {g.relatedProductSlugs.map((slug) => {
                          const p = getProductBySlug(slug);
                          return (
                            <li key={slug}>
                              <Link
                                href={`/products/${slug}`}
                                className="text-sm font-medium text-primary underline-offset-2 hover:underline"
                              >
                                {p?.title ?? slug}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <SectionHeading
          eyebrow="Checklist"
          title="Key steps on site"
          description="The same sequence we expect after someone has read the sheet — prep through protecting fresh work."
          className="mb-8 mt-16 max-w-2xl"
        />
        <ol className="grid gap-4 sm:grid-cols-2">
          {usageSteps.map((s) => (
            <li key={s.step} className="flex gap-4 border border-border bg-background p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-surface-dark font-heading text-sm font-bold text-white">
                {s.step}
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-sm border border-border bg-muted/25 p-6 sm:p-8">
          <SectionHeading
            eyebrow="Non-negotiables"
            title="Safety on site"
            description="Baseline reminders alongside any FIXONEX mix on a live job."
            className="mb-6 max-w-2xl"
          />
          <ul className="space-y-2 text-sm text-muted-foreground">
            {safetyNotes.map((n) => (
              <li key={n} className="border-l-2 border-primary pl-4">
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div id="faq" className="scroll-mt-24 pt-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Search by topic"
            description="Still stuck after the articles above — Contact is the fastest line to a human answer."
            className="mb-10 max-w-2xl"
          />
          <FaqWithFilters />
        </div>

        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="font-heading text-lg font-semibold text-foreground">Need a human?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Short note is enough — we reply in plain language with what to do next.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </PageSection>
    </>
  );
}
