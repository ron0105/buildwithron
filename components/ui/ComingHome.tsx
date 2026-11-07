'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'

/* Her answers live in this browser's localStorage, so the page remembers them
   every day until she edits. No server, nothing to break. Bump the key to
   reset everyone. */
const KEY = 'coming-home-v1'
const CHANGE = 'coming-home-change'

type Plan = {
  date: string // yyyy-mm-dd, the day she sets off
  time: string // hh:mm, when she leaves
  mode: string // 'flight', 'bus', or whatever she typed
  hours: number
  mins: number
  setAt: number // first save, so the wait line has a start
}

/* She almost always comes back one of these two ways, so picking one fills in
   the journey time and skips that question. Anything else, she types. */
const PRESETS = [
  { id: 'flight', label: 'Flight', hours: 2 },
  { id: 'bus', label: 'Bus', hours: 12 },
]
const isPreset = (mode: string) => PRESETS.some((p) => p.id === mode)

/* The note on the ticket stub. Edit freely, first match wins. */
function note(msLeft: number): string {
  const days = msLeft / 86_400_000
  if (msLeft < 3_600_000) return 'Any minute now.'
  if (days < 1) return 'Today. Finally.'
  if (days < 2) return 'One more sleep.'
  if (days < 4) return 'A couple of sleeps left. Hang in there.'
  if (days < 8) return 'Less than a week. First chai is on me.'
  return 'Every day here is one day closer to you.'
}

const DEFAULT_DATE = '2026-11-16'

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb)
  window.addEventListener(CHANGE, cb)
  return () => {
    window.removeEventListener('storage', cb)
    window.removeEventListener(CHANGE, cb)
  }
}

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function parse(raw: string | null): Plan | null {
  if (!raw) return null
  try {
    const p = JSON.parse(raw) as Plan
    return p.date && p.time && p.mode ? p : null
  } catch {
    return null
  }
}

function save(plan: Plan) {
  try {
    localStorage.setItem(KEY, JSON.stringify(plan))
  } catch {}
  window.dispatchEvent(new Event(CHANGE))
}

function departure(p: Pick<Plan, 'date' | 'time'>) {
  return new Date(`${p.date}T${p.time}:00`).getTime()
}

function arrival(p: Pick<Plan, 'date' | 'time' | 'hours' | 'mins'>) {
  return departure(p) + (p.hours * 60 + p.mins) * 60_000
}

const dayFmt = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })

const pad = (n: number) => String(n).padStart(2, '0')
const span = (h: number, m: number) => `${h}h${m ? ` ${m}m` : ''}`

export default function ComingHome() {
  // undefined on the server, so nothing personal renders before we can read storage
  const raw = useSyncExternalStore(subscribe, readRaw, () => undefined)
  const [editing, setEditing] = useState(false)
  const plan = raw === undefined ? null : parse(raw)

  return (
    <main className="min-h-[100svh] text-ink">
      <div className="mx-auto flex min-h-[100svh] max-w-[560px] flex-col justify-center px-4 py-14 sm:px-6">
        {raw === undefined ? null : plan && !editing ? (
          <Countdown plan={plan} onEdit={() => setEditing(true)} />
        ) : (
          <Wizard
            initial={plan}
            onCancel={plan ? () => setEditing(false) : undefined}
            onDone={(p) => {
              save(p)
              setEditing(false)
            }}
          />
        )}
      </div>
      <style>{css}</style>
    </main>
  )
}

/* ---------- The questions ---------- */

type Step = 'gate' | 'notyou' | 'date' | 'mode' | 'leave' | 'duration' | 'confirm'

