'use client'

import { motion } from 'framer-motion'
import PageShell from '@/components/sections/PageShell'
import SectionBox from '@/components/sections/SectionBox'
import {
  lastUpdated,
  builtAndWorking,
  needsWork,
  notBuiltYet,
  dbTables,
  roadmapPhases,
  componentInventory,
  techStack,
  timeline,
  keyDecisions,
} from '@/content/roadmap'
import type { SystemStatus, TaskPriority, PhaseStatus } from '@/content/roadmap'

/* ─── Animation ──────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.04 } },
}

/* ─── Helpers ────────────────────────────────────────────────── */

function statusLabel(s: SystemStatus): string {
  if (s === 'live') return '✅'
  if (s === 'partial') return '⚠️'
  return '❌'
}

function statusDot(s: SystemStatus): string {
  if (s === 'live') return '#22c55e'
  if (s === 'partial') return '#f59e0b'
  return '#ef4444'
}

function priorityLabel(p: TaskPriority): string {
  const m: Record<TaskPriority, string> = { critical: '🔴 Critical', high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' }
  return m[p]
}

function phaseAccent(s: PhaseStatus): string {
  if (s === 'current') return '#3b82f6'
  if (s === 'upcoming') return '#f59e0b'
  return '#94a3b8'
}

function phaseBadge(s: PhaseStatus): { bg: string; text: string; label: string } {
  if (s === 'current') return { bg: '#dbeafe', text: '#1d4ed8', label: 'Current' }
  if (s === 'upcoming') return { bg: '#fef3c7', text: '#92400e', label: 'Upcoming' }
  return { bg: '#f1f5f9', text: '#64748b', label: 'Later' }
}

/* ─── Shared UI ──────────────────────────────────────────────── */

function Badge({ bg, color, children }: { bg: string; color: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.03em',
        background: bg,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <motion.h2
      id={id}
      variants={fadeUp}
      style={{
        fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: '0.25rem',
        lineHeight: 1.3,
      }}
    >
      {children}
    </motion.h2>
  )
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={fadeUp} style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
      {children}
    </motion.p>
  )
}

/* ─── Table primitives ───────────────────────────────────────── */

const tblStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem' }

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 14px',
  borderBottom: '2px solid #e2e8f0',
  color: '#64748b',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid #f1f5f9',
  color: '#475569',
}

/* ═══════════════════════════════════════════════════════════════ */

