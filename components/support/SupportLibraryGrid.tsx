"use client";

import { TransitionLink } from "@/components/navigation/TransitionLink";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/products";
import type { SupportGuide } from "@/data/support-guides";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { cta, proseInlineLinkClass } from "@/lib/ui-constants";
import { hrefForProductCategorySlug } from "@/lib/product-routes";

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 4;

export function SupportLibraryGrid({ guides }: { guides: SupportGuide[] }) {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const shown = guides.slice(0, visible);
  const canLoadMore = visible < guides.length;
  const expandedBeyondInitial = visible > INITIAL_COUNT;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {shown.map((g) => (
          <Card key={g.id} id={`guide-${g.id}`} className="scroll-mt-24 overflow-hidden" variant="elevated">
            <MediaPlaceholder
              tone="editorial"
              aspect="card"
              className="rounded-none border-x-0 border-t-0 shadow-none ring-0"
              label={g.category}
              sublabel="Article visual"
              decorative
            />
            <CardHeader className="pb-2 pt-4 sm:pt-5">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-subhead sm:text-xs">{g.category}</p>
              <CardTitle className="text-base sm:text-lg">
                <TransitionLink
                  href={`/support/guides/${g.id}`}
                  className="text-foreground transition-colors hover:text-subhead focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {g.title}
                </TransitionLink>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>{g.excerpt}</p>
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                <TransitionLink href={`/support/guides/${g.id}`}>{cta.openGuide}</TransitionLink>
              </Button>
              {g.relatedProductSlugs.length > 0 ? (
                <div>
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-subhead">Related ranges</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {g.relatedProductSlugs.map((slug) => {
                      const p = getProductBySlug(slug);
                      return (
                        <li key={slug}>
                          <TransitionLink href={hrefForProductCategorySlug(slug)} className={proseInlineLinkClass}>
                            {p?.title ?? slug}
                          </TransitionLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
      {canLoadMore || expandedBeyondInitial ? (
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
          {canLoadMore ? (
            <Button
              type="button"
              variant="outline"
              size="default"
              className="min-w-[10rem]"
              onClick={() => setVisible((v) => Math.min(v + LOAD_MORE_COUNT, guides.length))}
            >
              {cta.loadMore}
            </Button>
          ) : null}
          {expandedBeyondInitial ? (
            <Button
              type="button"
              variant="ghost"
              size="default"
              className="min-w-[10rem] text-muted-foreground hover:text-foreground"
              onClick={() => setVisible(INITIAL_COUNT)}
            >
              {cta.showLess}
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