function Wizard({
  initial,
  onDone,
  onCancel,
}: {
  initial: Plan | null
  onDone: (p: Plan) => void
  onCancel?: () => void
}) {
  const [step, setStep] = useState<Step>(initial ? 'date' : 'gate')
  const [date, setDate] = useState(initial?.date ?? DEFAULT_DATE)
  const [mode, setMode] = useState<string | null>(initial?.mode ?? null)
  const [other, setOther] = useState(initial ? !isPreset(initial.mode) : false)
  const [time, setTime] = useState(initial?.time ?? '')
  const [hours, setHours] = useState(initial ? String(initial.hours) : '')
  const [mins, setMins] = useState(initial ? String(initial.mins) : '0')

  const h = Number(hours) || 0
  const m = Number(mins) || 0
  // the journey-time question only exists for "something else"
  const ask: Step[] = other ? ['date', 'mode', 'leave', 'duration'] : ['date', 'mode', 'leave']
  const idx = ask.indexOf(step)
  const back = () => setStep(step === 'confirm' ? ask[ask.length - 1] : (ask[idx - 1] ?? 'gate'))
  const afterLeave = other ? 'duration' : 'confirm'

  return (
    <div key={step} className="rise">
      {step === 'gate' && (
        <>
          <p className="label">Before anything</p>
          <Q>
            Are you Rohan&apos;s <Underline>partner</Underline>?
          </Q>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Primary onClick={() => setStep('date')}>Yes, it&apos;s me</Primary>
            <TextBtn onClick={() => setStep('notyou')}>No</TextBtn>
          </div>
        </>
      )}

      {step === 'notyou' && (
        <>
          <p className="label">Ah</p>
          <Q>Then this page isn&apos;t for you. Hi though.</Q>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link href="/" className={primaryCls}>
              Go to buildwithron <span className="arrow">→</span>
            </Link>
            <TextBtn onClick={() => setStep('gate')}>Wait, it is me</TextBtn>
          </div>
        </>
      )}

      {idx >= 0 && <p className="label">{pad(idx + 1)} / {pad(ask.length)}</p>}

      {step === 'date' && (
        <>
          <Q>Which day do you head back?</Q>
          <Hint>A guess is fine. You can change it later.</Hint>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`${fieldCls} mt-10`}
            aria-label="Day you head back"
          />
          <Footer onBack={onCancel ?? back} backLabel={onCancel ? 'Cancel' : 'Back'}>
            <Primary disabled={!date} onClick={() => setStep('mode')}>
              Next <span className="arrow">→</span>
            </Primary>
          </Footer>
        </>
      )}

      {step === 'mode' && (
        <>
          <Q>How are you getting here?</Q>
          <ul className="mt-10 border-t border-ink">
            {PRESETS.map((x, i) => (
              <li key={x.id}>
                <button
                  type="button"
                  onClick={() => {
                    setMode(x.id)
                    setOther(false)
                    setHours(String(x.hours))
                    setMins('0')
                    setStep('leave')
                  }}
                  className="card-lift group flex w-full items-baseline gap-5 border-b border-ink/15 py-5 text-left"
                >
                  <span className="label">{pad(i + 1)}</span>
                  <span className="font-display text-3xl font-bold tracking-tight">{x.label}</span>
                  <span className="label">About {x.hours}h</span>
                  <span
                    className={`arrow ml-auto text-2xl ${!other && mode === x.id ? 'text-accent' : 'text-ink/25 group-hover:text-ink'}`}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </li>
            ))}
            <li className="border-b border-ink/15">
              <button
                type="button"
                onClick={() => {
                  if (!other) {
                    setMode('')
                    setHours('')
                    setMins('0')
                  }
                  setOther(true)
                }}
                className="flex w-full items-baseline gap-5 py-5 text-left"
              >
                <span className="label">{pad(PRESETS.length + 1)}</span>
                <span className={`font-body text-lg ${other ? 'text-ink' : 'text-muted'}`}>Something else</span>
              </button>
              {other && (
                <div className="flex items-end gap-4 pb-6">
                  <input
                    autoFocus
                    value={mode ?? ''}
                    onChange={(e) => setMode(e.target.value)}
                    className={fieldCls}
                    placeholder="Train, car..."
                    aria-label="How you're travelling"
                  />
                  <Primary disabled={!mode?.trim()} onClick={() => setStep('leave')}>
                    Next <span className="arrow">→</span>
                  </Primary>
                </div>
              )}
            </li>
          </ul>
          <Footer onBack={back} />
        </>
      )}

      {step === 'leave' && (
        <>
          <Q>What time do you leave?</Q>
          <Hint>When the {mode?.trim().toLowerCase()} leaves.</Hint>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`${fieldCls} mt-10`}
            aria-label="Departure time"
          />
          <Footer onBack={back}>
            <Primary disabled={!time} onClick={() => setStep(afterLeave)}>
              Next <span className="arrow">→</span>
            </Primary>
          </Footer>
        </>
      )}

      {step === 'duration' && (
        <>
          <Q>How long is the journey?</Q>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <label className="flex flex-col gap-1">
              <span className="label">Hours</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={72}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className={fieldCls}
                placeholder="0"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="label">Minutes</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={59}
                step={5}
                value={mins}
                onChange={(e) => setMins(e.target.value)}
                className={fieldCls}
                placeholder="0"
              />
            </label>
          </div>
          <Footer onBack={back}>
            <Primary disabled={h * 60 + m <= 0} onClick={() => setStep('confirm')}>
              Next <span className="arrow">→</span>
            </Primary>
          </Footer>
        </>
      )}

      {step === 'confirm' && mode && (
        <>
          <p className="label">Check this</p>
          <Q>
            <Underline>Home</Underline> in
          </Q>
          <Preview plan={{ date, time, mode, hours: h, mins: m }} />
          <Footer onBack={back}>
            <Primary
              onClick={() =>
                onDone({ date, time, mode: mode.trim(), hours: h, mins: m, setAt: initial?.setAt ?? Date.now() })
              }
            >
              Lock it in
            </Primary>
          </Footer>
        </>
      )}
    </div>
  )
}

