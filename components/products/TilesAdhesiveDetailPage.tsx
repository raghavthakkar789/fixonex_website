import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { CTADark } from "@/components/ui/CTADark";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getTileAdhesiveBySubSlug, getTileAdhesiveProducts } from "@/lib/data/products";

const familyTabs = [
  { subSlug: "fix-111", label: "FIX 111" },
  { subSlug: "fix-222", label: "FIX 222" },
  { subSlug: "fix-333", label: "FIX 333" },
  { subSlug: "fix-444", label: "FIX 444" },
  { subSlug: "fix-555", label: "FIX 555" },
] as const;

export function TilesAdhesiveDetailPage({ subSlug }: { subSlug: string }) {
  const product = getTileAdhesiveBySubSlug(subSlug);
  if (!product) notFound();

  const related = getTileAdhesiveProducts().filter((p) => p.subSlug !== subSlug);

  return (
    <>
      <div className="border-b border-border bg-white">
        <div className="site-container overflow-x-auto py-3 text-[13px] text-mid">
          <div className="min-w-max whitespace-nowrap">
          <Link href="/products" className="transition-colors hover:text-black">
            Products
          </Link>
          <span className="mx-2 text-warm">›</span>
          <Link href="/products/tiles-adhesive" className="transition-colors hover:text-black">
            Tiles Adhesive
          </Link>
          <span className="mx-2 text-warm">›</span>
          <span>{product.name.replace(/[()]/g, "")}</span>
          </div>
        </div>
      </div>

      <PageHero
        label={product.badge}
        title={product.name}
        subtitle={product.applicationShort}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Tiles Adhesive", href: "/products/tiles-adhesive" },
          { label: product.name.replace(/[()]/g, "") },
        ]}
      />

      <section className="sticky top-[72px] z-30 border-b border-border bg-white">
        <div className="site-container overflow-x-auto">
          <div className="flex min-w-max gap-6">
            {familyTabs.map((tab) => {
              const active = tab.subSlug === subSlug;
              return (
                <Link
                  key={tab.subSlug}
                  href={`/products/tiles-adhesive/${tab.subSlug}`}
                  className={`inline-flex border-b-2 py-4 text-sm font-semibold transition-colors ${
                    active ? "border-primary text-black" : "border-transparent text-mid hover:text-black"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="relative h-[360px] overflow-hidden rounded-md border border-border bg-[#F5F5F5] md:h-[460px] lg:col-span-5 lg:h-[560px]">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              width={product.dimensions?.width ?? 2655}
              height={product.dimensions?.height ?? 4333}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="absolute inset-0 h-full w-full object-contain bg-[#F5F5F5]"
              placeholderClassName="bg-[#F5F5F5]"
            />
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold text-black md:text-3xl">What it is</h2>
            <p className="mt-4 text-base leading-[1.75] text-dark">{product.whatItIs}</p>
            <p className="mt-4 text-sm text-mid">
              <span className="font-semibold text-black">Standard: </span>
              {product.standard}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-light">
        <div className="site-container">
          <h2 className="font-display text-2xl font-semibold text-black md:text-3xl">Where to Use</h2>
          <ul className="mt-8 space-y-4">
            {product.whereToUse.map((item) => (
              <li key={item} className="flex gap-3 text-dark">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warm/30 text-warm">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-base leading-[1.75]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <h2 className="font-display text-2xl font-semibold text-black md:text-3xl">Why Use This</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {product.whyBenefits.map((b) => (
              <article key={b.title} className="rounded-md border border-border p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-rose text-primary">
                  <b.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-body text-xl font-semibold text-black">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <h2 className="font-display text-2xl font-semibold text-black md:text-3xl">Usage on Site</h2>
          <ol className="mt-8 space-y-6">
            {product.usageSteps.map((step, i98) => (
              <li key={i98} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-white">
                  {i98 + 1}
                </span>
                <p className="pt-1 text-base leading-[1.75] text-dark">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-light">
        <div className="site-container">
          <h2 className="font-display text-2xl font-semibold text-black md:text-3xl">Variants &amp; Sizes</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <span key={v} className="rounded-pill border border-border bg-white px-4 py-2 text-sm font-medium text-dark">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container mx-auto max-w-[720px] rounded-md bg-warm px-8 py-10 text-dark">
          <h2 className="font-display text-2xl font-semibold text-dark">Need Help?</h2>
          <p className="mt-3 text-base">Our team can validate adhesive class, exposure, and compatibility with your tile system.</p>
          <Button asChild className="mt-6" variant="primary">
            <Link href="/contact">Get guidance</Link>
          </Button>
        </div>
      </section>

      <section className="section-pad bg-light">
        <div className="site-container">
          <h2 className="font-display text-2xl font-semibold text-black">Related Products</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p, index) => (
              <ProductCard
                id={p.id}
                key={p.slug}
                name={p.name}
                slug={`tiles-adhesive/${p.subSlug ?? p.slug}`}
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
