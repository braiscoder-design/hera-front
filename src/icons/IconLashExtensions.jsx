export default function IconLashExtensions({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M8 30 L32 30" strokeLinecap="round" />
      <path d="M10 30 Q10 18 14 10" strokeLinecap="round" />
      <path d="M16 30 Q17 16 22 8" strokeLinecap="round" />
      <path d="M22 30 Q24 17 30 11" strokeLinecap="round" />
      <path d="M28 30 Q30 20 34 15" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  )
}
