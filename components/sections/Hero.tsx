import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { cta, sectionBand } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="border-b border-border bg-canvas">
      <div className={cn("mx-auto max-w-content px-4 sm:px-6 lg:px-8", sectionBand.hero)}>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="min-w-0">
            <p className="font-heading text-[0.6875rem] font-bold uppercase text-subhead [letter-spacing:0.16em] sm:text-xs">
              {BRAND.tagline}
            </p>
            <p className="mt-1.5 text-sm font-medium leading-snug text-muted-foreground">{BRAND.taglineHi}</p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-tight text-foreground min-[400px]:text-4xl sm:mt-5 sm:text-[2.75rem] sm:leading-[1.1] lg:text-[3.125rem] xl:text-[3.5rem]">
              Finishes that hold up — with FIXONEX beside you on site
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:max-w-2xl sm:text-base md:text-[1.05rem]">
              {BRAND.description}
            </p>
            <div className="mt-7 flex w-full max-w-md flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/products">{cta.viewProducts}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/products#product-guidance">{cta.guidance}</Link>
              </Button>
            </div>
          </div>

          <div
            className="relative min-h-[220px] overflow-hidden rounded-md border border-border bg-background shadow-card lg:min-h-[360px]"
            aria-hidden
          >
            <div className="flex h-full min-h-[inherit] flex-col">
              <div className="min-h-[112px] flex-[1.12] border-b border-border bg-muted lg:min-h-[188px]" />
              <div className="flex flex-1 items-center justify-center bg-background px-5 py-7 sm:px-7">
                <p className="text-center font-heading text-[0.8125rem] font-bold uppercase leading-snug text-subhead [letter-spacing:0.12em] sm:text-sm">
                  Construction-grade fixing systems — structured for real sites
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
