import dynamic from "next/dynamic";

const HomeView = dynamic(
  () => import("@/components/home/HomeView").then((m) => m.HomeView),
  {
    loading: () => <div className="min-h-[100svh] bg-zinc-950" aria-hidden />,
  },
);

export default function HomePage() {
  return <HomeView />;
}
