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
        "mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-content",
        spacing === "default" && "py-12 sm:py-16 lg:py-20",
        spacing === "spacious" && "py-14 sm:py-20 lg:py-24",
        spacing === "compact" && "py-10 sm:py-12",
        spacing === "tight" && "py-9 sm:py-11 lg:py-12",
        spacing === "relaxed" && "py-11 sm:py-14 lg:py-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
