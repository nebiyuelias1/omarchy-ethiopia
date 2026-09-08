import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  ArrowUpRight,
  MapPin,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Sponsors } from "@/components/Sponsors";
import { ThreadedFlagBorder } from "@/components/ThreadedFlagBorder";
import { meetup2026, registrationLink } from "@/data/event";

export const metadata: Metadata = {
  title: "Meetup 2026",
  description:
    "Omarchy Ethiopia Meetup 2026 in Addis Ababa. Embedded Luma registration and partner showcase.",
};

export default function MeetupPage() {
  return (
    <div className="min-h-screen bg-[#08090c] flex flex-col justify-between">
      <main className="w-full flex-1">
        {/* Top Back Navigation Bar */}
        <div className="mx-auto w-full max-w-4xl px-6 pt-10 pb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-cream/70 hover:text-tibeb-gold transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Omarchy Ethiopia</span>
          </Link>

          <span className="font-mono text-xs text-cream/40">
            ADDIS ABABA · 2026
          </span>
        </div>

        {/* Hero Banner framed by Ethiopian Flag Lines */}
        <section className="relative w-full">
          <ThreadedFlagBorder />

          <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 font-mono text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Official Chapter Meetup
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              {meetup2026.name}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {meetup2026.fullDescription}
            </p>

            {/* Event Time & Venue Details */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-cream/75 border-y border-white/[0.08] py-4">
              <span className="flex items-center gap-2 text-tibeb-gold">
                <CalendarDays className="h-4 w-4" />
                {meetup2026.dateLabel} · {meetup2026.timeLabel}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose-400" />
                {meetup2026.venue}
              </span>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
              <Link
                href={registrationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-tibeb-gold px-5 py-3 font-bold text-black transition hover:bg-tibeb-gold-bright shadow-lg"
              >
                <span>Open in Luma</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={meetup2026.mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-3 text-cream/60 transition hover:border-white/30 hover:text-cream"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            </div>
          </div>

          <ThreadedFlagBorder />
        </section>

        {/* Embedded Luma Registration Card */}
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <section id="rsvp" className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-tibeb-gold">
                  RSVP &amp; REGISTRATION
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Reserve Your Seat
                </h2>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Free General Admission
              </span>
            </div>

            <p className="mt-2 text-sm text-cream/65">
              RSVP directly through the embedded Luma widget below.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0e0f14] shadow-2xl">
              <iframe
                src="https://luma.com/embed/event/evt-lNdN45JFBUoPvbk/simple"
                width="100%"
                height="560"
                frameBorder="0"
                style={{
                  border: "none",
                  width: "100%",
                  minHeight: "560px",
                  colorScheme: "dark",
                }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                title="Omarchy Ethiopia Meetup 2026 Registration"
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-xs text-cream/40">
              <span>Direct registration URL:</span>
              <Link
                href={registrationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-tibeb-gold hover:underline"
              >
                <span>https://luma.com/zh5jv195</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </section>

          {/* Moved Partners & Sponsors to Meetup Page */}
          <div className="mt-24 pt-12 border-t border-white/[0.08]">
            <Sponsors />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
