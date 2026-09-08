import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sponsors } from "@/data/sponsors";
import { meetup2026 } from "@/data/event";

export function Sponsors() {
  return (
    <section id="partners" className="w-full">
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-xs uppercase tracking-widest text-tibeb-gold">
          PARTNERS & SPONSORS
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Supported by Builders
        </h2>
        <p className="text-sm text-cream/65 max-w-xl">
          Generous partners backing developer connectivity, venue space, and open-source operations across Ethiopia.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Dedicated Tefer Partner Badge */}
        {sponsors.map((sponsor) => (
          <article
            key={sponsor.name}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0e0f14] p-6 transition hover:border-tibeb-gold/50"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-400">
                  {sponsor.tier}
                </span>
                <span className="font-mono text-xs text-cream/40">2026</span>
              </div>

              {/* Logo */}
              <div className="relative mt-6 h-16 w-44">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-cream/70">
                {sponsor.description}
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-4">
              <Link
                href={sponsor.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-tibeb-gold hover:underline"
              >
                <span>View partner assets & deck</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}

        {/* Community Sponsor Callout */}
        <article className="flex flex-col justify-between rounded-xl border border-dashed border-white/15 bg-[#0e0f14]/60 p-6 transition hover:border-white/30">
          <div>
            <span className="rounded border border-tibeb-gold/40 bg-tibeb-gold/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-tibeb-gold">
              Sponsorship Open
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Support Ethiopian Open Source
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/65">
              Help fund venue space, buna ceremonies, high-speed builder connectivity, and student hardware kits.
            </p>
          </div>

          <div className="mt-6 border-t border-white/[0.06] pt-4">
            <Link
              href={meetup2026.sponsorDeck}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-tibeb-gold hover:underline"
            >
              <span>Access Sponsor Deck (Google Drive)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
