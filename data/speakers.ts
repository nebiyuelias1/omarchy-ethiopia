import type { StaticImageData } from "next/image";
import fraolPhoto from "@/public/assets/speakers/fraol-lemecha.jpg";
import dagimPhoto from "@/public/assets/speakers/dagim-gizachew.jpg";

export type SpeakerContact = {
  label: string;
  href: string;
};

export type Speaker = {
  slug: string;
  name: string;
  role: string;
  experience: string;
  talk: string;
  abstract: string;
  bio: string;
  photo?: StaticImageData;
  slides?: string;
  avatar: string;
  contacts: SpeakerContact[];
};

export const speakers: Speaker[] = [
  {
    slug: "fraol-lemecha",
    name: "Fraol Lemecha",
    role: "Software Developer",
    experience: "Intermediate",
    talk: "Nix for Omarchers",
    abstract:
      "The talk would try to introduce the audience to Nix and NixOS. Why it's interesting, How they could use it, Where it would be helpful for them in their development and system admin tasks, and some stuff about how the Omarchy project would benefit if it was based on NixOS.",
    bio: "Full-stack developer from Addis Ababa, increasingly pulled toward systems programming with Rust and the database space. He publishes PostgreSQL extensions and open-source tooling under the handle frectonz, and writes about tech on his blog, Factorem. Previously CTO at EduMine. Just another guy addicted to coding.",
    photo: fraolPhoto,
    avatar: "FL",
    contacts: [
      { label: "GitHub", href: "https://github.com/frectonz" },
      { label: "Website", href: "https://frectonz.et" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/fraol-lemecha" },
      { label: "X", href: "https://x.com/frectonz" },
      { label: "Telegram", href: "https://t.me/frectonz" },
      { label: "Email", href: "mailto:fraol0912@gmail.com" },
    ],
  },
  {
    slug: "dagim-gizachew",
    name: "Dagim Gizachew Astatkie",
    role: "Backend Engineer at klik.et",
    experience: "Intermediate",
    talk: "Vicinae: High-Performance Desktop Launcher, Raycast Compatibility & Beyond",
    abstract:
      "A desktop launcher shouldn't just open apps, it should be the command center for your entire workflow. Vicinae is an open-source, cross-platform launcher engineered for speed and extensibility, offering developers a polished, unified replacement for tools like Alfred and Raycast on Linux. Out of the box, Vicinae delivers instant fuzzy search, clipboard history, text expansion, browser tab navigation, and workspace control. But its real superpower is extensibility: it seamlessly runs React & TypeScript Raycast extensions, supports Unix script commands, and integrates cleanly with modern Linux compositors.",
    bio: "Backend engineer at klik.et, where he builds and maintains the backend of a delivery platform serving customers across Addis Ababa. Previously at Vistec Technologies and CodeLight, he graduated top of his class in Software Engineering from Bahir Dar University and went through A2SV. Off hours he builds open-source developer tooling — including gitsnip, a Go CLI with 90+ stars, and GNOME Shell extensions he uses daily.",
    slides:
      "https://drive.google.com/open?id=1FLhhdfTyZHdpN2GxZ26_raRN35Dv0mQv",
    photo: dagimPhoto,
    avatar: "DG",
    contacts: [
      { label: "GitHub", href: "https://github.com/dagimg-dot" },
      { label: "Website", href: "https://dagimg-dot.netlify.app" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/dagim-astatkie-1743a1239",
      },
      { label: "X", href: "https://x.com/dagimg_dot" },
      { label: "Email", href: "mailto:dagim.astatkie@gmail.com" },
    ],
  },
];
