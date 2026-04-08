import Image from "next/image";

type LeadershipCardProps = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

export function LeadershipCard({ name, title, bio, image }: LeadershipCardProps) {
  return (
    <article className="group">
      <Image src={image} alt={name} width={600} height={600} className="aspect-square w-full rounded-2xl border-2 border-border object-cover transition-all duration-300 group-hover:border-warm group-hover:shadow-warm" />
      <h3 className="mt-4 font-display text-[20px] font-bold text-brand">{name}</h3>
      <p className="mb-2 text-sm font-medium text-warm">{title}</p>
      <p className="text-sm leading-relaxed text-mid">{bio}</p>
    </article>
  );
}
