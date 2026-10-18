"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ThumbsUp } from "lucide-react";
import OmarchyWordmark from "@/components/OmarchyWordmark";
import ThemeLeaderboard from "@/components/ThemeLeaderboard";
import { useThemeVotes, voteIssueUrl, type Theme } from "@/components/useThemeVotes";
import themesData from "@/data/themes.json";

const themes = themesData as Theme[];

export default function ThemesPage() {
  const categories = [...new Set(themes.map((theme) => theme.category))].sort();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { votes, loading, live, error, updatedAt, refresh } = useThemeVotes();

  const sortedThemes = [...themes].sort(
    (a, b) => Number(b.id) - Number(a.id),
  );
  const filteredThemes = selectedCategory
    ? sortedThemes.filter((theme) => theme.category === selectedCategory)
    : sortedThemes;

  return (
    <div className="min-h-screen bg-[#08090c] flex flex-col">
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pt-10 pb-20">
        {/* Back navigation */}
        <div className="flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-cream/60 transition hover:text-tibeb-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Omarchy Ethiopia</span>
          </Link>
        </div>

        {/* Header */}
        <header className="pt-8 pb-8 text-center sm:pb-10">
          <OmarchyWordmark className="mx-auto mb-3 w-[59.5%] max-w-[26.775rem]" />
          <h1 className="text-xs font-medium uppercase tracking-[0.18em] text-tibeb-gold sm:text-sm">
            ethiopian theme competition
          </h1>

          <div className="mx-auto mt-6 max-w-xl text-center">
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-cream/70 sm:text-sm">
              <span>Make it yours:</span>
              <span className="inline-flex items-center gap-2 font-mono text-cream">
                <span>Install</span>
                <span aria-hidden="true" className="text-cream/40">
                  →
                </span>
                <span className="sr-only">then</span>
                <span>Style</span>
                <span aria-hidden="true" className="text-cream/40">
                  →
                </span>
                <span className="sr-only">then</span>
                <span>Themes</span>
              </span>
            </p>
          </div>

          {/* Category filter */}
          {categories.length > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 font-mono text-xs">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-lg border px-4 py-2 transition ${
                  selectedCategory === null
                    ? "border-tibeb-gold bg-tibeb-gold font-bold text-black"
                    : "border-white/15 bg-white/[0.03] text-cream/80 hover:border-tibeb-gold hover:text-tibeb-gold"
                }`}
              >
                All ({themes.length})
              </button>
              {categories.map((category) => {
                const count = themes.filter(
                  (theme) => theme.category === category,
                ).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg border px-4 py-2 transition ${
                      selectedCategory === category
                        ? "border-tibeb-gold bg-tibeb-gold font-bold text-black"
                        : "border-white/15 bg-white/[0.03] text-cream/80 hover:border-tibeb-gold hover:text-tibeb-gold"
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </header>

        {/* Live leaderboard */}
        <ThemeLeaderboard
          themes={themes}
          votes={votes}
          loading={loading}
          live={live}
          error={error}
          updatedAt={updatedAt}
          onRefresh={refresh}
        />

        {/* Themes grid */}
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {filteredThemes.map((theme) => {
            const issueUrl = voteIssueUrl(theme);
            const voteCount = votes[theme.id] ?? 0;
            return (
              <li key={theme.id}>
                <a
                  href={theme.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tibeb-gold"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#0b0c11] ring-1 ring-white/10 transition duration-300 group-hover:ring-tibeb-gold/40">
                    {theme.screenshot ? (
                      <Image
                        src={theme.screenshot}
                        alt={`${theme.name} theme screenshot`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-mono text-4xl font-bold text-tibeb-gold/30">
                        {theme.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </a>
                <div className="mt-2.5 flex items-start justify-between gap-3">
                  <a
                    href={theme.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group min-w-0 text-sm font-medium text-cream transition-colors duration-150 hover:text-tibeb-gold"
                  >
                    <span className="block truncate">{theme.name}</span>
                    <span className="block truncate font-normal text-cream/50">
                      by {theme.author}
                    </span>
                  </a>
                  {issueUrl && (
                    <a
                      href={issueUrl}
                      target="_blank"
                      rel="noreferrer"
                      title={`Vote for ${theme.name} on GitHub`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-tibeb-gold/40 bg-tibeb-gold/10 px-2.5 py-1.5 font-mono text-[11px] font-bold text-tibeb-gold transition hover:bg-tibeb-gold hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tibeb-gold"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{voteCount}</span>
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {filteredThemes.length === 0 && (
          <p className="mt-10 rounded-xl border border-white/10 bg-[#0e0f14] p-8 text-center font-mono text-sm text-cream/60">
            No themes in this category yet.
          </p>
        )}

        {/* How to use */}
        <section id="how-to" className="mt-20 scroll-mt-20 border-t border-white/[0.08] pt-12">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            How to use these themes
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-sm font-semibold text-tibeb-gold">
                Select a theme
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">
                Press{" "}
                <code className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-cream">
                  Super + Alt + Space
                </code>{" "}
                to open the Omarchy Menu, then go to{" "}
                <strong className="text-white">Style → Theme</strong>.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm font-semibold text-tibeb-gold">
                Quick selector
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">
                Or press{" "}
                <code className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-cream">
                  Super + Ctrl + Shift + Space
                </code>{" "}
                to jump straight to the theme picker.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm font-semibold text-tibeb-gold">
                Background rotation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">
                Most themes ship several backgrounds. Press{" "}
                <code className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-cream">
                  Super + Ctrl + Space
                </code>{" "}
                to cycle through them.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm font-semibold text-tibeb-gold">
                What gets styled
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/75">
                Every theme restyles the whole system at once: the desktop,
                terminal, Neovim, btop, and the entire Omarchy shell — top bar,
                menu, notifications, OSD, and lock screen.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="https://omarchy.org/manual/themes/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-tibeb-gold underline decoration-tibeb-gold/40 underline-offset-4 transition hover:decoration-tibeb-gold"
            >
              <span>View the official Omarchy themes documentation</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
