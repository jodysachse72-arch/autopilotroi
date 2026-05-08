'use client'

/**
 * AutopilotROI V3 — Internal Roadmap
 *
 * Team-facing project status page. Not public marketing.
 * Sections: Header → Active → Architecture → Editor Attempts →
 *           Completed → Later-Phase → Time → Roadmap Fit → Decisions
 */

import { PageShell, SectionBox } from '@/components/sections'
import {
  lastUpdated,
  activeFocus,
  archDecisions,
  editorAttempts,
  completedFrontend,
  laterPhaseWork,
  timeInvestment,
  roadmapPhases,
  nextDecisions,
  type ItemStatus,
} from '@/content/roadmap'

/* ─── Shared Styles ──────────────────────────────────────────── */

const heading2: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
  color: '#181d26',
  marginBottom: '1rem',
  lineHeight: 1.3,
}

const heading3: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 'clamp(0.9375rem, 1.4vw, 1.125rem)',
  color: '#181d26',
  marginBottom: '0.5rem',
  lineHeight: 1.3,
}

const bodyText: React.CSSProperties = {
  fontSize: 'var(--text-body)',
  color: 'rgba(24,29,38,0.65)',
  lineHeight: 1.65,
}

const caption: React.CSSProperties = {
  fontSize: 'var(--text-caption)',
  color: 'rgba(24,29,38,0.5)',
  lineHeight: 1.5,
}

const sectionGap = '0.75rem'

/* ─── Status Badge ───────────────────────────────────────────── */

