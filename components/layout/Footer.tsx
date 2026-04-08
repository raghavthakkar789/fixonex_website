import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { companyInfo } from "@/data/company";
import { socialLinks } from "@/data/social";
import { BRAND } from "@/lib/brand";
import { socialIconMap } from "@/lib/social-icons";
import { Button } from "@/components/ui/button";
import { cta } from "@/lib/ui-constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-content px-4 py-11 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
          <div>
            <p className="font-heading text-xl font-bold tracking-tight text-white">{BRAND.name}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/55">{BRAND.logoMotto}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">{BRAND.tagline}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">{BRAND.taglineHi}</p>
            <Button asChild size="default" className="mt-6">
              <Link href="/contact">{cta.contact}</Link>
            </Button>
          </div>
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-white/90">Navigate</p>
            <ul className="mt-3 space-y-2 text-sm text-white/78">
              <li>
                <Link
                  href="/"
                  className="inline-block rounded-md py-0.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                >
                  Home
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-md py-0.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-white/90">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-white/78">
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="inline-block rounded-md py-0.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="inline-block rounded-md py-0.5 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="pt-1 text-sm text-white/60">{companyInfo.businessHours}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socialLinks.map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/22 text-white/82 transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                    aria-label={s.label}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/12 pt-7 text-center text-xs leading-relaxed text-white/50">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
