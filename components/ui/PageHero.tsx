type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>

/* The top of every inner page: numbered-label style eyebrow, a big stacked
   headline with the orange full stop, one line under it. M1 rise. */
export default function PageHero({
  label,
  title,
  sub,
  children,
}: {
  label: string
  title: string
  sub?: string
  children?: React.ReactNode
}) {
  const bare = title.replace(/[.]$/, '')
  return (
    <section className="wrap pt-32 md:pt-44 pb-12 md:pb-20">
      <p className="label rise" style={{ '--i': 0 } as CSSVars}>
        {label}
      </p>
      <h1
        className="display text-5xl sm:text-6xl md:text-7xl mt-5 max-w-[16ch] text-ink rise"
        style={{ '--i': 1 } as CSSVars}
      >
        {bare}
        <span className="text-accent">.</span>
      </h1>
      {sub && (
        <p
          className="font-body text-lg md:text-xl text-muted mt-6 max-w-[52ch] leading-relaxed rise"
          style={{ '--i': 2 } as CSSVars}
        >
          {sub}
        </p>
      )}
      {children && (
        <div className="mt-8 rise" style={{ '--i': 3 } as CSSVars}>
          {children}
        </div>
      )}
    </section>
  )
}
