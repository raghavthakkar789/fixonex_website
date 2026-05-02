"use client";

import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";
import { mainNav } from "@/data/navigation";
import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Button } from "@/components/ui/button";

const routes = [{ href: "/", label: "Home" }, ...mainNav] as const;

function activeFor(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[100] border-b border-border-strong/80 bg-white/95 backdrop-blur">
      <div className="site-container flex min-h-20 items-center justify-between gap-4 py-3">
        <TransitionLink href="/" className="text-xl font-extrabold tracking-tight text-foreground">
          {BRAND.name}
        </TransitionLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-border-strong bg-muted/35 p-1">
            {routes.map((item) => {
              const active = activeFor(pathname, item.href);
              return (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      active ? "bg-white text-foreground shadow-sm" : "text-mid hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button asChild size="sm" className="hidden md:inline-flex">
          <TransitionLink href="/contact">Get a quote</TransitionLink>
        </Button>

        <nav aria-label="Primary mobile" className="md:hidden">
          <ul className="flex items-center gap-2 text-sm">
            {routes.slice(0, 4).map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="text-mid hover:text-foreground">
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
