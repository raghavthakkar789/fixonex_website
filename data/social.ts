/**
 * EDIT HERE: Public social and messaging URLs for FIXONEX.
 * Replace example.com links with your official profiles.
 */
import type { SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/fixonex",
    icon: "instagram",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fixonex",
    icon: "linkedin",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@fixonex",
    icon: "youtube",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/fixonex",
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
