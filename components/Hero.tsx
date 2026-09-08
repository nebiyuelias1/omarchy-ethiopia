import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { meetup2026 } from "@/data/event";
import { OmarchyEthiopiaLogo } from "./OmarchyLogo";
import { ThreadedFlagBorder } from "./ThreadedFlagBorder";

export function Hero() {
  return (
    <section className="h-screen w-full flex flex-col justify-between items-center text-center relative overflow-hidden bg-[#08090c]">
      {/* Top Ethiopian Flag Line */}
      <ThreadedFlagBorder />

      {/* Hero Center Content */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 my-auto">
        {/* Official Upstream Omarchy Vector Logo + Ethiopia */}
        <OmarchyEthiopiaLogo className="w-full" />

        {/* Word-by-word Header from omarchy.org */}
        <h1 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white">
          <span>Beautiful, fun &amp; agentic Linux</span>{" "}
          <span className="font-normal text-cream/65">by</span>{" "}
          <Link
            href="https://dhh.dk"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-transparent underline-offset-[6px] transition-colors duration-150 hover:decoration-tibeb-gold hover:text-tibeb-gold"
          >
            DHH
          </Link>
        </h1>

        {/* Word-by-word Description from omarchy.org */}
        <p className="mt-4 max-w-xl text-sm sm:text-base md:text-lg text-cream/70 leading-relaxed font-normal">
          <span className="block">
            The linux distro with a bunch of pathetic haters
          </span>
          <span className="block mt-1 text-cream/60">
            now has a dedicated Ethiopian community.
          </span>
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
      </div>

      {/* Bottom Ethiopian Flag Line */}
      <ThreadedFlagBorder />
    </section>
  );
}
