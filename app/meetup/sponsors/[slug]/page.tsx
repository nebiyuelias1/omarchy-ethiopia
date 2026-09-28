import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  PhoneIncoming,
  PhoneOutgoing,
  UserCheck,
  Cpu,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { sponsors } from "@/data/sponsors";

export function generateStaticParams() {
  return sponsors.map((sponsor) => ({ slug: sponsor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sponsor = sponsors.find((s) => s.slug === slug);
  if (!sponsor) return {};

  return {
    title: `${sponsor.name} — ${sponsor.tier}, Meetup 2026`,
    description: sponsor.tagline ?? sponsor.description,
  };
}

const tierBadgeStyles: Record<string, string> = {
  "Lead Sponsor": "border-amber-400/40 bg-amber-400/10 text-amber-300",
  "Official Event Partner": "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  "Community Sponsor": "border-sky-500/40 bg-sky-500/10 text-sky-400",
  Supporter: "border-white/20 bg-white/5 text-white/80",
};

const capabilityIcons = [
  PhoneIncoming,
  PhoneOutgoing,
  UserCheck,
  Cpu,
];

export default async function SponsorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sponsor = sponsors.find((s) => s.slug === slug);
  if (!sponsor) notFound();

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#08090c]">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pt-10 pb-16">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/meetup#sponsors"
            className="inline-flex items-center gap-2 font-mono text-xs text-cream/70 transition hover:text-tibeb-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sponsors</span>
          </Link>

          <span className="font-mono text-xs text-cream/40">
            Meetup 2026 Partner Showcase
          </span>
        </div>

        {/* Content Layout */}
        <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr]">
          {/* Left Sticky Sidebar */}
          <aside className="self-start rounded-2xl border border-white/10 bg-[#0e0f14] p-6 md:sticky md:top-10">
            <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border border-tibeb-gold/25 bg-black/40 p-4">
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="mt-5">
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                {sponsor.name}
              </h1>
              <div className="mt-2.5">
                <span
                  className={`inline-block rounded border px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                    tierBadgeStyles[sponsor.tier] ??
                    "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {sponsor.tier}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-cream/70">
              {sponsor.description}
            </p>

            {sponsor.href && (
              <div className="mt-6 border-t border-white/[0.08] pt-5 font-mono text-xs">
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between text-tibeb-gold transition hover:underline"
                >
                  <span>{sponsor.linkLabel ?? `Visit ${sponsor.name}`}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
          </aside>

          {/* Right Main Content */}
          <div className="space-y-10">
            {/* Header & Tagline */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-tibeb-gold/30 bg-tibeb-gold/10 px-3 py-1 font-mono text-[11px] font-semibold text-tibeb-gold">
                <Sparkles className="h-3 w-3" />
                <span>MEETUP 2026 • {sponsor.tier.toUpperCase()}</span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {sponsor.tagline ?? sponsor.name}
              </h2>

              {sponsor.overview && (
                <p className="mt-4 text-base leading-relaxed text-cream/80 sm:text-lg">
                  {sponsor.overview}
                </p>
              )}
            </div>

            {/* Core Capabilities */}
            {sponsor.capabilities && sponsor.capabilities.length > 0 && (
              <div className="border-t border-white/[0.08] pt-8">
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Key Capabilities
                </h3>
                <p className="mt-2 font-mono text-xs text-cream/50">
                  Core solutions built for enterprise voice, scale, and local language intelligence
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {sponsor.capabilities.map((cap, idx) => {
                    const Icon = capabilityIcons[idx % capabilityIcons.length];
                    return (
                      <div
                        key={cap.title}
                        className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0e0f14] p-5 transition hover:border-tibeb-gold/40 hover:bg-[#12131a]"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-tibeb-gold/30 bg-tibeb-gold/10 text-tibeb-gold">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="font-mono text-xs font-semibold text-cream/40">
                              0{idx + 1}
                            </span>
                          </div>

                          <h4 className="mt-4 font-bold text-white">
                            {cap.title}
                          </h4>
                          <p className="mt-2 text-xs leading-relaxed text-cream/70">
                            {cap.description}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Production-ready</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="border-t border-white/[0.08] pt-6">
              <Link
                href="/meetup#sponsors"
                className="inline-flex items-center gap-2 font-mono text-xs text-cream/70 transition hover:text-tibeb-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Meetup Sponsors</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
