import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { meetup2026 } from "@/data/event";
import { OmarchyEthiopiaLogo } from "./OmarchyLogo";
import { ThreadedFlagBorder } from "./ThreadedFlagBorder";

export function Hero() {
  return (
    <section className="h-screen min-h-screen w-full snap-start snap-always flex flex-col justify-between items-center text-center relative overflow-hidden bg-[#08090c]">
      {/* Top Threaded Ethiopian Flag Border */}
      <ThreadedFlagBorder />

      {/* Hero Center Content */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-auto my-auto">
        {/* Official Upstream Omarchy Vector Logo (logo.svg) + Ethiopia */}
        <OmarchyEthiopiaLogo className="w-full" />

        {/* Official Headline from omarchy.org */}
        <h1 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          {meetup2026.tagline}
        </h1>

        {/* Official Description from omarchy.org */}
        <p className="mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-cream/70 leading-relaxed font-normal">
          {meetup2026.summary}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <Link
            href="/meetup"
            className="inline-flex items-center gap-2 rounded-lg bg-tibeb-gold px-6 py-3 font-bold text-black shadow-lg shadow-amber-500/10 transition hover:bg-tibeb-gold-bright hover:scale-[1.02]"
          >
            <span>Meetup 2026</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={meetup2026.upstreamDocs}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 font-semibold text-cream/90 transition hover:border-white/35 hover:text-white"
          >
            <span>omarchy.org</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>

        {/* Scroll indicator that snaps to partners */}
        <a
          href="#partners"
          className="mt-8 inline-flex items-center gap-1 font-mono text-[11px] text-cream/40 hover:text-tibeb-gold transition"
        >
          <span>Scroll to Partners</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>

      {/* Bottom Threaded Ethiopian Flag Border */}
      <ThreadedFlagBorder />
    </section>
  );
}
