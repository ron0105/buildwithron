/* People weigh a project against the pain they know, so cards show the
   problem and what changed, not the deliverables. `did` adds the middle step
   (what I did) where the card has room for it, as on the home page proof. */
export default function BeforeAfter({
  before,
  after,
  did,
  size = 'sm',
}: {
  before: string
  after: string
  did?: string
  size?: 'sm' | 'md'
}) {
  const text = size === 'md' ? 'text-base md:text-[17px]' : 'text-[15px]'
  return (
    <span className="mt-4 flex flex-col gap-4 flex-1">
      <span>
        <span className="label block">The problem</span>
        <span className={`font-body ${text} text-muted leading-relaxed mt-1 block`}>{before}</span>
      </span>
      {did && (
        <span>
          <span className="label block">What I did</span>
          <span className={`font-body ${text} text-muted leading-relaxed mt-1 block`}>{did}</span>
        </span>
      )}
      <span>
        <span className="label block text-accent">What changed</span>
        <span className={`font-body ${text} text-ink leading-relaxed mt-1 block`}>{after}</span>
      </span>
    </span>
  )
}
