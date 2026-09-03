export default function IconMicropigmentation({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M6 22 Q13 15 20 16 Q27 15 34 22" strokeDasharray="0.1 4.2" strokeLinecap="round" />
      <line x1="28" y1="8" x2="34" y2="14" strokeLinecap="round" />
      <circle cx="34" cy="14" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}
