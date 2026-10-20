import bakedScores from "@/data/theme-scores.json";
import type { Theme } from "./useThemeVotes";

export const JUDGE_WEIGHT = 0.5;
export const COMMUNITY_WEIGHT = 0.5;

export const POINTS_PER_VOTE = 5;
export const COMMUNITY_MAX = 100;

type BakedScores = {
  updatedAt?: string | null;
  judges?: string[];
  scores?: Record<string, { average?: number; count?: number }>;
};

const baked = bakedScores as BakedScores;

export function hasJudgeScores(): boolean {
  return Object.keys(baked.scores ?? {}).length > 0;
}

export function judgeAverage(themeId: string): number | null {
  const entry = baked.scores?.[themeId];
  return typeof entry?.average === "number" ? entry.average : null;
}

export type Standing = {
  theme: Theme;
  votes: number;
  communityScore: number;
  judgeScore: number | null;
  finalScore: number | null;
  rank: number | null;
};

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function computeStandings(
  themes: Theme[],
  votes: Record<string, number>,
): Standing[] {
  const rows: Standing[] = themes.map((theme) => {
    const themeVotes = votes[theme.id] ?? 0;
    const communityScore = Math.min(themeVotes * POINTS_PER_VOTE, COMMUNITY_MAX);
    const judgeScore = judgeAverage(theme.id);
    const finalScore =
      judgeScore !== null
        ? JUDGE_WEIGHT * judgeScore + COMMUNITY_WEIGHT * communityScore
        : null;

    return {
      theme,
      votes: themeVotes,
      communityScore,
      judgeScore,
      finalScore,
      rank: null,
    };
  });

  const ranked = rows
    .filter((row): row is Standing & { finalScore: number } => row.finalScore !== null)
    .sort(
      (a, b) =>
        round1(b.finalScore) - round1(a.finalScore) ||
        (b.judgeScore ?? 0) - (a.judgeScore ?? 0) ||
        b.votes - a.votes ||
        a.theme.name.localeCompare(b.theme.name),
    );

  let previousScore: number | null = null;
  let previousRank = 0;
  ranked.forEach((row, index) => {
    const score = round1(row.finalScore);
    if (previousScore !== null && score === previousScore) {
      row.rank = previousRank;
    } else {
      row.rank = index + 1;
      previousRank = row.rank;
      previousScore = score;
    }
  });

  const pending = rows
    .filter((row) => row.finalScore === null)
    .sort((a, b) => a.theme.name.localeCompare(b.theme.name));

  return [...ranked, ...pending];
}
