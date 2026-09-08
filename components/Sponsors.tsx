import Image from "next/image";
import Link from "next/link";
import { sponsors } from "@/data/sponsors";

export function Sponsors() {
  return (
    <section className="rounded-2xl border border-warm-red/30 bg-buna/35 p-6">
      <h2 className="text-2xl font-semibold text-cream">Partners & Sponsors</h2>
      <p className="mt-2 text-sm text-cream/85">
        Interested in supporting Ethiopian open source? Sponsor this event.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {sponsors.map((sponsor) => (
          <article key={sponsor.name} className="rounded-xl border border-cream/15 bg-ink/70 p-5">
            <div className="relative h-20 w-full overflow-hidden rounded border border-cream/15 bg-black/30">
              <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain p-3" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-highland-green">
              {sponsor.tier}
            </p>
            <p className="mt-2 text-sm font-semibold text-cream">{sponsor.name}</p>
            <p className="mt-2 text-sm text-cream/80">{sponsor.description}</p>
            <Link
              href={sponsor.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-tibeb-gold"
            >
              View sponsor assets →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
