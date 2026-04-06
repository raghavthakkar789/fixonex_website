"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";

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

        <nav className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-1 lg:flex xl:gap-x-5" aria-label="Primary">
          <NavLink href="/" label="Home" />
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="default">
            <Link href="/products#product-guidance">Product guidance</Link>
          </Button>
          <Button asChild size="default">
            <Link href="/contact">Contact</Link>
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
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/products#product-guidance" onClick={() => setOpen(false)}>
                  Product guidance
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
