import Link from "next/link";
import { ArrowRight, Building2, Home, Layers, Mountain, RefreshCw, Waves } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getTileAdhesiveProducts } from "@/lib/data/products";

const cardMeta: Record<string, { code: string; shortName: string; useCase: string }> = {
  "fix-111": { code: "C1T", shortName: "FIX 111", useCase: "Interior ceramic wall and floor." },
  "fix-222": { code: "C2T", shortName: "FIX 222", useCase: "Interior ceramic and vitrified tiles." },
  "fix-333": { code: "C2TE", shortName: "FIX 333", useCase: "Large format tiles, marble, granite." },
  "fix-444": { code: "C2TES1", shortName: "FIX 444", useCase: "Exterior walls and natural stone." },
  "fix-555": { code: "C2TES2", shortName: "FIX 555", useCase: "Pools, porcelain, and tile on tile." },
};

const useCases = [
  { icon: Home, title: "Interior ceramic bathroom wall", recommendation: "FIX 111", href: "/products/tiles-adhesive/fix-111" },
  { icon: Layers, title: "Large vitrified living room floor", recommendation: "FIX 222 or 333", href: "/products/tiles-adhesive/fix-222" },
  { icon: Building2, title: "Exterior building facade", recommendation: "FIX 444", href: "/products/tiles-adhesive/fix-444" },
  { icon: Mountain, title: "Marble or granite installation", recommendation: "FIX 333 or 444", href: "/products/tiles-adhesive/fix-333" },
  { icon: Waves, title: "Swimming pool tiling", recommendation: "FIX 555", href: "/products/tiles-adhesive/fix-555" },
  { icon: RefreshCw, title: "Tile over existing tiles", recommendation: "FIX 555 or PU FIXO-999", href: "/products/tiles-adhesive/fix-555" },
] as const;

export default function TilesAdhesiveHubPage() {
  const family = getTileAdhesiveProducts();

  return (
    <>
      <PageHero
        label="Products"
        title="Tiles Adhesive"
        subtitle="From standard ceramic interiors to exterior facades and swimming pools — find the right grade for your project."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Tiles Adhesive" }]}
      />

      <section className="section-pad section-flow-warm">
        <div className="site-container max-w-[980px]">
          <h2 className="font-display text-3xl font-semibold text-black">The Complete Tiles Adhesive Range</h2>
          <p className="mt-5 text-base leading-[1.8] text-dark">
            FIXONEX offers five certified tile adhesive grades, each engineered for a specific level of performance. Whether you are fixing standard ceramics on an interior wall or installing
            large-format natural stone on an exterior facade, there is a FIXONEX adhesive designed for that exact demand. All five products comply with EN12004 and IS 15477:2019.
          </p>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {family.map((product) => {
              const meta = cardMeta[product.subSlug ?? ""];
              return (
                <article
                  key={product.slug}
                  className="surface-card group min-w-[260px] snap-start p-5 lg:min-w-0"
                >
                  <div className="relative -mx-5 -mt-5 mb-4 h-[240px] overflow-hidden rounded-t-md bg-[#F5F5F5]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      width={product.dimensions?.width ?? 2655}
                      height={product.dimensions?.height ?? 4333}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="absolute inset-0 h-full w-full object-contain bg-[#F5F5F5]"
                      placeholderClassName="bg-[#F5F5F5]"
                    />
                  </div>
                  <div className="mb-4 h-1 w-full rounded-sm bg-transparent transition-colors group-hover:bg-warm" />
                  <span className="inline-flex rounded-pill bg-warm/20 px-2.5 py-1 text-[11px] font-semibold text-dark">{meta?.code ?? product.badge}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[#111111]">{meta?.shortName ?? product.name}</h3>
                  <p className="mt-2 min-h-[42px] text-sm text-mid">{meta?.useCase ?? product.applicationShort}</p>
                  <Link href={`/products/tiles-adhesive/${product.subSlug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-warm">
        <div className="site-container">
          <h2 className="font-display text-3xl font-semibold text-black">Which Grade Do You Need</h2>
          <div className="overflow-x-auto rounded-md border border-border">
            <div className="min-w-[760px] overflow-hidden">
              <div className="grid grid-cols-4 gap-3 bg-[#111111] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white md:px-6 md:text-sm">
                <p>Product</p>
                <p>Type</p>
                <p>Best For</p>
                <p>Size</p>
              </div>
              {[
                ["fix-111", "FIX 111", "C1T Type-1", "Interior ceramic wall and floor", "20kg"],
                ["fix-222", "FIX 222", "C2T Type-2", "Interior ceramic and vitrified tiles", "20kg"],
                ["fix-333", "FIX 333", "C2TE Type-3", "Large format tiles, marble, granite, interior and exterior", "20kg"],
                ["fix-444", "FIX 444", "C2TES1 Type-4", "Exterior walls, large format, natural stone", "20kg"],
                ["fix-555", "FIX 555", "C2TES2 Type-5", "Exterior, porcelain, swimming pools, tile on tile", "20kg"],
              ].map((row, i98) => (
                <div key={row[0]} className={`grid grid-cols-4 gap-3 border-t border-[#e5e0da] px-4 py-4 md:px-6 ${i98 % 2 ? "bg-[#f8f5f2]" : "bg-white"}`}>
                  <Link href={`/products/tiles-adhesive/${row[0]}`} className="border-l-[3px] border-warm pl-3 text-sm font-semibold text-primary hover:underline">
                    {row[1]}
                  </Link>
                  <p className="text-sm text-[#111111]">{row[2]}</p>
                  <p className="text-sm text-[#111111]">{row[3]}</p>
                  <p className="text-sm text-[#111111]">{row[4]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container">
          <h2 className="font-display text-3xl font-semibold text-[#111111]">Not Sure Which Type to Use</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <article key={item.title} className="surface-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <item.icon className="h-6 w-6 text-warm" />
                    <p className="mt-3 text-sm font-medium text-[#111111]">{item.title}</p>
                  </div>
                  <Link href={item.href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {item.recommendation} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-6">
        <p className="site-container text-center text-sm font-semibold text-white md:text-base">
          All FIXONEX Tile Adhesives are certified to EN12004 and IS 15477:2019.
        </p>
      </section>

      <section className="section-pad section-flow-warm">
        <div className="site-container mx-auto max-w-[760px] surface-card p-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-black">Get Help Choosing the Right Grade</h2>
          <p className="mt-3 text-base text-dark">Our team can guide you based on your tile type, surface, and project conditions.</p>
          <Button asChild className="mt-7" variant="primary">
            <Link href="/contact">Contact Team</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
