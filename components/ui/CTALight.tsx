import Link from "next/link";
import { Button } from "@/components/ui/button";

type CTALightProps = {
  headline: string;
  subtext: string;
};

export function CTALight({ headline, subtext }: CTALightProps) {
  return (
    <section className="bg-warm py-16 text-center md:py-20">
      <div className="site-container mx-auto max-w-[680px]">
        <h2 className="font-display text-[clamp(2.2rem,5vw,48px)] font-semibold text-black">{headline}</h2>
        <div className="mx-auto mt-4 h-1 w-24 rounded-sm bg-warm" aria-hidden />
        <p className="mt-6 text-base text-dark">{subtext}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-black text-warm hover:bg-primary hover:text-white">
            <Link href="/products">Explore Products</Link>
          </Button>
          <Button asChild size="lg" className="bg-black text-warm hover:bg-primary hover:text-white">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
