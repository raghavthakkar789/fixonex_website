import { TransitionLink } from "@/components/navigation/TransitionLink";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { cta } from "@/lib/ui-constants";

interface ProductCardProps {
  product: ProductCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  const bestFor = product.idealUseCases[0];

  return (
    <Card className="group flex h-full min-w-0 flex-col overflow-hidden">
      <CardHeader className="space-y-2.5 p-4 sm:p-5 md:p-6">
        {product.image ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/40 bg-[#F5F5F5] shadow-[0_22px_60px_-20px_rgba(17,17,17,0.14)] ring-1 ring-inset ring-foreground/[0.04]">
            <ImageWithFallback
              src={product.image}
              alt={product.heroImageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-4"
              placeholderClassName="bg-[#F5F5F5]"
            />
          </div>
        ) : (
          <MediaPlaceholder
            tone="editorial"
            aspect="card"
            className="w-full"
            label={product.title}
            sublabel="Category visual — swap for range photography."
            decorative
          />
        )}
        <CardTitle className="text-lg text-foreground sm:text-xl">{product.title}</CardTitle>
        {bestFor ? (
          <p className="text-[0.625rem] font-bold uppercase leading-snug tracking-[0.12em] text-subhead">
            Best for:{" "}
            <span className="block pt-1 font-body text-xs font-normal normal-case tracking-normal text-muted-foreground sm:pt-0 sm:inline">
              {bestFor}
            </span>
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="mt-auto flex flex-1 flex-col p-4 pt-0 sm:p-5 sm:pt-0 md:p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        <TransitionLink
          href={`/products/${product.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold tracking-tight text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline sm:mt-6"
        >
          {cta.viewRange}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-industrial group-hover:translate-x-0.5" />
        </TransitionLink>
      </CardContent>
    </Card>
  );
}
