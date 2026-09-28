import type { StaticImageData } from "next/image";
import teferLogo from "@/public/assets/partners/tefer-logo-white.png";
import simaLogo from "@/public/assets/partners/sima.png";

export type SponsorCapability = {
  title: string;
  description: string;
};

export type Sponsor = {
  name: string;
  slug: string;
  tier: "Official Event Partner" | "Lead Sponsor" | "Community Sponsor" | "Supporter";
  href?: string;
  logo: string | StaticImageData;
  tagline?: string;
  description?: string;
  overview?: string;
  capabilities?: SponsorCapability[];
  linkLabel?: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "Tefer",
    slug: "tefer",
    tier: "Official Event Partner",
    href: "https://tefer.io/",
    logo: teferLogo,
    tagline: "Developer connectivity, venue operations, and community infrastructure",
    description:
      "Primary event partner supporting developer connectivity, venue operations, and community logistics for Omarchy Ethiopia Meetup 2026.",
    linkLabel: "Visit tefer.io",
  },
  {
    name: "SIMA",
    slug: "sima",
    tier: "Lead Sponsor",
    logo: simaLogo,
    tagline: "Conversational AI for African languages",
    description:
      "Conversational AI for African languages powering automated inbound & outbound telephony, smart human hand-offs, and custom API integrations.",
    overview:
      "SIMA builds next-generation conversational AI specifically tailored for African languages. From handling customer support calls to scaling voice outreach, SIMA empowers organizations across the continent with voice-first intelligence.",
    capabilities: [
      {
        title: "Handle inbound calls",
        description:
          "Automate high-volume incoming phone calls with real-time, responsive voice AI speaking native African languages.",
      },
      {
        title: "Handle outbound calls for marketing",
        description:
          "Launch intelligent outbound campaigns for marketing outreach, personalized announcements, and customer engagement.",
      },
      {
        title: "Human hand-off when task is hard",
        description:
          "Intelligently route complex conversations or high-touch tasks to human agents with full context preserved.",
      },
      {
        title: "Custom API integration",
        description:
          "Integrate seamlessly into existing CRMs, telecommunication gateways, custom databases, and internal workflows.",
      },
    ],
  },
];
