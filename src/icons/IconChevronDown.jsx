export default function IconChevronDown({ width = 12, height = 12, strokeWidth = 2, ...props }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      <polyline points="6,9 12,15 18,9" />
    </svg>
  )
}
