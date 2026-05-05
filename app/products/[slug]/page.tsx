import { TransitionLink } from "@/components/navigation/TransitionLink";
import { notFound, redirect } from "next/navigation";
import { Check } from "lucide-react";
import { products, getCatalogProduct } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { CTADark } from "@/components/ui/CTADark";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BackToGuidanceLink } from "@/components/products/BackToGuidanceLink";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) notFound();
  if (product.familySlug === "tiles-adhesive" && product.subSlug) {
    redirect(`/products/tiles-adhesive/${product.subSlug}`);
  }

  const related = products.filter((p) => product.relatedSlugs.includes(p.slug));
  const isTileSpacer = product.id === "spacer";
  const isPu = product.id === "pu-999";
  const isEpoxy = product.id === "epoxy";
  const isCleaner = product.id === "cleaner";
  const isTallPortrait = ["fix-111", "fix-222", "fix-333", "fix-444", "fix-555", "block-mortar"].includes(product.id);

  const imageHeightClass = isCleaner
    ? "h-[420px] md:h-[500px] lg:h-[620px]"
    : isTallPortrait
      ? "h-[360px] md:h-[460px] lg:h-[560px]"
      : isEpoxy
        ? "h-[320px] md:h-[380px] lg:h-[460px]"
        : isPu
          ? "h-[280px] md:h-[340px] lg:h-[400px]"
          : "h-[320px] md:h-[380px] lg:h-[460px]";

  return (
    <>
      <BackToGuidanceLink />
      <PageHero
        label={product.badge}
        title={product.name}
        subtitle={product.applicationShort}
        bannerLayoutId={`product-hero-${slug}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]}
      />

      <section className="section-pad section-flow-light">
        <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
          {isTileSpacer ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border lg:col-span-5">
              <ImageWithFallback src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
          ) : (
            <div className={`relative overflow-hidden rounded-md border border-border bg-[#F5F5F5] lg:col-span-5 ${imageHeightClass}`}>
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                reveal="none"
                className="object-contain"
                placeholderClassName="bg-[#F5F5F5]"
              />
            </div>
          )}
          <div className="lg:col-span-7">
            <p className="section-eyebrow">Product Brief</p>
            <h2 className="font-heading text-2xl font-semibold text-black md:text-3xl">What it is</h2>
            <p className="section-subtext mt-4 text-base text-dark">{product.whatItIs}</p>
            <p className="mt-4 text-sm text-mid">
              <span className="font-semibold text-black">Standard: </span>
              {product.standard}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-secondary">
        <div className="site-container">
          <p className="section-eyebrow">Application</p>
          <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Where to Use</h2>
          <ul className="mt-8 space-y-4">
            {product.whereToUse.map((item) => (
              <li key={item} className="flex gap-3 text-foreground">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f3ede8] text-[#6b6b6b]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-base leading-[1.75]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container">
          <p className="section-eyebrow">Benefits</p>
          <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Why Use This</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {product.whyBenefits.map((b) => (
              <article key={b.title} className="surface-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ede8] text-[#6b6b6b]">
                  <b.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-body text-xl font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-secondary">
        <div className="site-container">
          <p className="section-eyebrow">Site Process</p>
          <h2 className="font-heading text-2xl font-semibold text-black md:text-3xl">Usage on Site</h2>
          <ol className="mt-8 space-y-6">
            {product.usageSteps.map((step, i98) => (
              <li key={i98} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
                  {i98 + 1}
                </span>
                <p className="pt-1 text-base leading-[1.75] text-dark">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container">
          <p className="section-eyebrow">Pack Options</p>
          <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Variants &amp; Sizes</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <span key={v} className="rounded-pill border border-border-strong bg-elevated px-4 py-2 text-sm font-medium text-mid">
                {v}
              </span>
            ))}
          </div>

          {product.colorSwatches?.length ? (
            <div className="mt-10">
              <h3 className="font-body text-lg font-semibold text-black">Epoxy color range</h3>
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                {product.colorSwatches.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2 text-center">
                    <span className="h-12 w-12 rounded-full border border-border shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />
                    <span className="text-[11px] font-medium leading-tight text-mid">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-pad section-flow-secondary">
        <div className="site-container mx-auto max-w-[720px] surface-card px-8 py-10 text-dark">
          <h2 className="font-heading text-2xl font-semibold text-dark">Need Help?</h2>
          <p className="mt-3 text-base">Our team can validate adhesive class, exposure, and compatibility with your tile system.</p>
          <Button asChild className="mt-6" variant="primary">
            <TransitionLink href="/contact">Get guidance</TransitionLink>
          </Button>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container">
          <p className="section-eyebrow">Related Range</p>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Related Products</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p, index) => (
              <ProductCard
                id={p.id}
                key={p.slug}
                name={p.name}
                slug={p.slug}
                badge={p.badge}
                standard={p.standard}
                applicationShort={p.applicationShort}
                sizesLine={p.sizesLine}
                image={p.image}
                dimensions={p.dimensions}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <CTADark headline="Get a Quote or Consultation" subtext="Share your surface, tile format, and site conditions — we will confirm the right FIXONEX system." />
    </>
  );
}
