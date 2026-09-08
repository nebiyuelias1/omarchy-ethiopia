import Link from "next/link";
import { meetup2026 } from "@/data/event";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-cream/15 bg-ink/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-cream/80 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-tibeb-gold">+---[ መርበብ ]---+</p>
          <p className="mt-2">Omarchy Ethiopia • Addis Ababa Chapter</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href="https://github.com/omarchy" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href={meetup2026.telegram} target="_blank" rel="noreferrer">
            Telegram
          </Link>
          <Link href={meetup2026.upstreamDocs} target="_blank" rel="noreferrer">
            Upstream Omarchy
          </Link>
          <span>DHH / Omarchy attribution</span>
        </div>
      </div>
    </footer>
  );
}
