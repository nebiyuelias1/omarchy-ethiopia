import Link from "next/link";
import { OmarchyMark } from "./OmarchyLogo";
import { meetup2026 } from "@/data/event";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.08] bg-[#08090c] py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <OmarchyMark className="h-5 w-5 text-tibeb-gold" />
          <span className="font-mono text-xs text-cream/75">
            Omarchy Ethiopia
          </span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 font-mono text-xs text-cream/50">
          <Link href="/meetup" className="hover:text-tibeb-gold transition">
            Meetup 2026
          </Link>
          <Link href={meetup2026.upstreamDocs} target="_blank" rel="noreferrer" className="hover:text-tibeb-gold transition">
            omarchy.org
          </Link>
          <Link href={meetup2026.github} target="_blank" rel="noreferrer" className="hover:text-tibeb-gold transition">
            GitHub
          </Link>
        </nav>
      </div>

      <div className="mx-auto mt-6 w-full max-w-4xl px-6 text-center sm:text-left">
        <p className="font-mono text-[11px] text-cream/35">
          An independent Ethiopian chapter of{" "}
          <Link href={meetup2026.upstreamDocs} target="_blank" rel="noreferrer" className="underline hover:text-tibeb-gold">
            Omarchy Linux
          </Link>
          . Built by builders, over buna.
        </p>
      </div>
    </footer>
  );
}
