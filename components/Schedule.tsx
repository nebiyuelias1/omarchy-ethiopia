import { schedule } from "@/data/event";

export function Schedule() {
  return (
    <section className="rounded-2xl border border-cream/15 bg-black/25 p-6">
      <h2 className="text-2xl font-semibold text-cream">Schedule / Program</h2>
      <div className="mt-6 space-y-4">
        {schedule.map((item) => (
          <div
            key={`${item.time}-${item.title}`}
            className="grid gap-3 rounded-xl border border-cream/10 bg-ink/60 p-4 md:grid-cols-[90px_1fr]"
          >
            <p className="font-mono text-sm text-tibeb-gold">{item.time}</p>
            <div>
              <p className="font-semibold text-cream">{item.title}</p>
              <p className="mt-1 text-sm text-cream/80">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
