import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Speakers } from "@/components/Speakers";
import { Sponsors } from "@/components/Sponsors";
import { meetup2026, registrationLink } from "@/data/event";

export const metadata: Metadata = {
  title: "Meetup 2026",
  description:
    "Omarchy Ethiopia Meetup 2026. Featured speakers, talk sessions, embedded Luma registration, and partner showcase.",
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
        </div>

        {/* Hero Banner */}
        <section className="relative w-full">
          <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20 text-center sm:text-left">
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              {meetup2026.name}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
              First of its kind gathering for the Omarchy community in Ethiopia.
            </p>

            {/* Action Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
              <Link
                href={registrationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-tibeb-gold px-6 py-3 font-bold text-black transition hover:bg-tibeb-gold-bright shadow-lg"
              >
                <span>Open in Luma</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="#speakers"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 font-semibold text-cream/90 transition hover:border-tibeb-gold hover:text-tibeb-gold"
              >
                <span>Featured Speakers</span>
              </a>
              <a
                href="#rsvp"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-5 py-3 text-cream/70 transition hover:border-white/30 hover:text-white"
              >
                <span>RSVP Below</span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          {/* Featured Speakers Section */}
          <Speakers />

          {/* Embedded Luma Registration Card */}
          <div className="mt-24 pt-12 border-t border-white/[0.08]">
            <section id="rsvp" className="w-full">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Reserve Your Seat
              </h2>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-[#0e0f14] shadow-2xl">
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
            </section>
          </div>

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
