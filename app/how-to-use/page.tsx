import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { howToVideos, usageSteps, safetyNotes } from "@/data/how-to-use";
import { productCategories } from "@/data/products";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Use Our Products",
  description:
    "FIXONEX application guidance: mixing, troweling, grouting, cleaning, and safety. Video placeholders ready for your hosted content.",
};

export default function HowToUsePage() {
  return (
    <>
      <PageBanner
        title="How to use our products"
        subtitle="Structured steps, safety expectations, and video-ready modules. Embed your official FIXONEX channel content by setting embedUrl in data/how-to-use.ts."
      />
      <PageSection>
        <SectionHeading
          eyebrow="Video library"
          title="Application modules"
          description="Each card reserves space for an iframe once you supply a hosted embed URL (YouTube, Vimeo, or enterprise CDN)."
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {howToVideos.map((v) => (
            <Card key={v.id}>
              <CardHeader>
                <CardTitle className="text-base">{v.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-sm border border-border bg-muted">
                  {v.embedUrl ? (
                    <iframe
                      title={v.title}
                      src={v.embedUrl}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-xs text-muted-foreground">
                      Video placeholder — set <code className="mx-1 rounded bg-background px-1">embedUrl</code> in{" "}
                      <code className="mx-1 rounded bg-background px-1">data/how-to-use.ts</code>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <SectionHeading
          eyebrow="Process"
          title="Core usage steps"
          className="mb-8 mt-16"
        />
        <ol className="grid gap-4 sm:grid-cols-2">
          {usageSteps.map((s) => (
            <li key={s.step} className="flex gap-4 border border-border bg-muted p-4">
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

        <SectionHeading
          eyebrow="Safety"
          title="Best practices on site"
          className="mb-6 mt-16"
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          {safetyNotes.map((n) => (
            <li key={n} className="border-l-2 border-primary pl-4">
              {n}
            </li>
          ))}
        </ul>

        <SectionHeading
          eyebrow="By category"
          title="Category usage guides"
          description="High-level reminders before you open the technical data sheet for the specific SKU."
          className="mb-8 mt-16"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {productCategories.map((p) => (
            <Card key={p.slug}>
              <CardContent className="p-5">
                <p className="font-heading font-semibold text-foreground">{p.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.usageNotes[0]}</p>
                <Button variant="link" asChild className="mt-2 h-auto px-0">
                  <Link href={`/products/${p.slug}`}>Open product detail</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>
    </>
  );
}
