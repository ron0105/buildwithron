/*
  The plain label and title every section opens with (no numbers, brief v2). M4: the label
  fades up first, the title 80ms after it.
*/
export default function SectionHead({
  label,
  title,
  tone = 'light',
}: {
  label: string
  title: string
  tone?: 'light' | 'dark'
}) {
  return (
    <header style={{ '--stagger': '80ms' } as React.CSSProperties}>
      <p data-reveal className={`label ${tone === 'dark' ? 'text-paper/50' : ''}`} style={{ '--i': 0 } as React.CSSProperties}>
        {label}
      </p>
      <h2
        data-reveal
        className="display text-4xl sm:text-5xl md:text-6xl mt-4 max-w-[18ch]"
        style={{ '--i': 1 } as React.CSSProperties}
      >
        {title}
      </h2>
    </header>
  )
}
