/**
 * AutopilotROI Logo — SVG Component
 *
 * Faithful recreation of the compass "A" brand mark.
 * Built as SVG for pixel-perfect rendering at any size,
 * transparent background by default, works on light & dark.
 *
 * Usage:
 *   <Logo size={44} />           ← icon only
 *   <Logo size={44} showText />  ← icon + "AutopilotROI" wordmark
 */

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
  /** Color class for the 'Autopilot' wordmark — defaults to white (for blue navbar) */
  textColorClass?: string
}

export function LogoIcon({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="AutopilotROI"
      role="img"
    >
      <defs>
        {/* Main circle gradient — dark navy bottom to medium blue top */}
        <linearGradient id="logoGrad" x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0%" stopColor="#0c2461" />
          <stop offset="50%" stopColor="#1a4fa0" />
          <stop offset="100%" stopColor="#2e7bd6" />
        </linearGradient>
        {/* Subtle ring gradient */}
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* ── Outer targeting reticle ── */}
      {/* Outer thin ring */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="url(#ringGrad)" strokeWidth="1.2" opacity="0.7" />

      {/* Crosshair lines — N/S/E/W */}
      <line x1="50" y1="0" x2="50" y2="8" stroke="url(#ringGrad)" strokeWidth="1.4" opacity="0.8" />
      <line x1="50" y1="92" x2="50" y2="100" stroke="url(#ringGrad)" strokeWidth="1.4" opacity="0.8" />
      <line x1="0" y1="50" x2="8" y2="50" stroke="url(#ringGrad)" strokeWidth="1.4" opacity="0.8" />
      <line x1="92" y1="50" x2="100" y2="50" stroke="url(#ringGrad)" strokeWidth="1.4" opacity="0.8" />

      {/* Small tick marks at diagonals */}
      <line x1="14" y1="14" x2="17" y2="17" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.5" />
      <line x1="83" y1="17" x2="86" y2="14" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="86" x2="17" y2="83" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.5" />
      <line x1="83" y1="83" x2="86" y2="86" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.5" />

      {/* ── Middle gauge ring with tick marks ── */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#ringGrad)" strokeWidth="1.8" />

      {/* Gauge tick marks around middle ring */}
      {[0, 15, 30, 60, 75, 105, 120, 150, 165, 195, 210, 240, 255, 285, 300, 330, 345].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const inner = 37
        const outer = 40
        return (
          <line
            key={angle}
            x1={50 + inner * Math.cos(rad)}
            y1={50 + inner * Math.sin(rad)}
            x2={50 + outer * Math.cos(rad)}
            y2={50 + outer * Math.sin(rad)}
            stroke="url(#ringGrad)"
            strokeWidth="0.8"
            opacity="0.4"
          />
        )
      })}

      {/* ── Inner filled circle ── */}
      <circle cx="50" cy="50" r="33" fill="url(#logoGrad)" />
      {/* Subtle inner shadow ring */}
      <circle cx="50" cy="50" r="33" fill="none" stroke="#0a1a4a" strokeWidth="0.5" opacity="0.5" />

      {/* ── Stylized "A" lettermark ── */}
      {/* Main A shape */}
      <path
        d="M50 22 L34 68 L40 68 L44 56 L56 56 L60 68 L66 68 Z"
        fill="white"
        opacity="0.95"
      />
      {/* A crossbar */}
      <path
        d="M45.5 50 L54.5 50 L53 46 L47 46 Z"
        fill="url(#logoGrad)"
      />

      {/* ── Swoosh arc at base ── */}
      <path
        d="M28 62 Q38 52 62 54 Q72 55 74 60"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* ── Sparkle accent ── */}
      <circle cx="37" cy="38" r="1.2" fill="white" opacity="0.9" />
      <line x1="37" y1="35" x2="37" y2="41" stroke="white" strokeWidth="0.5" opacity="0.5" />
      <line x1="34" y1="38" x2="40" y2="38" stroke="white" strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

export default function Logo({ size = 44, showText = false, className = '', textColorClass = 'text-white' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={size} className="shrink-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
      {showText && (
        <span className="font-[var(--font-sora)] text-[1.7rem] font-semibold tracking-[-0.06em] leading-none">
          <span className={textColorClass}>Autopilot</span>
          <span className="text-blue-300">ROI</span>
        </span>
      )}
    </span>
  )
}