/* ---------- The countdown ---------- */

function useNow() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function Timer({ left }: { left: number }) {
  const units = [
    { label: 'Days', value: Math.floor(left / 86_400_000) },
    { label: 'Hrs', value: Math.floor(left / 3_600_000) % 24 },
    { label: 'Min', value: Math.floor(left / 60_000) % 60 },
    { label: 'Sec', value: Math.floor(left / 1000) % 60 },
  ]
  return (
    <div className="mt-10 grid grid-cols-4 border-y border-ink" role="timer" aria-live="off">
      {units.map((u, i) => (
        <div key={u.label} className={`py-5 ${i ? 'border-l border-ink/15 pl-3 sm:pl-5' : ''}`}>
          <span className="display block text-[44px] tabular-nums sm:text-7xl">
            {u.label === 'Days' ? u.value : pad(u.value)}
          </span>
          <span className="label mt-2 block">{u.label}</span>
        </div>
      ))}
    </div>
  )
}

/* The check screen: live timer plus the ticket, before she locks it in. */
function Preview({ plan }: { plan: Pick<Plan, 'date' | 'time' | 'mode' | 'hours' | 'mins'> }) {
  const now = useNow()
  return (
    <>
      <Timer left={Math.max(0, arrival(plan) - now)} />
      <div className="mt-8">
        <Ticket plan={plan} />
      </div>
    </>
  )
}

function Countdown({ plan, onEdit }: { plan: Plan; onEdit: () => void }) {
  const now = useNow()

  const arrive = arrival(plan)
  const leave = departure(plan)
  const left = Math.max(0, arrive - now)
  const onTheWay = now >= leave && now < arrive
  const total = arrive - plan.setAt
  const done = total > 0 ? Math.min(1, Math.max(0, (now - plan.setAt) / total)) : 1

  if (left === 0) {
    return (
      <div className="rise">
        <p className="label">{dayFmt.format(arrive)}</p>
        <Q>
          You&apos;re <Underline>home</Underline>.
        </Q>
        <p className="mt-6 font-body text-xl text-muted">Come here.</p>
        <div className="mt-10">
          <Ticket plan={plan} arrived />
        </div>
        <Locked onEdit={onEdit} />
      </div>
    )
  }

  return (
    <div className="rise">
      <p className="label flex items-center gap-2">
        {onTheWay && <span className="live-dot" aria-hidden="true" />}
        {onTheWay ? 'On the way now' : 'Countdown'}
      </p>
      <Q>
        <Underline>Home</Underline> in
      </Q>

      <Timer left={left} />

      <div className="mt-10">
        <Ticket plan={plan} note={onTheWay ? 'Safe travels. I’ll be waiting.' : note(left)} />
      </div>

      <div className="mt-8" aria-hidden="true">
        <div className="relative h-px bg-ink/20">
          <div className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${done * 100}%` }} />
          <span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: `${done * 100}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          <span className="label">Locked in</span>
          <span className="label">{Math.floor(done * 100)}% of the wait done</span>
        </div>
      </div>

      <Locked onEdit={onEdit} />
    </div>
  )
}

