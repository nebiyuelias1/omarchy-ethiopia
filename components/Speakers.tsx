import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { speakers } from "@/data/speakers";

export function Speakers() {
  return (
    <section id="speakers" className="w-full">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Speakers
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {speakers.map((speaker) => (
          <Link
            key={speaker.slug}
            href={`/meetup/speakers/${speaker.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0f14] pb-8 pt-9 text-center transition duration-300 hover:-translate-y-1 hover:border-tibeb-gold/40 hover:shadow-[0_12px_40px_-12px_rgba(251,191,36,0.25)]"
          >
            {/* Soft gold glow on hover */}
            <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-tibeb-gold/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-tibeb-gold/40 bg-gradient-to-b from-tibeb-gold/15 to-transparent transition-transform duration-300 group-hover:scale-110">
              {speaker.photo ? (
                <Image
                  src={speaker.photo}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-mono text-xl font-bold text-tibeb-gold">
                  {speaker.avatar}
                </span>
              )}
            </div>

            <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
              {speaker.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-cream/60">
              {speaker.role}
            </p>

            <div className="mx-8 mt-6 border-t border-white/[0.06] pt-6">
              <p className="text-base font-semibold leading-snug text-tibeb-gold">
                &ldquo;{speaker.talk}&rdquo;
              </p>
              <p className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-cream/40 transition group-hover:text-tibeb-gold">
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
