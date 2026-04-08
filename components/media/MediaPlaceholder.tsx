import { cn } from "@/lib/utils";

/**
 * Aspects tuned per breakpoint: mobile caps height / uses squatter ratios so frames do not read as empty voids.
 */
const aspectClasses = {
  video: "aspect-video max-sm:max-h-[13rem] sm:max-h-none",
  ultraWide:
    "aspect-[16/9] max-sm:max-h-[11.5rem] sm:aspect-[2/1] sm:max-h-none sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]",
  landscape:
    "aspect-[5/4] max-sm:max-h-[12rem] sm:aspect-[4/3] md:aspect-[3/2] sm:max-h-none",
  card: "aspect-[16/11] max-sm:max-h-[10rem] sm:aspect-[16/10] sm:max-h-none",
  square:
    "aspect-square max-h-[min(92vw,7.25rem)] min-[400px]:max-h-[min(88vw,10rem)] sm:max-h-[min(100%,13rem)] md:max-h-[min(100%,17rem)] lg:max-h-[min(100%,22rem)]",
  portrait:
    "aspect-[5/4] max-sm:max-h-[11rem] sm:aspect-[4/5] md:aspect-[3/4] sm:max-h-[min(100%,24rem)] lg:max-h-[min(100%,28rem)]",
  fill: "min-h-[9.5rem] max-sm:max-h-[12rem] sm:min-h-[12rem] sm:max-h-none md:min-h-[14rem]",
} as const;

const toneClasses = {
  default: "rounded-md border-border shadow-card ring-1 ring-inset ring-foreground/[0.06]",
  editorial:
    "rounded-2xl border-border/40 shadow-[0_22px_60px_-20px_rgba(17,17,17,0.14)] ring-1 ring-inset ring-foreground/[0.04]",
} as const;

export type MediaPlaceholderAspect = keyof typeof aspectClasses;
export type MediaPlaceholderTone = keyof typeof toneClasses;

export interface MediaPlaceholderProps {
  label: string;
  sublabel?: string;
  aspect?: MediaPlaceholderAspect;
  tone?: MediaPlaceholderTone;
  className?: string;
  decorative?: boolean;
  ariaLabel?: string;
}

export function MediaPlaceholder({
  label,
  sublabel,
  aspect = "landscape",
  tone = "default",
  className,
  decorative,
  ariaLabel,
}: MediaPlaceholderProps) {
  const a11yLabel = ariaLabel ?? label;

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden border bg-muted",
        toneClasses[tone],
        aspectClasses[aspect],
        className,
      )}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : a11yLabel}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.9)_0%,rgba(245,245,245,0.88)_38%,rgba(193,178,164,0.18)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55] max-sm:opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 2px,
            rgba(17,17,17,0.028) 2px,
            rgba(17,17,17,0.028) 3px
          )`,
        }}
        aria-hidden
      />
      <div className="relative m-auto flex w-full max-w-lg flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-8 md:px-8 md:py-9 lg:py-10">
        <p className="font-heading text-[0.625rem] font-bold uppercase leading-snug tracking-[0.14em] text-subhead sm:text-xs">
          {label}
        </p>
        {sublabel ? (
          <p className="mt-1.5 max-w-sm text-[0.6875rem] leading-snug text-muted-foreground max-sm:line-clamp-2 sm:mt-2 sm:text-xs sm:leading-relaxed md:text-sm">
            {sublabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
