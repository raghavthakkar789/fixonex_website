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
          <p className="mt-2 text-sm font-medium leading-snug text-muted-foreground">{BRAND.taglineHi}</p>
          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
            Your journey to lasting quality begins here — with FIXONEX
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {BRAND.description}
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/products">Explore products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/products#product-guidance">Product guidance</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
