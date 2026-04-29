import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CTADarkProps = {
  headline: string;
  subtext: string;
};

/** High-visibility closing band — light layout with brand red CTAs only. */
export function CTADark({ headline, subtext }: CTADarkProps) {
  return (
    <section className="border-t border-border-soft bg-gradient-to-b from-muted to-secondary/50 py-16 text-center md:py-24">
      <div className="site-container relative mx-auto max-w-[min(100%,40rem)] rounded-3xl border border-border-strong/50 bg-elevated px-6 py-12 shadow-[0_22px_50px_-24px_rgba(62,55,48,0.14)] sm:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-subhead">Let&apos;s build together</p>
        <h2 className="mt-3 font-heading text-[clamp(1.75rem,4vw,2.4rem)] font-bold leading-tight tracking-tight text-foreground">
          {headline}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-mid">{subtext}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="https://wa.me/917383838632" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden />
              WhatsApp
            </Link>
          </Button>
          <Button asChild size="lg" variant="primary">
            <Link href="/contact">Book consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
