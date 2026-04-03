"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav, resourceNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "rounded-sm px-1 py-1 text-sm font-medium font-heading transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        active ? "text-primary" : "text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 shrink-0 flex-col justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`${BRAND.name}, home`}
        >
          <span className="font-heading text-lg font-bold leading-tight tracking-tight text-foreground">{BRAND.name}</span>
          <span className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
            {BRAND.logoMotto}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          <NavLink href="/" label="Home" />
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          <div className="group relative">
            <span
              className="flex cursor-default select-none items-center gap-1 rounded-sm py-1 pl-1 pr-0 text-sm font-medium font-heading text-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            >
              More
              <ChevronDown
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden
              />
            </span>
            {/*
              pt-2 bridges the gap so hover is not lost moving from the trigger to the panel.
              pointer-events: none until hover/focus-within so the hit area does not block clicks below.
            */}
            <div className="pointer-events-none invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-56 border border-border bg-background py-2 shadow-card-hover">
                {resourceNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block min-h-11 px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary focus-visible:bg-muted focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
          <Button variant="outline" asChild size="default">
            <Link href="/book-consultation">Product guidance</Link>
          </Button>
          <Button asChild size="default">
            <Link href="/contact">Inquire</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      {open && (
        <div className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="min-h-11 rounded-sm px-3 py-2.5 text-sm font-medium font-heading text-foreground hover:bg-muted hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 rounded-sm px-3 py-2.5 text-sm font-medium font-heading text-foreground hover:bg-muted hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              More
            </p>
            {resourceNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 rounded-sm px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/book-consultation" onClick={() => setOpen(false)}>
                  Product guidance
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Inquire
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
