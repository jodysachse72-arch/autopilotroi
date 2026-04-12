'use client'

import { useTheme } from '@/components/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className="theme-toggle"
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      {/* Track */}
      <span className="theme-toggle__track">
        {/* Moon icon (dark side) */}
        <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
          🌙
        </span>
        {/* Sun icon (light side) */}
        <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
          ☀️
        </span>
        {/* Thumb */}
        <span
          className="theme-toggle__thumb"
          style={{ transform: isLight ? 'translateX(22px)' : 'translateX(2px)' }}
        />
      </span>
    </button>
  )
}
