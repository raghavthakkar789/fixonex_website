import { cn } from "@/lib/utils";
import { pageTitleH1Compact, pageTitleH1Large } from "@/lib/ui-constants";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  className?: string;
  /** compact = inner pages; default = hero-style weight for key landing band */
  importance?: "default" | "compact";
}

export function PageBanner({ title, subtitle, className, importance = "default" }: PageBannerProps) {
  const compact = importance === "compact";
  return (
    <section
      className={cn(
        "border-b border-border bg-background",
        compact ? "py-8 sm:py-10" : "py-12 sm:py-16",
        className,
      )}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h1 className={cn(compact ? pageTitleH1Compact : pageTitleH1Large)}>{title}</h1>
        {subtitle && (
          <p
            className={cn(
              "max-w-2xl leading-relaxed text-muted-foreground",
              compact
                ? "mt-2 text-xs sm:mt-2.5 sm:text-sm"
                : "mt-3 text-sm sm:mt-3.5 sm:text-base",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
