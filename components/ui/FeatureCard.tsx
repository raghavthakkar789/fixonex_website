import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, href, className }: FeatureCardProps) {
  const content = (
    <article className={cn("rounded-2xl border border-border-strong/50 bg-elevated p-8 shadow-sm transition-all duration-300 ease-[var(--ease-default)] hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-neo-hover", className)}>
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-muted transition-colors duration-300 group-hover:bg-secondary">
        <Icon size={24} className="text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold text-brand">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mid">{description}</p>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {content}
      </Link>
    );
  }
  return content;
}
