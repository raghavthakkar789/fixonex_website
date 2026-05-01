import { cn } from "@/lib/utils";

interface ContentSplitProps {
  children: React.ReactNode;
  mediaFirst?: boolean;
  className?: string;
  gap?: "default" | "airy";
  mediaMat?: boolean;
  media: React.ReactNode;
}

/**
 * Copy + media pairing: stacks on small screens; two columns from `md` (tablet); widens at `lg` / `xl`.
 */
export function ContentSplit({
  children,
  media,
  mediaFirst = false,
  className,
  gap = "default",
  mediaMat = true,
}: ContentSplitProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 items-stretch md:grid-cols-[1fr_minmax(200px,36%)] lg:grid-cols-[1fr_minmax(260px,38%)] xl:grid-cols-[1fr_minmax(280px,36%)]",
        gap === "default" && "gap-7 sm:gap-9 md:gap-10 lg:gap-14 xl:gap-[4.25rem]",
        gap === "airy" && "gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-[4.75rem]",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-0 flex-col justify-center",
          mediaFirst ? "md:col-start-2 lg:col-start-2 md:row-start-1" : "md:col-start-1 lg:col-start-1",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-h-0 min-w-0 flex-col justify-center max-md:max-w-lg max-md:mx-auto max-md:w-full md:max-w-none",
          mediaMat &&
            "rounded-2xl border border-border-soft bg-muted/35 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8",
          mediaFirst ? "md:col-start-1 md:row-start-1 lg:col-start-1" : "md:col-start-2 lg:col-start-2",
        )}
      >
        {media}
      </div>
    </div>
  );
}
