import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sponsors } from "@/data/sponsors";

const tierStyles: Record<string, string> = {
  "Lead Sponsor": "border-amber-400/40 bg-amber-400/10 text-amber-300",
  "Official Event Partner": "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  "Community Sponsor": "border-sky-500/40 bg-sky-500/10 text-sky-400",
  Supporter: "border-white/20 bg-white/5 text-white/80",
};

export function Sponsors() {
  return (
    <section id="sponsors" className="w-full scroll-mt-20">
      <div id="sponsorship" className="scroll-mt-20" />
      <div id="partners" className="scroll-mt-20" />

      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        <a
          href="#sponsors"
          className="group inline-flex items-center gap-2 transition hover:text-tibeb-gold"
          title="Direct link to Sponsors"
        >
          <span>Sponsors</span>
          <span
            aria-hidden="true"
            className="font-mono text-xl text-tibeb-gold/40 transition-opacity group-hover:opacity-100 group-hover:text-tibeb-gold"
          >
            #
          </span>
        </a>
      </h2>

      <div className="mt-10 space-y-4">
        {sponsors.map((sponsor) => (
          <article
            key={sponsor.name}
            className="flex flex-col gap-5 rounded-xl border border-white/10 bg-[#0e0f14] p-6 transition hover:border-tibeb-gold/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href={`/meetup/sponsors/${sponsor.slug}`}
                className="relative h-14 w-40 transition hover:opacity-85"
                title={`View ${sponsor.name} details`}
              >
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </Link>
              <span
                className={`rounded border px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                  tierStyles[sponsor.tier] ??
                  "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                }`}
              >
                {sponsor.tier}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/meetup/sponsors/${sponsor.slug}`}
                className="inline-flex items-center gap-1 font-mono text-xs text-tibeb-gold hover:underline"
              >
                <span>About {sponsor.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              {sponsor.href && (
                <Link
                  href={sponsor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-cream/60 transition hover:text-white hover:underline"
                >
                  <span>{sponsor.linkLabel ?? `Visit website`}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
