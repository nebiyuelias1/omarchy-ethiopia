import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download, Presentation } from "lucide-react";
import { Footer } from "@/components/Footer";
import { speakers } from "@/data/speakers";

export function generateStaticParams() {
  return speakers.map((speaker) => ({ slug: speaker.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const speaker = speakers.find((s) => s.slug === slug);
  if (!speaker) return {};

  return {
    title: `${speaker.name} — Speaker, Meetup 2026`,
    description: speaker.abstract,
  };
}

export default async function SpeakerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = speakers.find((s) => s.slug === slug);
  if (!speaker) notFound();

  const [firstName] = speaker.name.split(" ");

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#08090c]">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pt-10 pb-16">
        <Link
          href="/meetup"
          className="inline-flex items-center gap-2 font-mono text-xs text-cream/70 transition hover:text-tibeb-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Meetup 2026</span>
        </Link>

        <div className="mt-10 grid gap-10 md:grid-cols-[260px_1fr]">
          {/* Profile card */}
          <aside className="self-start rounded-2xl border border-white/10 bg-[#0e0f14] p-6 md:sticky md:top-10">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-tibeb-gold/30 bg-gradient-to-b from-tibeb-gold/10 to-transparent">
              {speaker.photo ? (
                <Image
                  src={speaker.photo}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-mono text-4xl font-bold text-tibeb-gold">
                  {speaker.avatar}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-xl font-bold tracking-tight text-white">
              {speaker.name}
            </h1>
            <p className="mt-1 font-mono text-xs text-cream/60">
              {speaker.role}
            </p>

            <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-5">
              {speaker.contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  {...(contact.href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                  className="group flex items-center justify-between font-mono text-xs text-cream/70 transition hover:text-tibeb-gold"
                >
                  <span>{contact.label}</span>
                  <ArrowUpRight className="h-3 w-3 text-cream/30 transition group-hover:text-tibeb-gold" />
                </a>
              ))}
            </div>
          </aside>

          {/* Talk & bio */}
          <div>
            <p className="text-2xl font-bold leading-tight tracking-tight text-tibeb-gold sm:text-3xl">
              &ldquo;{speaker.talk}&rdquo;
            </p>
            <p className="mt-5 text-sm leading-relaxed text-cream/75 sm:text-base">
              {speaker.abstract}
            </p>

            {speaker.slides && (
              <a
                href={speaker.slides}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 font-mono text-xs font-semibold text-cream/90 transition hover:border-tibeb-gold hover:text-tibeb-gold"
              >
                <Presentation className="h-3.5 w-3.5" />
                <span>View slides</span>
              </a>
            )}

            <div className="mt-10 border-t border-white/[0.08] pt-8">
              <h2 className="text-xl font-bold tracking-tight text-white">
                About {firstName}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {speaker.bio}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/meetup#rsvp"
                className="inline-flex items-center gap-2 rounded-lg bg-tibeb-gold px-5 py-3 font-mono text-xs font-bold text-black transition hover:bg-tibeb-gold-bright shadow-md"
              >
                <span>RSVP for Meetup 2026</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={`/assets/graphics/speaker-${speaker.slug}-square.png`}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 font-mono text-xs font-semibold text-cream/90 transition hover:border-tibeb-gold hover:text-tibeb-gold"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Speaker Graphic (PNG)</span>
              </a>
              <Link
                href="/meetup/graphics"
                className="inline-flex items-center gap-1 font-mono text-xs text-cream/50 hover:text-tibeb-gold transition"
              >
                <span>All Graphics</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
