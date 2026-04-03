import Link from "next/link";
import { mainNav, resourceNav } from "@/data/navigation";
import { companyInfo } from "@/data/company";
import { socialLinks } from "@/data/social";
import { BRAND } from "@/lib/brand";
import { socialIconMap } from "@/lib/social-icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-heading text-xl font-bold tracking-tight">{BRAND.name}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/50">{BRAND.logoMotto}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{BRAND.tagline}</p>
          </div>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <Link
                  href="/"
                  className="inline-block rounded-sm py-0.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
                >
                  Home
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-sm py-0.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
              Resources
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {resourceNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-sm py-0.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="inline-block rounded-sm py-0.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="inline-block rounded-sm py-0.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-white/80 transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
                    aria-label={s.label}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs leading-relaxed text-white/50">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
