'use client'

import { useCountUp } from '@/lib/useCountUp'

export type Stat = {
  value: number
  /** Suffix appended to the number (e.g. "%", "+", "/7") */
  suffix?: string
  label: string
}

/**
 * Inline stat with animated count-up. Single cell — wrap several in a grid for a stat row.
 * For the typical 4-stat row, prefer <StatRow stats={[…]} />.
 */
export function StatItem({ value, suffix = '', label }: Stat) {
  const ref = useCountUp(value)
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="stat-number">
        <span ref={ref}>0</span>
        {suffix && <span>{suffix}</span>}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

/**
 * Standard 4-up stat row that fits inside a SectionBox.
 * Each stat animates from 0 to its value when scrolled into view.
 *
 * Usage:
 *   <SectionBox>
 *     <StatRow stats={[
 *       { value: 12000, suffix: '+', label: 'Members Onboarded' },
 *       { value: 47,    suffix: '%', label: 'Avg. Portfolio Growth' },
 *     ]} />
 *   </SectionBox>
 */
export default function StatRow({
  stats,
  minWidth = '180px',
  gap = '2rem',
}: {
  stats: Stat[]
  minWidth?: string
  gap?: string
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
      gap,
    }}>
      {stats.map((s, i) => <StatItem key={i} {...s} />)}
    </div>
  )
}
