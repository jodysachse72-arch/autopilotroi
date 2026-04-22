import type { ReactNode } from 'react'

/**
 * The dark navy panel with browser chrome + screenshot + status bar.
 * Used for showcasing dashboards/products inside light sections (e.g. the
 * "How it works" section pairs this against the numbered steps).
 *
 * Pass `image` for a static screenshot or `children` to render anything inside the chrome.
 *
 * Usage:
 *   <ProductPanel
 *     url="app.aurum.foundation"
 *     image={{ src: '/aurum-bot-dashboard.png', alt: 'Aurum EX-AI Dashboard' }}
 *     status={{ label: 'EX-AI Bot · Live', meta: '24/7 Active' }}
 *   />
 */
export default function ProductPanel({
  url,
  image,
  children,
  status,
  reveal = true,
}: {
  url?: string
  image?: { src: string; alt: string }
  children?: ReactNode
  status?: { label: ReactNode; meta?: ReactNode; color?: string }
  reveal?: boolean
}) {
  const dotColor = status?.color ?? '#34d399'
  return (
    <div className={reveal ? 'reveal' : ''} style={{ position: 'relative' }}>
      <div style={{
        background: '#181d26',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Browser chrome */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0.6rem 1rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
          {url && (
            <span style={{
              flex: 1, textAlign: 'center', fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.25)', marginLeft: '-1.25rem',
            }}>
              {url}
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ position: 'relative' }}>
          {image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(24,29,38,0) 0%, rgba(24,29,38,0.15) 100%)',
              }} />
            </>
          ) : (
            children
          )}
        </div>

        {/* Status bar */}
        {status && (
          <div style={{
            padding: '0.875rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.625rem',
          }}>
            <div style={{
              width: '0.5rem', height: '0.5rem', borderRadius: '50%',
              background: dotColor,
              boxShadow: `0 0 6px ${dotColor}b3`,
            }} />
            <span style={{
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.50)',
              fontFamily: 'var(--font-display)', fontWeight: 600,
            }}>
              {status.label}
            </span>
            {status.meta && (
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
                {status.meta}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
