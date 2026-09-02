export default function IconTraining({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <path d="M20 11 L34 17.5 L20 24 L6 17.5 Z" strokeLinejoin="round" />
      <path d="M12 20.5 V27 Q12 31 20 31 Q28 31 28 27 V20.5" strokeLinecap="round" />
      <path d="M34 17.5 V26" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="34" cy="27.3" r="1.3" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  )
}
