import type { Metadata } from "next";
import { BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { supportGuides } from "@/data/support-guides";
import { getProductBySlug } from "@/data/products";
import { ExpandableSection } from "@/components/content/ExpandableSection";
import { Reveal, LineReveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { cta, proseInlineLinkClass } from "@/lib/ui-constants";

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
    openGraph: {
      title: g.title,
      description: g.excerpt,
      images: [{ url: g.heroImage, width: 1200, height: 630, alt: g.title }],
    },
  };
}

export default async function SupportGuideArticlePage({ params }: Props) {
  const { id } = await params;
  const guide = supportGuides.find((s) => s.id === id);
  if (!guide) notFound();

  const sectionHeadingClass =
    "font-display text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl";
  const paragraphClass = "space-y-4 text-[15px] leading-relaxed text-zinc-600 sm:text-base";

  const relatedProducts = guide.relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        label="How-to guide"
        title={guide.title}
        subtitle={guide.excerpt}
        image={guide.heroImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Support", href: "/support#guides" },
          { label: guide.category },
        ]}
      />

      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[55%] w-[42%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid-subtle opacity-40" />

        <div className="site-container section-pad-lg relative z-10">
          {/* Single article panel — intro, body, takeaways */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.07)] ring-1 ring-zinc-950/[0.04]">
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-primary via-orange-500 to-amber-400"
                />
                <nav
                  className="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
                  aria-label="Breadcrumb"
                >
                  <TransitionLink href="/support#guides" className={proseInlineLinkClass}>
                    All guides
                  </TransitionLink>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden />
                  <span className="truncate font-medium text-zinc-800">{guide.title}</span>
                </nav>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                    <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {guide.category}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {guide.sections.length} topic{guide.sections.length === 1 ? "" : "s"}
                  </span>
                </div>

                <LineReveal className="mt-6 max-w-md" />
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600">
                  Field notes from FIXONEX — use with your product TDS and site-specific specification.
                  When in doubt, talk to our team before you lock the detail.
                </p>
              </div>

              <div className="border-t border-zinc-100">
                {guide.sections.map((sec, index) => (
                  <div
                    key={sec.heading}
                    className="border-b border-zinc-100 px-6 py-8 last:border-b-0 sm:px-8 sm:py-10 lg:px-10"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="flex h-8 min-w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-orange-500/15 text-xs font-bold tabular-nums text-primary ring-1 ring-primary/10"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                      <div aria-hidden className="h-px min-w-[2rem] flex-1 max-w-[4rem] bg-gradient-to-r from-primary/40 to-transparent sm:min-w-[3rem]" />
                    </div>
                    <ExpandableSection
                      heading={sec.heading}
                      paragraphs={sec.paragraphs}
                      previewCount={2}
                      className="mt-0"
                      headingClassName={sectionHeadingClass}
                      paragraphClassName={paragraphClass}
                    />
                  </div>
                ))}
              </div>

              {guide.takeaways?.length ? (
                <div className="relative border-t border-teal-200/40 bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/40 px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 top-6 h-36 w-36 rounded-full bg-teal-400/12 blur-3xl"
                  />
                  <h2 className="font-display text-lg font-bold tracking-tight text-zinc-950 sm:text-xl">
                    Takeaways
                  </h2>
                  <ul className="relative mt-5 max-w-2xl space-y-3">
                    {guide.takeaways.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-relaxed text-zinc-700 sm:text-base"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-teal-600"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Reveal>

          {relatedProducts.length > 0 ? (
            <Reveal className="mt-14 sm:mt-16" delay={0.05}>
              <div className="border-t border-zinc-200/80 pt-12 sm:pt-14">
                <p className="eyebrow-label mb-3">Product ranges</p>
                <h2
                  className="font-display font-bold tracking-tight text-zinc-950"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.12,
                  }}
                >
                  All products referenced in this guide
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-zinc-600">
                  Explore specifications, pack sizes, and downloads for each range — then loop back here if
                  you need installation context.
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal className="mt-12 border-t border-zinc-200/80 pt-10 sm:mt-16 sm:pt-12">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button
                asChild
                variant="outline"
                size="default"
                className="rounded-full border-zinc-300/80 bg-white"
              >
                <TransitionLink href="/support#guides">{cta.allGuides}</TransitionLink>
              </Button>
              <Button
                asChild
                variant="outline"
                size="default"
                className="rounded-full border-zinc-300/80 bg-white"
              >
                <TransitionLink href="/support/#faq">{cta.faq}</TransitionLink>
              </Button>
              <Button asChild className="rounded-full sm:ml-auto" size="default">
                <TransitionLink href="/contact">{cta.contact}</TransitionLink>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
