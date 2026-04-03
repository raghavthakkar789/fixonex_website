import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: React.ReactNode;
  /** `narrow` = max-w-3xl for forms and long-form reading */
  size?: "default" | "narrow";
  className?: string;
}

/**
 * Consistent horizontal padding and vertical rhythm for inner pages.
 */
export function PageSection({ children, size = "default", className }: PageSectionProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-4 py-14 sm:px-6 sm:py-16 lg:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
