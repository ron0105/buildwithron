/*
  A visible TODO for copy or photos Rohan still owes. Shows locally and on
  Vercel previews so it cannot be missed in review, and renders nothing in
  production so a gap never reaches the live site as a dashed box.
*/
export default function Todo({ children }: { children: React.ReactNode }) {
  if (process.env.VERCEL_ENV === 'production') return null
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent border border-dashed border-accent/60 px-2 py-1 rounded-[3px] inline-block">
      TODO: {children}
    </p>
  )
}
