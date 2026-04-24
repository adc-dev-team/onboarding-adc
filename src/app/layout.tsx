import type { Metadata, Viewport } from "next";
import { DM_Sans, Oswald } from "next/font/google";

import "./globals.css";

/**
 * Oswald drives the military-poster display type (headlines, CTAs, tags).
 * DM Sans handles body copy. Both self-host via next/font and expose CSS
 * variables so the module stylesheet can reference them directly.
 */
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://onboarding-adc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Academia de Combate — Incorporación",
  description:
    "Activa tu acceso a la Academia de Combate en 4 pasos rápidos: grupos de Telegram, tu nombre en Telegram y el tutorial de la plataforma.",
  applicationName: "Academia de Combate",
  authors: [{ name: "Academia de Combate" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    title: "Academia de Combate — Incorporación",
    description: "Activa tu acceso en 4 pasos rápidos.",
    siteName: "Academia de Combate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia de Combate — Incorporación",
    description: "Activa tu acceso en 4 pasos rápidos.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e2410",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${oswald.variable} ${dmSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
