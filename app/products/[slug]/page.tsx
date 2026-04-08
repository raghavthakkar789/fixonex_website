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
import { asideMicroHeadingClass, cta, panelMutedClass, proseInlineLinkClass } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

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
      <PageBanner importance="compact" title={p.title} subtitle={p.shortDescription} />
      <PageSection spacing="default">
        <article className="min-w-0">
          <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div className="min-w-0 space-y-6 sm:space-y-8">
              <div>
                <h2 className={asideMicroHeadingClass}>What this range is for</h2>
                <ExpandableAnswer
                  text={p.description}
                  maxChars={220}
                  className="mt-2"
                  textClassName="text-base text-foreground"
                />
              </div>

              <div className="rounded-md border border-foreground bg-muted p-5 shadow-card sm:p-7">
                <h2 className="font-heading text-base font-bold tracking-tight text-foreground lg:text-lg">Where it belongs</h2>
                <ExpandableBulletList
                  items={p.idealUseCases}
                  previewCount={3}
                  listClassName="mt-3 list-inside list-disc space-y-1.5"
                />
                <p className="mt-3 text-sm text-muted-foreground">{p.indoorOutdoor}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.dryWetSuitability}</p>
                <p className="mt-4 text-sm font-semibold text-foreground">Pack sizes: {p.sizesApplication}</p>
              </div>

              <div className="rounded-md border border-border border-l-4 border-l-foreground bg-background p-5 shadow-card sm:p-7">
                <h2 className="font-heading text-base font-bold tracking-tight text-foreground lg:text-lg">
                  Why specify this line
                </h2>
                <ExpandableBulletList
                  items={p.benefits}
                  previewCount={3}
                  listClassName="mt-3 list-inside list-disc space-y-1.5"
                />
              </div>

              <div className="rounded-md border border-border bg-muted p-5 sm:p-6">
                <h2 className={asideMicroHeadingClass}>Simple site reminders</h2>
                <ExpandableBulletList
                  items={p.usageNotes}
                  previewCount={3}
                  listClassName="mt-2 list-inside list-disc space-y-1.5"
                />
              </div>
            </div>

            <aside className="min-w-0 space-y-6 lg:sticky lg:top-24">
              <div
                className="flex min-h-[220px] items-center justify-center rounded-md border border-border bg-muted p-6 text-center text-sm text-muted-foreground sm:min-h-[260px] lg:min-h-[300px]"
                role="img"
                aria-label={p.heroImageAlt}
              >
                Product image coming soon · {p.title}
              </div>

              <Card variant="quiet" className="bg-background">
                <CardHeader>
                  <CardTitle className="text-lg">Specify or buy this range</CardTitle>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Send a short note with exposure and finish, or use the range finder if you are still comparing.
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full" size="default">
                    <Link href="/contact">{cta.contact}</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="default">
                    <Link href="/products#product-guidance">{cta.rangeFinder}</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full" size="default">
                    <Link href="/support">{cta.brandSupport}</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>

          {hasLineDetails ? (
            <div className="mt-12 space-y-5 border-t border-border pt-10 sm:mt-14 sm:space-y-6 sm:pt-12">
              <div className="space-y-1">
                <h2 className="font-heading text-base font-semibold text-foreground">SKU and colour detail</h2>
                <p className="max-w-2xl text-xs text-muted-foreground">
                  Declared SKUs and colour names — specification layer behind the overview.
                </p>
              </div>
              {p.skus?.map((sku) => (
                <Card key={sku.name + (sku.variant ?? "")} variant="quiet" className="bg-background">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-foreground">{sku.name}</CardTitle>
                    {sku.variant ? <p className="text-sm font-semibold text-subhead">{sku.variant}</p> : null}
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
                        className="flex min-w-0 items-center gap-3 rounded-md border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground"
                      >
                        <span
                          className="h-6 w-6 shrink-0 rounded-sm border border-border shadow-sm"
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
            <div className={cn("mt-10 sm:mt-12", panelMutedClass)}>
              <h2 className="font-heading text-base font-bold tracking-tight text-foreground">Help for this range</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Deeper notes sit on Support — these guides are picked for this range:
              </p>
              <ul className="mt-3 space-y-2">
                {relatedGuides.map((g) => (
                  <li key={g.id}>
                    <Link href={`/support/guides/${g.id}`} className={cn("text-sm", proseInlineLinkClass)}>
                      {g.title}
                    </Link>
                    <span className="text-muted-foreground"> — {g.category}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="link" className="mt-2 h-auto px-0 text-sm">
                <Link href="/support">{cta.guidesOnSupport}</Link>
              </Button>
            </div>
          ) : null}

          <div className="mt-10 border-t border-border pt-8 sm:mt-12">
            <h2 className="font-heading text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
              Other ranges
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs text-muted-foreground">
              If this line is almost right, another FIXONEX page is usually the next quick read.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {productCategories
                .filter((x) => x.slug !== p.slug)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/products/${x.slug}`}
                      className="inline-flex min-h-9 items-center rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {x.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className={cn("mt-10 sm:mt-12", panelMutedClass)}>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Still comparing? Try the range finder on Products or send FIXONEX a short note — we reply in plain language.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="default" className="w-full sm:w-auto">
                <Link href="/products#product-guidance">{cta.rangeFinder}</Link>
              </Button>
              <Button asChild variant="outline" size="default" className="w-full sm:w-auto">
                <Link href="/contact">{cta.contact}</Link>
              </Button>
              <Button asChild variant="ghost" size="default" className="w-full sm:w-auto sm:ml-auto">
                <Link href="/support">{cta.brandSupport}</Link>
              </Button>
            </div>
          </div>
        </article>
      </PageSection>
    </>
  );
}
