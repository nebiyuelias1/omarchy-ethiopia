export const registrationLink = "https://luma.com/zh5jv195";

export const installCommand = "curl -sSL https://omarchy.org.et/install.sh | bash";

export const meetup2026 = {
  name: "Omarchy Ethiopia Meetup 2026",
  chapterTag: "// ኦማርኪ ኢትዮጵያ • Addis Ababa Chapter",
  tagline: "The Keyboard-First Distro. Tailored for Ethiopian Builders.",
  summary:
    "A focused gathering for Ethiopian builders who value fast systems, lightweight workflows, and community-first open source.",
  dateLabel: "Saturday, February 7, 2026",
  timeLabel: "10:00 AM – 4:30 PM EAT",
  venue: "Bole, Addis Ababa",
  venueDetails:
    "Innovation Hub Auditorium, Bole Road, Addis Ababa. Bring your laptop, charger, and power extension if possible.",
  mapLink:
    "https://maps.google.com/?q=Bole+Road+Addis+Ababa+Innovation+Hub+Auditorium",
  upstreamDocs: "https://omarchy.org",
  telegram: "https://t.me/omarchyethiopia",
  sponsorDeck:
    "https://drive.google.com/drive/folders/1vm1uudIWfNaSeh0jQbjXD20gEOZSRsCK?usp=sharing",
  attendeeGuide: [
    "Laptop with at least 8GB RAM and available USB port",
    "Download preferred ISO images ahead of time",
    "Power strip / extension cord for shared tables",
    "Optional: external keyboard for live tiling workflow demos",
  ],
  highlights: [
    "Omarchy architecture deep dive",
    "Live Hyprland rice/config demo",
    "Coffee break + open-source networking",
  ],
} as const;

export const schedule = [
  {
    time: "10:00",
    title: "Opening Keynote",
    details: "Why keyboard-first Linux matters for Ethiopian builders.",
  },
  {
    time: "10:45",
    title: "Omarchy Architecture",
    details: "Core stack, system design, and upstream contribution flow.",
  },
  {
    time: "11:45",
    title: "Live Rice & Config Demo",
    details: "Real-time Hyprland setup and productivity shortcuts.",
  },
  {
    time: "12:45",
    title: "Buna Break & Networking",
    details: "Coffee ceremony-inspired break and community introductions.",
  },
  {
    time: "13:45",
    title: "Lightning Talks",
    details: "5-minute community demos, tools, and workflows.",
  },
  {
    time: "15:00",
    title: "Open Mic + Sponsor Spotlight",
    details: "Q&A, sponsor callout, and next-step collaboration.",
  },
  {
    time: "16:00",
    title: "Install Jam",
    details: "Hands-on setup support and local chapter roadmap.",
  },
] as const;
