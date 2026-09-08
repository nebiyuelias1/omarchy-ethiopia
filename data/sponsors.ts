export type Sponsor = {
  name: string;
  tier: "Official Event Partner" | "Community Sponsor" | "Supporter";
  href: string;
  logo: string;
  description: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "Tefer",
    tier: "Official Event Partner",
    href: "https://drive.google.com/drive/folders/1vm1uudIWfNaSeh0jQbjXD20gEOZSRsCK?usp=sharing",
    logo: "/assets/partners/tefer-logo-white.png",
    description:
      "Primary event partner supporting developer connectivity, venue operations, and community logistics for Omarchy Ethiopia Meetup 2026.",
  },
];
