export function ThreadedFlagBorder({
  className = "",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
      {/* Soft ambient glow reflecting Ethiopian Flag colors */}
      {glow && (
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 opacity-35 blur-sm"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.7) 0%, rgba(251,191,36,0.85) 50%, rgba(239,68,68,0.7) 100%)",
          }}
        />
      )}

      {/* Tricolor Ethiopian Flag Line (Green / Yellow / Red) */}
      <div className="relative flex flex-col w-full">
        <div className="h-[2px] w-full bg-[#10b981]" />
        <div className="h-[2px] w-full bg-[#fbbf24]" />
        <div className="h-[2px] w-full bg-[#ef4444]" />
      </div>
    </div>
  );
}

export { ThreadedFlagBorder as EthiopianFlagBorder };
