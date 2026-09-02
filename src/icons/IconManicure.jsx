export default function IconManicure({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M14 32 L14 18 Q14 14 17 14 Q20 14 20 18 L20 32" />
      <path d="M20 32 L20 16 Q20 12 23 12 Q26 12 26 16 L26 32" />
      <path d="M26 32 L26 20 Q26 16 29 16 Q32 16 32 20 L32 32" />
      <path d="M8 32 L8 22 Q8 18 11 18 Q14 18 14 22 L14 32" />
      <rect x="6" y="32" width="28" height="3" rx="1.5" />
    </svg>
  )
}
