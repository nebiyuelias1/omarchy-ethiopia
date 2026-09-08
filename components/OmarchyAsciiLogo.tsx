export function OmarchyAsciiLogo({ className = "" }: { className?: string }) {
  const omarchyAscii = `                 ▄▄▄
 ▄█████▄    ▄███████████▄    ▄███████   ▄███████   ▄███████   ▄█   █▄    ▄█   █▄
███   ███  ███   ███   ███  ███   ███  ███   ███  ███   ███  ███   ███  ███   ███
███   ███  ███   ███   ███  ███   ███  ███   ███  ███   █▀   ███   ███  ███   ███
███   ███  ███   ███   ███ ▄███▄▄▄███ ▄███▄▄▄██▀  ███       ▄███▄▄▄███▄ ███▄▄▄███
███   ███  ███   ███   ███ ▀███▀▀▀███ ▀███▀▀▀▀    ███      ▀▀███▀▀▀███  ▀▀▀▀▀▀███
███   ███  ███   ███   ███  ███   ███ ██████████  ███   █▄   ███   ███  ▄██   ███
███   ███  ███   ███   ███  ███   ███  ███   ███  ███   ███  ███   ███  ███   ███
 ▀█████▀    ▀█   ███   █▀   ███   █▀   ███   ███  ███████▀   ███   █▀    ▀█████▀
                                       ███   █▀`;

  const ethiopiaAscii = `███████ ████████ ██   ██ ██  ██████  ██████  ██  █████  
██         ██    ██   ██ ██ ██    ██ ██   ██ ██ ██   ██ 
█████      ██    ███████ ██ ██    ██ ██████  ██ ███████ 
██         ██    ██   ██ ██ ██    ██ ██      ██ ██   ██ 
███████    ██    ██   ██ ██  ██████  ██      ██ ██   ██`;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`} aria-label="Omarchy Ethiopia">
      <div className="overflow-x-auto max-w-full px-2 text-center">
        <pre className="inline-block text-left font-mono text-[6.5px] xs:text-[8px] sm:text-[10px] md:text-[11.5px] lg:text-[12.5px] leading-[1.1] text-tibeb-gold font-bold tracking-tight drop-shadow-[0_0_15px_rgba(251,191,36,0.25)]">
          {omarchyAscii}
        </pre>
        <div className="mt-3">
          <pre className="inline-block text-left font-mono text-[5.5px] xs:text-[7px] sm:text-[9px] md:text-[10px] lg:text-[11px] leading-[1.15] text-white font-bold tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
            {ethiopiaAscii}
          </pre>
        </div>
      </div>
    </div>
  );
}
