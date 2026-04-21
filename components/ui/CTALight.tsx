import Link from "next/link";
import { Button } from "@/components/ui/button";

type CTALightProps = {
  headline: string;
  subtext: string;
};

export function CTALight({ headline, subtext }: CTALightProps) {
  return (
    <section className="section-flow-warm py-16 text-center md:py-20">
      <div className="site-container mx-auto max-w-[680px]">
        <p className="section-eyebrow text-center">Consultation</p>
        <h2 className="font-display text-[clamp(2.2rem,5vw,48px)] font-bold text-brand">{headline}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-dark">{subtext}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button asChild size="lg" variant="primary">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
