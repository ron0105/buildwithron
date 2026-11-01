import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OUTBOUND, type OutboundKey } from '@/lib/outbound'
import Forward from './Forward'

export const metadata: Metadata = {
  title: 'Opening…',
  robots: { index: false, follow: false },
}

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(OUTBOUND).map((target) => ({ target }))
}

export default async function GoPage({ params }: { params: Promise<{ target: string }> }) {
  const { target } = await params
  if (!(target in OUTBOUND)) notFound()
  return <Forward url={OUTBOUND[target as OutboundKey]} />
}
