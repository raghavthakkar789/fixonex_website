import { cn } from "@/lib/utils";

/** Visual weight for section titles — drives scan hierarchy without changing layout chrome. */
export type SectionHeadingImportance = "primary" | "default" | "secondary" | "quiet";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** primary = core story sections; quiet = proof / utility previews */
  importance?: SectionHeadingImportance;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  importance = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-heading uppercase text-subhead [letter-spacing:0.14em]",
            importance === "quiet" &&
              "text-[0.625rem] font-bold [letter-spacing:0.16em] sm:text-[0.6875rem]",
            importance === "primary" && "text-[0.6875rem] font-bold sm:text-xs",
            (importance === "default" || importance === "secondary") && "text-[0.6875rem] font-bold sm:text-xs",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-heading font-bold tracking-tight text-foreground",
          importance === "primary" &&
            "mt-2.5 text-[1.625rem] leading-[1.15] min-[400px]:text-3xl sm:mt-3 sm:text-4xl lg:text-[2rem] lg:leading-tight",
          importance === "default" && "mt-2.5 text-[1.3125rem] leading-snug sm:mt-3 sm:text-2xl md:text-[1.75rem]",
          importance === "secondary" &&
            "mt-2 text-lg font-bold leading-snug sm:text-xl md:text-2xl",
          importance === "quiet" &&
            "mt-2 text-base font-semibold leading-snug text-foreground sm:text-lg md:text-xl",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl leading-relaxed text-muted-foreground",
            importance === "primary" && "mt-3 text-sm sm:mt-4 sm:text-base md:text-[1.05rem]",
            importance === "default" && "mt-2.5 text-sm sm:mt-3.5 sm:text-base",
            importance === "secondary" && "mt-2 text-xs sm:mt-3 sm:text-sm md:text-base",
            importance === "quiet" &&
              "mt-1.5 max-w-2xl text-xs leading-relaxed sm:mt-2 sm:text-sm",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
