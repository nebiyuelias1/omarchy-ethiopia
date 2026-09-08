import { useId } from "react";

export function ThreadedFlagBorder({
  className = "",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  const id = useId();
  const greenId = `${id}-green`;
  const yellowId = `${id}-yellow`;
  const redId = `${id}-red`;
  const weaveId = `${id}-weave`;

  return (
    <div className={`relative w-full overflow-hidden py-1.5 ${className}`} aria-hidden="true">
      {/* Soft silk sheen reflection */}
      {glow && (
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 opacity-25 blur-md"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.8) 20%, rgba(251,191,36,0.9) 50%, rgba(239,68,68,0.8) 80%, transparent 100%)",
          }}
        />
      )}

      {/* Triple-threaded Ethiopian Flag embroidery weave */}
      <svg
        viewBox="0 0 1200 18"
        className="w-full h-3.5 block"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={greenId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="10%" stopColor="#10b981" stopOpacity="0.95" />
            <stop offset="90%" stopColor="#10b981" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id={yellowId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
            <stop offset="10%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="90%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id={redId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
            <stop offset="10%" stopColor="#ef4444" stopOpacity="0.95" />
            <stop offset="90%" stopColor="#ef4444" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
          </linearGradient>

          {/* Repeating diagonal stitch texture pattern */}
          <pattern id={weaveId} width="16" height="18" patternUnits="userSpaceOnUse">
            {/* Green top diagonal stitch */}
            <line x1="0" y1="2" x2="6" y2="4" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />
            <line x1="8" y1="2" x2="14" y2="4" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />

            {/* Gold center cross-weave stitch */}
            <line x1="2" y1="7" x2="8" y2="11" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.95" />
            <line x1="10" y1="7" x2="16" y2="11" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.95" />

            {/* Red bottom diagonal stitch */}
            <line x1="0" y1="14" x2="6" y2="16" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />
            <line x1="8" y1="14" x2="14" y2="16" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />
          </pattern>
        </defs>

        {/* 1. Continuous Green Thread (Top) */}
        <line
          x1="0"
          y1="3"
          x2="1200"
          y2="3"
          stroke={`url(#${greenId})`}
          strokeWidth="1.8"
          strokeDasharray="10 3"
          strokeLinecap="round"
        />

        {/* 2. Continuous Gold Thread (Center) */}
        <line
          x1="0"
          y1="9"
          x2="1200"
          y2="9"
          stroke={`url(#${yellowId})`}
          strokeWidth="2.2"
          strokeDasharray="10 3"
          strokeDashoffset="5"
          strokeLinecap="round"
        />

        {/* 3. Continuous Red Thread (Bottom) */}
        <line
          x1="0"
          y1="15"
          x2="1200"
          y2="15"
          stroke={`url(#${redId})`}
          strokeWidth="1.8"
          strokeDasharray="10 3"
          strokeDashoffset="10"
          strokeLinecap="round"
        />

        {/* Micro-weave thread texture overlay */}
        <rect x="0" y="0" width="1200" height="18" fill={`url(#${weaveId})`} opacity="0.65" />
      </svg>
    </div>
  );
}