const STATUS_STYLES: Record<ItemStatus, { label: string; bg: string; color: string; border: string }> = {
  done:      { label: 'Done',      bg: '#ecfdf5', color: '#059669', border: '#bbf7d0' },
  active:    { label: 'Active',    bg: '#e8f0fd', color: '#1b61c9', border: '#bfdbfe' },
  next:      { label: 'Next',      bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
  later:     { label: 'Later',     bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' },
  abandoned: { label: 'Abandoned', bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
}

function Badge({ status }: { status: ItemStatus }) {
  const s = STATUS_STYLES[status]
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.1875rem 0.625rem',
      borderRadius: '99px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {s.label}
    </span>
  )
}

/* ─── Editor Attempt Status Label ────────────────────────────── */

const EDITOR_STATUS: Record<string, { label: string; bg: string; color: string; border: string }> = {
  current:    { label: 'Current',    bg: '#e8f0fd', color: '#1b61c9', border: '#bfdbfe' },
  tried:      { label: 'Tried',      bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  considered: { label: 'Considered', bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
  reference:  { label: 'Reference',  bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' },
}

function EditorBadge({ status }: { status: string }) {
  const s = EDITOR_STATUS[status] || EDITOR_STATUS.reference
  return (
    <span style={{
      display: 'inline-flex',
      padding: '0.1875rem 0.625rem',
      borderRadius: '99px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {s.label}
    </span>
  )
}

/* ─── Section Divider ────────────────────────────────────────── */

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} style={{ ...heading2, marginTop: 0 }}>
      {children}
    </h2>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */

export default function RoadmapPageClient() {
  return (
    <PageShell>
      {/* ── HEADER ──────────────────────────────────────────── */}
      <SectionBox>
        <div style={{ maxWidth: '48rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#181d26',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}>
            AutopilotROI V3 Internal Roadmap
          </h1>
          <p style={{ ...bodyText, marginBottom: '0.5rem' }}>
            Current build status, completed work, abandoned attempts, and next priorities.
          </p>
          <p style={caption}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </SectionBox>

      {/* ── CURRENT FOCUS ───────────────────────────────────── */}
      <SectionBox variant="surface">
        <SectionTitle id="active">Current Focus / Active Tasks</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap }}>
          {activeFocus.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(24,29,38,0.06)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-body)', color: '#181d26', lineHeight: 1.4 }}>
                  {item.label}
                </div>
                {item.note && (
                  <div style={caption}>{item.note}</div>
                )}
              </div>
              <Badge status={item.status} />
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── ARCHITECTURE DECISIONS ──────────────────────────── */}
      <SectionBox>
        <SectionTitle id="architecture">Current Architecture Decisions</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--text-body)',
          }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.625rem 1rem', borderBottom: '2px solid rgba(24,29,38,0.08)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#181d26', fontSize: 'var(--text-caption)' }}>Area</th>
                <th style={{ textAlign: 'left', padding: '0.625rem 1rem', borderBottom: '2px solid rgba(24,29,38,0.08)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#181d26', fontSize: 'var(--text-caption)' }}>Decision</th>
              </tr>
            </thead>
            <tbody>
              {archDecisions.map((d, i) => (
                <tr key={i}>
                  <td style={{ padding: '0.625rem 1rem', borderBottom: '1px solid rgba(24,29,38,0.04)', fontWeight: 600, color: '#181d26', whiteSpace: 'nowrap' }}>{d.area}</td>
                  <td style={{ padding: '0.625rem 1rem', borderBottom: '1px solid rgba(24,29,38,0.04)', ...bodyText }}>{d.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBox>

      {/* ── CMS / EDITOR ATTEMPTS ──────────────────────────── */}
      <SectionBox variant="surface">
        <SectionTitle id="editors">CMS / Editor Attempts</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {editorAttempts.map((e, i) => (
            <div key={i} style={{
              padding: '1rem 1.25rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(24,29,38,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', color: '#181d26' }}>
                  {e.name}
                </span>
                <EditorBadge status={e.status} />
              </div>
              <div style={{ ...bodyText, marginBottom: '0.25rem' }}>
                {e.summary}
              </div>
              <div style={caption}>
                {e.reason}
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── COMPLETED FRONTEND WORK ────────────────────────── */}
      <SectionBox>
        <SectionTitle id="completed">Completed Frontend / V3 Work</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
          {completedFrontend.map((cat, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              background: 'rgba(5,150,105,0.03)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(5,150,105,0.1)',
            }}>
              <h3 style={heading3}>{cat.category}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', listStyleType: 'disc' }}>
                {cat.items.map((item, j) => (
                  <li key={j} style={{ ...bodyText, marginBottom: '0.375rem', fontSize: 'var(--text-caption)' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── LATER PHASE WORK ───────────────────────────────── */}
      <SectionBox variant="surface">
        <SectionTitle id="later-phase">Built, But Belongs to Later Roadmap Phases</SectionTitle>
        <p style={{ ...bodyText, marginBottom: '1rem' }}>
          This work is done but not part of the current frontend conversation. It will become relevant in later phases.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.25rem' }}>
          {laterPhaseWork.map((cat, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(24,29,38,0.06)',
            }}>
              <h3 style={heading3}>{cat.category}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', listStyleType: 'disc' }}>
                {cat.items.map((item, j) => (
                  <li key={j} style={{ ...bodyText, marginBottom: '0.375rem', fontSize: 'var(--text-caption)' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── TIME INVESTMENT ─────────────────────────────────── */}
      <SectionBox>
        <SectionTitle id="time">Approximate Time Investment</SectionTitle>
        <p style={{ ...caption, marginBottom: '1rem' }}>
          Estimates based on development session records. Ranges used where exact tracking is unavailable.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--text-body)',
          }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.625rem 1rem', borderBottom: '2px solid rgba(24,29,38,0.08)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#181d26', fontSize: 'var(--text-caption)' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '0.625rem 1rem', borderBottom: '2px solid rgba(24,29,38,0.08)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#181d26', fontSize: 'var(--text-caption)', whiteSpace: 'nowrap' }}>Days</th>
                <th style={{ textAlign: 'left', padding: '0.625rem 1rem', borderBottom: '2px solid rgba(24,29,38,0.08)', fontFamily: 'var(--font-display)', fontWeight: 600, color: '#181d26', fontSize: 'var(--text-caption)' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {timeInvestment.map((t, i) => (
                <tr key={i}>
                  <td style={{ padding: '0.625rem 1rem', borderBottom: '1px solid rgba(24,29,38,0.04)', fontWeight: 600, color: '#181d26' }}>{t.category}</td>
                  <td style={{ padding: '0.625rem 1rem', borderBottom: '1px solid rgba(24,29,38,0.04)', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#1b61c9', whiteSpace: 'nowrap' }}>{t.days}</td>
                  <td style={{ padding: '0.625rem 1rem', borderBottom: '1px solid rgba(24,29,38,0.04)', ...caption }}>{t.note}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#181d26', fontFamily: 'var(--font-display)', borderTop: '2px solid rgba(24,29,38,0.08)' }}>Total estimate</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#1b61c9', fontFamily: 'var(--font-display)', borderTop: '2px solid rgba(24,29,38,0.08)', whiteSpace: 'nowrap' }}>~22–29 days</td>
                <td style={{ padding: '0.75rem 1rem', borderTop: '2px solid rgba(24,29,38,0.08)', ...caption }}>Cumulative AI-assisted development time</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </SectionBox>

      {/* ── V3 ROADMAP FIT ──────────────────────────────────── */}
      <SectionBox variant="surface">
        <SectionTitle id="roadmap">V3 Roadmap Fit</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {roadmapPhases.map((p, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem 1.25rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${p.status === 'active' ? 'rgba(27,97,201,0.2)' : 'rgba(24,29,38,0.06)'}`,
              borderLeft: `3px solid ${
                p.status === 'done' ? '#059669' :
                p.status === 'active' ? '#1b61c9' :
                p.status === 'next' ? '#b45309' :
                '#d1d5db'
              }`,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-body)', color: '#181d26' }}>
                    {p.phase}: {p.name}
                  </span>
                  <Badge status={p.status} />
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', listStyleType: 'disc' }}>
                  {p.items.map((item, j) => (
                    <li key={j} style={{ ...caption, marginBottom: '0.25rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SectionBox>

      {/* ── NEXT DECISIONS ──────────────────────────────────── */}
      <SectionBox>
        <SectionTitle id="decisions">Next Decisions Needed</SectionTitle>
        <p style={{ ...bodyText, marginBottom: '1rem' }}>
          These are open questions that need a decision before work can proceed in the relevant area.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {nextDecisions.map((d, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.625rem 1rem',
              background: 'rgba(254,243,199,0.3)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(180,83,9,0.1)',
            }}>
              <span style={{ fontSize: '0.875rem', flexShrink: 0 }}>⬜</span>
              <span style={{ ...bodyText, color: '#181d26' }}>{d}</span>
            </div>
          ))}
        </div>
      </SectionBox>
    </PageShell>
  )
}
