type StepCardProps = {
  number: number;
  title: string;
  description: string;
};

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <article>
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warm font-display text-lg font-bold text-brand">{number}</div>
      <h3 className="mt-4 font-display text-[17px] font-semibold text-brand">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mid">{description}</p>
    </article>
  );
}
