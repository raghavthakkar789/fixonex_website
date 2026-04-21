import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CTADarkProps = {
  headline: string;
  subtext: string;
};

export function CTADark({ headline, subtext }: CTADarkProps) {
  return (
    <section className="relative overflow-hidden bg-red py-16 text-center md:py-20">
      <span className="absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-red-dk/50" aria-hidden />
      <span className="absolute -bottom-28 -right-20 h-[360px] w-[360px] rounded-full bg-red-dk/40" aria-hidden />
      <div className="site-container relative mx-auto max-w-[720px] px-6">
        <p className="section-eyebrow text-white">Let's Build Together</p>
        <h2 className="font-display text-display font-bold text-white">{headline}</h2>
        <p className="mt-4 text-base text-white/85">{subtext}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="outline" className="border-white/70 text-white hover:bg-white/10 hover:text-white">
            <Link href="https://wa.me/917383838632" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden />
              WhatsApp Us
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-red hover:bg-off-white">
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
