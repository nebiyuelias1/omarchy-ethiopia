import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sponsors } from "@/data/sponsors";
import { meetup2026 } from "@/data/event";

export function Sponsors() {
  return (
    <section id="partners" className="w-full">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Sponsors
      </h2>

      <div className="mt-10 space-y-4">
        {sponsors.map((sponsor) => (
          <article
            key={sponsor.name}
            className="flex flex-col gap-5 rounded-xl border border-white/10 bg-[#0e0f14] p-6 transition hover:border-tibeb-gold/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative h-14 w-40">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-400">
                {sponsor.tier}
              </span>
            </div>

            <Link
              href={sponsor.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-tibeb-gold hover:underline"
            >
              <span>{sponsor.linkLabel ?? `Visit ${sponsor.name}`}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}

        {/* Community Sponsor Callout */}
        <article className="flex flex-col gap-4 rounded-xl border border-dashed border-white/15 p-6 transition hover:border-white/30 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-white">
            Support Ethiopian Open Source
          </h3>
          <Link
            href={meetup2026.sponsorDeck}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-tibeb-gold hover:underline"
          >
            <span>Access Sponsor Deck</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </article>
      </div>
    </section>
  );
}
