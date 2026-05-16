import { HomeView } from "@/components/home/HomeView";
import { HOME_HERO_SLIDES } from "@/data/home-hero-slides";

const lcpHeroImage = HOME_HERO_SLIDES[0]?.image;

/**
 * Eager home shell (no `dynamic()`): keeps LCP hero in the first paint path and
 * allows an early preload for the first carousel slide.
 */
export default function HomePage() {
  return (
    <>
      {lcpHeroImage ? (
        <link rel="preload" href={lcpHeroImage} as="image" fetchPriority="high" />
      ) : null}
      <HomeView />
    </>
  );
}
