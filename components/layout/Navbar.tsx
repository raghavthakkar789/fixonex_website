"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { cta } from "@/lib/ui-constants";

function normalizePath(path: string) {
  const p = path.replace(/\/$/, "");
  return p === "" ? "/" : p;
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const path = normalizePath(pathname);
  const target = normalizePath(href);
  const active =
    target === "/"
      ? path === "/"
      : path === target || path.startsWith(`${target}/`);
  return (
    <Link
      href={href}
      className={cn(
        "border-b-2 border-transparent pb-0.5 font-heading text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active ? "border-primary text-primary" : "text-foreground hover:text-primary",
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const path = normalizePath(pathname);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function linkActive(href: string) {
    const target = normalizePath(href);
    return target === "/"
      ? path === "/"
      : path === target || path.startsWith(`${target}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-nav">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-3 px-4 sm:h-[3.75rem] sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 shrink-0 flex-col justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${BRAND.name}, home`}
        >
          <span className="font-heading text-lg font-bold leading-tight tracking-tight text-foreground">{BRAND.name}</span>
          <span className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
            {BRAND.logoMotto}
          </span>
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-1 lg:flex xl:gap-x-5" aria-label="Primary">
          <NavLink href="/" label="Home" />
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="default">
            <Link href="/products#product-guidance">{cta.helpChoose}</Link>
          </Button>
          <Button asChild size="default">
            <Link href="/contact">{cta.contactShort}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      {open && (
        <div className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-content flex-col gap-0.5 px-4 py-4 sm:px-6">
            <Link
              href="/"
              className={cn(
                "min-h-11 rounded-md px-3 py-2.5 text-sm font-medium font-heading hover:bg-muted",
                linkActive("/") ? "text-primary" : "text-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "min-h-11 rounded-md px-3 py-2.5 text-sm font-medium font-heading hover:bg-muted",
                  linkActive(item.href) ? "text-primary" : "text-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/products#product-guidance" onClick={() => setOpen(false)}>
                  {cta.helpChoose}
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  {cta.contactShort}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
