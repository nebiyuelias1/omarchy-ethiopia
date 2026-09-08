export function OmarchyMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 1200"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="m1200 1200h-480v-80h400v-1040h-479.996v160h-400v720h720v-720h-80v-80h159.996v880h-400v160h-640v-1200h1200zm-1120-80h480v-80h-400l.004-400h-80.004zm0-560h80.004v-400h400v-80h-480.004z"
      />
    </svg>
  );
}

export function OmarchyWordmark({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1215 285"
      fill="currentColor"
      className={className}
      aria-label="Omarchy"
      focusable="false"
    >
      <g>
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="m720 120h-15v15h-14.998v14.999l-60.002.001v15.002l90-.002v.002h.002l-.002 89.998h-15v15h-13v15h-17v-89.998h-45v90l-45-.002v-89.998h-14.998v-30h14.998v-15.002h-14.998v-30.001h14.998v-75h15v-14.997h15v-15.002h105.002zm-90-.001h45v-74.997h-45z"
        />
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="m105 30.002h15v14.997h15v180.001h-15v15h-15v15.002h-75v-15.002h-15v-15h-15v-180.001h15v-14.997h15v-15.002h75zm-60 194.998h45v-179.998h-45z"
        />
        <path d="m300 15h60v15h15v14.999h15v180.001h-15v15h-15v15h-15l-.004-209.998h-44.994v-.002h-.002v210.002h-45v-210h-44.998v179.997h-.002v30.003h-15v-15.002h-15v-15h-14.998v-180.001h14.998v-14.999h15v-15h60v-15h45z" />
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="m555 225h-15v15h-15v15h-15v-105.001l-44.998.001v105.002h-45.002v-105.002h-15v-30.001h15v-75h15.002v-14.997h15v-15.002h105zm-89.998-105.001h44.998v-74.997h-44.998z"
        />
        <path d="m885 75h-15v15h-15v15h-15v-59.998h-45v179.998h45v-59.998h15v14.997h15v15.001h15v30h-15v15h-15v15.002l-105-.002v-210.001h14.998v-14.997h15.002v-15.002h105z" />
        <path d="m960 119.999h45v-104.999h15v15h15v14.999h15v75.001h15v15h-15v90h-15v15h-15v15h-15v-105h-45v105.002l-45-.002v-105h-30v-15h15v-15.001h15v-75h15v-14.997h15v-15.002h15z" />
        <path d="m1125 119.999h45v-104.999h15v15h15v15h15v180h-15v15h-15v15.002l-75-.002v-15h-15v-15h-15v-45.001h15v-14.997-.002h30v60h45v-75h-90v-105.001h15v-14.997h15v-15.002h15z" />
      </g>
    </svg>
  );
}

export function OmarchyEthiopiaLogo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center select-none w-full ${className}`}
      aria-label="Omarchy Ethiopia"
    >
      {/* Official Upstream Omarchy Vector Wordmark (logo.svg) */}
      <OmarchyWordmark className="w-full max-w-[280px] xs:max-w-sm sm:max-w-lg md:max-w-xl text-tibeb-gold drop-shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-all duration-300 hover:drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]" />

      {/* Ethiopia Chapter Subtitle */}
      <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4">
        <div className="h-[1.5px] w-6 sm:w-16 bg-gradient-to-r from-transparent to-tibeb-gold/80" />
        <span className="font-mono text-xs sm:text-base md:text-lg font-black tracking-[0.45em] sm:tracking-[0.6em] text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] pl-[0.45em] sm:pl-[0.6em]">
          ETHIOPIA
        </span>
        <div className="h-[1.5px] w-6 sm:w-16 bg-gradient-to-l from-transparent to-tibeb-gold/80" />
      </div>
    </div>
  );
}
