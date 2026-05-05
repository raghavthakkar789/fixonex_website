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

/* ─── Cert entries ────────────────────────────────────────────────────────── */
const certs = [
  { id: "isi",           src: "/images/certs/isi.svg",           alt: "ISI Mark — Bureau of Indian Standards",          w: 64,  h: 64  },
  { id: "iso",           src: "/images/certs/iso.svg",           alt: "ISO Certified",                                  w: 100, h: 50  },
  { id: "make-in-india", src: "/images/certs/make-in-india.svg", alt: "Make in India",                                  w: 120, h: 60  },
  { id: "igbc",          src: "/images/certs/igbc.svg",          alt: "IGBC Member — Indian Green Building Council",    w: 96,  h: 60  },
  { id: "ce",            src: "/images/certs/ce.svg",            alt: "CE Mark — Conformité Européenne",                w: 84,  h: 60  },
  { id: "iaf",           src: "/images/certs/iaf.svg",           alt: "IAF Member — Multilateral Recognition Arrangement", w: 108, h: 56 },
] as const;

/* duplicate 4× so the loop is seamlessly long */
const track = [...certs, ...certs, ...certs, ...certs];

/* ─── Component ───────────────────────────────────────────────────────────── */
export function CertificationsMarquee() {
  return (
    <section
      aria-label="Certifications and standards"
      className="relative flex h-[148px] items-stretch overflow-hidden border-y border-zinc-200/70 bg-white"
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

        {/* Scroll track */}
        <div
          className="flex h-full items-center gap-16 cert-scroll-track"
          style={{ animation: "certScroll 9s linear infinite" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
        >
          {track.map((cert, i) => (
            <div
              key={`${cert.id}-${i}`}
              className="shrink-0 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={cert.w}
                height={cert.h}
                className="h-20 w-auto object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframe ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes certScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 4)); }
        }
      `}</style>
    </section>
  );
}
