import { Keyboard, Rocket, Users } from "lucide-react";

const pillars = [
  {
    title: "Buna & Code",
    text: "Community-driven hacking sessions, local meetups, and open-source collaboration.",
    icon: Users,
  },
  {
    title: "Frugal & Fast",
    text: "Lightweight, high-performance computing designed to fly on any machine.",
    icon: Rocket,
  },
  {
    title: "Keyboard-First Flow",
    text: "Hyprland and tiling defaults tuned for rapid development and deep focus.",
    icon: Keyboard,
  },
] as const;

export function Pillars() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-12">
      <h2 className="text-2xl font-semibold text-cream">The Craft</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {pillars.map(({ title, text, icon: Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-cream/15 bg-black/30 p-6 transition hover:border-tibeb-gold/60"
          >
            <Icon className="h-6 w-6 text-tibeb-gold" />
            <h3 className="mt-4 text-lg font-semibold text-cream">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-cream/80">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
