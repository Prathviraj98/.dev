'use client';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showStatus?: boolean;
}

export default function Logo({ className = 'h-9 w-auto', variant = 'auto', showStatus = true }: LogoProps) {
  return (
    <div className="flex items-center space-x-2 group cursor-pointer focus:outline-none">
      <div className="flex flex-col">
        <svg
          viewBox="0 0 540 180"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00bcd4" />
              <stop offset="100%" stopColor="#0288d1" />
            </linearGradient>
            
            <linearGradient id="logoTextBright" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="logoTextDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Cyan Target Ring */}
          <g>
            <circle cx="64" cy="100" r="26" fill="#00bcd4" opacity="0.3" filter="url(#logoGlow)" />
            <circle cx="64" cy="100" r="20" fill="url(#logoCyanGrad)" />
            <circle cx="64" cy="100" r="9" fill="#ffffff" />
          </g>

          {/* DEV Wordmark */}
          <text
            x="104"
            y="130"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Montserrat', sans-serif"
            fontWeight="900"
            fontSize="130"
            fill={variant === 'dark' ? 'url(#logoTextDark)' : 'url(#logoTextBright)'}
            letterSpacing="-4"
          >
            DEV
          </text>

          {/* Prompt Accent Underline under D */}
          <rect x="108" y="146" width="56" height="8" rx="4" fill="url(#logoCyanGrad)" />
        </svg>

        {showStatus && (
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono flex items-center gap-1 -mt-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            System Ready
          </span>
        )}
      </div>
    </div>
  );
}
