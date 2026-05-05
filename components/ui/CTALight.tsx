import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Button } from "@/components/ui/button";

type CTALightProps = {
  headline: string;
  subtext: string;
};

export function CTALight({ headline, subtext }: CTALightProps) {
  return (
    <section className="border-t border-border-soft bg-secondary/70 py-16 text-center md:py-24">
      <div className="site-container relative mx-auto max-w-[min(100%,42rem)] rounded-3xl border border-border-soft bg-elevated px-7 py-14 shadow-neo sm:px-12">
        <p className="section-eyebrow text-center !text-subhead">Consultation</p>
        <h2 className="font-heading text-[clamp(1.9rem,4.2vw,2.5rem)] font-bold tracking-[-0.02em] text-foreground">
          {headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-mid">{subtext}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Button asChild size="lg" variant="outline">
            <TransitionLink href="/products">Explore Products</TransitionLink>
          </Button>
          <Button asChild size="lg" variant="primary">
            <TransitionLink href="/contact">Contact Us</TransitionLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
