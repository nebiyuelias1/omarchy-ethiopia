import type { StaticImageData } from "next/image";
import teferLogo from "@/public/assets/partners/tefer-logo-white.png";

export type Sponsor = {
  name: string;
  tier: "Official Event Partner" | "Community Sponsor" | "Supporter";
  href: string;
  logo: string | StaticImageData;
  description: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "Tefer",
    tier: "Official Event Partner",
    href: "https://drive.google.com/drive/folders/1vm1uudIWfNaSeh0jQbjXD20gEOZSRsCK?usp=sharing",
    logo: teferLogo,
    description:
      "Primary event partner supporting developer connectivity, venue operations, and community logistics for Omarchy Ethiopia Meetup 2026.",
  },
];
