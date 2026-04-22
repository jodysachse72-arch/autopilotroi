import React from 'react'

export function AutomationIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M16 2l-4 4 4 4" />
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M12 16v2" />
      <path d="M12 22v-2" />
      <path d="M8 18v-2" />
      <path d="M16 18v-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function GrowthIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21h18" />
      <path d="M3 10l5-5 4 4 9-9" />
      <path d="M16 3h5v5" />
      <path d="M7 16v-2" />
      <path d="M12 16v-4" />
      <path d="M17 16v-6" />
    </svg>
  )
}

export function SecurityIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M8 11l3 3 5-5" />
      <path d="M12 8v4" />
    </svg>
  )
}

export function DataIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      <path d="M3 19c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      <path d="M12 5v17" />
    </svg>
  )
}

export function EcosystemIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
      <path d="M22 12A10 10 0 0 0 12 2v0" />
    </svg>
  )
}

export function ExchangeIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 16H4v4h4v-4z" />
      <path d="M20 8h-4V4h4v4z" />
      <path d="M16 16h4v4h-4v-4z" />
      <path d="M8 8H4V4h4v4z" />
      <path d="M12 12l-4 4" />
      <path d="M12 12l4-4" />
      <path d="M12 12l4 4" />
      <path d="M12 12L8 8" />
    </svg>
  )
}

export function BankIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="10" width="4" height="8" rx="1" />
      <rect x="10" y="10" width="4" height="8" rx="1" />
      <rect x="17" y="10" width="4" height="8" rx="1" />
      <path d="M2 20h20" />
      <path d="M2 10V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
      <path d="M12 3v3" />
      <path d="M9 4l3-2 3 2" />
    </svg>
  )
}

export function CardIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <path d="M6 15h4" />
      <path d="M14 15h2" />
    </svg>
  )
}

export function OnboardingIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      <circle cx="12" cy="12" r="10" strokeDasharray="2 4" />
    </svg>
  )
}

export function PartnerIcon({ className = "w-6 h-6", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
