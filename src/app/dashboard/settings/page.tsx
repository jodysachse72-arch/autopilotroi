'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   PARTNER PROFILE SETTINGS — Lightweight CRM
   Personal info, password change, social links, notifications
   ═══════════════════════════════════════════════════════════════ */

interface ProfileData {
  fullName: string
  email: string
  phone: string
  company: string
  bio: string
  timezone: string
  socialLinks: {
    facebook: string
    instagram: string
    youtube: string
    linkedin: string
    twitter: string
    tiktok: string
  }
  notifications: {
    email: boolean
    telegram: boolean
    weeklyDigest: boolean
    newLeadAlert: boolean
  }
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type ToastType = 'success' | 'error'

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'America/Toronto',
  'America/Vancouver',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
  'Australia/Sydney',
  'Pacific/Auckland',
]

const defaultProfile: ProfileData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  bio: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  socialLinks: {
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    twitter: '',
    tiktok: '',
  },
  notifications: {
    email: true,
    telegram: false,
    weeklyDigest: true,
    newLeadAlert: true,
  },
}

function SectionCard({
  title,
  icon,
  delay = 0,
  children,
}: {
  title: string
  icon: string
  delay?: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
    >
      <div className="border-b border-[var(--border-primary)] bg-white/[0.02] px-6 py-4">
        <h2 className="flex items-center gap-2 font-[var(--font-sora)] text-base font-semibold text-[var(--text-primary)]">
          <span>{icon}</span> {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  )
}

function FieldLabel({ label, optional }: { label: string; optional?: boolean }) {
  return (
    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
      {label}
      {optional && <span className="ml-1 text-xs text-[var(--text-muted)]">(optional)</span>}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  maxLength,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  type?: string
  disabled?: boolean
  maxLength?: number
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={`w-full rounded-xl border border-[var(--border-primary)] bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-blue-500 transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    />
  )
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile)
  const [passwords, setPasswords] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [saving, setSaving] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  /* ── Load profile data ── */
  const loadProfile = useCallback(async () => {
    // Check for demo mode
    const demoUser = localStorage.getItem('autopilotroi-demo-user')
    if (demoUser) {
      const parsed = JSON.parse(demoUser)
      setIsDemoMode(true)
      setProfile((prev) => ({
        ...prev,
        fullName: parsed.name || '',
        email: parsed.email || '',
      }))
      // Load saved profile data from localStorage
      const savedProfile = localStorage.getItem('autopilotroi-partner-profile')
      if (savedProfile) {
        const saved = JSON.parse(savedProfile)
        setProfile((prev) => ({ ...prev, ...saved }))
      }
      return
    }

    // Try Supabase
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileData) {
          setProfile({
            fullName: profileData.full_name || '',
            email: profileData.email || user.email || '',
            phone: profileData.phone || '',
            company: profileData.company || '',
            bio: profileData.bio || '',
            timezone: profileData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            socialLinks: profileData.social_links || defaultProfile.socialLinks,
            notifications: profileData.notification_preferences || defaultProfile.notifications,
          })
        }
      }
    } catch {
      // Supabase not configured — stay in default state
    }
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  function showToast(message: string, type: ToastType) {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  /* ── Profile field update helper ── */
  function updateProfile<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  function updateSocial(key: keyof ProfileData['socialLinks'], value: string) {
    setProfile((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }))
  }

  function updateNotification(key: keyof ProfileData['notifications'], value: boolean) {
    setProfile((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }

  /* ── Save personal info ── */
  async function savePersonalInfo() {
    setSaving('personal')
    try {
      if (isDemoMode) {
        const demoUser = JSON.parse(localStorage.getItem('autopilotroi-demo-user') || '{}')
        demoUser.name = profile.fullName
        localStorage.setItem('autopilotroi-demo-user', JSON.stringify(demoUser))
        localStorage.setItem(
          'autopilotroi-partner-profile',
          JSON.stringify({
            fullName: profile.fullName,
            phone: profile.phone,
            company: profile.company,
            bio: profile.bio,
            timezone: profile.timezone,
          })
        )
        showToast('Profile saved successfully!', 'success')
      } else {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { error } = await supabase
            .from('profiles')
            .update({
              full_name: profile.fullName,
              phone: profile.phone,
              company: profile.company,
              bio: profile.bio,
              timezone: profile.timezone,
            })
            .eq('id', user.id)
          if (error) throw error
          showToast('Profile saved successfully!', 'success')
        }
      }
    } catch {
      showToast('Failed to save profile. Please try again.', 'error')
    } finally {
      setSaving(null)
    }
  }

  /* ── Save social links ── */
  async function saveSocialLinks() {
    setSaving('social')
    try {
      if (isDemoMode) {
        const saved = JSON.parse(localStorage.getItem('autopilotroi-partner-profile') || '{}')
        saved.socialLinks = profile.socialLinks
        localStorage.setItem('autopilotroi-partner-profile', JSON.stringify(saved))
        showToast('Social links saved!', 'success')
      } else {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { error } = await supabase
            .from('profiles')
            .update({ social_links: profile.socialLinks })
            .eq('id', user.id)
          if (error) throw error
          showToast('Social links saved!', 'success')
        }
      }
    } catch {
      showToast('Failed to save social links.', 'error')
    } finally {
      setSaving(null)
    }
  }

  /* ── Save notification prefs ── */
  async function saveNotifications() {
    setSaving('notifications')
    try {
      if (isDemoMode) {
        const saved = JSON.parse(localStorage.getItem('autopilotroi-partner-profile') || '{}')
        saved.notifications = profile.notifications
        localStorage.setItem('autopilotroi-partner-profile', JSON.stringify(saved))
        showToast('Notification preferences saved!', 'success')
      } else {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { error } = await supabase
            .from('profiles')
            .update({ notification_preferences: profile.notifications })
            .eq('id', user.id)
          if (error) throw error
          showToast('Notification preferences saved!', 'success')
        }
      }
    } catch {
      showToast('Failed to save notifications.', 'error')
    } finally {
      setSaving(null)
    }
  }

  /* ── Change password ── */
  async function changePassword() {
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast('New passwords do not match.', 'error')
      return
    }
    if (passwords.newPassword.length < 8) {
      showToast('Password must be at least 8 characters.', 'error')
      return
    }

    setSaving('password')
    try {
      if (isDemoMode) {
        showToast('Password updated (demo mode).', 'success')
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { error } = await supabase.auth.updateUser({
          password: passwords.newPassword,
        })
        if (error) throw error
        showToast('Password updated successfully!', 'success')
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch {
      showToast('Failed to update password. Check your current password.', 'error')
    } finally {
      setSaving(null)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
          Profile Settings
        </h1>
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">
          Manage your partner profile, security, and notification preferences.
        </p>
        {isDemoMode && (
          <div className="mt-3 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
            🟡 Demo mode — changes are saved locally
          </div>
        )}
      </motion.div>

      {/* ───── Section 1: Personal Info ───── */}
      <SectionCard title="Personal Information" icon="👤" delay={0.05}>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel label="Full Name" />
              <TextInput
                value={profile.fullName}
                onChange={(v) => updateProfile('fullName', v)}
                placeholder="Your full name"
              />
            </div>
            <div>
              <FieldLabel label="Email" />
              <TextInput value={profile.email} onChange={() => {}} placeholder="" disabled />
              <p className="mt-1 text-xs text-[var(--text-muted)]">Contact support to change email</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel label="Phone Number" optional />
              <TextInput
                value={profile.phone}
                onChange={(v) => updateProfile('phone', v)}
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </div>
            <div>
              <FieldLabel label="Company / Organization" optional />
              <TextInput
                value={profile.company}
                onChange={(v) => updateProfile('company', v)}
                placeholder="Your company name"
              />
            </div>
          </div>

          <div>
            <FieldLabel label="Bio" optional />
            <textarea
              value={profile.bio}
              onChange={(e) => updateProfile('bio', e.target.value)}
              placeholder="Tell prospects a bit about yourself (280 characters max)"
              maxLength={280}
              rows={3}
              className="w-full rounded-xl border border-[var(--border-primary)] bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-blue-500 transition resize-none"
            />
            <p className="mt-1 text-xs text-[var(--text-muted)] text-right">
              {profile.bio.length}/280
            </p>
          </div>

          <div className="sm:w-1/2">
            <FieldLabel label="Timezone" optional />
            <select
              value={profile.timezone}
              onChange={(e) => updateProfile('timezone', e.target.value)}
              className="w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={savePersonalInfo}
              disabled={saving === 'personal'}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {saving === 'personal' ? 'Saving…' : 'Save Personal Info'}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* ───── Section 2: Security ───── */}
      <SectionCard title="Security" icon="🔒" delay={0.1}>
        <div className="space-y-4">
          <div>
            <FieldLabel label="Current Password" />
            <TextInput
              value={passwords.currentPassword}
              onChange={(v) => setPasswords((p) => ({ ...p, currentPassword: v }))}
              placeholder="Enter current password"
              type="password"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel label="New Password" />
              <TextInput
                value={passwords.newPassword}
                onChange={(v) => setPasswords((p) => ({ ...p, newPassword: v }))}
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
            <div>
              <FieldLabel label="Confirm New Password" />
              <TextInput
                value={passwords.confirmPassword}
                onChange={(v) => setPasswords((p) => ({ ...p, confirmPassword: v }))}
                placeholder="Re-enter new password"
                type="password"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={changePassword}
              disabled={saving === 'password' || !passwords.newPassword}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {saving === 'password' ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* ───── Section 3: Social Links ───── */}
      <SectionCard title="Social Links" icon="🌐" delay={0.15}>
        <p className="text-xs text-[var(--text-tertiary)] mb-4">
          Add your social profiles so prospects can learn more about you. All fields are optional.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourpage', icon: '📘' },
              { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle', icon: '📸' },
              { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourchannel', icon: '▶️' },
              { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourprofile', icon: '💼' },
              { key: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/yourhandle', icon: '🐦' },
              { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourhandle', icon: '🎵' },
            ] as const
          ).map((social) => (
            <div key={social.key}>
              <FieldLabel label={`${social.icon} ${social.label}`} optional />
              <TextInput
                value={profile.socialLinks[social.key]}
                onChange={(v) => updateSocial(social.key, v)}
                placeholder={social.placeholder}
                type="url"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={saveSocialLinks}
            disabled={saving === 'social'}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {saving === 'social' ? 'Saving…' : 'Save Social Links'}
          </button>
        </div>
      </SectionCard>

      {/* ───── Section 4: Notifications ───── */}
      <SectionCard title="Notification Preferences" icon="🔔" delay={0.2}>
        <div className="space-y-4">
          {(
            [
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates and alerts via email' },
              { key: 'telegram', label: 'Telegram Notifications', desc: 'Get instant alerts in Telegram' },
              { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your referral performance every Monday' },
              { key: 'newLeadAlert', label: 'New Lead Alerts', desc: 'Get notified immediately when a new prospect signs up' },
            ] as const
          ).map((pref) => (
            <div
              key={pref.key}
              className="flex items-center justify-between rounded-xl bg-white/[0.02] px-4 py-3"
            >
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">{pref.label}</div>
                <div className="text-xs text-[var(--text-tertiary)]">{pref.desc}</div>
              </div>
              <button
                onClick={() => updateNotification(pref.key, !profile.notifications[pref.key])}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  profile.notifications[pref.key] ? 'bg-blue-600' : 'bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                    profile.notifications[pref.key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <button
              onClick={saveNotifications}
              disabled={saving === 'notifications'}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {saving === 'notifications' ? 'Saving…' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </SectionCard>

      {/* ───── Toast Notification ───── */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-medium shadow-2xl ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </motion.div>
      )}
    </div>
  )
}
