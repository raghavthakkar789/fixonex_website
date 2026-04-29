import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type BlogCardProps = {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  href: string;
};

export function BlogCard({ title, excerpt, category, image, readTime, href }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border-strong/50 bg-elevated shadow-sm transition-shadow hover:shadow-neo">
      <div className="relative aspect-[3/2] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="inline-flex rounded-pill bg-[rgba(197,205,210,0.35)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-terracotta">{category}</span>
        <h3 className="my-3 line-clamp-2 font-heading text-lg font-semibold text-brand">{title}</h3>
        <p className="line-clamp-2 text-sm text-mid">{excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-mid">{readTime}</span>
          <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-red">
            Read guide <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
