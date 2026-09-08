import Link from "next/link";
import { registrationLink } from "@/data/event";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/meetup/2026", label: "Meetup 2026" },
  { href: "/#resources", label: "Resources" },
  { href: "https://t.me/omarchyethiopia", label: "Telegram/Community" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-warm-red/20 bg-basalt/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-wide text-cream">
          OMARCHY <span className="text-tibeb-gold">ETHIOPIA</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-cream/80 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-cream">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={registrationLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-tibeb-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#f0bc5c]"
        >
          RSVP Meetup
        </Link>
      </div>
    </header>
  );
}
