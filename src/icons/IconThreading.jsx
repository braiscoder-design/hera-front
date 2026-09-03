export default function IconThreading({ strokeWidth = 1.2, ...props }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <circle cx="9" cy="12" r="3" />
      <circle cx="9" cy="28" r="3" />
      <path d="M12 12 Q28 16 12 20 Q28 24 12 28" strokeLinecap="round" />
    </svg>
  )
}
