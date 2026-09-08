export const registrationLink = "https://luma.com/zh5jv195";

export const meetup2026 = {
  name: "Omarchy Ethiopia Meetup 2026",
  tagline: "Beautiful, fun & agentic Linux.",
  subtagline: "The malleable OS for the age of agents.",
  summary:
    "The malleable OS for the age of agents. Vibe your way through every alteration, tweak, and desire. Omarchy gives you a computing environment that responds to your intent.",
  fullDescription:
    "Share the love of beautiful, fun & agentic Linux. Get together with others who love computers as much as you do. Share plugins, present work, and help newcomers into the community.",
  dateLabel: "Saturday, February 7, 2026",
  timeLabel: "10:00 AM – 4:30 PM EAT",
  venue: "Innovation Hub Auditorium, Bole Road, Addis Ababa",
  venueShort: "Bole, Addis Ababa",
  venueDetails:
    "Innovation Hub Auditorium, Bole Road, Addis Ababa. Bring your laptop, charger, and power extension if possible.",
  mapLink:
    "https://maps.google.com/?q=Bole+Road+Addis+Ababa+Innovation+Hub+Auditorium",
  upstreamDocs: "https://omarchy.org",
  github: "https://github.com/omacom/omarchy",
  sponsorDeck:
    "https://drive.google.com/drive/folders/1vm1uudIWfNaSeh0jQbjXD20gEOZSRsCK?usp=sharing",
  highlights: [
    "Omarchy architecture & agentic workflows",
    "Live ricing & desktop malleability",
    "Buna ceremony + local builder roundtable",
  ],
} as const;

export const schedule = [
  {
    time: "10:00",
    title: "Opening Keynote: Beautiful, Fun & Agentic Linux",
    speaker: "Bereket Alemu",
    details:
      "The vision behind Omarchy and why the malleable OS for the age of agents unlocks radical leverage for developers.",
  },
  {
    time: "10:45",
    title: "Omarchy Architecture: Distro Deep Dive",
    speaker: "Nardos Tadesse",
    details:
      "System internals, packaging pipeline, memory footprint benchmarks, and how the Ethiopian chapter interfaces with upstream omarchy.org.",
  },
  {
    time: "11:45",
    title: "Live Rice & Dotfiles Mastery Session",
    speaker: "Local Rice Masters",
    details:
      "Real-time Hyprland window tiling, modal Wayland keybinds, Waybar configurations, and zero-latency terminal workspaces.",
  },
  {
    time: "12:45",
    title: "Buna Ceremony & Community Networking",
    speaker: "Traditional Buna Roundtable",
    details:
      "Freshly roasted Ethiopian coffee ceremony, community introductions, project sharing, and spontaneous hacker discussions.",
  },
  {
    time: "13:45",
    title: "Lightning Talks (5-Minute Demos)",
    speaker: "Open Community Submissions",
    details:
      "Rapid-fire community demos: terminal utilities, local offline mirrors, and developer toolchains.",
  },
  {
    time: "15:00",
    title: "Partner Showcase: Tefer & Open Mic",
    speaker: "Tefer Team & Community",
    details:
      "Spotlight on event partner Tefer, open floor Q&A, community roadmap, and collaborative hackathons across Addis Ababa.",
  },
  {
    time: "16:00",
    title: "Hands-On Install Jam & Debug Clinic",
    speaker: "Omarchy Ethiopia Stewards",
    details:
      "Live installation assistance, dual-boot setups, hardware driver optimization, and getting your first PR ready for upstream.",
  },
] as const;
