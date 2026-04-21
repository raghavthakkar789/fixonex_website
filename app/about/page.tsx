import Link from "next/link";
import { Building2, Gem, Headphones } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BRAND } from "@/lib/brand";

const missionPoints = [
  "Deliver consistent quality across every batch and product class.",
  "Support architects, contractors, and dealers with reliable installation guidance.",
  "Enhance aesthetics through premium epoxy grout and coordinated finishing systems.",
  "Continuously improve formulations and documentation through innovation.",
];

export default function AboutPage() {
  const imageWide = "https://picsum.photos/200";
  const imageTall = "https://picsum.photos/200/300";

  return (
    <>
      <PageHero
        label="About"
        title="About FIXONEX"
        subtitle="Trusted expertise in tile installation solutions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="section-pad section-flow-warm">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="font-display text-display font-semibold text-black">Built on a Decade of Expertise</h2>
            <p className="section-subtext mt-5 text-dark">
              FIXONEX Adhesive is a forward-thinking construction chemical brand specializing in high-performance tile adhesives and epoxy solutions for modern construction and interior applications.
              With more than a decade of experience in the tiles and ceramic industry, the brand is built on deep market knowledge, technical expertise, and a commitment to quality.
            </p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-light bg-white shadow-md">
            <ImageWithFallback src={imageTall} alt="FIXONEX leadership and quality" fill className="object-cover" />
            <div className="absolute bottom-4 left-4 rounded-md bg-warm px-4 py-3 text-black shadow-warm">
              <p className="font-display text-2xl font-bold">10+</p>
              <p className="text-xs">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container">
          <p className="section-eyebrow text-center">Capabilities</p>
          <h2 className="text-center font-display text-display font-semibold text-[#111111]">What FIXONEX Does</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: "High-performance adhesives",
                text: "Certified tile adhesive system from Type-1 through Type-5 aligned with EN12004 classes and IS 15477:2019.",
              },
              {
                icon: Gem,
                title: "Designer epoxy grout",
                text: "Stain-resistant epoxy grout in 20+ colours for residential, commercial, and wet-area installations.",
              },
              {
                icon: Headphones,
                title: "End-to-end support",
                text: "Practical guidance for architects, contractors, and dealers from specification through application.",
              },
            ].map((item) => (
              <article key={item.title} className="surface-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm text-black">
                  <item.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-body text-xl font-semibold text-[#111111]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-warm">
        <div className="site-container grid gap-8 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-light bg-white shadow-md">
            <ImageWithFallback src={imageWide} alt="Construction team at work" fill className="object-cover" />
          </div>
          <div className="surface-card px-6 py-10 md:px-8">
            <p className="section-eyebrow">Vision</p>
            <p className="text-lg leading-[1.75] text-[#111111]">
            To establish FIXONEX as a trusted and innovative brand in tile installation solutions, delivering world-class tile adhesives and construction chemicals that ensure maximum bonding
            strength, durability, and long-lasting performance for modern architecture and interior spaces.
            </p>
          </div>
          <div className="surface-card px-6 py-10 md:px-8 lg:col-span-1">
            <p className="section-eyebrow">Mission</p>
            <ul className="space-y-4">
              {missionPoints.map((line) => (
                <li key={line} className="flex gap-3 text-base leading-[1.75] text-dark">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-light">
        <div className="site-container">
          <p className="section-eyebrow">Leadership</p>
          <h2 className="font-display text-display font-semibold text-[#111111]">Leadership</h2>
          <p className="mt-3 max-w-2xl text-mid">Placeholder profiles — replace with imagery and approved bios when available.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              { name: "Founder Name", role: "Founder & Director", initials: "F" },
              { name: "Director Name", role: "Director", initials: "D" },
            ].map((person) => (
              <article key={person.name} className="surface-card flex items-center gap-6 p-6">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-warm font-display text-2xl font-semibold text-black">
                  {person.initials}
                </div>
                <div>
                  <p className="font-body text-lg font-semibold text-[#111111]">{person.name}</p>
                  <p className="mt-1 text-sm text-mid">{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-warm">
        <div className="site-container mx-auto max-w-[640px]">
          <div className="surface-card px-8 py-10 text-center">
            <p className="label-caps text-warm">Company information</p>
            <p className="mt-4 font-display text-xl font-semibold text-[#111111]">SWASTIK ENTERPRISES</p>
            <p className="mt-4 text-sm leading-relaxed text-warm">
              FF, Block-D, Shop No. 102, Narayan Exotica, Ahmedabad-380052, Gujarat
            </p>
            <p className="mt-3 text-sm">
              <a href="tel:+917383838632" className="font-semibold text-primary hover:underline">
                +91 7383838632
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a href="mailto:info@fixonex.com" className="text-dark hover:underline">
                info@fixonex.com
              </a>
            </p>
            <p className="mt-1 text-sm text-mid">www.fixonex.com</p>
            <Button asChild className="mt-8" variant="primary">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad section-flow-light text-center">
        <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-[#111111]">Every strong surface starts with the right bond.</p>
        <p className="mt-6 text-base text-mid">{BRAND.tagline}</p>
      </section>
    </>
  );
}
