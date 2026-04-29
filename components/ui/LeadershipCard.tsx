import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type LeadershipCardProps = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

export function LeadershipCard({ name, title, bio, image }: LeadershipCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-border transition-all duration-300 group-hover:border-chip group-hover:shadow-surface">
        <ImageWithFallback src={image} alt={name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
      </div>
      <h3 className="mt-4 font-heading text-[20px] font-bold text-brand">{name}</h3>
      <p className="mb-2 text-sm font-medium text-terracotta">{title}</p>
      <p className="text-sm leading-relaxed text-mid">{bio}</p>
    </article>
  );
}
