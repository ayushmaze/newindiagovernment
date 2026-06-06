type Props = { size?: number; className?: string; color?: string }

/**
 * A single marching citizen with a raised fist — the mark of the movement.
 * One alone is small; in great numbers, a crowd.
 */
export function Marcher({ size = 40, className = '', color = 'currentColor' }: Props) {
  return (
    <svg
      width={(size * 48) / 64}
      height={size}
      viewBox="0 0 48 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* head */}
      <circle cx="22" cy="10" r="7" fill={color} />
      {/* raised arm + fist */}
      <path d="M24 24L33 14" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx="35" cy="12" r="3.6" fill={color} />
      {/* torso */}
      <path d="M22 18L22 40" stroke={color} strokeWidth="6" strokeLinecap="round" />
      {/* trailing arm */}
      <path d="M22 26L14 33" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* legs mid-stride */}
      <path d="M22 39L14 58" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M22 39L31 57" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
