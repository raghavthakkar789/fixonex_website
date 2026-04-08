import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { BRAND } from "@/lib/brand";
import { cta, sectionBand } from "@/lib/ui-constants";
import { cn } from "@/lib/utils";

interface HeroProps {
  introBelow?: React.ReactNode;
}

export function Hero({ introBelow }: HeroProps) {
  const continuous = Boolean(introBelow);

  return (
    <section className={cn("bg-canvas", !continuous && "border-b border-border")}>
      <div className={cn("mx-auto max-w-content px-4 sm:px-6 lg:px-8", sectionBand.hero)}>
        <div
          className={cn(
            "grid items-center gap-8 sm:gap-9",
            "md:grid-cols-[minmax(0,1fr)_minmax(240px,40%)] md:items-center md:gap-10",
            "lg:grid-cols-[minmax(0,1fr)_minmax(280px,44%)] lg:gap-12 xl:gap-16",
          )}
        >
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
            <div className="mt-6 flex w-full max-w-md flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:gap-3 md:mt-9">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/products">{cta.viewProducts}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/products#product-guidance">{cta.guidance}</Link>
              </Button>
            </div>
          </div>

          <div className="min-w-0 max-md:mx-auto max-md:w-full max-md:max-w-lg md:max-w-none">
            <MediaPlaceholder
              tone="editorial"
              aspect="landscape"
              className="w-full md:min-h-[15rem] lg:min-h-[19rem] xl:min-h-[20rem]"
              label="Site-ready fixing systems"
              sublabel="Large-format, wet areas, and high-traffic finishes — photography drops in here."
              ariaLabel="FIXONEX construction-grade fixing systems — hero photography placeholder"
            />
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
