export type TeamMember = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Karan Patel",
    title: "Founder & Managing Director",
    bio: "Karan leads FIXONEX with one principle: products must perform on actual sites, not only in brochures. He works closely with teams to keep quality and support practical.",
    image: "https://picsum.photos/seed/karan/600/600",
  },
  {
    name: "Ayesha Khan",
    title: "Head of Technical Services",
    bio: "Ayesha drives product education and application quality across partner networks. Her focus is simple: fewer mistakes, better finish, and stronger long-term trust.",
    image: "https://picsum.photos/seed/ayesha/600/600",
  },
  {
    name: "Rohit Menon",
    title: "Director, Channel Growth",
    bio: "Rohit works with dealers and distributors to build predictable growth. He aligns product availability, training, and market support for faster partner success.",
    image: "https://picsum.photos/seed/rohit/600/600",
  },
];
