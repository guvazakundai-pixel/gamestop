import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gamestop-alpha.vercel.app"),
  title: {
    default: "CIRCUITLOBBY — Premium Gaming Hardware",
    template: "%s · CIRCUITLOBBY",
  },
  description:
    "CIRCUITLOBBY is a premium gaming marketplace. Consoles, controllers, keyboards, and the gear that builds your setup. OLED dark, curated, zero compromise.",
  applicationName: "CIRCUITLOBBY",
  keywords: [
    "gaming hardware",
    "consoles",
    "PS5",
    "Xbox",
    "Nintendo Switch",
    "gaming accessories",
    "Harare",
    "Zimbabwe",
  ],
  openGraph: {
    title: "CIRCUITLOBBY — Premium Gaming Hardware",
    description:
      "Your gaming world. Your gear. Your lobby. Consoles and gaming hardware for Zimbabwe.",
    siteName: "CIRCUITLOBBY",
    type: "website",
    locale: "en_ZW",
  },
  twitter: {
    card: "summary_large_image",
    title: "CIRCUITLOBBY — Premium Gaming Hardware",
    description: "Your gaming world. Your gear. Your lobby.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
