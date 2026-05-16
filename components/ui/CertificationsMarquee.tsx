"use client";

/**
 * CertificationsMarquee
 *
 * Two-column strip:
 *   ┌──────────────────┬─────────────────────────────────────────────────┐
 *   │  Certifications  │  ← infinite scroll of certification logos →     │
 *   └──────────────────┴─────────────────────────────────────────────────┘
 *
 * Only logos are shown — no names, no labels on the badges.
 */

import Image from "next/image";
import { CERT_IMAGE_URLS } from "@/data/google-drive-media";

/* ─── Cert entries ────────────────────────────────────────────────────────── */
const certs = [
  { id: "isi",           src: CERT_IMAGE_URLS.ISI_logo,    alt: "ISI Mark — Bureau of Indian Standards",               w: 64,  h: 64  },
  { id: "iso",           src: CERT_IMAGE_URLS.ISO_logo,    alt: "ISO Certified",                                       w: 100, h: 50  },
  { id: "make-in-india", src: CERT_IMAGE_URLS.MakeInIndia, alt: "Make in India",                                       w: 120, h: 60  },
  { id: "igbc",          src: CERT_IMAGE_URLS.IGBC_logo,   alt: "IGBC Member — Indian Green Building Council",         w: 96,  h: 60  },
  { id: "ce",            src: CERT_IMAGE_URLS.CE_logo,     alt: "CE Mark — Conformité Européenne",                     w: 84,  h: 60  },
  { id: "iaf",           src: CERT_IMAGE_URLS.IAF_logo,    alt: "IAF Member — Multilateral Recognition Arrangement",   w: 108, h: 56 },
] as const;

/** One loop duration; smaller = faster (linear scroll covers same distance). */
const SCROLL_SECONDS = 5;

/* ─── Component ───────────────────────────────────────────────────────────── */
export function CertificationsMarquee() {
  return (
    <section
      aria-label="Certifications and standards"
      className="relative flex h-[172px] items-stretch overflow-hidden border-y border-zinc-200/70 bg-white"
    >
      {/* ── Left label column ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex w-[200px] shrink-0 items-center justify-center border-r border-zinc-200/70 bg-white px-8">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-primary leading-none mb-2">
            Certified
          </p>
          <p className="text-[15px] font-bold text-zinc-800 leading-tight">
            Standards
          </p>
          <div className="mt-2 mx-auto h-0.5 w-8 rounded-full bg-primary/40" />
        </div>
      </div>

      {/* ── Right scrolling logos ──────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        {/* Left fade over the logos */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        {/* Right fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        {/* Scroll track: two identical inner rows + pr-16 = gap seam so translateX(-50%) loops cleanly */}
        <div
          className="cert-scroll-track flex h-full w-max flex-nowrap items-center will-change-transform"
          style={{ animation: `certScroll ${SCROLL_SECONDS}s linear infinite` }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
        >
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex shrink-0 items-center gap-16 pr-16"
              aria-hidden={dup === 1 ? true : undefined}
            >
              {certs.map((cert) => (
                <div
                  key={`${dup}-${cert.id}`}
                  className="flex shrink-0 items-center justify-center opacity-75 transition-opacity duration-300 grayscale hover:opacity-100 hover:grayscale-0"
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    width={cert.w}
                    height={cert.h}
                    className="h-24 w-auto object-contain"
                    draggable={false}
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframe ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes certScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
