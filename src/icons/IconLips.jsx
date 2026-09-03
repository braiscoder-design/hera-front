export default function IconLips({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M6 18 Q13 12 20 15 Q27 12 34 18 Q29 23 20 21 Q11 23 6 18 Z" strokeLinejoin="round" />
      <path d="M10 21 Q20 28 30 21" strokeOpacity="0.35" strokeLinecap="round" />
    </svg>
  )
}
