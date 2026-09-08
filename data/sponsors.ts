export type Sponsor = {
  name: string;
  tier: "Event Partner" | "Community Sponsor" | "Supporter";
  href: string;
  logo: string;
  description: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "Omarchy Ethiopia Event Partner",
    tier: "Event Partner",
    href: "https://drive.google.com/drive/folders/1vm1uudIWfNaSeh0jQbjXD20gEOZSRsCK?usp=sharing",
    logo: "/assets/partners/event-partner.svg",
    description: "Primary partner supporting venue logistics and community operations.",
  },
];
