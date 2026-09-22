import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ArrowUpRight, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Speaker Graphics & Media Kit — Omarchy Ethiopia Meetup 2026",
  description:
    "Official high-resolution speaker announcement graphics and social media kits for Omarchy Ethiopia Meetup 2026.",
};

const graphics = [
  {
    id: "dagim-square",
    title: "Dagim Gizachew Astatkie — Square (1:1)",
    speaker: "Dagim Gizachew Astatkie",
    talk: "Vicinae: High-Performance Desktop Launcher, Raycast Compatibility & Beyond",
    format: "1200 × 1200 px (Square)",
    bestFor: "Instagram, Twitter Feed, LinkedIn, Telegram",
    src: "/assets/graphics/speaker-dagim-gizachew-square.png",
    aspect: "aspect-square",
  },
  {
    id: "dagim-landscape",
    title: "Dagim Gizachew Astatkie — Landscape (16:9)",
    speaker: "Dagim Gizachew Astatkie",
    talk: "Vicinae: High-Performance Desktop Launcher, Raycast Compatibility & Beyond",
    format: "1200 × 675 px (16:9)",
    bestFor: "Twitter Card, LinkedIn Banner, Presentation Title",
    src: "/assets/graphics/speaker-dagim-gizachew-landscape.png",
    aspect: "aspect-[16/9]",
  },
  {
    id: "fraol-square",
    title: "Fraol Lemecha — Square (1:1)",
    speaker: "Fraol Lemecha",
    talk: "Nix for Omarchers",
    format: "1200 × 1200 px (Square)",
    bestFor: "Instagram, Twitter Feed, LinkedIn, Telegram",
    src: "/assets/graphics/speaker-fraol-lemecha-square.png",
    aspect: "aspect-square",
  },
  {
    id: "fraol-landscape",
    title: "Fraol Lemecha — Landscape (16:9)",
    speaker: "Fraol Lemecha",
    talk: "Nix for Omarchers",
    format: "1200 × 675 px (16:9)",
    bestFor: "Twitter Card, LinkedIn Banner, Presentation Title",
    src: "/assets/graphics/speaker-fraol-lemecha-landscape.png",
    aspect: "aspect-[16/9]",
  },
  {
    id: "lineup-square",
    title: "Dual Speaker Lineup — Square (1:1)",
    speaker: "Dagim Gizachew & Fraol Lemecha",
    talk: "Meet The Speakers Announcement",
    format: "1200 × 1200 px (Square)",
    bestFor: "Community announcements, Instagram, Telegram",
    src: "/assets/graphics/meetup-speakers-lineup-square.png",
    aspect: "aspect-square",
  },
  {
    id: "lineup-landscape",
    title: "Dual Speaker Lineup — Landscape (16:9)",
    speaker: "Dagim Gizachew & Fraol Lemecha",
    talk: "Meet The Speakers Announcement",
    format: "1200 × 675 px (16:9)",
    bestFor: "Twitter Header, LinkedIn Landscape Post",
    src: "/assets/graphics/meetup-speakers-lineup-landscape.png",
    aspect: "aspect-[16/9]",
  },
];

export default function GraphicsPage() {
  return (
    <div className="min-h-screen bg-[#08090c] flex flex-col justify-between text-cream">
      <main className="w-full flex-1">
        {/* Top Nav */}
        <div className="mx-auto w-full max-w-5xl px-6 pt-10 pb-6 flex items-center justify-between">
          <Link
            href="/meetup"
            className="inline-flex items-center gap-2 font-mono text-xs text-cream/70 hover:text-tibeb-gold transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Meetup</span>
          </Link>
          <span className="font-mono text-xs text-cream/40">
            Official Media Kit &bull; 2026
          </span>
        </div>

        {/* Hero */}
        <section className="mx-auto w-full max-w-5xl px-6 py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-tibeb-gold/30 bg-tibeb-gold/10 px-3 py-1 text-xs font-mono text-tibeb-gold">
            <Sparkles className="h-3 w-3" />
            <span>SPEAKER GRAPHICS &bull; READY TO SHARE</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Speaker Announcement Graphics
          </h1>
          <p className="mt-3 max-w-2xl text-base text-cream/70">
            High-resolution visual assets crafted with Omarchy Ethiopia brand guidelines,
            featuring Ethiopian tri-color accents, partner branding, and Luma RSVP verification.
          </p>
        </section>

        {/* Graphics Grid */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-24">
          <div className="grid gap-10 md:grid-cols-2">
            {graphics.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0e0f14] p-5 transition hover:border-tibeb-gold/40 hover:shadow-[0_12px_40px_-12px_rgba(251,191,36,0.25)]"
              >
                <div>
                  <div className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 ${item.aspect}`}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-mono text-cream/50">
                      <span>{item.format}</span>
                      <span className="text-tibeb-gold">{item.bestFor}</span>
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs text-cream/65">
                      {item.talk}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <a
                    href={item.src}
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-tibeb-gold px-4 py-2 font-mono text-xs font-bold text-black transition hover:bg-tibeb-gold-bright"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PNG</span>
                  </a>

                  <a
                    href={item.src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-cream/60 hover:text-tibeb-gold transition"
                  >
                    <span>Full Preview</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
