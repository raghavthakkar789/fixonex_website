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
      <PageBanner title={guide.title} subtitle={guide.excerpt} />
      <PageSection size="narrow">
        <nav className="mb-10 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/support#guides" className="font-medium text-primary underline-offset-2 hover:underline">
            Support
          </Link>
          <span className="mx-2 text-border" aria-hidden>
            /
          </span>
          <span className="text-foreground">Guide</span>
        </nav>

        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{guide.category}</p>

        <article className="mt-8 max-w-none">
          {guide.sections.map((sec, index) => (
            <ExpandableSection
              key={sec.heading}
              heading={sec.heading}
              paragraphs={sec.paragraphs}
              previewCount={2}
              className={index === 0 ? "mt-0" : "mt-10"}
            />
          ))}

          {guide.takeaways?.length ? (
            <div className="mt-12 border-t border-border pt-10">
              <h2 className="font-heading text-lg font-semibold text-foreground">Takeaways</h2>
              <ExpandableBulletList
                items={guide.takeaways}
                previewCount={2}
                listClassName="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground"
              />
            </div>
          ) : null}

          {guide.relatedProductSlugs.length > 0 ? (
            <div className="mt-12 border-t border-border pt-10">
              <h2 className="font-heading text-lg font-semibold text-foreground">Related ranges</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {guide.relatedProductSlugs.map((slug) => {
                  const p = getProductBySlug(slug);
                  return (
                    <li key={slug}>
                      <Link
                        href={`/products/${slug}`}
                        className="inline-flex min-h-9 items-center rounded-sm border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {p?.title ?? slug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="mt-14 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row sm:flex-wrap">
            <Button asChild variant="outline">
              <Link href="/support#guides">All how-to guides</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/support#faq">FAQ</Link>
            </Button>
            <Button asChild className="sm:ml-auto">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </article>
      </PageSection>
    </>
  );
}
