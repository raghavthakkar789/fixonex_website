import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "light" | "dark";
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant = "light",
  className,
}: CTASectionProps) {
  const isDark = variant === "dark";
  return (
    <section
      className={cn(
        "border-y border-border py-16 sm:py-20",
        isDark ? "bg-surface-dark text-white" : "bg-muted",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title}</h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl text-base leading-relaxed",
            isDark ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
        <div className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:items-center">
          <Button asChild size="lg" className="w-full sm:w-auto sm:min-w-[11rem]">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "w-full sm:w-auto sm:min-w-[11rem]",
                isDark &&
                  "border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white",
              )}
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
