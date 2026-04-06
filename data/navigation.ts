export type NavItem = {
  href: string;
  label: string;
};

/** Primary site navigation — six main destinations (Home is rendered separately in the header). */
export const mainNav: NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
  { href: "/partner", label: "Partner" },
];
