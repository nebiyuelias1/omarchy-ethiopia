import { useId } from "react";

export function ThreadedFlagBorder({
  className = "",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, "");

  const shadowId = `braid-shadow-${id}`;
  const patternId = `ethiopia-braid-${id}`;
  const greenDownId = `g-green-down-${id}`;
  const greenUpId = `g-green-up-${id}`;
  const yellowDownId = `g-yellow-down-${id}`;
  const yellowUpId = `g-yellow-up-${id}`;
  const redDownId = `g-red-down-${id}`;
  const redUpId = `g-red-up-${id}`;

  return (
    <div className={`relative w-full overflow-hidden py-1 ${className}`} aria-hidden="true">
      {/* Soft Ethiopian Flag silk sheen reflection */}
      {glow && (
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 opacity-35 blur-md"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.7) 15%, rgba(251,191,36,0.85) 50%, rgba(239,68,68,0.7) 85%, transparent 100%)",
          }}
        />
      )}

      {/* Braided Ethiopian Flag Hair (Shuruba / Plait) Weave */}
      <svg
        viewBox="0 0 1200 30"
        className="w-full h-5 sm:h-6 md:h-7 block drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-0.6" dy="1.0" stdDeviation="0.9" floodColor="#000000" floodOpacity="0.65" />
          </filter>

          {/* Gradients along lock hair curve */}
          <linearGradient id={greenDownId} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#6ee7b7" />
            <stop offset="75%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <linearGradient id={greenUpId} x1="10%" y1="100%" x2="90%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#6ee7b7" />
            <stop offset="75%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          <linearGradient id={yellowDownId} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id={yellowUpId} x1="10%" y1="100%" x2="90%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id={redDownId} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#fca5a5" />
            <stop offset="75%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>
          <linearGradient id={redUpId} x1="10%" y1="100%" x2="90%" y2="0%">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#fca5a5" />
            <stop offset="75%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>

          {/* Seamless Horizontal Braided Hair Pattern */}
          <pattern id={patternId} width="48" height="30" patternUnits="userSpaceOnUse">
          <g filter={`url(#${shadowId})`}>
            <path d="M -55 8.5 C -54 2, -42 2, -40 6.5 C -33 11.5, -27 17.5, -24 24 C -24.5 27.5, -31 28, -34.5 25 C -39 19, -47 13.5, -55 8.5 Z" fill={`url(#${greenDownId})`} />
            <path d="M -51 5.5 C -44 11, -38 17, -33 23" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -47 5 C -41 11, -35 17, -30 23" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M -44 5.5 C -39 11, -33 17, -28 22" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -47.5 4.5 C -41 10.5, -35 16, -31.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M -47 21.5 C -46 28, -34 28, -32 23.5 C -25 18.5, -19 12.5, -16 6 C -16.5 2.5, -23 2, -26.5 5 C -31 11, -39 16.5, -47 21.5 Z" fill={`url(#${redUpId})`} />
            <path d="M -43 24.5 C -36 19, -30 13, -25 7" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -39 25 C -33 19, -27 13, -22 7" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M -36 24.5 C -31 19, -25 13, -20 8" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -39.5 25.5 C -33 19.5, -27 14, -23.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M -39 8.5 C -38 2, -26 2, -24 6.5 C -17 11.5, -11 17.5, -8 24 C -8.5 27.5, -15 28, -18.5 25 C -23 19, -31 13.5, -39 8.5 Z" fill={`url(#${yellowDownId})`} />
            <path d="M -35 5.5 C -28 11, -22 17, -17 23" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -31 5 C -25 11, -19 17, -14 23" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M -28 5.5 C -23 11, -17 17, -12 22" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -31.5 4.5 C -25 10.5, -19 16, -15.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M -31 21.5 C -30 28, -18 28, -16 23.5 C -9 18.5, -3 12.5, 0 6 C -0.5 2.5, -7 2, -10.5 5 C -15 11, -23 16.5, -31 21.5 Z" fill={`url(#${greenUpId})`} />
            <path d="M -27 24.5 C -20 19, -14 13, -9 7" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -23 25 C -17 19, -11 13, -6 7" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M -20 24.5 C -15 19, -9 13, -4 8" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -23.5 25.5 C -17 19.5, -11 14, -7.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M -23 8.5 C -22 2, -10 2, -8 6.5 C -1 11.5, 5 17.5, 8 24 C 7.5 27.5, 1 28, -2.5 25 C -7 19, -15 13.5, -23 8.5 Z" fill={`url(#${redDownId})`} />
            <path d="M -19 5.5 C -12 11, -6 17, -1 23" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -15 5 C -9 11, -3 17, 2 23" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M -12 5.5 C -7 11, -1 17, 4 22" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -15.5 4.5 C -9 10.5, -3 16, 0.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M -15 21.5 C -14 28, -2 28, 0 23.5 C 7 18.5, 13 12.5, 16 6 C 15.5 2.5, 9 2, 5.5 5 C 1 11, -7 16.5, -15 21.5 Z" fill={`url(#${yellowUpId})`} />
            <path d="M -11 24.5 C -4 19, 2 13, 7 7" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -7 25 C -1 19, 5 13, 10 7" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M -4 24.5 C 1 19, 7 13, 12 8" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M -7.5 25.5 C -1 19.5, 5 14, 8.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M -7 8.5 C -6 2, 6 2, 8 6.5 C 15 11.5, 21 17.5, 24 24 C 23.5 27.5, 17 28, 13.5 25 C 9 19, 1 13.5, -7 8.5 Z" fill={`url(#${greenDownId})`} />
            <path d="M -3 5.5 C 4 11, 10 17, 15 23" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 1 5 C 7 11, 13 17, 18 23" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 4 5.5 C 9 11, 15 17, 20 22" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 0.5 4.5 C 7 10.5, 13 16, 16.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 1 21.5 C 2 28, 14 28, 16 23.5 C 23 18.5, 29 12.5, 32 6 C 31.5 2.5, 25 2, 21.5 5 C 17 11, 9 16.5, 1 21.5 Z" fill={`url(#${redUpId})`} />
            <path d="M 5 24.5 C 12 19, 18 13, 23 7" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 9 25 C 15 19, 21 13, 26 7" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 12 24.5 C 17 19, 23 13, 28 8" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 8.5 25.5 C 15 19.5, 21 14, 24.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 9 8.5 C 10 2, 22 2, 24 6.5 C 31 11.5, 37 17.5, 40 24 C 39.5 27.5, 33 28, 29.5 25 C 25 19, 17 13.5, 9 8.5 Z" fill={`url(#${yellowDownId})`} />
            <path d="M 13 5.5 C 20 11, 26 17, 31 23" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 17 5 C 23 11, 29 17, 34 23" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 20 5.5 C 25 11, 31 17, 36 22" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 16.5 4.5 C 23 10.5, 29 16, 32.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 17 21.5 C 18 28, 30 28, 32 23.5 C 39 18.5, 45 12.5, 48 6 C 47.5 2.5, 41 2, 37.5 5 C 33 11, 25 16.5, 17 21.5 Z" fill={`url(#${greenUpId})`} />
            <path d="M 21 24.5 C 28 19, 34 13, 39 7" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 25 25 C 31 19, 37 13, 42 7" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 28 24.5 C 33 19, 39 13, 44 8" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 24.5 25.5 C 31 19.5, 37 14, 40.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 25 8.5 C 26 2, 38 2, 40 6.5 C 47 11.5, 53 17.5, 56 24 C 55.5 27.5, 49 28, 45.5 25 C 41 19, 33 13.5, 25 8.5 Z" fill={`url(#${redDownId})`} />
            <path d="M 29 5.5 C 36 11, 42 17, 47 23" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 33 5 C 39 11, 45 17, 50 23" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 36 5.5 C 41 11, 47 17, 52 22" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 32.5 4.5 C 39 10.5, 45 16, 48.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 33 21.5 C 34 28, 46 28, 48 23.5 C 55 18.5, 61 12.5, 64 6 C 63.5 2.5, 57 2, 53.5 5 C 49 11, 41 16.5, 33 21.5 Z" fill={`url(#${yellowUpId})`} />
            <path d="M 37 24.5 C 44 19, 50 13, 55 7" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 41 25 C 47 19, 53 13, 58 7" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 44 24.5 C 49 19, 55 13, 60 8" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 40.5 25.5 C 47 19.5, 53 14, 56.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 41 8.5 C 42 2, 54 2, 56 6.5 C 63 11.5, 69 17.5, 72 24 C 71.5 27.5, 65 28, 61.5 25 C 57 19, 49 13.5, 41 8.5 Z" fill={`url(#${greenDownId})`} />
            <path d="M 45 5.5 C 52 11, 58 17, 63 23" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 49 5 C 55 11, 61 17, 66 23" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 52 5.5 C 57 11, 63 17, 68 22" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 48.5 4.5 C 55 10.5, 61 16, 64.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 49 21.5 C 50 28, 62 28, 64 23.5 C 71 18.5, 77 12.5, 80 6 C 79.5 2.5, 73 2, 69.5 5 C 65 11, 57 16.5, 49 21.5 Z" fill={`url(#${redUpId})`} />
            <path d="M 53 24.5 C 60 19, 66 13, 71 7" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 57 25 C 63 19, 69 13, 74 7" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 60 24.5 C 65 19, 71 13, 76 8" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 56.5 25.5 C 63 19.5, 69 14, 72.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 57 8.5 C 58 2, 70 2, 72 6.5 C 79 11.5, 85 17.5, 88 24 C 87.5 27.5, 81 28, 77.5 25 C 73 19, 65 13.5, 57 8.5 Z" fill={`url(#${yellowDownId})`} />
            <path d="M 61 5.5 C 68 11, 74 17, 79 23" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 65 5 C 71 11, 77 17, 82 23" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 68 5.5 C 73 11, 79 17, 84 22" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 64.5 4.5 C 71 10.5, 77 16, 80.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 65 21.5 C 66 28, 78 28, 80 23.5 C 87 18.5, 93 12.5, 96 6 C 95.5 2.5, 89 2, 85.5 5 C 81 11, 73 16.5, 65 21.5 Z" fill={`url(#${greenUpId})`} />
            <path d="M 69 24.5 C 76 19, 82 13, 87 7" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 73 25 C 79 19, 85 13, 90 7" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 76 24.5 C 81 19, 87 13, 92 8" stroke="#6ee7b7" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 72.5 25.5 C 79 19.5, 85 14, 88.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 73 8.5 C 74 2, 86 2, 88 6.5 C 95 11.5, 101 17.5, 104 24 C 103.5 27.5, 97 28, 93.5 25 C 89 19, 81 13.5, 73 8.5 Z" fill={`url(#${redDownId})`} />
            <path d="M 77 5.5 C 84 11, 90 17, 95 23" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 81 5 C 87 11, 93 17, 98 23" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 84 5.5 C 89 11, 95 17, 100 22" stroke="#fca5a5" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 80.5 4.5 C 87 10.5, 93 16, 96.5 21" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          <g filter={`url(#${shadowId})`}>
            <path d="M 81 21.5 C 82 28, 94 28, 96 23.5 C 103 18.5, 109 12.5, 112 6 C 111.5 2.5, 105 2, 101.5 5 C 97 11, 89 16.5, 81 21.5 Z" fill={`url(#${yellowUpId})`} />
            <path d="M 85 24.5 C 92 19, 98 13, 103 7" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 89 25 C 95 19, 101 13, 106 7" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <path d="M 92 24.5 C 97 19, 103 13, 108 8" stroke="#fef08a" strokeWidth="0.75" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
            <path d="M 88.5 25.5 C 95 19.5, 101 14, 104.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
          </pattern>
        </defs>

        {/* Tiled Braided Hair Border */}
        <rect width="100%" height="30" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

export { ThreadedFlagBorder as BraidedFlagBorder };
