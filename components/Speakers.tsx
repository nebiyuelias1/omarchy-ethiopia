import { speakers } from "@/data/speakers";

export function Speakers() {
  return (
    <section className="rounded-2xl border border-cream/15 bg-black/25 p-6">
      <h2 className="text-2xl font-semibold text-cream">Speakers & Panelists</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {speakers.map((speaker) => (
          <article key={speaker.name} className="rounded-xl border border-cream/10 bg-ink/65 p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-highland-green/30 font-mono text-sm font-bold text-cream">
              {speaker.avatar}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-cream">{speaker.name}</h3>
            <p className="text-sm text-cream/70">{speaker.role}</p>
            <p className="text-sm text-tibeb-gold">{speaker.organization}</p>
            <p className="mt-3 text-sm font-semibold text-cream">{speaker.topic}</p>
            <p className="mt-2 text-sm leading-6 text-cream/80">{speaker.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
