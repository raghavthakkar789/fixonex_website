import type { Metadata } from "next";
import { Inter, Manrope, Merriweather } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/layout/AppFrame";
import { BRAND } from "@/lib/brand";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fixonex.com"),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${merriweather.variable} scroll-smooth antialiased`}
    >
      <body>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
