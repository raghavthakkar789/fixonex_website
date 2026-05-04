"use client";

import { TransitionLink } from "@/components/navigation/TransitionLink";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useInView } from "framer-motion";
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
import { productImageUrls } from "@/data/product-images";
import { homeFaqs } from "@/lib/data/home-faqs";
import { testimonials } from "@/lib/data/testimonials";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import {
  Reveal,
  Stagger,
  StaggerItem,
  SplitReveal,
  ClipReveal,
  CountUp,
  LineReveal,
  SlideReveal,
  FadeGroup,
  FadeGroupItem,
} from "@/components/motion/Reveal";

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
    image: productImageUrls.fix111,
    accent: "from-rose-500/20 to-orange-400/10",
  },
  {
    title: "Epoxy grout",
    icon: Palette,
    badge: "Designer range",
    desc: "Stain-resistant, broad colour palette, pool to kitchen.",
    href: "/products",
    techHref: "/products/epoxy-grout",
    image: productImageUrls.epoxyGrout,
    accent: "from-teal-500/20 to-emerald-400/10",
  },
  {
    title: "Specialty line",
    icon: Package,
    badge: "Full system",
    desc: "Block mortar, ancillary lines & cleaners — coordinated.",
    href: "/products",
    techHref: "/products/tiles-adhesive/fix-555",
    image: productImageUrls.blockMortar,
    accent: "from-blue-500/20 to-indigo-400/10",
  },
] as const;

const pillars = [
  { icon: Shield, title: "Certified range", text: "EN 12004 & IS 15477:2019 alignment across the map." },
  { icon: Layers, title: "Designed to bond", text: "Formulations matched to substrates and real site stress." },
  { icon: Palette, title: "Finish that lasts", text: "Epoxy grouts built for colour-fast, clean joints." },
  { icon: Headset, title: "People who answer", text: "Spec-to-site continuity — one accountable team." },
] as const;

const pillarIconShell = [
  "bg-gradient-to-br from-[#b91c1c] to-[#ea580c] text-white",
  "bg-gradient-to-br from-teal-600 to-emerald-400 text-white",
  "bg-gradient-to-br from-[#075985] to-[#0369a1] text-white",
  "bg-gradient-to-br from-[#7c3aed] to-[#4338ca] text-white",
] as const;

const processSteps = [
  { step: "01", title: "Brief your site", body: "Substrate, tile size, circulation, exposure — captured like a checklist.", Icon: ClipboardList },
  { step: "02", title: "Match the grade", body: "We map to adhesives/grouts aligned with EN / IS checkpoints.", Icon: Layers },
  { step: "03", title: "Batch-ready logistics", body: "Labelled drums, traceability — predictable handover to your crew.", Icon: Package },
  { step: "04", title: "Stay supported", body: "The same engineer from approval through punch-list.", Icon: Headset },
] as const;

const stats = [
  ["10+", "Years live on sites"],
  ["10", "Core solution lines"],
  ["20+", "Grout colourways"],
  ["IS 15477", "India standard"],
] as const;

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeCirc: [number, number, number, number] = [0.0, 0.55, 0.45, 1];

