"use client";

import { TransitionLink } from "@/components/navigation/TransitionLink";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  ClipboardList,
  Grid3X3,
  Headset,
  HelpCircle,
  Layers,
  MapPin,
  MessageCircle,
  Package,
  Palette,
  PhoneCall,
  Search,
  Shield,
} from "lucide-react";
import { WHATSAPP_HREF } from "@/data/social";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";
import { homeFaqs } from "@/lib/data/home-faqs";
import { testimonials } from "@/lib/data/testimonials";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const FAQ_PREVIEW = homeFaqs.slice(0, 6);

const FAQ_CATEGORIES = [
  { title: "Products & specs", items: FAQ_PREVIEW.slice(0, 3) },
  { title: "Orders & site", items: FAQ_PREVIEW.slice(3, 6) },
] as const;

const testimonialExtras = [
  { projectLabel: "Jaipur commercial facade" },
  { projectLabel: "Ahmedabad showroom retail" },
  { projectLabel: "Commercial podium decks" },
] as const;

const projectPreviews = [
  {
    title: "Narayan Exotica retail build-out",
    location: "Ahmedabad, Gujarat",
    year: "2023",
    category: "Commercial",
    line: "Interior specification: wall and floor systems with matched epoxy joints for high daily traffic.",
  },
  {
    title: "Jaipur facade remediation",
    location: "Rajasthan",
    year: "2024",
    category: "Commercial",
    line: "Exterior ceramic and stone with monsoon-tested adhesive cycles.",
  },
  {
    title: "Commercial podium decks",
    location: "Western India",
    year: "2022",
    category: "Industrial",
    line: "Repeatable batch viscosity aligned to specification on large pours.",
  },
] as const;

const productRange = [
  {
    title: "Tile adhesives",
    icon: Grid3X3,
    badge: "Pro Grade",
    desc: "Five certified grades — interior to heavy industrial.",
    href: "/products",
    techHref: "/products/tiles-adhesive",
    image: "/images/products/fix-111.png",
  },
  {
    title: "Epoxy grout",
    icon: Palette,
    badge: "Designer range",
    desc: "Stain-resistant, broad colour palette, pool to kitchen.",
    href: "/products",
    techHref: "/products/epoxy-grout",
    image: "/images/products/epoxy-grout.png",
  },
  {
    title: "Specialty line",
    icon: Package,
    badge: "Full system",
    desc: "Block mortar, ancillary lines & cleaners — coordinated.",
    href: "/products",
    techHref: "/products/tiles-adhesive/fix-555",
    image: "/images/products/block-mortar.png",
  },
] as const;

const pillars = [
  { icon: Shield, title: "Certified range", text: "EN 12004 & IS 15477:2019 alignment across the map." },
  { icon: Layers, title: "Designed to bond", text: "Formulations matched to substrates and real site stress." },
  { icon: Palette, title: "Finish that lasts", text: "Epoxy grouts built for colour-fast, clean joints." },
  { icon: Headset, title: "People who answer", text: "Spec-to-site continuity — one accountable team." },
] as const;

const pillarIconShell = [
  "bg-gradient-to-br from-[#b91c1c] via-primary to-[#ea580c] text-white shadow-glow ring-2 ring-white/30",
  "bg-gradient-to-br from-teal-600 via-fx-teal to-emerald-400 text-white shadow-glow-teal ring-2 ring-white/25",
  "bg-gradient-to-br from-[#075985] to-fx-sapphire text-white shadow-md ring-2 ring-white/20",
  "bg-gradient-to-br from-[#7c3aed] to-[#4338ca] text-white shadow-lg ring-2 ring-white/25",
] as const;

const processSteps = [
  {
    step: "01",
    title: "Brief your site",
    body: "Substrate, tile size, circulation, exposure — captured like a checklist.",
    Icon: ClipboardList,
  },
  {
    step: "02",
    title: "Match the grade",
    body: "We map to adhesives/grouts aligned with EN / IS checkpoints.",
    Icon: Layers,
  },
  {
    step: "03",
    title: "Batch-ready logistics",
    body: "Labelled drums, traceability — predictable handover to your crew.",
    Icon: Package,
  },
  {
    step: "04",
    title: "Stay supported",
    body: "The same engineer from approval through punch-list.",
    Icon: Headset,
  },
] as const;

