import Link from "next/link";
import { Award, CheckCircle2, FlaskConical, Handshake, Layers, ShieldCheck, Star, Zap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

const reasons = [
  {
    icon: Award,
    title: "Certified Quality",
    text: "Every product line is aligned with EN 12004 international standards and IS 15477:2019, so you get tested, documented performance — not just marketing claims.",
  },
  {
    icon: Layers,
    title: "Complete System Approach",
    text: "From substrate preparation to final grout finish, FIXONEX offers a coordinated system — adhesive, spacer, and grout — tested to work together.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Formulations",
    text: "Our in-house R&D team continuously refines polymer chemistry to deliver better open time, sag resistance, and long-term bond integrity.",
  },
  {
    icon: Zap,
    title: "Ready for Modern Formats",
    text: "Large-format tiles, thin porcelain slabs, and natural stone demand high-coverage adhesives. FIXONEX products are engineered for today's installation realities.",
  },
  {
    icon: ShieldCheck,
    title: "Durability You Can Count On",
    text: "Independently stress-tested for thermal cycling, moisture resistance, and shear load. Built for Indian climates — from coastal humidity to desert heat.",
  },
  {
    icon: Handshake,
    title: "Dealer & Contractor Support",
    text: "Technical training, application guides, and responsive after-sales support. We treat your project as our project.",
  },
];

const stats = [
  { value: "10+", label: "Years in the industry" },
  { value: "5", label: "Product grades (Type 1–5)" },
  { value: "20+", label: "Epoxy grout colours" },
  { value: "IS & EN", label: "Certified standards" },
];

const differentiators = [
  "Polymer-enhanced adhesive matrix for superior flexibility",
  "Non-slip formula — holds large tiles vertically without sagging",
  "Extended open time for precise large-format alignment",
  "Low VOC — safer for installers and occupants",
  "Compatible with underfloor heating systems",
  "Consistent batch-to-batch performance",
];

export default function WhyFixonexPage() {
  return (
    <>
      <PageHero
        label="Why FIXONEX"
        title="The Smarter Choice for Tile Installation"
        subtitle="Performance-proven adhesives backed by a decade of expertise, international standards, and genuine technical support."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Why FIXONEX" }]}
      />

      {/* Intro */}
      <section className="section-pad section-flow-warm">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="label-caps text-warm">The FIXONEX Difference</p>
            <h2 className="mt-4 font-display text-display font-semibold text-black">
              Quality Built Into Every Layer
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-dark">
              Choosing the wrong adhesive costs far more than the material itself — failed bonds mean
              rework, disputes, and damaged reputations. FIXONEX exists to eliminate that risk. Our
              formulations are engineered for Indian site conditions, tested to international benchmarks,
              and backed by a team that understands installation challenges at the project level.
            </p>
            <p className="mt-4 text-base leading-[1.75] text-dark">
              Whether you are an architect specifying a premium interior, a contractor laying thousands
              of square metres, or a dealer recommending solutions to homeowners — FIXONEX gives you
              confidence in every bond.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="surface-card flex flex-col items-center justify-center px-6 py-8 text-center"
              >
                <p className="font-display text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-none text-primary">
                  {s.value}
                </p>
                <p className="mt-3 text-sm font-medium text-dark">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Reasons */}
      <section className="section-pad section-flow-light">
        <div className="site-container">
          <p className="label-caps text-warm">6 Reasons to Choose FIXONEX</p>
          <h2 className="mt-4 font-display text-display font-semibold text-[#111111]">
            What Sets Us Apart
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item) => (
              <article key={item.title} className="surface-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm text-black">
                  <item.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-body text-lg font-semibold text-[#111111]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technical differentiators list */}
      <section className="section-pad section-flow-warm">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="label-caps text-warm">Technical Edge</p>
            <h2 className="mt-4 font-display text-display font-semibold text-[#111111]">
              Engineered for Modern Construction
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-[#3a3a3a]">
              Modern tiles are heavier, larger, and more demanding than ever. FIXONEX adhesives are
              purpose-built to handle the realities of contemporary installation — not yesterday's
              standard brick-and-mortar tiles.
            </p>
            <ul className="mt-8 space-y-4">
              {differentiators.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-base leading-[1.7] text-[#111111]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6 lg:pt-20">
            <div className="surface-card border-l-4 border-primary px-6 py-6">
              <Star className="h-6 w-6 text-primary" aria-hidden />
              <p className="mt-3 font-body text-lg font-semibold text-[#111111]">
                Trusted by Professionals
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                Architects, interior designers, and tile contractors across Gujarat rely on FIXONEX for
                demanding residential and commercial projects.
              </p>
            </div>
            <div className="surface-card border-l-4 border-warm px-6 py-6">
              <FlaskConical className="h-6 w-6 text-warm" aria-hidden />
              <p className="mt-3 font-body text-lg font-semibold text-[#111111]">
                Continuous Innovation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mid">
                Our formulations are regularly reviewed against emerging installation standards and new
                tile formats entering the Indian market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment banner */}
      <section className="grid lg:grid-cols-2">
        <div className="section-flow-light px-6 py-16 text-[#111111] md:px-12 md:py-20">
          <p className="label-caps text-warm">Our Commitment</p>
          <p className="mt-6 text-lg leading-[1.75] text-[#111111]">
            We stand behind every product with transparent data sheets, application guides, and a
            technical team that picks up the phone. If a job has a challenge, we help solve it —
            before, during, and after the install.
          </p>
        </div>
        <div className="section-flow-warm px-6 py-16 md:px-12 md:py-20">
          <p className="label-caps text-warm">Sustainability Focus</p>
          <p className="mt-6 text-lg leading-[1.75] text-dark">
            Reducing waste starts with bonds that last. Long-life installations mean fewer
            replacements, less demolition debris, and lower material throughput. FIXONEX adhesives
            are formulated to outlast the tile — so your project stays put for decades.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-primary text-center text-white">
        <div className="site-container mx-auto max-w-2xl">
          <p className="label-caps text-white/70">Ready to Specify FIXONEX?</p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-white">
            Start with the Right Bond
          </h2>
          <p className="mt-4 text-base text-white/80">
            Explore our full product range or reach out to discuss your project requirements with our
            technical team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-warm text-warm hover:bg-warm hover:text-black">
              <Link href="/products">View Products</Link>
            </Button>
            <Button asChild className="bg-black text-warm hover:bg-warm hover:text-black">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-light text-center">
        <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-[#111111]">
          Every strong surface starts with the right bond.
        </p>
        <p className="mt-6 text-base text-mid">{BRAND.tagline}</p>
      </section>
    </>
  );
}
