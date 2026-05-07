import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";
import { cta, sectionBand } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

interface HeroProps {
  introBelow?: React.ReactNode;
}

export function Hero({ introBelow }: HeroProps) {
  const continuous = Boolean(introBelow);

  return (
    <section className={cn("relative overflow-hidden bg-canvas", !continuous && "border-b border-border-soft")}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_0%_0%,rgba(200,210,218,0.2),transparent_58%),radial-gradient(ellipse_60%_50%_at_100%_15%,rgba(217,120,70,0.06),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(120deg,transparent,transparent_32px,rgba(62,55,48,0.025)_32px,rgba(62,55,48,0.025)_33px)]"
        aria-hidden
      />
      <div className={cn("relative mx-auto max-w-content px-4 sm:px-6 lg:px-8", sectionBand.hero)}>
        <div
          className={cn(
            "grid items-center gap-10 sm:gap-11",
            "md:grid-cols-[minmax(0,1fr)_minmax(240px,40%)] md:items-center md:gap-10",
            "lg:grid-cols-[minmax(0,1fr)_minmax(300px,42%)] lg:gap-14 xl:gap-20",
          )}
        >
          <div className="min-w-0">
            <p className="font-heading text-[0.65rem] font-bold uppercase text-subhead [letter-spacing:0.2em] sm:text-xs">
              {BRAND.tagline}
            </p>
            <p className="mt-2 text-sm font-medium leading-snug text-muted-foreground">{BRAND.taglineHi}</p>
            <h1 className="mt-5 max-w-[24ch] font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground min-[400px]:text-4xl sm:mt-6 sm:text-[2.85rem] sm:leading-[1.08] lg:text-[3.25rem] xl:text-[3.6rem]">
              Finishes that hold up — with{" "}
              <span className="font-serif font-medium italic text-primary">FIXONEX</span> beside you on site
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-[1.65] text-muted-foreground sm:mt-6 sm:max-w-2xl sm:text-base md:text-[1.0625rem]">
              {BRAND.description}
            </p>
            <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center sm:gap-3 md:mt-10">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <TransitionLink href="/products">{cta.viewProducts}</TransitionLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <TransitionLink href="/services#product-guidance">{cta.guidance}</TransitionLink>
              </Button>
            </div>
          </div>

          <div className="min-w-0 max-md:mx-auto max-md:w-full max-md:max-w-lg md:max-w-none">
            <div className="group relative">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[1.35rem] bg-gradient-to-br from-chip/35 via-primary/10 to-primary/18 opacity-80 blur-2xl transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] border border-border-strong/50 bg-elevated shadow-[0_20px_50px_-18px_rgba(62,55,48,0.14)] ring-1 ring-border-soft md:aspect-auto md:min-h-[16rem] lg:min-h-[20rem] xl:min-h-[22rem]">
                <ImageWithFallback
                  src="/images/hero/hero-main.jpeg"
                  alt="FIXONEX construction-grade fixing systems"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 44vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {introBelow ? (
          <div
            className={cn(
              "relative mt-10 pt-10 sm:mt-14 sm:pt-14 md:mt-16 md:pt-16 lg:mt-20 lg:pt-[4.25rem]",
              "before:pointer-events-none before:absolute before:inset-x-[-0.5rem] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-foreground/14 before:to-transparent sm:before:inset-x-0",
            )}
          >
            {introBelow}
          </div>
        ) : null}
      </div>
    </section>
  );
}
