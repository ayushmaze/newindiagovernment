type Props = { size?: number; className?: string; color?: string }

/**
 * The Swarm mascot — a small, resilient creature drawn from many legs and
 * antennae. The metaphor: tiny, countless, and impossible to stamp out.
 */
export function SwarmMascot({ size = 40, className = '', color = 'currentColor' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* antennae */}
      <path d="M28 18C24 10 18 8 12 6" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M36 18C40 10 46 8 52 6" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      {/* legs */}
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round">
        <path d="M24 30L8 26" />
        <path d="M24 38L6 40" />
        <path d="M24 46L10 54" />
        <path d="M40 30L56 26" />
        <path d="M40 38L58 40" />
        <path d="M40 46L54 54" />
      </g>
      {/* body */}
      <ellipse cx="32" cy="38" rx="13" ry="19" fill={color} />
      {/* head */}
      <ellipse cx="32" cy="20" rx="8" ry="7" fill={color} />
      {/* wing seam */}
      <path d="M32 24V54" stroke="var(--bg)" strokeOpacity="0.35" strokeWidth="1.6" />
      {/* eyes */}
      <circle cx="29" cy="19" r="1.5" fill="var(--bg)" />
      <circle cx="35" cy="19" r="1.5" fill="var(--bg)" />
    </svg>
  )
}
