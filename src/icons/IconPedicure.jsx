export default function IconPedicure({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <ellipse cx="20" cy="26" rx="12" ry="8" />
      <path d="M11 22 Q12 14 15 12 Q18 10 20 14" strokeLinecap="round" />
      <path d="M29 22 Q28 16 26 13 Q24 10 22 14" strokeLinecap="round" strokeOpacity="0.4" />
      <circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="24" cy="17" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
    </svg>
  )
}
