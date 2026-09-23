"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Maximize2,
  Minimize2,
  LayoutList,
  SlidersHorizontal,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { speakers } from "@/data/speakers";
import { sponsors } from "@/data/sponsors";
import { meetup2026, registrationLink } from "@/data/event";

const TOTAL_SLIDES = 8;

export function DeckClient() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [viewMode, setViewMode] = useState<"slides" | "scroll">("slides");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToSlide = useCallback((n: number) => {
    setCurrentSlide(Math.min(Math.max(1, n), TOTAL_SLIDES));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "slides") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, viewMode]);

  const officialPartner = sponsors.find((s) => s.tier === "Official Event Partner") || sponsors[0];

  return (
    <div className="min-h-screen bg-[#06070a] text-cream flex flex-col justify-between selection:bg-tibeb-gold/20 selection:text-white print:bg-[#08090c] print:p-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: 16in 9in;
              margin: 0;
            }
            @media print {
              *, *::before, *::after {
                box-sizing: border-box !important;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                background-color: #08090c !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .print-slide {
                width: 16in !important;
                height: 9in !important;
                max-height: 9in !important;
                page-break-after: always !important;
                break-after: page !important;
                break-inside: avoid !important;
                page-break-inside: avoid !important;
                overflow: hidden !important;
                box-sizing: border-box !important;
              }
              .print-slide:last-child {
                page-break-after: auto !important;
                break-after: auto !important;
              }
            }
          `,
        }}
      />
      {/* Top Header / Control Bar (Hidden on Print) */}
      <header className="print:hidden border-b border-white/10 bg-[#0a0b10]/80 backdrop-blur sticky top-0 z-50 px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/meetup"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-cream/70 hover:text-tibeb-gold transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Meetup</span>
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-tibeb-gold font-semibold uppercase tracking-wider">
              Sponsorship Deck
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
              <button
                onClick={() => setViewMode("slides")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                  viewMode === "slides"
                    ? "bg-tibeb-gold text-black font-bold"
                    : "text-cream/70 hover:text-white"
                }`}
                title="Slide Presentation Mode"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Slides</span>
              </button>
              <button
                onClick={() => setViewMode("scroll")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                  viewMode === "scroll"
                    ? "bg-tibeb-gold text-black font-bold"
                    : "text-cream/70 hover:text-white"
                }`}
                title="Scrollable Document Mode"
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">All Slides</span>
              </button>
            </div>

            {/* Download PDF */}
            <a
              href="/omarchy-ethiopia-sponsorship-deck.pdf"
              download="omarchy-ethiopia-sponsorship-deck.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 font-semibold text-cream/80 hover:border-tibeb-gold hover:text-tibeb-gold transition"
              title="Download 16:9 PDF Deck"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/[0.04] text-cream/70 hover:text-white transition"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Presentation Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 print:hidden">
        {viewMode === "slides" ? (
          /* SLIDES MODE */
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* The 16:9 Slide Screen */}
            <div className="w-full aspect-[16/9] rounded-2xl border border-white/10 bg-[#08090c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(251,191,36,0.1)] relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 md:p-14 select-none">
              {/* Flag Accent Thread */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-ethiopia-green" />
                <div className="flex-1 bg-ethiopia-yellow" />
                <div className="flex-1 bg-ethiopia-red" />
              </div>

              {/* Dynamic Slide Content */}
              {renderSlideContent(currentSlide, officialPartner)}
            </div>

            {/* Bottom Slide Navigation Bar */}
            <div className="w-full mt-6 flex items-center justify-between font-mono text-xs text-cream/70">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">
                  Slide {currentSlide} of {TOTAL_SLIDES}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-cream/50 hidden sm:inline">
                  Use ← / → arrow keys to navigate
                </span>
              </div>

              {/* Direct Slide Selectors */}
              <div className="hidden md:flex items-center gap-1.5">
                {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => {
                  const s = idx + 1;
                  return (
                    <button
                      key={s}
                      onClick={() => goToSlide(s)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlide === s
                          ? "w-8 bg-tibeb-gold"
                          : "w-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                      title={`Go to slide ${s}`}
                    />
                  );
                })}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-semibold text-cream transition hover:border-tibeb-gold hover:text-tibeb-gold disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === TOTAL_SLIDES}
                  className="inline-flex items-center gap-1 rounded-lg bg-tibeb-gold px-3.5 py-1.5 font-bold text-black transition hover:bg-tibeb-gold-bright disabled:opacity-30 disabled:pointer-events-none"
                >
                  <span>Next</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* SCROLLABLE DOCUMENT MODE (Also used for Print) */
          <div className="w-full max-w-5xl space-y-10 print:space-y-0 print:max-w-none">
            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => {
              const slideNum = idx + 1;
              return (
                <div
                  key={slideNum}
                  className="w-full aspect-[16/9] rounded-2xl border border-white/10 bg-[#08090c] shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 md:p-14 print:rounded-none print:border-none print:shadow-none print:h-screen print:w-screen print:break-after-page"
                >
                  {/* Flag Accent Thread */}
                  <div className="absolute top-0 left-0 right-0 h-1 flex">
                    <div className="flex-1 bg-ethiopia-green" />
                    <div className="flex-1 bg-ethiopia-yellow" />
                    <div className="flex-1 bg-ethiopia-red" />
                  </div>

                  {renderSlideContent(slideNum, officialPartner)}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Hidden Print Container: renders all slides sequentially for clean printing */}
      <div className="hidden print:block">
        {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => {
          const slideNum = idx + 1;
          return (
            <div
              key={`print-${slideNum}`}
              className="print-slide bg-[#08090c] text-cream relative flex flex-col justify-between p-16"
            >
              <div className="absolute top-0 left-0 right-0 h-2 flex">
                <div className="flex-1 bg-ethiopia-green" />
                <div className="flex-1 bg-ethiopia-yellow" />
                <div className="flex-1 bg-ethiopia-red" />
              </div>
              {renderSlideContent(slideNum, officialPartner)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderSlideContent(slide: number, officialPartner: any) {
  switch (slide) {
    case 1:
      return (
        <>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-tibeb-gold/30 bg-tibeb-gold/10 px-3 py-1 font-mono text-[11px] font-semibold text-tibeb-gold uppercase tracking-wider">
              Meetup 2026 • Sponsorship Prospectus
            </div>
          </div>

          <div className="my-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              OMARCHY<br />
              <span className="text-tibeb-gold">ETHIOPIA</span>
            </h1>
            <p className="mt-4 max-w-2xl font-mono text-sm sm:text-base text-cream/70 leading-relaxed">
              The Malleable OS for the Age of Agents. Gathering Addis Ababa&apos;s sharpest systems, Linux, and AI engineers.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-end justify-between gap-4 font-mono text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Calendar className="h-3.5 w-3.5 text-tibeb-gold" />
                <span>Saturday, October 3, 2026</span>
              </div>
              <div className="flex items-center gap-1.5 text-cream/50 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-tibeb-gold font-semibold">omarchy.org.et/meetup</span>
              <p className="text-cream/50 text-[11px] mt-0.5">
                Official Partner: {officialPartner?.name || "Tefer"}
              </p>
            </div>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <div>
            <span className="font-mono text-xs text-tibeb-gold uppercase tracking-wider">01 • The Vision</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Where Ethiopian Engineering Meets Modern Linux & AI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-auto">
            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-tibeb-gold uppercase tracking-wider font-semibold">
                  The Shift
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Autonomous Agents</h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                  Tools like Claude Code, Antigravity, and local LLMs require keyboard-first, distraction-free operating environments engineered for speed.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-tibeb-gold/40 bg-gradient-to-b from-tibeb-gold/10 to-[#0e0f14] p-5 flex flex-col justify-between shadow-lg">
              <div>
                <span className="font-mono text-[10px] text-tibeb-gold uppercase tracking-wider font-semibold">
                  The Platform
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Omarchy Linux</h3>
                <p className="text-xs text-cream/75 mt-2 leading-relaxed">
                  Created by DHH (creator of Ruby on Rails & 37signals), Omarchy is a malleable, beautiful Linux distro tailored specifically for modern software engineers.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-ethiopia-green uppercase tracking-wider font-semibold">
                  The Community
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Ethiopian Chapter</h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                  Uniting local systems programmers, open-source contributors, and backend engineers to share production craft and connect with upstream development.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-xs text-cream/50 flex justify-between">
            <span>Goal: Elevate the local systems and developer tooling culture.</span>
            <span className="text-tibeb-gold">omarchy.org.et</span>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <div>
            <span className="font-mono text-xs text-tibeb-gold uppercase tracking-wider">02 • Community Profile</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Curated Access to the Top 5% Engineering Talent
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-auto">
            <div className="rounded-xl border border-tibeb-gold/40 bg-gradient-to-b from-tibeb-gold/15 to-[#0e0f14] p-6 text-center sm:text-left">
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-tibeb-gold">
                100–150
              </div>
              <h3 className="text-base font-bold text-white mt-2">In-Person Attendees</h3>
              <p className="text-xs text-cream/70 mt-1">
                Curated and registered via Luma. High-intent engineers and technical founders.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-6 text-center sm:text-left">
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white">
                100%
              </div>
              <h3 className="text-base font-bold text-white mt-2">Technical Focus</h3>
              <p className="text-xs text-cream/70 mt-1">
                Zero generalist fluff. Dedicated to Linux, systems programming, and AI tools.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-6 text-center sm:text-left">
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-ethiopia-green">
                300+
              </div>
              <h3 className="text-base font-bold text-white mt-2">Digital Community Reach</h3>
              <p className="text-xs text-cream/70 mt-1">
                Active pre- and post-event discussions across Telegram, GitHub, and X.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0e0f14] px-6 py-3.5 flex flex-wrap items-center justify-around gap-4 font-mono text-xs">
            <span className="text-cream/80">
              <strong className="text-white">55%</strong> Senior Software Engineers
            </span>
            <span className="text-cream/80">
              <strong className="text-tibeb-gold">25%</strong> Systems & Backend
            </span>
            <span className="text-cream/80">
              <strong className="text-white">15%</strong> AI Agents & DevOps
            </span>
            <span className="text-cream/80">
              <strong className="text-ethiopia-green">5%</strong> Tech Leads & Founders
            </span>
          </div>
        </>
      );

    case 4:
      return (
        <>
          <div>
            <span className="font-mono text-xs text-tibeb-gold uppercase tracking-wider">03 • Program</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Production-Grade Engineering Talks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-auto">
            {speakers.map((s) => (
              <div
                key={s.slug}
                className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-tibeb-gold/40 bg-zinc-900 flex-shrink-0">
                      {s.photo ? (
                        <Image src={s.photo} alt={s.name} fill className="object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-mono text-xs font-bold text-tibeb-gold">
                          {s.avatar}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{s.name}</h4>
                      <p className="font-mono text-[11px] text-cream/50 line-clamp-1">{s.role}</p>
                    </div>
                  </div>

                  <p className="mt-3 font-semibold text-xs leading-snug text-tibeb-gold line-clamp-2">
                    &ldquo;{s.talk}&rdquo;
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-cream/65 line-clamp-3">
                    {s.abstract}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/[0.06] font-mono text-[10px] text-cream/40">
                  Confirmed Talk • 30 mins
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-xs text-cream/50">
            Speakers representing top local tech companies: EVpin, klik.et, and open-source tooling creators.
          </div>
        </>
      );

    case 5:
      return (
        <>
          <div>
            <span className="font-mono text-xs text-tibeb-gold uppercase tracking-wider">04 • Value Proposition</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Why Sponsor Omarchy Ethiopia?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-auto">
            <div className="rounded-xl border border-tibeb-gold/40 bg-gradient-to-b from-tibeb-gold/10 to-[#0e0f14] p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-tibeb-gold uppercase font-bold tracking-wider">
                  01 • Talent Pipeline
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">Direct Engineering Hiring</h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                  Senior Linux, systems, and backend engineers are the hardest talent to find in Addis Ababa. Sponsoring gives you direct access to 100+ builders without recruiter fees.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-ethiopia-green uppercase font-bold tracking-wider">
                  02 • Brand Prestige
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">Engineering-First Image</h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                  Position your company as a pioneer that invests in open source, developer ergonomics, and local technical infrastructure.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-white uppercase font-bold tracking-wider">
                  03 • Dev Tool Adoption
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">APIs & Cloud Adoption</h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                  Showcase your developer APIs, cloud platforms, fintech rails, or tools directly to the power-users who implement architecture in production.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-xs text-cream/50">
            Immediate ROI: High-density engagement with serious engineering builders.
          </div>
        </>
      );

    case 6:
      return (
        <>
          <div>
            <span className="font-mono text-xs text-tibeb-gold uppercase tracking-wider">05 • Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Grassroots Sponsorship Tiers
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto">
            {/* 20k */}
            <div className="rounded-xl border border-tibeb-gold/50 bg-gradient-to-b from-tibeb-gold/15 to-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <div className="inline-block rounded bg-tibeb-gold/20 px-2 py-0.5 font-mono text-[10px] font-bold text-tibeb-gold">
                  LEAD
                </div>
                <div className="mt-2 font-mono text-2xl font-extrabold text-tibeb-gold">
                  20,000 <span className="text-xs font-normal text-cream/70">ETB</span>
                </div>
                <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-cream/80">
                  <li className="flex items-start gap-1.5">• Top logo on site & Luma</li>
                  <li className="flex items-start gap-1.5">• Roll-up banner in hall</li>
                  <li className="flex items-start gap-1.5">• 2-min stage welcome</li>
                  <li className="flex items-start gap-1.5">• Company swag on tables</li>
                  <li className="flex items-start gap-1.5">• 4 VIP Passes</li>
                </ul>
              </div>
            </div>

            {/* 15k */}
            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <div className="inline-block rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                  COMMUNITY
                </div>
                <div className="mt-2 font-mono text-2xl font-extrabold text-white">
                  15,000 <span className="text-xs font-normal text-cream/70">ETB</span>
                </div>
                <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-cream/80">
                  <li className="flex items-start gap-1.5">• Logo on site & Luma</li>
                  <li className="flex items-start gap-1.5">• Stage slides logo</li>
                  <li className="flex items-start gap-1.5">• MC shoutout & hiring plug</li>
                  <li className="flex items-start gap-1.5">• Swag at reception desk</li>
                  <li className="flex items-start gap-1.5">• 2 VIP Passes</li>
                </ul>
              </div>
            </div>

            {/* 10k */}
            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <div className="inline-block rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cream/70">
                  SUPPORTER
                </div>
                <div className="mt-2 font-mono text-2xl font-extrabold text-white">
                  10,000 <span className="text-xs font-normal text-cream/70">ETB</span>
                </div>
                <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-cream/80">
                  <li className="flex items-start gap-1.5">• Logo on website</li>
                  <li className="flex items-start gap-1.5">• Telegram group thank-you</li>
                  <li className="flex items-start gap-1.5">• MC opening mention</li>
                  <li className="flex items-start gap-1.5">• 2 VIP Passes</li>
                </ul>
              </div>
            </div>

            {/* 5k */}
            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <div className="inline-block rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cream/70">
                  CHAMPION
                </div>
                <div className="mt-2 font-mono text-2xl font-extrabold text-ethiopia-green">
                  5,000 <span className="text-xs font-normal text-cream/70">ETB</span>
                </div>
                <ul className="mt-3 space-y-1.5 font-mono text-[11px] text-cream/80">
                  <li className="flex items-start gap-1.5">• Name/handle on site</li>
                  <li className="flex items-start gap-1.5">• Personal Telegram shoutout</li>
                  <li className="flex items-start gap-1.5">• Official sticker pack</li>
                  <li className="flex items-start gap-1.5">• 1 VIP Pass</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-xs text-cream/50">
            Frictionless sign-off: Designed for direct petty cash or individual leader contribution.
          </div>
        </>
      );

    case 7:
      return (
        <>
          <div>
            <span className="font-mono text-xs text-tibeb-gold uppercase tracking-wider">06 • In-Kind Support</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Operational Partnerships Welcome
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto">
            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-tibeb-gold">VENUE</span>
                <h4 className="text-base font-bold text-white mt-1">Venue & Wi-Fi</h4>
                <p className="text-xs text-cream/70 mt-2">
                  Auditorium for 100–150 seats with reliable high-speed connectivity and power backup.
                </p>
              </div>
              <span className="font-mono text-[10px] text-cream/40 mt-4">= Lead Sponsor Tier</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-tibeb-gold">COFFEE</span>
                <h4 className="text-base font-bold text-white mt-1">Catering & Coffee</h4>
                <p className="text-xs text-cream/70 mt-2">
                  Traditional Ethiopian coffee ceremony, bottled water, and refreshment snack catering.
                </p>
              </div>
              <span className="font-mono text-[10px] text-cream/40 mt-4">= Community Tier</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-tibeb-gold">SWAG</span>
                <h4 className="text-base font-bold text-white mt-1">Swag & Printing</h4>
                <p className="text-xs text-cream/70 mt-2">
                  Printing custom Omarchy Ethiopia T-shirts, attendee stickers, and stage banners.
                </p>
              </div>
              <span className="font-mono text-[10px] text-cream/40 mt-4">= Community Tier</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-tibeb-gold">MEDIA</span>
                <h4 className="text-base font-bold text-white mt-1">Video & Audio</h4>
                <p className="text-xs text-cream/70 mt-2">
                  Multi-camera 4K talk recording, high-fidelity audio capture, and talk archiving.
                </p>
              </div>
              <span className="font-mono text-[10px] text-cream/40 mt-4">= Supporter Tier</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 font-mono text-xs text-cream/50">
            In-kind sponsors receive full equivalent tier branding across all digital and print assets.
          </div>
        </>
      );

    case 8:
      return (
        <>
          <div>
            <span className="font-mono text-xs text-tibeb-gold uppercase tracking-wider">07 • Next Steps</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Partner With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-auto">
            <div className="rounded-xl border border-tibeb-gold/40 bg-gradient-to-b from-tibeb-gold/10 to-[#0e0f14] p-5">
              <span className="font-mono text-[10px] text-tibeb-gold uppercase font-bold tracking-wider">
                Event Partner
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{officialPartner?.name || "Tefer"}</h3>
              <p className="text-xs text-cream/70 mt-2">
                Official Event Partner supporting developer connectivity and community logistics.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0e0f14] p-5">
              <span className="font-mono text-[10px] text-ethiopia-green uppercase font-bold tracking-wider">
                Registration Hub
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Live on Luma</h3>
              <p className="text-xs text-cream/70 mt-2 font-mono">
                luma.com/zh5jv195
              </p>
              <p className="text-[11px] text-cream/50 mt-1">
                Attendees actively reserving seats.
              </p>
            </div>

            <div className="rounded-xl border border-ethiopia-red/40 bg-[#0e0f14] p-5">
              <span className="font-mono text-[10px] text-ethiopia-red uppercase font-bold tracking-wider">
                Sponsor Deadline
              </span>
              <h3 className="text-lg font-bold text-white mt-1">September 28, 2026</h3>
              <p className="text-xs text-cream/70 mt-2">
                To guarantee company logos are included on printed banners and attendee materials.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-white font-semibold">Ready to partner?</span>
              <p className="text-tibeb-gold mt-0.5">contact@omarchy.org.et • Telegram: @omarchy_ethiopia</p>
            </div>
            <div className="text-right">
              <span className="text-cream/50">omarchy.org.et/meetup</span>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
}
