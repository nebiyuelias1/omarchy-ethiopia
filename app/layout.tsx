import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omarchy Ethiopia",
  description: "Official Omarchy Ethiopia chapter website and Meetup 2026 hub.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-basalt text-cream">{children}</body>
    </html>
  );
}