export default function RoadmapPageClient() {
  const totalComponents = componentInventory.reduce((s, g) => s + g.components.length, 0)

  return (
    <PageShell>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(4rem,10vw,6rem) 1.5rem clamp(2.5rem,5vw,4rem)',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #1e3a5f 0%, #0f172a 100%)',
          borderRadius: '0 0 24px 24px',
          overflow: 'hidden',
        }}
      >
        {/* gradient orbs */}
        <div
          style={{
            position: 'absolute', top: '-20%', left: '15%', width: 450, height: 450, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '-15%', right: '10%', width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />

        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            variants={fadeUp}
            style={{ color: '#60a5fa', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}
          >
            AutopilotROI V3
          </motion.p>
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Product Roadmap
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: 560, margin: '0 auto 0.75rem' }}>
            Current build status, phased development plan, and the path to launch.
          </motion.p>
          <motion.p variants={fadeUp} style={{ color: '#64748b', fontSize: '0.8rem' }}>
            Last updated: {lastUpdated} &nbsp;·&nbsp; Next.js 16 + Supabase + Puck Editor + Vercel
          </motion.p>
        </motion.div>
      </section>

      <div style={{ height: '1.5rem' }} />

      {/* ── Built & Working ─────────────────────────────────── */}
      <SectionBox>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="built">✅ What&apos;s Built &amp; Working</SectionTitle>
          <SectionSub>{builtAndWorking.length} systems fully operational</SectionSub>

          <div style={{ overflowX: 'auto' }}>
            <table style={tblStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>System</th>
                  <th style={{ ...thStyle, width: 70, textAlign: 'center' }}>Status</th>
                  <th style={thStyle}>Details</th>
                </tr>
              </thead>
              <tbody>
                {builtAndWorking.map((r) => (
                  <motion.tr key={r.name} variants={fadeUp}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{r.name}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{statusLabel(r.status)}</td>
                    <td style={tdStyle}>{r.details}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </SectionBox>

      {/* ── Needs Work ──────────────────────────────────────── */}
      <SectionBox variant="surface">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="needs-work">⚠️ Built But Needs Work</SectionTitle>
          <SectionSub>Partially complete — requires finishing touches before launch</SectionSub>

          <div style={{ overflowX: 'auto' }}>
            <table style={tblStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>System</th>
                  <th style={thStyle}>Issue</th>
                </tr>
              </thead>
              <tbody>
                {needsWork.map((r) => (
                  <motion.tr key={r.name} variants={fadeUp}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#b45309' }}>{r.name}</td>
                    <td style={tdStyle}>{r.issue}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </SectionBox>

      {/* ── Not Built Yet ───────────────────────────────────── */}
      <SectionBox>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="not-built">❌ Not Built Yet</SectionTitle>
          <SectionSub>Planned features that have not been started</SectionSub>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {notBuiltYet.map((r) => (
              <motion.div
                key={r.name}
                variants={fadeUp}
                style={{
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#991b1b',
                  fontSize: '0.87rem',
                  fontWeight: 500,
                }}
              >
                {r.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionBox>

      {/* ── Database Schema ─────────────────────────────────── */}
      <SectionBox variant="surface">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="database">🗂️ Database Schema</SectionTitle>
          <SectionSub>Supabase Postgres — all tables have Row Level Security enabled</SectionSub>

          <div style={{ overflowX: 'auto' }}>
            <table style={tblStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Table</th>
                  <th style={{ ...thStyle, width: 70, textAlign: 'center' }}>Rows</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={{ ...thStyle, width: 60, textAlign: 'center' }}>RLS</th>
                </tr>
              </thead>
              <tbody>
                {dbTables.map((t) => (
                  <motion.tr key={t.name} variants={fadeUp}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b', fontFamily: 'monospace', fontSize: '0.83rem' }}>{t.name}</td>
                    <td style={{ ...tdStyle, textAlign: 'center', color: '#3b82f6', fontWeight: 600 }}>{t.rows}</td>
                    <td style={tdStyle}>{t.purpose}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{t.rls ? '✅' : '❌'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </SectionBox>

      {/* ── Phased Roadmap ──────────────────────────────────── */}
      <SectionBox>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="roadmap">🚀 Phased Roadmap</SectionTitle>
          <SectionSub>6 phases from editor polish to public launch — ~11-16 sessions total</SectionSub>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {roadmapPhases.map((p) => {
              const badge = phaseBadge(p.status)
              return (
                <motion.div
                  key={p.phase}
                  variants={fadeUp}
                  style={{ borderLeft: `3px solid ${phaseAccent(p.status)}`, paddingLeft: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Phase {p.phase}: {p.name}
                    </h3>
                    <Badge bg={badge.bg} color={badge.text}>{badge.label}</Badge>
                    <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>~{p.sessions} sessions</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.87rem', margin: '0.35rem 0 1rem' }}>{p.goal}</p>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={tblStyle}>
                      <thead>
                        <tr>
                          <th style={{ ...thStyle, width: 40 }}>#</th>
                          <th style={thStyle}>Task</th>
                          <th style={{ ...thStyle, width: 100, textAlign: 'center' }}>Priority</th>
                          <th style={{ ...thStyle, width: 80, textAlign: 'center' }}>Effort</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.tasks.map((t) => (
                          <tr key={t.id}>
                            <td style={{ ...tdStyle, color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.8rem' }}>{t.id}</td>
                            <td style={{ ...tdStyle, color: '#1e293b' }}>{t.task}</td>
                            <td style={{ ...tdStyle, textAlign: 'center', fontSize: '0.78rem' }}>{priorityLabel(t.priority)}</td>
                            <td
                              style={{
                                ...tdStyle,
                                textAlign: 'center',
                                textTransform: 'capitalize',
                                color: t.effort === 'large' ? '#b45309' : '#64748b',
                                fontWeight: t.effort === 'large' ? 600 : 400,
                              }}
                            >
                              {t.effort}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </SectionBox>

      {/* ── Component Inventory ─────────────────────────────── */}
      <SectionBox variant="surface">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="components">📐 Puck Editor Components</SectionTitle>
          <SectionSub>{totalComponents} custom components across {componentInventory.length} categories</SectionSub>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {componentInventory.map((g) => (
              <motion.div
                key={g.category}
                variants={fadeUp}
                style={{
                  padding: '1.25rem',
                  borderRadius: 12,
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>{g.icon}</span>
                  <strong style={{ color: '#0f172a' }}>{g.category}</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.78rem', marginLeft: '0.5rem' }}>({g.components.length})</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {g.components.map((c) => (
                    <span
                      key={c}
                      style={{
                        padding: '3px 9px',
                        borderRadius: 6,
                        fontSize: '0.74rem',
                        fontFamily: 'monospace',
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        border: '1px solid #bfdbfe',
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionBox>

      {/* ── Tech Stack ──────────────────────────────────────── */}
      <SectionBox>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="stack">🧱 Tech Stack</SectionTitle>
          <SectionSub>Core technologies powering AutopilotROI V3</SectionSub>

          <div style={{ overflowX: 'auto' }}>
            <table style={tblStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Layer</th>
                  <th style={thStyle}>Technology</th>
                  <th style={{ ...thStyle, width: 80, textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {techStack.map((r) => (
                  <motion.tr key={r.layer} variants={fadeUp}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{r.layer}</td>
                    <td style={tdStyle}>{r.technology}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: statusDot(r.status) }} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </SectionBox>

      {/* ── Timeline ────────────────────────────────────────── */}
      <SectionBox variant="surface">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="timeline">📅 Estimated Timeline</SectionTitle>
          <SectionSub>~11-16 sessions from current state to launch</SectionSub>

          <div style={{ overflowX: 'auto' }}>
            <table style={tblStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Phase</th>
                  <th style={{ ...thStyle, width: 100, textAlign: 'center' }}>Sessions</th>
                  <th style={thStyle}>Focus</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((r) => (
                  <motion.tr key={r.phase} variants={fadeUp}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#1e293b' }}>{r.phase}</td>
                    <td style={{ ...tdStyle, textAlign: 'center', color: '#3b82f6', fontWeight: 600 }}>{r.sessions}</td>
                    <td style={tdStyle}>{r.focus}</td>
                  </motion.tr>
                ))}
                <motion.tr variants={fadeUp}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#0f172a', borderTop: '2px solid #e2e8f0' }}>Total</td>
                  <td style={{ ...tdStyle, textAlign: 'center', color: '#3b82f6', fontWeight: 700, borderTop: '2px solid #e2e8f0' }}>~11-16</td>
                  <td style={{ ...tdStyle, borderTop: '2px solid #e2e8f0' }} />
                </motion.tr>
              </tbody>
            </table>
          </div>

          <motion.div
            variants={fadeUp}
            style={{
              marginTop: '1.25rem',
              padding: '14px 18px',
              borderRadius: 10,
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1e40af',
              fontSize: '0.85rem',
              lineHeight: 1.6,
            }}
          >
            <strong>Note:</strong> Phases 1-2 can run in parallel with Phase 3. Phase 4 depends on Phase 3 (auth). Phases 5-6 should be the final sequential push.
          </motion.div>
        </motion.div>
      </SectionBox>

      {/* ── Key Decisions ───────────────────────────────────── */}
      <SectionBox>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <SectionTitle id="decisions">🔑 Key Decisions Needed</SectionTitle>
          <SectionSub>Open questions that need to be resolved to move forward</SectionSub>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {keyDecisions.map((d, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                }}
              >
                <span style={{ color: '#b45309', fontWeight: 700, fontSize: '0.95rem', flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6 }}>{d}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionBox>

      <div style={{ height: '2rem' }} />
    </PageShell>
  )
}
