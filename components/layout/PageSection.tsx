import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: React.ReactNode;
  /** `narrow` = max-w-3xl for forms and long-form reading */
  size?: "default" | "narrow";
  /**
   * Vertical rhythm — use one tier sitewide per block type:
   * - `default` — main interior sections (Products, Support body, About narrative)
   * - `spacious` — lead story blocks
   * - `compact` — FAQ tail, secondary blocks
   * - `tight` — dense follow-ups (support teaser, stats-adjacent)
   */
  spacing?: "default" | "spacious" | "compact" | "tight" | "relaxed";
  className?: string;
}

/**
 * Consistent horizontal padding and vertical rhythm for inner pages.
 */
export function PageSection({
  children,
  size = "default",
  spacing = "default",
  className,
}: PageSectionProps) {
  return (
    <div
      className={cn(
        "site-container w-full min-w-0",
        size === "narrow" ? "max-w-3xl" : "max-w-content",
        spacing === "default" && "py-12 sm:py-14 md:py-[4.25rem] lg:py-24",
        spacing === "spacious" && "py-14 sm:py-16 md:py-20 lg:py-28",
        spacing === "compact" && "py-10 sm:py-12 md:py-14 lg:py-16",
        spacing === "tight" && "py-9 sm:py-11 md:py-12 lg:py-14",
        spacing === "relaxed" && "py-11 sm:py-14 md:py-16 lg:py-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
