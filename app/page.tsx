import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { meetup2026, registrationLink } from "@/data/event";

export default function Home() {
  return (
    <div className="min-h-screen bg-basalt">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pillars />
        <section className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="rounded-2xl border border-tibeb-gold/40 bg-gradient-to-r from-buna/80 via-ink to-basalt p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-highland-green">Meetup 2026</p>
            <h2 className="mt-2 text-2xl font-semibold text-cream">{meetup2026.dateLabel}</h2>
            <p className="mt-1 text-cream/80">{meetup2026.timeLabel} · {meetup2026.venue}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={registrationLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-tibeb-gold px-5 py-2 text-sm font-semibold text-ink"
              >
                Register on Lu.ma
              </Link>
              <Link href="/meetup/2026" className="rounded-full border border-cream/35 px-5 py-2 text-sm font-semibold text-cream">
                View Event Hub
              </Link>
            </div>
          </div>
        </section>
        <section id="resources" className="mx-auto w-full max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-semibold text-cream">Resources</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Link href={meetup2026.upstreamDocs} target="_blank" rel="noreferrer" className="rounded-xl border border-cream/20 bg-black/20 p-4 text-cream/90">
              Omarchy Upstream Documentation
            </Link>
            <Link href={registrationLink} target="_blank" rel="noreferrer" className="rounded-xl border border-cream/20 bg-black/20 p-4 text-cream/90">
              Meetup 2026 Registration
            </Link>
            <Link href={meetup2026.telegram} target="_blank" rel="noreferrer" className="rounded-xl border border-cream/20 bg-black/20 p-4 text-cream/90">
              Telegram Community Channel
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
