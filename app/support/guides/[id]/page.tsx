import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/sections/PageBanner";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { supportGuides } from "@/data/support-guides";
import { getProductBySlug } from "@/data/products";
import { ExpandableBulletList } from "@/components/content/ExpandableBulletList";
import { ExpandableSection } from "@/components/content/ExpandableSection";
import { asideMicroHeadingClass, cta, panelMutedClass, panelSurfaceClass, proseInlineLinkClass } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return supportGuides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const g = supportGuides.find((s) => s.id === id);
  if (!g) return { title: "Guide" };
  return {
    title: g.title,
    description: g.excerpt,
  };
}

export default async function SupportGuideArticlePage({ params }: Props) {
  const { id } = await params;
  const guide = supportGuides.find((s) => s.id === id);
  if (!guide) notFound();

  return (
    <>
      <PageBanner importance="compact" title={guide.title} subtitle={guide.excerpt} />
      <PageSection size="narrow" spacing="default">
        <nav className="mb-6 text-sm text-muted-foreground sm:mb-10" aria-label="Breadcrumb">
          <Link href="/support#guides" className={proseInlineLinkClass}>
            Support
          </Link>
          <span className="mx-2 text-border" aria-hidden>
            /
          </span>
          <span className="text-foreground">Guide</span>
        </nav>

        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-subhead sm:text-xs">{guide.category}</p>

        <article className="mt-6 max-w-none sm:mt-8">
          <div className={panelSurfaceClass}>
            {guide.sections.map((sec, index) => (
              <ExpandableSection
                key={sec.heading}
                heading={sec.heading}
                paragraphs={sec.paragraphs}
                previewCount={2}
                className={index === 0 ? "mt-0" : "mt-8 sm:mt-10"}
              />
            ))}
          </div>

          {guide.takeaways?.length ? (
            <div className={cn("mt-8 sm:mt-12", panelMutedClass)}>
              <h2 className="font-heading text-base font-bold tracking-tight text-foreground sm:text-lg">Takeaways</h2>
              <ExpandableBulletList
                items={guide.takeaways}
                previewCount={2}
                listClassName="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground"
              />
            </div>
          ) : null}

          {guide.relatedProductSlugs.length > 0 ? (
            <div className="mt-8 sm:mt-10">
              <h2 className={asideMicroHeadingClass}>Related ranges</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {guide.relatedProductSlugs.map((slug) => {
                  const p = getProductBySlug(slug);
                  return (
                    <li key={slug}>
                      <Link
                        href={`/products/${slug}`}
                        className="inline-flex min-h-9 items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted"
                      >
                        {p?.title ?? slug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-2.5 border-t border-border/70 pt-7 sm:mt-14 sm:flex-row sm:flex-wrap sm:gap-3 sm:border-border/80 sm:pt-9">
            <Button asChild variant="outline" size="default">
              <Link href="/support#guides">{cta.allGuides}</Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link href="/support#faq">{cta.faq}</Link>
            </Button>
            <Button asChild className="sm:ml-auto" size="default">
              <Link href="/contact">{cta.contact}</Link>
            </Button>
          </div>
        </article>
      </PageSection>
    </>
  );
}
