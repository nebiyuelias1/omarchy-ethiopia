import type { Metadata } from "next";
import { DeckClient } from "./DeckClient";

export const metadata: Metadata = {
  title: "Sponsorship Deck — Meetup 2026",
  description:
    "Official Sponsorship Prospectus for Omarchy Ethiopia Meetup 2026. Explore community profile, speaker lineup, and partnership tiers.",
};

export default function DeckPage() {
  return <DeckClient />;
}
