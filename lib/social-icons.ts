import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SocialLink } from "@/types";

export const socialIconMap: Record<SocialLink["icon"], LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  whatsapp: MessageCircle,
};
