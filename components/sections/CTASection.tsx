import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  /** Optional second line (e.g. promotional tagline) under the description */
  accentLine?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "light" | "dark";
  className?: string;
  /** compact = strong but below hero weight (e.g. closing strip) */
  emphasis?: "default" | "compact";
}

export function CTASection({
  title,
  description,
  accentLine,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant = "light",
  className,
  emphasis = "default",
}: CTASectionProps) {
  const isDark = variant === "dark";
  const compact = emphasis === "compact";
  return (
    <section
      className={cn(
        "border-y border-border",
        compact ? "py-10 sm:py-12 md:py-14 lg:py-16" : "py-12 sm:py-14 md:py-16 lg:py-[4.75rem]",
        isDark ? "bg-secondary text-foreground border-border-strong" : "bg-muted",
        className,
      )}
    >
      <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
        <h2
          className={cn(
            "mx-auto max-w-3xl font-heading font-bold tracking-tight",
            compact ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl md:text-[1.75rem]",
            "text-foreground",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-3 max-w-2xl leading-relaxed",
            compact ? "text-xs sm:text-sm md:text-base" : "text-sm sm:text-base",
            isDark ? "text-mid" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
        {accentLine ? (
          <p
            className={cn(
              "mx-auto mt-2 max-w-xl text-sm font-medium leading-relaxed",
              isDark ? "text-mid" : "text-muted-foreground",
            )}
          >
            {accentLine}
          </p>
        ) : null}
        <div
          className={cn(
            "flex w-full max-w-md flex-col items-stretch justify-center gap-2.5 sm:mx-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-3",
            compact ? "mt-7 sm:mt-8" : "mt-8 sm:mt-10",
          )}
        >
          <Button asChild size="lg" className="w-full sm:w-auto sm:min-w-[10.5rem]">
            <TransitionLink href={primaryHref}>{primaryLabel}</TransitionLink>
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "w-full sm:w-auto sm:min-w-[10.5rem]",
                isDark &&
                  "border-border-strong text-foreground hover:bg-elevated/80 hover:text-foreground focus-visible:ring-offset-secondary",
              )}
            >
              <TransitionLink href={secondaryHref}>{secondaryLabel}</TransitionLink>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