/* The ticket: one paper stub, torn along the dashed line. */
function Ticket({
  plan,
  note,
  arrived,
}: {
  plan: Pick<Plan, 'date' | 'time' | 'mode' | 'hours' | 'mins'>
  note?: string
  arrived?: boolean
}) {
  const leave = departure(plan)
  const arrive = arrival(plan)
  const no = plan.date.slice(8, 10) + plan.date.slice(5, 7)

  return (
    <div className="ticket relative rounded-[3px] border border-ink bg-[#FFFDF8]">
      <div className="flex items-center justify-between border-b border-ink/15 px-5 py-3">
        <span className="label text-ink">One way · {plan.mode}</span>
        <span className="label">No. {no}</span>
      </div>

      <div className={`grid grid-cols-[1fr_auto_1fr] items-end gap-3 px-5 pt-5 ${arrived ? 'pb-16' : 'pb-6'}`}>
        <div>
          <span className="label">Departs</span>
          <p className="mt-1 whitespace-nowrap font-display text-[22px] font-bold leading-none tracking-tight sm:text-3xl">
            {timeFmt.format(leave)}
          </p>
          <p className="mt-1.5 font-body text-sm text-muted">{dayFmt.format(leave)}</p>
        </div>
        <div className="pb-7 text-center">
          <span className="label block">{span(plan.hours, plan.mins)}</span>
          <span className="mt-1.5 flex items-center text-muted" aria-hidden="true">
            <span className="h-px w-8 bg-current sm:w-12" />
            <span className="-ml-1 leading-none">→</span>
          </span>
        </div>
        <div className="text-right">
          <span className="label">Home</span>
          <p className="mt-1 whitespace-nowrap font-display text-[22px] font-bold leading-none tracking-tight sm:text-3xl">
            {timeFmt.format(arrive)}
          </p>
          <p className="mt-1.5 font-body text-sm text-muted">{dayFmt.format(arrive)}</p>
        </div>
      </div>

      {note && (
        <>
          <div className="tear" aria-hidden="true" />
          <div className="flex items-end justify-between gap-4 px-5 pt-5 pb-5">
            <p className="font-body text-lg leading-snug">{note}</p>
            <span className="label shrink-0">R.</span>
          </div>
        </>
      )}

      {arrived && (
        <span className="stamp absolute bottom-4 right-5 font-mono text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Arrived
        </span>
      )}
    </div>
  )
}

function Locked({ onEdit }: { onEdit: () => void }) {
  return (
    <p className="mt-12 font-body text-sm text-muted">
      Locked in on this device.{' '}
      <button
        type="button"
        onClick={onEdit}
        className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-accent"
      >
        Plans changed?
      </button>
    </p>
  )
}

/* ---------- Bits ---------- */

const primaryCls =
  'btn inline-flex items-center gap-2 bg-accent text-paper font-body text-base font-semibold px-6 py-3.5 rounded-[3px] hover:bg-ink cursor-pointer disabled:pointer-events-none disabled:opacity-40'

const fieldCls =
  'w-full border-0 border-b-2 border-ink bg-transparent pb-2 font-display text-3xl font-bold tracking-tight text-ink outline-none focus-visible:outline-none placeholder:text-ink/20 focus:border-accent sm:text-4xl'

function Primary(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className={primaryCls} />
}

function TextBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="font-body text-base text-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
    />
  )
}

function Footer({
  onBack,
  backLabel = 'Back',
  children,
}: {
  onBack: () => void
  backLabel?: string
  children?: React.ReactNode
}) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4">
      <TextBtn onClick={onBack}>{backLabel}</TextBtn>
      {children}
    </div>
  )
}

function Q({ children }: { children: React.ReactNode }) {
  return <h1 className="display mt-4 text-5xl sm:text-6xl">{children}</h1>
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 font-body text-lg text-muted">{children}</p>
}

/* The page's one hand-drawn mark, same stroke as the home hero. */
function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="draw absolute left-0 -bottom-2 h-3 w-full overflow-visible text-accent"
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ '--delay': '350ms' } as React.CSSProperties}
      >
        <path
          d="M3 11 C 60 4, 120 13, 180 7 S 270 5, 297 9"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

const css = `
/* Dashed tear line with a half-circle bite out of each edge, like a real stub. */
.ticket .tear {
  position: relative;
  border-top: 1.5px dashed color-mix(in srgb, var(--color-ink) 35%, transparent);
  margin-inline: 14px;
}
.ticket .tear::before,
.ticket .tear::after {
  content: "";
  position: absolute;
  top: -11px;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: var(--color-paper);
  border: 1px solid var(--color-ink);
}
.ticket .tear::before { left: -25px; clip-path: inset(0 0 0 50%); }
.ticket .tear::after { right: -25px; clip-path: inset(0 50% 0 0); }
.stamp {
  border: 2px solid currentColor;
  border-radius: 3px;
  padding: 4px 10px;
  transform: rotate(-8deg);
  opacity: 0.85;
}
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator { opacity: .35; cursor: pointer; }
input[type="number"]::-webkit-inner-spin-button { opacity: .3; }
`
