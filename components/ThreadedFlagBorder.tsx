export function ThreadedFlagBorder({
  className = "",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
      {/* Soft ambient glow reflecting each segment's color */}
      {glow && (
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 opacity-35 blur-sm"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.7) 0%, rgba(16,185,129,0.7) 33.33%, rgba(251,191,36,0.85) 33.33%, rgba(251,191,36,0.85) 66.66%, rgba(239,68,68,0.7) 66.66%, rgba(239,68,68,0.7) 100%)",
          }}
        />
      )}

      {/* One single line broken into three equal parts: Green, Yellow, Red */}
      <div className="relative flex w-full h-[5px] sm:h-[6px]">
        <div className="w-1/3 bg-[#10b981]" />
        <div className="w-1/3 bg-[#fbbf24]" />
        <div className="w-1/3 bg-[#ef4444]" />
      </div>
    </div>
  );
}

export { ThreadedFlagBorder as EthiopianFlagBorder };
