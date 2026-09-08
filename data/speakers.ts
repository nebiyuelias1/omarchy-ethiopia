export type Speaker = {
  name: string;
  role: string;
  organization: string;
  topic: string;
  bio: string;
  avatar: string;
};

export const speakers: Speaker[] = [
  {
    name: "Nardos Tadesse",
    role: "Linux Platform Engineer",
    organization: "Addis Open Systems",
    topic: "Designing Frugal Developer Workstations",
    bio: "Builds lightweight Linux setups for engineering teams shipping from low-resource environments.",
    avatar: "NT",
  },
  {
    name: "Bereket Alemu",
    role: "Open Source Maintainer",
    organization: "Omarchy Ethiopia",
    topic: "Omarchy Architecture for Daily Coding",
    bio: "Maintains local packaging, docs, and tooling to help first-time contributors move upstream.",
    avatar: "BA",
  },
  {
    name: "Rahel Mekonnen",
    role: "DevOps Lead",
    organization: "EthioCloud Labs",
    topic: "Keyboard-First CI/CD Workflows",
    bio: "Focuses on reducing context switching with terminal-centric automation and observability.",
    avatar: "RM",
  },
];
