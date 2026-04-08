import { cn } from "@/lib/utils";
import { pageTitleH1Compact, pageTitleH1Large } from "@/lib/ui-constants";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  className?: string;
  importance?: "default" | "compact";
  media?: React.ReactNode;
}

export function PageBanner({ title, subtitle, className, importance = "default", media }: PageBannerProps) {
  const compact = importance === "compact";
  return (
    <section
      className={cn(
        "border-b border-border/35 bg-background",
        compact ? "py-9 sm:py-11 md:py-12 lg:py-14" : "py-11 sm:py-14 md:py-16 lg:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            media &&
              cn(
                "grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(200px,38%)] md:items-start md:gap-9",
                "lg:grid-cols-[minmax(0,1fr)_minmax(260px,36%)] lg:items-center lg:gap-11 xl:gap-14",
              ),
          )}
        >
          <div className="min-w-0">
            <h1 className={cn(compact ? pageTitleH1Compact : pageTitleH1Large)}>{title}</h1>
            {subtitle && (
              <p
                className={cn(
                  "max-w-2xl leading-relaxed text-muted-foreground",
                  compact ? "mt-2.5 text-xs sm:mt-3 sm:text-sm" : "mt-3 text-sm sm:mt-4 sm:text-base",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {media ? (
            <div className="min-w-0 max-md:mx-auto max-md:w-full max-md:max-w-md md:shrink-0 lg:max-w-none">{media}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
