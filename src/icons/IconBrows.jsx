export default function IconBrows({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M6 18 Q13 12 20 13 Q27 12 34 18" strokeLinecap="round" />
      <path d="M8 21 Q13 16 20 17 Q27 16 32 21" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="20" y1="22" x2="20" y2="34" strokeOpacity="0.2" />
    </svg>
  )
}
