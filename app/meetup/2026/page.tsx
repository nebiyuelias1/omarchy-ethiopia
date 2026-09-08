import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Schedule } from "@/components/Schedule";
import { Speakers } from "@/components/Speakers";
import { Sponsors } from "@/components/Sponsors";
import { TibebDivider } from "@/components/TibebDivider";
import { meetup2026, registrationLink } from "@/data/event";

export default function Meetup2026Page() {
  return (
    <div className="min-h-screen bg-basalt">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-14">
        <p className="font-mono text-xs tracking-[0.16em] text-highland-green">Meetup Hub / 2026</p>
        <h1 className="mt-3 text-4xl font-semibold text-cream">{meetup2026.name}</h1>
        <p className="mt-4 max-w-3xl text-cream/80">{meetup2026.summary}</p>

        <div className="mt-8 rounded-2xl border border-tibeb-gold/35 bg-ink/70 p-6">
          <p className="text-sm text-cream/80">{meetup2026.dateLabel}</p>
          <p className="mt-1 text-sm text-cream/80">{meetup2026.timeLabel}</p>
          <p className="mt-1 text-sm text-cream/80">{meetup2026.venueDetails}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={registrationLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-tibeb-gold px-5 py-2 text-sm font-semibold text-ink"
            >
              Register on Lu.ma
            </Link>
            <Link
              href="/meetup/2026/calendar.ics"
              className="rounded-full border border-cream/35 px-5 py-2 text-sm font-semibold text-cream"
            >
              Download .ics
            </Link>
            <Link
              href={meetup2026.mapLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/35 px-5 py-2 text-sm font-semibold text-cream"
            >
              Open Map
            </Link>
          </div>
        </div>

        <TibebDivider label="❖" />

        <div className="grid gap-6">
          <Schedule />
          <Speakers />
          <Sponsors />
          <section className="rounded-2xl border border-cream/15 bg-black/25 p-6">
            <h2 className="text-2xl font-semibold text-cream">Location & Travel</h2>
            <p className="mt-3 text-cream/80">{meetup2026.venueDetails}</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {meetup2026.attendeeGuide.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-cream/15 bg-black/25 p-6">
            <h2 className="text-2xl font-semibold text-cream">Lu.ma Embed</h2>
            <p className="mt-2 text-sm text-cream/80">
              If the embedded content does not load in your browser, open the direct registration page.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-cream/15 bg-black/30">
              <iframe
                title="Lu.ma meetup"
                src={registrationLink}
                className="h-[560px] w-full"
                loading="lazy"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
