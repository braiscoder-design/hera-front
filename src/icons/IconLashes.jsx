export default function IconLashes({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M8 28 Q14 10 20 6 Q26 10 32 28" />
      <path d="M12 28 Q14 18 20 14 Q26 18 28 28" />
      <path d="M8 28 Q10 22 12 20" />
      <path d="M32 28 Q30 22 28 20" />
      <line x1="20" y1="6" x2="20" y2="4" />
      <line x1="14" y1="8" x2="13" y2="6" />
      <line x1="26" y1="8" x2="27" y2="6" />
    </svg>
  )
}
