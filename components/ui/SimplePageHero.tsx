import { ChevronRight } from "lucide-react";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";

/** Same default as `PageHero`: home hero photography */
export const SIMPLE_HERO_DEFAULT_IMAGE = "/images/hero/hero-main.jpeg";

type Crumb = { label: string; href?: string };

export type SimplePageHeroProps = {
  label: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  breadcrumbs?: Crumb[];
  /** Defaults to `SIMPLE_HERO_DEFAULT_IMAGE` (main hero). */
  image?: string;
  imageClassName?: string;
  sectionClassName?: string;
};

/**
 * Full-bleed image hero with text overlay — no motion, parallax, or cinematic layers.
 */
export function SimplePageHero({
  label,
  titleLine1,
  titleLine2,
  subtitle,
  breadcrumbs = [],
  image,
  imageClassName,
  sectionClassName,
}: SimplePageHeroProps) {
  const src = image ?? SIMPLE_HERO_DEFAULT_IMAGE;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden text-white min-h-[28rem] lg:min-h-[34rem]",
        sectionClassName,
      )}
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <ImageWithFallback
          src={src}
          alt=""
          fill
          priority
          reveal="none"
          sizes="100vw"
          className={cn("object-cover object-center", imageClassName)}
        />
      </div>
      {/* Dark translucent blur between image and copy — improves contrast without killing the photo */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-[1]",
          "bg-black/30 backdrop-blur-md sm:backdrop-blur-lg",
          "supports-[backdrop-filter]:bg-black/25",
        )}
      />
      {/* Light edge falloff for readability on busy imagery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/15 via-transparent to-black/8"
      />

      <div className="site-container relative z-10 flex min-h-[28rem] flex-col justify-center py-16 lg:min-h-[34rem] lg:py-20">
        <div className="max-w-4xl">
          {breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-zinc-300"
            >
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                  {crumb.href ? (
                    <TransitionLink
                      href={crumb.href}
                      className="font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                    >
                      {crumb.label}
                    </TransitionLink>
                  ) : (
                    <span className="font-semibold text-zinc-100">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-3 w-3 text-zinc-500" aria-hidden />
                  )}
                </span>
              ))}
            </nav>
          )}

          <p className="eyebrow-label mb-5 text-white/95 drop-shadow-md">{label}</p>

          <h1
            className="max-w-3xl font-display font-bold leading-[1.06] tracking-[-0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
          >
            {titleLine1}
            <br />
            {titleLine2}
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-zinc-200 drop-shadow-md">{subtitle}</p>

          <div className="mt-8 h-[3px] w-16 rounded-full bg-gradient-to-r from-primary to-orange-500" />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </section>
  );
}
