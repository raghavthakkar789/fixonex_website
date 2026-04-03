import { cn } from "@/lib/utils";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageBanner({ title, subtitle, className }: PageBannerProps) {
  return (
    <section
      className={cn(
        "border-b border-border bg-muted py-14 sm:py-16",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
