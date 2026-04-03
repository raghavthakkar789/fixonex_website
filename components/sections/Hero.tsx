import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#F5F5F5_0%,#FFFFFF_45%,#F5F5F5_100%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl animate-fade-in">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {BRAND.tagline}
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
            Built for installers who refuse callbacks.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {BRAND.description}
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/products">Explore products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/book-consultation">Request product guidance</Link>
            </Button>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-border pt-10 sm:grid-cols-4 sm:gap-6">
            {[
              { k: "Focus", v: "Tile, stone, AAC blocks" },
              { k: "Supply", v: "Adhesive to epoxy" },
              { k: "Channel", v: "Dealers & product info" },
              { k: "Standard", v: "Industrial-grade QA" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {row.k}
                </dt>
                <dd className="mt-1.5 font-heading text-sm font-semibold leading-snug text-foreground">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
