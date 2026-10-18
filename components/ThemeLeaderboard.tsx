"use client";

import Image from "next/image";
import { ExternalLink, RefreshCw, ThumbsUp, Trophy } from "lucide-react";
import type { Theme } from "./useThemeVotes";
import { voteIssueUrl } from "./useThemeVotes";
import { computeStandings, hasJudgeScores } from "./themeStandings";

type ThemeLeaderboardProps = {
  themes: Theme[];
  votes: Record<string, number>;
  loading: boolean;
  live: boolean;
  error: string | null;
  updatedAt: number | null;
  onRefresh: () => void;
};

function rankStyles(rank: number): string {
  if (rank === 1) return "border-tibeb-gold/60 bg-tibeb-gold text-black";
  if (rank === 2) return "border-white/25 bg-white/15 text-white";
  if (rank === 3) return "border-ethiopia-green/50 bg-ethiopia-green/15 text-ethiopia-green";
  return "border-white/15 bg-white/[0.03] text-cream/70";
}

const EAT_TIME = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Addis_Ababa",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatTime(timestamp: number): string {
  return `${EAT_TIME.format(new Date(timestamp))} EAT`;
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="text-right">
      <div
        className={`font-mono font-bold ${
          highlight ? "text-base text-cream" : "text-sm text-cream/75"
        }`}
      >
        {value}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-cream/40">
        {label}
      </div>
    </div>
  );
}

export default function ThemeLeaderboard({
  themes,
  votes,
  loading,
  live,
  error,
  updatedAt,
  onRefresh,
}: ThemeLeaderboardProps) {
  const standings = computeStandings(themes, votes);
  const judgesPresent = hasJudgeScores();
  const leader = standings[0];
  const hasAny = standings.some((entry) => entry.finalScore > 0);

  return (
    <section
      id="leaderboard"
      className="mt-12 scroll-mt-20 rounded-2xl border border-white/10 bg-[#0b0c11] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white sm:text-xl">
            <Trophy className="h-5 w-5 text-tibeb-gold" />
            <span>Leaderboard</span>
          </h2>
          <p className="mt-1 text-xs text-cream/55">
            50% expert judges · 50% community votes
          </p>
          <a
            href="https://docs.google.com/spreadsheets/d/13CLnfpuxT2TzKP4CSK_X4CisHbxKhDFAH-wvRMayCeU/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-cream/45 underline decoration-cream/20 underline-offset-2 transition hover:text-tibeb-gold hover:decoration-tibeb-gold"
          >
            <span>Judge scoring sheet</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-cream/45">
          {updatedAt ? <span>{formatTime(updatedAt)}</span> : null}
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            title="Refresh votes"
            aria-label="Refresh votes"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-cream/70 transition hover:border-tibeb-gold hover:text-tibeb-gold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {!live && error && (
        <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-cream/60">
          Showing last synced votes
          {updatedAt ? ` (${formatTime(updatedAt)})` : ""}.
        </p>
      )}

      {leader && hasAny && (
        <div className="mt-5 rounded-xl border border-tibeb-gold/40 bg-gradient-to-r from-tibeb-gold/15 to-transparent p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tibeb-gold">
            Currently winning
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xl font-bold text-white sm:text-2xl">
              {leader.theme.name}
            </span>
            <span className="font-mono text-sm text-cream/60">
              final {Math.round(leader.finalScore)} / 100
            </span>
          </div>
        </div>
      )}

      <ol className="mt-5 space-y-2.5">
        {standings.map((entry) => {
          const issueUrl = voteIssueUrl(entry.theme);
          const width = Math.max(0, Math.min(100, entry.finalScore));

          return (
            <li
              key={entry.theme.id}
              className={`flex flex-wrap items-center gap-3 rounded-xl border p-3 transition sm:gap-4 sm:p-4 ${
                entry.rank === 1
                  ? "border-tibeb-gold/40 bg-[#0e0f14]"
                  : "border-white/10 bg-[#0e0f14]"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold ${rankStyles(entry.rank)}`}
              >
                {entry.rank}
              </span>

              <div className="relative hidden h-11 w-20 shrink-0 overflow-hidden rounded-md bg-[#0b0c11] ring-1 ring-white/10 sm:block">
                {entry.theme.screenshot ? (
                  <Image
                    src={entry.theme.screenshot}
                    alt={`${entry.theme.name} theme screenshot`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-mono text-base font-bold text-tibeb-gold/30">
                    {entry.theme.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {entry.theme.name}
                </p>
                <p className="truncate font-mono text-[11px] text-cream/50">
                  {entry.theme.author}
                </p>
              </div>

              <div className="flex w-full items-center gap-4 sm:w-auto">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10 sm:w-24">
                  <div
                    className="h-full rounded-full bg-tibeb-gold transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Stat label="final" value={Math.round(entry.finalScore)} highlight />
                  <Stat
                    label="judge"
                    value={
                      entry.judgeScore !== null
                        ? Math.round(entry.judgeScore)
                        : judgesPresent
                          ? "—"
                          : "n/a"
                    }
                  />
                  <Stat label="votes" value={entry.votes} />
                </div>
              </div>

              {issueUrl && (
                <a
                  href={issueUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-tibeb-gold/40 bg-tibeb-gold/10 px-3 py-2 font-mono text-xs font-bold text-tibeb-gold transition hover:bg-tibeb-gold hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tibeb-gold"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Vote</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              )}
            </li>
          );
        })}
      </ol>

      {standings.length === 0 && (
        <p className="mt-5 rounded-lg border border-white/10 bg-[#0e0f14] p-6 text-center font-mono text-sm text-cream/60">
          No themes to rank yet.
        </p>
      )}
    </section>
  );
}
