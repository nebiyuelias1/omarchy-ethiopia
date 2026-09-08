import { schedule } from "@/data/event";

export function Schedule() {
  return (
    <section id="schedule" className="w-full">
      <div className="flex flex-col gap-1">
        <p className="font-mono text-xs uppercase tracking-widest text-tibeb-gold">
          {"// PROGRAM & AGENDA"}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-cream sm:text-3xl">
          Event Schedule
        </h2>
      </div>

      <div className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {schedule.map((item) => (
          <div
            key={`${item.time}-${item.title}`}
            className="grid gap-2 py-5 sm:grid-cols-[120px_1fr] sm:gap-6"
          >
            <span className="font-mono text-xs font-semibold text-tibeb-gold">
              {item.time} EAT
            </span>
            <div>
              <h3 className="font-semibold text-cream text-base">
                {item.title}
              </h3>
              {item.speaker && (
                <p className="font-mono text-xs text-cream/50 mt-1">
                  Speaker: {item.speaker}
                </p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {item.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
