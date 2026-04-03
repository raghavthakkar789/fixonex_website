export type NavItem = {
  href: string;
  label: string;
};

export const mainNav: NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/get-help", label: "Get Help" },
  { href: "/how-to-use", label: "How to Use" },
  { href: "/contact", label: "Contact" },
];

export const resourceNav: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/services", label: "Services" },
  { href: "/company-info", label: "Company Info" },
  { href: "/connect", label: "Connect" },
  { href: "/book-consultation", label: "Product guidance" },
  { href: "/dealer-inquiry", label: "Dealer Inquiry" },
];
