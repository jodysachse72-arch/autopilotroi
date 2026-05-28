'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { value: 12000, suffix: '+', label: 'Members Onboarded' },
  { value: 47, suffix: '%', label: 'Avg. Portfolio Growth' },
  { value: 24, suffix: '/7', label: 'AI Bot Active Hours' },
  { value: 100, suffix: '+', label: 'Countries Supported' },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-display" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section
      style={{
        margin: '0 var(--page-px, 1.5rem)',
        marginTop: '1.5rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-section, 1.125rem)',
          border: '1px solid var(--color-border)',
          padding: 'clamp(2.5rem, 5vw, 4rem) var(--page-px, 1.5rem)',
        }}
      >
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
          style={{ maxWidth: 'var(--container)', margin: '0 auto' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <span className="text-caption mt-2" style={{ color: 'var(--color-fg-muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
