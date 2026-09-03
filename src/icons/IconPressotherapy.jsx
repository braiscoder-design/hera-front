export default function IconPressotherapy({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M14 6 L14 34" strokeLinecap="round" />
      <path d="M26 6 L26 34" strokeLinecap="round" />
      <path d="M9 14 Q20 10 31 14" strokeOpacity="0.45" strokeLinecap="round" />
      <path d="M9 22 Q20 18 31 22" strokeOpacity="0.45" strokeLinecap="round" />
      <path d="M9 30 Q20 26 31 30" strokeOpacity="0.45" strokeLinecap="round" />
    </svg>
  )
}
