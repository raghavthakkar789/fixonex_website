import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: ProductCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex h-full min-w-0 flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      <CardHeader>
        <div className="mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted">
          <div
            className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#E0E0E0_0,#E0E0E0_1px,transparent_1px,transparent_8px)] text-center text-xs font-medium text-muted-foreground px-4"
            role="img"
            aria-label={product.heroImageAlt}
          >
            {product.title}
          </div>
        </div>
        <CardTitle className="text-xl">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto flex flex-1 flex-col">
        <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          See where it fits
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
