"use client";

import { useCallback, useEffect, useState } from "react";
import bakedVotes from "@/data/theme-votes.json";

const REPO = "nebiyuelias1/omarchy-ethiopia";
const VOTES_URL = `https://raw.githubusercontent.com/${REPO}/main/data/theme-votes.json`;

export type Theme = {
  id: string;
  issue?: number;
  name: string;
  author: string;
  category: string;
  link: string;
  screenshot?: string;
  tags?: string[];
};

export type ThemeVotes = {
  votes: Record<string, number>;
  loading: boolean;
  live: boolean;
  error: string | null;
  updatedAt: number | null;
  refresh: () => void;
};

type BakedVotes = {
  updatedAt?: string | null;
  votes?: Record<string, number>;
};

const baked = bakedVotes as BakedVotes;
const BAKED_VOTES: Record<string, number> = baked.votes ?? {};
const BAKED_UPDATED_AT: number | null = baked.updatedAt
  ? Date.parse(baked.updatedAt)
  : null;

export function voteIssueUrl(theme: Theme): string | undefined {
  if (typeof theme.issue !== "number") return undefined;
  return `https://github.com/${REPO}/issues/${theme.issue}`;
}

async function fetchLiveVotes(): Promise<{
  votes: Record<string, number>;
  updatedAt: number;
}> {
  const res = await fetch(`${VOTES_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`GitHub returned ${res.status}`);
  }

  const data = (await res.json()) as BakedVotes;
  const votes = data.votes ?? {};
  if (Object.keys(votes).length === 0) {
    throw new Error("No vote data returned");
  }

  return {
    votes,
    updatedAt: data.updatedAt ? Date.parse(data.updatedAt) : Date.now(),
  };
}

export function useThemeVotes(): ThemeVotes {
  const [votes, setVotes] = useState<Record<string, number>>(BAKED_VOTES);
  const [updatedAt, setUpdatedAt] = useState<number | null>(BAKED_UPDATED_AT);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;

    fetchLiveVotes()
      .then((snapshot) => {
        if (!active) return;
        setVotes(snapshot.votes);
        setUpdatedAt(snapshot.updatedAt);
        setLive(true);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setLive(false);
        setError(
          err instanceof Error ? err.message : "Live votes unavailable",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [nonce]);

  const refresh = useCallback(() => {
    setLoading(true);
    setNonce((value) => value + 1);
  }, []);

  return { votes, loading, live, error, updatedAt, refresh };
}
