/**
 * EDIT HERE: Public social and messaging URLs for FIXONEX.
 * The order in this array drives the rendered order of social buttons
 * everywhere they appear (footer, contact page, etc.).
 */
import type { SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    // Profile not published yet — button is rendered but non-interactive.
    href: "#",
    icon: "linkedin",
    disabled: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/fixonex_?igsh=NGQxcHJhaXFyajh3",
    icon: "instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/1EHmmDMJmq/",
    icon: "facebook",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/917383838632",
    icon: "whatsapp",
  },
];

/** Canonical WhatsApp deep link — use for all chat CTAs sitewide. */
export const WHATSAPP_HREF =
  socialLinks.find((s) => s.id === "whatsapp")?.href ?? "https://wa.me/917383838632";
