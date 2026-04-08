import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CTADarkProps = {
  headline: string;
  subtext: string;
};

export function CTADark({ headline, subtext }: CTADarkProps) {
  return (
    <section className="relative overflow-hidden bg-black py-16 text-center md:py-20">
      <div className="absolute left-1/2 top-0 h-px w-[min(90%,720px)] -translate-x-1/2 bg-warm" aria-hidden />
      <div className="site-container relative mx-auto max-w-[720px] px-6">
        <h2 className="font-display text-display font-semibold text-white">{headline}</h2>
        <p className="mt-4 text-base text-mid">{subtext}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#1ebe5b]">
            <Link href="https://wa.me/917383838632" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden />
              WhatsApp Us
            </Link>
          </Button>
          <Button asChild size="lg" variant="primary">
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 h-px w-[min(90%,720px)] -translate-x-1/2 bg-warm" aria-hidden />
    </section>
  );
}
