type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/*
  The third hand-drawn mark (after the hero underline and the sheet circle):
  a loose pen line through one word. M2: it draws itself once the headline
  has landed, so pass a delay past the last rising line.
*/
export default function Strike({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="draw absolute -left-[3%] top-[52%] w-[106%] h-[0.22em] -translate-y-1/2 text-accent overflow-visible pointer-events-none"
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ '--delay': `${delay}ms` } as CSSVars}
      >
        <path
          d="M2 13 C 70 7, 140 15, 210 8 S 280 9, 298 6"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
