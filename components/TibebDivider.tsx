export function TibebDivider({ label = "❖" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-3 text-tibeb-gold/80" aria-hidden="true">
      <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(229,169,60,0.55),transparent)]" />
      <span className="font-mono text-xs tracking-[0.35em]">+---[ {label} ]---+</span>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(229,169,60,0.55),transparent)]" />
    </div>
  );
}
