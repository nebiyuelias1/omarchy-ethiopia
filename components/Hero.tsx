"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Terminal } from "lucide-react";
import { installCommand, meetup2026, registrationLink } from "@/data/event";
import { TibebDivider } from "./TibebDivider";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-10 pt-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="font-mono text-xs tracking-[0.14em] text-highland-green">{meetup2026.chapterTag}</p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-cream md:text-5xl">
          {meetup2026.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-cream/80">{meetup2026.summary}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={registrationLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-tibeb-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-[#f0bc5c]"
          >
            Join Meetup 2026 (Lu.ma)
          </Link>
          <Link
            href={meetup2026.upstreamDocs}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cream/35 px-5 py-3 text-sm font-semibold text-cream transition hover:border-cream"
          >
            Upstream Docs (omarchy.org)
          </Link>
        </div>
        <TibebDivider label="ኢት" />
      </div>
      <div className="rounded-2xl border border-tibeb-gold/35 bg-ink/80 p-5 shadow-[0_0_60px_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-tibeb-gold">
          <Terminal className="h-4 w-4" />
          install
        </div>
        <p className="mt-4 rounded-lg border border-cream/20 bg-black/40 px-4 py-3 font-mono text-sm text-cream">
          {installCommand}
        </p>
        <button
          type="button"
          onClick={copyCommand}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cream/30 px-4 py-2 text-xs font-semibold text-cream/90 transition hover:text-cream"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy snippet"}
        </button>
        <div className="mt-5 rounded-lg border border-warm-red/25 bg-buna/40 p-4">
          <p className="text-sm font-semibold text-cream">Featured 2026 Meetup</p>
          <p className="mt-1 text-sm text-cream/80">{meetup2026.dateLabel}</p>
          <p className="mt-1 text-sm text-cream/80">{meetup2026.venue}</p>
          <ul className="mt-3 space-y-1 text-sm text-cream/80">
            {meetup2026.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
