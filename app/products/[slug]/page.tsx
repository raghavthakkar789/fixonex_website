import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductBySlug, getAllProductSlugs, productCategories } from "@/data/products";

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
            Product imagery: {p.title}
          </div>
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p className="text-base text-foreground">{p.description}</p>
            <div>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                Indoor / outdoor
              </h2>
              <p className="mt-2">{p.indoorOutdoor}</p>
            </div>
            <div>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                Dry / wet suitability
              </h2>
              <p className="mt-2">{p.dryWetSuitability}</p>
            </div>
            <div>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                Sizes & application
              </h2>
              <p className="mt-2">{p.sizesApplication}</p>
            </div>
          </div>
        </div>

        {(p.skus?.length ?? 0) > 0 || (p.colorOptions?.length ?? 0) > 0 ? (
          <div className="mt-12 space-y-8">
            <h2 className="font-heading text-lg font-semibold text-foreground">Catalogue detail</h2>
            {p.skus?.map((sku) => (
              <Card key={sku.name + (sku.variant ?? "")}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-foreground">{sku.name}</CardTitle>
                  {sku.variant ? (
                    <p className="text-sm font-medium text-primary">{sku.variant}</p>
                  ) : null}
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {sku.standards ? (
                    <p>
                      <span className="font-semibold text-foreground">Standards: </span>
                      {sku.standards}
                    </p>
                  ) : null}
                  {sku.application ? (
                    <p>
                      <span className="font-semibold text-foreground">Application: </span>
                      {sku.application}
                    </p>
                  ) : null}
                  {sku.size ? (
                    <p>
                      <span className="font-semibold text-foreground">Size: </span>
                      {sku.size}
                    </p>
                  ) : null}
                  {sku.extras?.length ? (
                    <ul className="list-inside list-disc space-y-1.5 border-t border-border pt-3">
                      {sku.extras.map((ex) => (
                        <li key={ex}>{ex}</li>
                      ))}
                    </ul>
                  ) : null}
                </CardContent>
              </Card>
            ))}
            {p.colorOptions?.length ? (
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">Grout colours</h3>
                {p.colorTagline ? (
                  <p className="mt-2 text-sm italic text-muted-foreground">{p.colorTagline}</p>
                ) : null}
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {p.colorOptions.map((c) => (
                    <li
                      key={c}
                      className="rounded-sm border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-12 grid min-w-0 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ideal use cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                {p.idealUseCases.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                {p.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                {p.usageNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/get-help">Get help choosing</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/book-consultation">Product guidance</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto sm:ml-auto">
            <Link href="/contact">Contact sales</Link>
          </Button>
        </div>

        <div className="mt-14">
          <h2 className="font-heading text-lg font-semibold text-foreground">Related categories</h2>
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
        </article>
      </PageSection>
    </>
  );
}
