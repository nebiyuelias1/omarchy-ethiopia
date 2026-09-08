import { speakers } from "@/data/speakers";

export function Speakers() {
  return (
    <section id="speakers" className="w-full">
      <div className="flex flex-col gap-1">
        <p className="font-mono text-xs uppercase tracking-widest text-tibeb-gold">
          {"// SPEAKERS & SESSIONS"}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-cream sm:text-3xl">
          Keynote & Technical Sessions
        </h2>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {speakers.map((speaker) => (
          <article
            key={speaker.name}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#121216] p-6 transition hover:border-tibeb-gold/40"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-xs font-bold text-tibeb-gold">
                  {speaker.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-cream text-sm">{speaker.name}</h3>
                  <p className="text-xs text-cream/50">{speaker.role}</p>
                  <p className="font-mono text-[11px] text-emerald-400">
                    {speaker.organization}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-mono text-xs font-semibold text-tibeb-gold">
                &ldquo;{speaker.topic}&rdquo;
              </p>

              <p className="mt-2 text-xs leading-relaxed text-cream/70">
                {speaker.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
