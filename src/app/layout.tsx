import type { Metadata, Viewport } from "next";
import { DM_Sans, Oswald } from "next/font/google";

import { ThemeProvider } from "@/providers/ThemeProvider";

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
  // Dos valores para que el navegador escoja según el tema activo
  // del sistema/usuario. Coinciden con `--ui-bg` de cada theme.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
  ],
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
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
