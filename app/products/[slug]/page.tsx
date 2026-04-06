import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductBySlug, getAllProductSlugs, productCategories } from "@/data/products";
import { guidesForProductSlug } from "@/data/support-guides";
import { ExpandableBulletList } from "@/components/content/ExpandableBulletList";
import { ExpandableAnswer } from "@/components/content/ExpandableAnswer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product" };
  return {
    title: p.title,
    description: p.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const relatedGuides = guidesForProductSlug(slug);
  const hasLineDetails = (p.skus?.length ?? 0) > 0 || (p.colorOptions?.length ?? 0) > 0;

  return (
    <>
      <PageBanner title={p.title} subtitle={p.shortDescription} />
      <PageSection>
        <article className="min-w-0">
          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div
              className="flex min-h-[280px] items-center justify-center rounded-sm border border-border bg-muted p-8 text-center text-sm text-muted-foreground"
              role="img"
              aria-label={p.heroImageAlt}
            >
              Image coming soon · {p.title}
            </div>
            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
              <div>
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">What it is</h2>
                <ExpandableAnswer
                  text={p.description}
                  maxChars={220}
                  className="mt-2"
                  textClassName="text-base text-foreground"
                />
              </div>
              <div>
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Where to use</h2>
                <ExpandableBulletList items={p.idealUseCases} previewCount={3} listClassName="mt-2 list-inside list-disc space-y-1.5" />
                <p className="mt-3">{p.indoorOutdoor}</p>
                <p className="mt-2">{p.dryWetSuitability}</p>
                <p className="mt-3 font-medium text-foreground">Pack sizes: {p.sizesApplication}</p>
              </div>
              <div>
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Why use this</h2>
                <ExpandableBulletList items={p.benefits} previewCount={3} listClassName="mt-2 list-inside list-disc space-y-1.5" />
              </div>
              <div>
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Usage on site</h2>
                <ExpandableBulletList items={p.usageNotes} previewCount={3} listClassName="mt-2 list-inside list-disc space-y-1.5" />
              </div>
            </div>
          </div>

          {hasLineDetails ? (
            <div className="mt-12 space-y-8 border-t border-border pt-12">
              <div className="space-y-2">
                <h2 className="font-heading text-lg font-semibold text-foreground">Line details</h2>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  Declared SKUs and colours — the specification layer behind the overview in the column above.
                </p>
              </div>
              {p.skus?.map((sku) => (
                <Card key={sku.name + (sku.variant ?? "")}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-foreground">{sku.name}</CardTitle>
                    {sku.variant ? <p className="text-sm font-medium text-primary">{sku.variant}</p> : null}
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    {sku.standards ? (
                      <p>
                        <span className="font-semibold text-foreground">Declared performance: </span>
                        {sku.standards}
                      </p>
                    ) : null}
                    {sku.application ? (
                      <p>
                        <span className="font-semibold text-foreground">Where it applies: </span>
                        {sku.application}
                      </p>
                    ) : null}
                    {sku.size ? (
                      <p>
                        <span className="font-semibold text-foreground">Pack size: </span>
                        {sku.size}
                      </p>
                    ) : null}
                    {sku.extras?.length ? (
                      <div className="border-t border-border pt-3">
                        <ExpandableBulletList
                          items={sku.extras}
                          previewCount={2}
                          listClassName="list-inside list-disc space-y-1.5"
                        />
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
              {p.colorOptions?.length ? (
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">Colours</h3>
                  {p.colorTagline ? (
                    <p className="mt-2 text-sm italic text-muted-foreground">{p.colorTagline}</p>
                  ) : null}
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {p.colorOptions.map(({ name, swatch }) => (
                      <li
                        key={name}
                        className="flex min-w-0 items-center gap-3 rounded-sm border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground"
                      >
                        <span
                          className="h-6 w-6 shrink-0 rounded-sm border border-border/90 shadow-sm ring-1 ring-black/5"
                          style={{ backgroundColor: swatch }}
                          aria-hidden
                        />
                        <span className="min-w-0">{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {relatedGuides.length > 0 ? (
            <div className="mt-12 border-t border-border pt-12">
              <h2 className="font-heading text-lg font-semibold text-foreground">Help &amp; guides</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Procedure-level notes live on Support; these entries jump straight to what matters for this range:
              </p>
              <ul className="mt-3 space-y-2">
                {relatedGuides.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={`/support/guides/${g.id}`}
                      className="text-sm font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {g.title}
                    </Link>
                    <span className="text-muted-foreground"> — {g.category}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="link" className="mt-2 h-auto px-0">
                <Link href="/support">All guides &amp; FAQs</Link>
              </Button>
            </div>
          ) : null}

          <div className="mt-14 border-t border-border pt-10">
            <h2 className="font-heading text-lg font-semibold text-foreground">Related products</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              If this range is close but not quite, an adjacent line is often the next place to look.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {productCategories
                .filter((x) => x.slug !== p.slug)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/products/${x.slug}`}
                      className="inline-flex min-h-9 items-center rounded-sm border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {x.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Still comparing? Use the range finder on the Products page or send a short note — we answer in plain language.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/products#product-guidance">Find the right range</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/contact">Contact &amp; consultation</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto sm:ml-auto">
                <Link href="/support">Support</Link>
              </Button>
            </div>
          </div>
        </article>
      </PageSection>
    </>
  );
}