/* ─── Tilt card wrapper ──────────────────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt({ x: x * 6, y: y * 6 });
  };

  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };
  const handleMouseEnter = () => setHovered(true);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.015 : 1,
        z: hovered ? 30 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.6 }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

export function HomeView() {
  const reduced = useReducedMotion();
  const [faqQuery, setFaqQuery] = useState("");
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [showLazyRegistration, setShowLazyRegistration] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], reduced ? [0, 0] : [0, 100]);
  const fgY = useTransform(heroScroll, [0, 1], reduced ? [0, 0] : [0, -50]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.7], [1, 0.96]);

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
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden text-white">

        {/* Image fills the entire section */}
        <ImageWithFallback
          src="/images/hero/hero-main.jpeg"
          alt="FIXONEX tile adhesive on site"
          fill
          priority
          reveal="none"
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay — uniform base + stronger gradient for readability */}
        <div aria-hidden className="absolute inset-0 bg-black/55" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Text sits on top of the image, centred */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">

          {/* Label */}
          <motion.p
            className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-primary drop-shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.2 }}
          >
            High-Performance Tile Adhesives
          </motion.p>

          {/* Headline */}
          <h1 className="font-display font-black tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1.05 }}>
            <div className="overflow-hidden">
              <motion.span
                className="block text-white"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.75, ease: easeExpo, delay: 0.3 }}
              >
                Built for Every Bond.
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="block text-primary"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.75, ease: easeExpo, delay: 0.42 }}
              >
                Built for Every Site.
              </motion.span>
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 max-w-[40ch] text-base leading-relaxed text-zinc-200 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.56 }}
          >
            Certified adhesives &amp; epoxy grout systems engineered for Indian construction sites.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeExpo, delay: 0.66 }}
          >
            <TransitionLink
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(211,47,47,0.5)] transition-all hover:bg-primary/90"
            >
              Explore Products <ArrowRight className="h-4 w-4" aria-hidden />
            </TransitionLink>
            <TransitionLink
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Get in Touch
            </TransitionLink>
          </motion.div>

        </div>

      </section>

      {/* ─── Value Pillars ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200/50 bg-gradient-to-b from-[#fdfcfb] via-[#faf7f5] to-[#f8f5f2]">
        {/* Background pattern */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div aria-hidden className="absolute -right-[15%] top-[-20%] h-[60%] w-[50%] rounded-full pointer-events-none" style={{
          background: "radial-gradient(circle, rgba(211,47,47,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        <div className="site-container section-pad-lg">
          <Reveal>
            <div className="max-w-xl">
              <p className="eyebrow-label mb-5">Differentiator</p>
              <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
                Why teams anchor projects to FIXONEX.
              </h2>
              <LineReveal className="mt-6 mb-0 bg-zinc-200" delay={0.3} />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, ease: easeExpo, delay: i * 0.1 }}
              >
                <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:p-7">
                  <motion.span
                    className={cn("inline-flex rounded-2xl p-4 shadow-lg", pillarIconShell[i])}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.3, ease: easeExpo }}
                  >
                    <item.icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                  </motion.span>
                  <h3 className="mt-6 font-display text-lg font-semibold text-zinc-900 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{item.text}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Catalogue ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f0f7ff] via-[#f4f7fb] to-[#eef2f8]">
        <div aria-hidden className="absolute -left-[10%] top-[-10%] h-[50%] w-[40%] pointer-events-none" style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        <div className="site-container section-pad-md">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <Reveal>
              <div>
                <p className="eyebrow-label-muted mb-4">Solutions</p>
                <h2 className="font-display font-bold text-zinc-900" style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.7rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
                  Built for façade, podium, interior.
                </h2>
              </div>
            </Reveal>
            <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.25 }}>
              <TransitionLink href="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-primary transition-colors">
                View full catalogue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </TransitionLink>
            </motion.div>
          </div>

          <Stagger className="grid gap-6 md:grid-cols-3">
            {productRange.map((c, i) => (
              <StaggerItem key={c.title}>
                <TiltCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500">
                  <div className={cn("relative aspect-[5/3] overflow-hidden border-b border-zinc-100 bg-gradient-to-br", c.accent)}>
                    <span className="absolute left-4 top-4 z-[1] rounded-full bg-gradient-to-br from-orange-600 to-orange-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
                      {c.badge}
                    </span>
                    <ImageWithFallback
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.07]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-7">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.25 }}>
                      <c.icon className="h-5 w-5 text-primary" aria-hidden />
                    </motion.div>
                    <h3 className="mt-4 font-display text-xl font-semibold text-zinc-950">{c.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-600">{c.desc}</p>
                    <div className="mt-auto pt-6 flex items-center gap-5">
                      <TransitionLink href={c.href} className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
                      </TransitionLink>
                      <TransitionLink href={c.techHref} className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 hover:text-zinc-700 transition-colors">
                        Spec PDF
                      </TransitionLink>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Process ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#fafafa] to-[#f5f5f5]">
        <div aria-hidden className="absolute right-0 top-0 h-full w-1/2 pointer-events-none" style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(211,47,47,0.04) 100%)",
        }} />

        <div className="site-container section-pad-lg">
          <div className="flex flex-wrap items-start justify-between gap-12">
            {/* Left heading */}
            <div className="max-w-sm">
              <Reveal>
                <p className="eyebrow-label mb-5">Operational flow</p>
                <h2 className="font-display font-bold text-zinc-900" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
                  From brief to cured joint.
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-zinc-600">
                  Transparent stages so procurement, QS, and site leads share the same map — engineered for repeatable execution.
                </p>
              </Reveal>
            </div>

            {/* Steps grid */}
            <div className="grid max-w-2xl flex-1 gap-5 sm:grid-cols-2">
              {processSteps.map((s, i) => {
                const accents = [
                  { border: "border-l-teal-500", step: "bg-teal-800", icon: "text-teal-700" },
                  { border: "border-l-orange-500", step: "bg-gradient-to-br from-orange-600 to-orange-800", icon: "text-orange-700" },
                  { border: "border-l-blue-500", step: "bg-[#0369a1]", icon: "text-blue-800" },
                  { border: "border-l-violet-500", step: "bg-gradient-to-br from-violet-700 to-indigo-700", icon: "text-violet-800" },
                ];
                const a = accents[i]!;
                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, ease: easeExpo, delay: i * 0.1 }}
                    whileHover={{ y: -3 }}
                    className={cn(
                      "group rounded-3xl border border-l-[4px] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)] transition-shadow duration-400",
                      a.border,
                    )}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-zinc-100 pb-3">
                      <span className={cn("rounded-full px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white", a.step)}>
                        {s.step}
                      </span>
                      <s.Icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110 duration-300", a.icon)} aria-hidden />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-zinc-950">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{s.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Specification assist ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-br from-[#f0fdf9] via-[#f5f5f5] to-[#eef8ff]">
        <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-full w-1/2" style={{
          background: "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(13,148,136,0.06) 0%, transparent 70%)",
        }} />

        <div className="site-container grid gap-12 section-pad-lg lg:grid-cols-2 lg:items-start">
          <SlideReveal direction="left">
            <p className="eyebrow-label-muted mb-4">Guidance</p>
            <h2 className="font-display font-bold text-zinc-900" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
              Choosing the adhesive shouldn't stall your pour.
            </h2>
            <ul className="mt-10 space-y-4">
              {(
                [
                  ["Surface telemetry", Layers, "Substrate type, porosity, and size mapped precisely."],
                  ["Tile modulus & sizing", Grid3X3, "Format and flex grade matched to the pour."],
                  ["Standard alignment", Shield, "EN/IS conformance captured before dispatch."],
                ] as const
              ).map(([label, Icon, desc], i) => (
                <motion.li
                  key={label as string}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.6, ease: easeExpo, delay: 0.2 + i * 0.1 }}
                  className="flex gap-5 rounded-2xl border border-zinc-200/70 bg-white/80 px-5 py-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300 group"
                >
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-white shadow-sm border border-teal-100 group-hover:from-teal-100 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-teal-700" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[1rem] font-semibold text-zinc-900">{label}</p>
                    <p className="mt-0.5 text-sm text-zinc-500">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild variant="primary" size="lg" className="rounded-full shadow-[0_4px_20px_rgba(211,47,47,0.35)] hover:shadow-[0_6px_28px_rgba(211,47,47,0.5)] transition-shadow">
                <TransitionLink href="/contact">Request specification support</TransitionLink>
              </Button>
            </motion.div>
          </SlideReveal>

          <SlideReveal direction="right" className="lg:sticky lg:top-32">
            <div className="rounded-3xl border border-zinc-200/70 bg-white/90 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-500">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">Library access</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-zinc-900">Before crews mobilise.</h3>
              <ul className="mt-6 space-y-2.5">
                {(
                  [
                    [BookOpen, "Installation dossiers", "Field-ready PDFs with substrate matrices."],
                    [HelpCircle, "Safety envelopes", "VOC limits, PPE requirements by grade."],
                    [PhoneCall, "Hotline escalation", "Engineer to engineer, same day."],
                  ] as const
                ).map(([Icon, txt, sub]) => (
                  <li key={txt as string}>
                    <TransitionLink
                      href="/support"
                      className="group flex items-start gap-4 rounded-2xl border border-transparent px-4 py-3 transition-all duration-300 hover:border-teal-200/60 hover:bg-teal-50/50"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200/70 text-zinc-700 shadow-sm transition-all duration-300 group-hover:bg-teal-100 group-hover:border-teal-200 group-hover:text-teal-800">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-semibold text-zinc-950 text-[15px] group-hover:text-teal-900 transition-colors duration-300">{txt}</span>
                        <span className="text-[13px] text-zinc-500">{sub}</span>
                      </span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          </SlideReveal>
        </div>
      </section>

      {/* ─── Projects ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#faf5f0] via-[#fdf9f5] to-white">
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-5%] h-[50%] w-[40%]" style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        <div className="site-container section-pad-lg">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <Reveal>
              <p className="eyebrow-label-muted mb-4">Deployments</p>
              <h2 className="font-display font-bold text-zinc-950" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
                Stories from real slabs.
              </h2>
            </Reveal>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
              <Button variant="warm" size="sm" asChild className="rounded-full shadow-sm hover:shadow-md font-semibold">
                <TransitionLink href="/projects" className="gap-2">
                  View projects <ArrowRight className="h-4 w-4" aria-hidden />
                </TransitionLink>
              </Button>
            </motion.div>
          </div>

          <Stagger className="grid gap-6 md:grid-cols-3">
            {projectPreviews.map((p, i) => (
              <StaggerItem key={p.title}>
                <TransitionLink
                  href="/projects"
                  className="group block h-full overflow-hidden rounded-3xl border border-zinc-200/60 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.11)] transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
                    <div className="absolute left-4 top-4 z-10 flex gap-2">
                      <span className="rounded-full bg-gradient-to-br from-primary to-orange-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
                        {p.category}
                      </span>
                      <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-zinc-800 shadow-sm">{p.year}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" aria-hidden />
                    {/* Scale image on hover */}
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]" style={{
                      background: "linear-gradient(135deg, rgba(245,200,150,0.4) 0%, rgba(180,150,100,0.3) 100%)",
                    }} />
                    <Building2 className="absolute bottom-5 left-5 h-9 w-9 text-white/80" aria-hidden />
                    <motion.div
                      className="absolute bottom-5 right-5"
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="h-8 w-8 text-white/70 group-hover:text-white transition-colors duration-300" aria-hidden />
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400 mb-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden /> {p.location}
                    </span>
                    <p className="font-display text-lg font-semibold text-zinc-950 group-hover:text-primary transition-colors duration-300">{p.title}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">{p.line}</p>
                  </div>
                </TransitionLink>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#09090d]">
        <div aria-hidden className="pointer-events-none absolute -left-[10%] top-0 h-[60%] w-[40%] rounded-full" style={{
          background: "radial-gradient(circle, rgba(211,47,47,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div aria-hidden className="pointer-events-none absolute right-[-8%] bottom-0 h-[50%] w-[40%] rounded-full" style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div aria-hidden className="grain-noise absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />
        <div
          aria-hidden
          className="absolute left-[6%] right-[6%] top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(211,47,47,0.4) 50%, transparent)" }}
        />

        <div className="site-container section-pad-lg relative z-10">
          <Reveal className="mb-12">
            <p className="eyebrow-label mb-4" style={{ color: "var(--color-primary, #D32F2F)" }}>Social proof</p>
            <h2 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
              Straight lines from partners.
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <TestimonialCard
                key={item.name}
                {...item}
                index={i}
                animated
                featured={i === 0}
                projectLabel={testimonialExtras[i]?.projectLabel}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-200/40 bg-gradient-to-b from-[#f8f5ff] to-[#f3f0ff]">
        <div aria-hidden className="pointer-events-none absolute right-[-8%] top-[-10%] h-[50%] w-[45%]" style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        <div className="site-container section-pad-lg">
          <Reveal className="mb-14">
            <div className="max-w-xl">
              <p className="eyebrow-label-muted mb-4">Support desk</p>
              <h2 className="font-display font-bold text-zinc-900" style={{ fontSize: "clamp(1.9rem, 4vw, 2.7rem)", letterSpacing: "-0.04em", lineHeight: 1.12 }}>
                Operational FAQs.
              </h2>
              <p className="mt-3 text-zinc-500 text-[15px]">Filter by keyword — optimised for skim reading on handhelds.</p>
            </div>
          </Reveal>

          {/* Search */}
          <label
            className="mx-auto mb-12 flex max-w-xl items-center gap-3 rounded-full border border-zinc-200/90 bg-white px-5 py-3 shadow-md ring-4 ring-transparent focus-within:border-violet-400 focus-within:ring-violet-100 transition-all duration-300 focus-within:scale-[1.01]"
          >
            <Search className="h-5 w-5 text-zinc-400 shrink-0" aria-hidden />
            <input
              type="search"
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Keyword search…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
          </label>

          {/* FAQ items */}
          <div className="space-y-10">
            {faqPreview.map((block, idx) => (
              <section key={block.title} aria-labelledby={`faq-category-${idx}`}>
                <div className="flex items-center gap-4 border-b border-zinc-200 pb-4">
                  <h3 id={`faq-category-${idx}`} className="font-display text-xl font-semibold text-zinc-900">{block.title}</h3>
                  <LineReveal className="flex-1 bg-zinc-200" delay={0.2} />
                </div>
                <ul className="mt-5 space-y-3">
                  {block.items.map((item, qi) => (
                    <motion.li
                      key={item.question}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-5%" }}
                      transition={{ duration: 0.55, ease: easeExpo, delay: qi * 0.08 }}
                      className="group rounded-2xl border border-zinc-200/70 bg-white/80 px-5 py-5 shadow-sm hover:shadow-md hover:border-violet-200/60 transition-all duration-300 backdrop-blur-sm"
                    >
                      <p className="font-display font-semibold text-zinc-900 group-hover:text-violet-900 transition-colors duration-300">{item.question}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{item.answer}</p>
                    </motion.li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {faqFiltered.length > 1 && (
            <div className="mt-10 flex justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={() => setFaqExpanded((v) => !v)}
                  className="rounded-full border-zinc-300 bg-white/80 backdrop-blur-sm hover:border-violet-300 hover:text-violet-900 transition-colors"
                >
                  {faqExpanded ? "Show concise FAQs" : "Show complete FAQ groups"}
                </Button>
              </motion.div>
            </div>
          )}
          {faqFiltered.length === 0 && (
            <p className="py-14 text-center text-sm text-zinc-500">No matches — widen your phrase.</p>
          )}

          <div className="mt-14 flex flex-wrap justify-between gap-6 border-t border-zinc-200 pt-12 text-[15px]">
            <TransitionLink href="/support/#faq" className="group inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 transition-colors">
              Full FAQ corpus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </TransitionLink>
            <TransitionLink href="/contact" className="font-semibold text-orange-700 hover:text-orange-900 underline-grow transition-colors">
              Still unresolved? Speak with us →
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#050508] text-white">
        {/* Animated orbs */}
        <div aria-hidden className="pointer-events-none absolute -right-[20%] top-[-20%] h-[80%] w-[60%] orb-drift-2" style={{
          background: "radial-gradient(circle, rgba(211,47,47,0.3) 0%, transparent 65%)",
          filter: "blur(100px)",
        }} />
        <div aria-hidden className="pointer-events-none absolute -left-[15%] bottom-[-20%] h-[70%] w-[55%]" style={{
          background: "radial-gradient(circle, rgba(234,88,12,0.2) 0%, transparent 65%)",
          filter: "blur(100px)",
        }} />
        <div aria-hidden className="grain-noise-heavy absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" />
        <div aria-hidden className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="site-container relative py-28 md:py-36">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow-label-muted mb-6 mx-auto" style={{ "--fx-brand": "rgba(255,255,255,0.4)" } as React.CSSProperties}>
              <span className="inline-flex items-center gap-2.5 text-white/40">
                <span className="h-[1px] w-6 bg-white/30" />
                Ready when logistics align
                <span className="h-[1px] w-6 bg-white/30" />
              </span>
            </p>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.04em" }}
                initial={{ y: "60%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.9, ease: easeExpo }}
              >
                Ready when logistics align.
              </motion.h2>
            </div>

            <motion.p
              className="mt-6 text-[17px] leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: easeExpo, delay: 0.15 }}
            >
              Share substrate photos, VOC constraints, grout colour intent — our engineers consolidate it into deployable SKU lists.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: easeExpo, delay: 0.25 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                <Button asChild size="lg" variant="secondary" className="rounded-full bg-white text-primary shadow-xl hover:bg-zinc-100">
                  <TransitionLink href="/products">Explore catalogue</TransitionLink>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                <Button size="lg" variant="outline" asChild className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 hover:text-white">
                  <TransitionLink href="/contact">Schedule call</TransitionLink>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                type="button"
                onClick={() => setShowLazyRegistration((v) => !v)}
                className="rounded-full border border-white/25 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-all hover:bg-white/10 hover:border-white/40 hover:text-white/90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {showLazyRegistration ? "Hide quick registration" : "Get pricing updates"}
              </motion.button>

              <AnimatePresence initial={false}>
                {showLazyRegistration && (
                  <motion.form
                    key="lazy-registration"
                    initial={{ opacity: 0, y: 12, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 8, height: 0 }}
                    transition={{ duration: 0.35, ease: easeExpo }}
                    className="mx-auto mt-5 grid max-w-xl gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-md sm:grid-cols-[1fr_auto]"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Work email for product release sheets"
                      className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-colors"
                    />
                    <Button type="submit" variant="secondary" className="h-11 min-w-[9rem] rounded-xl">
                      Join early list
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white/80 transition-all hover:bg-white/10 hover:border-white/40 hover:text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              WhatsApp FIXONEX logistics cell
            </motion.a>
          </Reveal>
        </div>

        {/* Bottom line */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>
    </>
  );
}