const stats = [
  ["10+", "Years live on sites"],
  ["10", "Core solution lines"],
  ["20+", "Grout colourways"],
  ["IS 15477", "India standard"],
] as const;

const viewOnce = { once: true as const, margin: "-60px" as const };

export function HomeView() {
  const reduced = useReducedMotion();
  const [faqQuery, setFaqQuery] = useState("");
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [showLazyRegistration, setShowLazyRegistration] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);
  const fgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -36]);

  const faqFiltered = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return FAQ_CATEGORIES.map((c) => ({ ...c, items: [...c.items] }));
    return FAQ_CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter(
        (it) => it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q),
      ),
    })).filter((c) => c.items.length > 0);
  }, [faqQuery]);
  const faqPreview = faqExpanded ? faqFiltered : faqFiltered.slice(0, 1);

  return (
    <>
      {/* Hero — dark canvas + layered colour/light */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#050508] text-white">
        <div aria-hidden className="grain-noise absolute inset-0 opacity-45 mix-blend-overlay" />
        <div aria-hidden className="pointer-events-none absolute inset-0 fx-mesh-soft opacity-95" />
        <div aria-hidden className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
        <motion.div style={{ y: bgY }} aria-hidden className="pointer-events-none absolute -left-[22%] top-[-18%] h-[74%] w-[74%] rounded-full bg-primary/35 blur-[130px]" />
        <motion.div style={{ y: fgY }} aria-hidden className="pointer-events-none absolute right-[-14%] top-[10%] h-[52%] w-[48%] rounded-full bg-[#1e40af]/38 blur-[100px]" />
        <motion.div style={{ y: bgY }} aria-hidden className="pointer-events-none absolute -right-[12%] bottom-[-32%] h-[62%] w-[56%] rounded-full bg-orange-400/22 blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,38,0.35),rgba(9,9,11,0.94))]" />

        <div className="site-container relative grid gap-12 py-14 md:py-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <div className="lg:col-span-6">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-100 shadow-inner backdrop-blur-sm"
              initial={false}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Industrial fixing systems
            </motion.p>

            <h1 className="mt-6 font-display text-hero tracking-tighter text-white">
              <span className="block">Specification-grade</span>
              <span className="mt-2 block bg-gradient-to-r from-white via-orange-50/92 to-orange-400/92 bg-clip-text text-transparent">
                bonds that survive the pour.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-zinc-300">
              Tile adhesives and epoxy systems for teams who refuse ambiguity on site — clear grades, labelled batches, Ahmedabad-based engineering backing.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{BRAND.taglineHi.trim()}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="primary" className="shadow-lg shadow-primary/35">
                <TransitionLink href="/products" className="gap-2">
                  Explore catalogue <ArrowRight className="-mr-0.5" aria-hidden />
                </TransitionLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/35 bg-transparent text-white hover:bg-white/[0.1] hover:text-white">
                <TransitionLink href="/contact">Book consultation</TransitionLink>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/12 pt-8 sm:grid-cols-4">
              {stats.map(([k, label], i) => (
                <motion.div
                  key={k}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                >
                  <dl>
                    <dt className="font-display text-3xl tabular-nums text-white">{k}</dt>
                    <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{label}</dd>
                  </dl>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative lg:col-span-6"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <motion.div
              className="relative isolate overflow-hidden rounded-3xl border border-white/[0.22] bg-gradient-to-br from-zinc-950/94 via-[#12121a]/95 to-fx-night/94 shadow-xl ring-1 ring-white/[0.1] backdrop-blur-sm"
              whileHover={reduced ? undefined : { y: -4, scale: 1.01 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/3] w-full lg:aspect-[16/11] lg:min-h-[22rem]">
                <ImageWithFallback
                  src="/images/hero/hero-main.jpeg"
                  alt="FIXONEX on-site tiling and fixation context"
                  fill
                  priority
                  reveal="none"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/65 via-transparent to-black/35" aria-hidden />
              </div>
              <div className="glass-panel absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 rounded-2xl border border-white/[0.22] bg-gradient-to-r from-black/72 via-black/62 to-teal-950/38 px-5 py-3.5 shadow-glow-teal backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-100">Traceable batches · Site-first support</p>
                <TransitionLink href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-glow-teal hover:brightness-105">
                  WhatsApp
                </TransitionLink>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value */}
      <section className="relative border-b border-orange-950/15 bg-gradient-to-b from-background-blush via-background-warm to-[#fcfbf9] fx-mesh-soft">
        <Reveal className="site-container section-pad-lg">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-primary drop-shadow-[0_0_20px_rgba(211,47,47,0.25)]">
              Differentiator
            </p>
            <h2 className="mt-3 font-display text-display text-foreground">Why teams anchor projects to FIXONEX.</h2>
            <p className="mt-4 text-[1.0625rem] text-mid">Fewer SKU decisions, sharper documentation — your crew installs with certainty.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item, i) => (
              <Reveal key={item.title} delay={0.02} className="interactive-card rounded-3xl border-zinc-200/90 bg-white/92 p-6 shadow-md backdrop-blur-[2px] md:p-7">
                <span className={cn("inline-flex rounded-2xl p-4", pillarIconShell[i])}>
                  <item.icon className="h-7 w-7" strokeWidth={1.85} aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mid">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Catalogue */}
      <section className="relative border-b border-teal-900/14 bg-gradient-to-b from-fx-mist via-background-cool/95 to-muted/92">
        <div className="site-container flex flex-wrap items-end justify-between gap-6 section-pad-md">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-600">Solutions</p>
            <h2 className="mt-2 font-display text-display text-zinc-900">Built for façade, podium, interior.</h2>
          </div>
          <TransitionLink href="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover">
            View full catalogue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </TransitionLink>
        </div>

        <Stagger className="site-container grid gap-8 pb-[clamp(4rem,9vw,5.75rem)] md:grid-cols-3">
          {productRange.map((c) => (
            <StaggerItem key={c.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.93] bg-gradient-to-b from-white to-fx-cloud/85 shadow-soft ring-1 ring-orange-950/[0.04] transition-[transform] duration-300 hover:-translate-y-[2px] hover:shadow-lift hover:ring-orange-900/14">
                <div className="relative aspect-[5/3] border-b border-zinc-200/90 bg-gradient-to-br from-fx-cloud via-fx-mist to-amber-50/52">
                  <span className="absolute left-4 top-4 z-[1] rounded-full bg-gradient-to-br from-orange-600 to-orange-700 px-3 py-[3px] text-[11px] font-bold uppercase tracking-wide text-white shadow-glow-amber">{c.badge}</span>
                  <ImageWithFallback
                    src={c.image}
                    alt={`${c.title}`}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 pt-8">
                  <c.icon className="h-5 w-5 text-primary" aria-hidden />
                  <h3 className="mt-4 font-display text-xl font-semibold text-zinc-950">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mid">{c.desc}</p>
                  <div className="mt-6 flex items-center gap-6">
                    <TransitionLink href={c.href} className="text-sm font-semibold text-primary hover:text-primary-hover">
                      Learn more →
                    </TransitionLink>
                    <TransitionLink href={c.techHref} className="text-[13px] font-semibold uppercase tracking-[0.1em] text-zinc-500 hover:text-orange-700">
                      Spec PDF
                    </TransitionLink>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="relative border-b border-teal-900/12 bg-gradient-to-b from-background via-fx-cloud/75 to-[#f4fdff]/75">
        <Reveal className="site-container flex flex-wrap items-start justify-between gap-10 gap-y-12 section-pad-lg">
          <div className="max-w-lg">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Operational flow</p>
            <h2 className="mt-3 font-display text-display text-zinc-900">From brief to cured joint.</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-mid">
              Transparent stages so procurement, QS, and site leads share the same map — engineered for repeatable execution across pours.
            </p>
          </div>
          <div className="grid max-w-2xl flex-1 gap-6 sm:grid-cols-2">
            {processSteps.map((s, i) => {
              const accent = ["border-teal-600/52 border-teal-700/52", "border-orange-700/54 border-orange-900/52", "border-[#0369a1]/48 border-[#0c4a6e]/50", "border-purple-900/54 border-purple-950/54"][i]!;
              return (
              <motion.div
                key={s.step}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={viewOnce}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className={cn(
                  "rounded-3xl border border-l-[4px] bg-gradient-to-br from-muted/98 to-white/93 p-5 shadow-soft",
                  accent,
                )}
              >
                <div className="flex items-start justify-between gap-3 border-b border-zinc-200/90 pb-3">
                  <span className={`rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm ${["bg-teal-800 shadow-glow-teal", "bg-gradient-to-br from-orange-600 to-orange-800 shadow-glow-amber", "bg-[#0369a1]", "bg-gradient-to-br from-violet-700 to-fx-grape"][i]}`}>{s.step}</span>
                  <s.Icon className={`h-[22px] w-[22px] shrink-0 ${["text-teal-700","text-orange-700","text-blue-950","text-violet-800"][i]}`} aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-950">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mid">{s.body}</p>
              </motion.div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* Specification assist */}
      <section className="relative overflow-hidden border-b border-indigo-900/17 bg-gradient-to-br from-[#f0fdf9]/93 via-accent-rose/88 to-[#eef8ff]/85">
        <div className="site-container grid gap-12 py-[clamp(3.75rem,9vw,5.75rem)] lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-600">Guidance</p>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,3.4vw,2.55rem)] font-semibold text-zinc-900">Choosing the adhesive shouldn’t stall your pour.</h2>
            <ul className="mt-10 space-y-5">
              {(
                [
                  ["Surface telemetry", Layers],
                  ["Tile modulus & sizing", Grid3X3],
                  ["Standard alignment", Shield],
                ] as const
              ).map(([label, Icon]) => (
                <li key={label as string} className="flex gap-5 rounded-3xl border border-white/[0.93] bg-gradient-to-r from-white/98 to-orange-50/38 px-5 py-4 shadow-soft ring-1 ring-orange-900/[0.04]">
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="font-display text-[1.0625rem] font-semibold text-zinc-900">{label}</p>
                    <p className="mt-1 text-sm text-zinc-600">Captured once, circulated to QA + dispatch.</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-10" variant="primary" size="lg">
              <TransitionLink href="/contact">Request specification support</TransitionLink>
            </Button>
          </Reveal>

          <Reveal className="rounded-3xl lg:sticky lg:top-32">
            <div className="rounded-3xl border border-white/[0.85] bg-gradient-to-b from-white via-fx-mist/95 to-orange-50/45 p-7 shadow-soft ring-1 ring-orange-900/[0.07] backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Library access</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-zinc-900">Before crews mobilise.</h3>
              <ul className="mt-6 space-y-3">
                {(
                  [
                    [BookOpen, "Installation dossiers"],
                    [HelpCircle, "Safety envelopes"],
                    [PhoneCall, "Hotline escalation"],
                  ] as const
                ).map(([Icon, txt]) => (
                  <li key={txt as string}>
                    <TransitionLink href="/support" className="group flex items-start gap-4 rounded-2xl border border-transparent px-4 py-3 transition hover:border-fx-teal/45 hover:bg-gradient-to-r hover:from-teal-50/95 hover:to-fx-cloud/90">
                      <span className="inline-flex rounded-2xl bg-gradient-to-br from-white to-orange-50/75 p-3 text-orange-900 shadow-soft ring-1 ring-orange-950/10 transition group-hover:from-teal-100 group-hover:to-emerald-100 group-hover:text-teal-900">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-semibold text-zinc-950 group-hover:text-primary">{txt}</span>
                        <span className="text-sm text-zinc-500">Open Knowledge hub →</span>
                      </span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="relative border-b border-orange-950/15 bg-gradient-to-b from-orange-50/48 via-muted/52 to-[#fff9f6]/93">
        <Reveal className="site-container flex flex-wrap items-center justify-between gap-6 pb-10 pt-[clamp(3.5rem,10vw,5.75rem)]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-600">Deployments</p>
            <h2 className="mt-2 font-display text-display text-zinc-950">Stories from real slabs.</h2>
          </div>
          <Button variant="warm" size="sm" asChild className="font-semibold shadow-sm hover:-translate-y-0.5">
            <TransitionLink href="/projects" className="gap-2">
              View projects <ArrowRight className="h-4 w-4" aria-hidden />
            </TransitionLink>
          </Button>
        </Reveal>
        <Stagger className="site-container grid gap-8 pb-[clamp(4rem,9vw,5.75rem)] md:grid-cols-3">
          {projectPreviews.map((p) => (
            <StaggerItem key={p.title}>
              <TransitionLink href="/projects" className="group block h-full rounded-3xl border border-orange-950/[0.075] bg-gradient-to-br from-white via-orange-50/24 to-orange-900/[0.056] p-px shadow-soft transition-[transform] hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-[#fcd9c3]/85 via-muted to-orange-950/52">
                  <div className="absolute left-5 top-5 flex gap-3">
                    <span className="rounded-full bg-gradient-to-br from-primary to-orange-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-50 shadow-md">
                      {p.category}
                    </span>
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-zinc-900">{p.year}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-95 transition-opacity group-hover:opacity-75" aria-hidden />
                  <Building2 className="absolute bottom-5 left-5 h-9 w-9 text-white" aria-hidden />
                  <ArrowUpRight className="absolute bottom-5 right-5 h-9 w-9 text-white/90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </div>
                <span className="mt-6 flex items-center gap-2 px-6 pb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden /> {p.location}
                </span>
                <p className="px-6 font-display text-lg font-semibold text-zinc-950">{p.title}</p>
                <p className="px-6 pb-8 pt-3 text-[15px] leading-relaxed text-mid">{p.line}</p>
              </TransitionLink>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Proof */}
      <section className="border-b border-rose-900/17 bg-[radial-gradient(ellipse_at_82%_-12%,rgba(211,47,47,0.09),transparent_62%),linear-gradient(to_bottom,#fdfafc,#fafafa)]">
        <Reveal className="site-container pb-8 pt-[clamp(4rem,11vw,6.25rem)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Proof · voice from site</p>
          <h2 className="mt-2 font-display text-display text-zinc-900">Straight lines from partners.</h2>
        </Reveal>
        <div className="site-container pb-[clamp(4rem,9vw,6rem)]">
          <Reveal>
            <TestimonialCard
              {...testimonials[0]}
              index={0}
              animated={false}
              featured
              projectLabel={testimonialExtras[0].projectLabel}
            />
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {testimonials.slice(1).map((item, i) => (
              <TestimonialCard
                key={item.name}
                {...item}
                animated={false}
                index={i + 1}
                projectLabel={testimonialExtras[i + 1].projectLabel}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-b border-purple-950/21 bg-[radial-gradient(ellipse_at_110%_-10%,rgba(124,58,237,0.16),transparent_61%),linear-gradient(to_bottom,var(--fx-bg-cool),#faf5ff_55)]">
        <Reveal className="site-container pb-12 pt-[clamp(4rem,10vw,5.5rem)]">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Supportdesk</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.65rem)] font-semibold text-zinc-900">Operational FAQs.</h2>
            <p className="mt-3 text-mid">Filter by keyword — optimised for skim reading on handhelds.</p>
          </div>
          <label className="mx-auto mb-14 mt-14 flex max-w-xl items-center gap-3 rounded-full border border-white/94 bg-white px-5 py-3 shadow-md ring-4 ring-transparent focus-within:border-primary focus-within:ring-primary/20">
            <Search className="h-5 w-5 text-zinc-400" aria-hidden />
            <input
              type="search"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Keyword search…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
          </label>

          <div className="space-y-12">
            {faqPreview.map((block, idx) => (
              <section key={block.title} aria-labelledby={`faq-category-${idx}`}>
                <h3 id={`faq-category-${idx}`} className="border-b border-zinc-200 pb-4 font-display text-xl font-semibold text-zinc-900">{block.title}</h3>
                <ul className="mt-6 space-y-4">
                  {block.items.map((item) => (
                    <li key={item.question} className="rounded-3xl border border-white/[0.96] bg-gradient-to-br from-white/98 to-purple-50/48 px-5 py-5 shadow-soft ring-1 ring-purple-900/[0.07] backdrop-blur-[1px]">
                      <p className="font-display font-semibold text-zinc-900">{item.question}</p>
                      <p className="mt-4 text-[15px] leading-relaxed text-zinc-700">{item.answer}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {faqFiltered.length > 1 ? (
            <div className="mt-10 flex justify-center">
              <Button variant="outline" onClick={() => setFaqExpanded((v) => !v)} className="rounded-full border-zinc-300 bg-white/80 backdrop-blur-sm">
                {faqExpanded ? "Show concise FAQs" : "Show complete FAQ groups"}
              </Button>
            </div>
          ) : null}
          {faqFiltered.length === 0 ? <p className="py-14 text-center text-sm text-zinc-500">No matches — widen your phrase.</p> : null}

          <div className="mt-16 flex flex-wrap justify-between gap-6 border-t border-zinc-200 pt-14 text-[15px]">
            <TransitionLink href="/support/#faq" className="font-semibold text-primary hover:text-primary-hover">
              Full FAQ corpus →
            </TransitionLink>
            <TransitionLink href="/contact" className="font-semibold text-orange-700 hover:underline">
              Still unresolved? Speak with us →
            </TransitionLink>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#b71c2c] to-[#09101f] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_60%_-20%,rgba(255,237,212,0.22),transparent_72%)] mix-blend-screen" />
        <div aria-hidden className="pointer-events-none absolute -right-[26%] top-1/2 h-[130%] w-[68%] -translate-y-1/2 rounded-full bg-orange-700/29 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_-12%,rgba(255,255,255,0.32),transparent_61%)]" />
        <div className="site-container relative pb-20 pt-16 md:pb-28 md:pt-[4.85rem]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold">Ready when logistics align.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-white/88">
              Share substrate photos, VOC constraints, grout colour intent — our engineers consolidate it into deployable SKU lists.
            </p>
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary shadow-xl hover:bg-zinc-100">
                <TransitionLink href="/products">Explore catalogue</TransitionLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/70 bg-transparent text-white hover:bg-white/12 hover:text-white">
                <TransitionLink href="/contact">Schedule call</TransitionLink>
              </Button>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setShowLazyRegistration((v) => !v)}
                className="rounded-full border border-white/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10"
              >
                {showLazyRegistration ? "Hide quick registration" : "Get pricing updates"}
              </button>
              <AnimatePresence initial={false}>
                {showLazyRegistration ? (
                  <motion.form
                    key="lazy-registration"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.28 }}
                    className="glass-panel mx-auto mt-4 grid max-w-xl gap-3 rounded-2xl border border-white/24 bg-black/22 p-4 sm:grid-cols-[1fr_auto]"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Work email for product release sheets"
                      className="h-11 rounded-xl border border-white/30 bg-white/12 px-3 text-sm text-white placeholder:text-white/65 outline-none focus:border-white/60"
                    />
                    <Button type="submit" variant="secondary" className="h-11 min-w-[9rem]">
                      Join early list
                    </Button>
                  </motion.form>
                ) : null}
              </AnimatePresence>
            </div>
            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white/95 hover:bg-white/10"
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              WhatsApp FIXONEX logistics cell
            </motion.a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
