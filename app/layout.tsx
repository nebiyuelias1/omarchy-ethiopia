import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omarchy.org.et"),
  title: {
    default: "Omarchy Ethiopia — Beautiful, fun & agentic Linux",
    template: "%s · Omarchy Ethiopia",
  },
  description:
    "The malleable OS for the age of agents. Vibe your way through every alteration, tweak, and desire. Omarchy Ethiopia Chapter & Meetup 2026.",
  keywords: [
    "Omarchy",
    "Omarchy Ethiopia",
    "Ethiopian Linux",
    "Agentic Linux",
    "Linux Distro",
    "Meetup 2026",
    "Open Source Ethiopia",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Omarchy Ethiopia — Beautiful, fun & agentic Linux",
    description:
      "The malleable OS for the age of agents. Vibe your way through every alteration, tweak, and desire. Omarchy Ethiopia Chapter & Meetup 2026.",
    url: "https://omarchy.org.et",
    siteName: "Omarchy Ethiopia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omarchy Ethiopia — Beautiful, fun & agentic Linux",
    description:
      "The malleable OS for the age of agents. Vibe your way through every alteration, tweak, and desire. Omarchy Ethiopia Chapter & Meetup 2026.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#08090c] font-sans text-[#fcfcfd]">{children}</body>
    </html>
  );
}
