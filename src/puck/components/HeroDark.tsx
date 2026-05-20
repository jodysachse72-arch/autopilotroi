'use client'

import type { ComponentConfig } from '@puckeditor/core'
import { richTextField } from '@/lib/puck-editor'
import VideoModal from '@/components/ui/VideoModal'
import HeroDarkSection from '@/components/sections/HeroDark'
import type { HeroDarkProps } from '../types'

export const HeroDark: ComponentConfig<HeroDarkProps> = {
  label: 'Hero (Dark)',
  fields: {
    badge:           { type: 'text', contentEditable: true },
    title:           { type: 'text', contentEditable: true },
    highlightedText: { type: 'text', contentEditable: true },
    description:     richTextField(),
    ctaLabel:        { type: 'text', contentEditable: true },
    ctaHref:         { type: 'text' },
    bulletOne:       { type: 'text', contentEditable: true },
    bulletTwo:       { type: 'text', contentEditable: true },
    bulletThree:     { type: 'text', contentEditable: true },
    videoUrl:        { type: 'text', label: 'Video URL (YouTube)' },
    videoThumb:      { type: 'text', label: 'Thumbnail URL' },
  },
  defaultProps: {
    badge:           '✦ Powered by Aurum Ecosystem',
    title:           'Your Money,',
    highlightedText: 'Working 24/7',
    description:     'AutoPilotROI is your structured guide into the Aurum ecosystem — AI-powered crypto trading, a Visa crypto card, exchange, and Web3 neobank. Start with $100.',
    ctaLabel:        'Start Here →',
    ctaHref:         '/signup',
    bulletOne:       'Start with $100 USDT',
    bulletTwo:       'AI runs 24/7',
    bulletThree:     'Guided onboarding',
    videoUrl:        'https://youtu.be/MmAnR4YAPv4',
    videoThumb:      'https://i.ytimg.com/vi/MmAnR4YAPv4/hqdefault.jpg',
  },
  render: ({ badge, title, highlightedText, description, ctaLabel, ctaHref, bulletOne, bulletTwo, bulletThree, videoUrl, videoThumb }) => {
    const videoVisual = videoUrl ? (
      <VideoModal videoUrl={videoUrl} ctaLabel="Start Here →" ctaHref={ctaHref || '/signup'}>
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(255,255,255,0.10)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginLeft: '-1.5rem' }}>
              app.autopilotroi.com
            </span>
          </div>
          <div style={{ position: 'relative', aspectRatio: '16/9' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={videoThumb || `https://i.ytimg.com/vi/${(videoUrl || '').split('/').pop()?.split('?')[0]}/hqdefault.jpg`}
              alt="AutoPilotROI Overview Video"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'rgba(255,0,0,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 32px rgba(255,0,0,0.55)',
              }}>
                <svg width="22" height="26" viewBox="0 0 22 26" fill="white">
                  <path d="M0 0L22 13L0 26V0Z" />
                </svg>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
              <span style={{
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                borderRadius: '99px',
                padding: '0.375rem 1rem',
                fontSize: '0.8125rem',
                color: 'rgba(255,255,255,0.88)',
                fontWeight: 500,
              }}>
                ▶ Watch Overview
              </span>
            </div>
          </div>
        </div>
      </VideoModal>
    ) : undefined

    return (
      <HeroDarkSection
        badge={badge}
        title={
          <>
            {title}
            <br />
            <span style={{ color: '#93c5fd' }}>{highlightedText}</span>
          </>
        }
        description={description}
        ctas={[{ label: ctaLabel, href: ctaHref, variant: 'primary' }]}
        bullets={[
          { icon: '✓', text: bulletOne },
          { icon: '✓', text: bulletTwo },
          { icon: '✓', text: bulletThree },
        ]}
        visual={videoVisual}
        innerStyle={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)', paddingBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
      />
    )
  },
}
