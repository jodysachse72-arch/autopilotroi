'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SectionHeader,
  Card,
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormButton,
  FormRow,
  StatusBadge,
} from '@/components/backend'

/* ─────────────────────────────────────────────────────────────────
   PARTNER · SETTINGS  (/dashboard/settings)
   Personal info, password, social links, notification prefs.
   Persists to Supabase profiles table or localStorage in demo mode.
   ───────────────────────────────────────────────────────────────── */

interface ProfileData {
  fullName: string
  email:    string
  phone:    string
  company:  string
  bio:      string
  timezone: string
  socialLinks: {
    facebook:  string
    instagram: string
    youtube:   string
    linkedin:  string
    twitter:   string
    tiktok:    string
  }
  notifications: {
    email:        boolean
    telegram:     boolean
    weeklyDigest: boolean
    newLeadAlert: boolean
  }
}

interface PasswordData {
  currentPassword: string
  newPassword:     string
  confirmPassword: string
}

type ToastType = 'success' | 'error'

const TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu', 'America/Toronto', 'America/Vancouver',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Dubai',
  'Australia/Sydney', 'Pacific/Auckland',
]

const SOCIAL_FIELDS = [
  { key: 'facebook',  label: 'Facebook',     placeholder: 'https://facebook.com/yourpage',      icon: '📘' },
  { key: 'instagram', label: 'Instagram',    placeholder: 'https://instagram.com/yourhandle',   icon: '📸' },
  { key: 'youtube',   label: 'YouTube',      placeholder: 'https://youtube.com/@yourchannel',   icon: '▶️' },
  { key: 'linkedin',  label: 'LinkedIn',     placeholder: 'https://linkedin.com/in/yourprofile', icon: '💼' },
  { key: 'twitter',   label: 'X / Twitter',  placeholder: 'https://x.com/yourhandle',           icon: '🐦' },
  { key: 'tiktok',    label: 'TikTok',       placeholder: 'https://tiktok.com/@yourhandle',     icon: '🎵' },
] as const

const NOTIFICATION_PREFS = [
  { key: 'email',        label: 'Email notifications',     desc: 'Receive updates and alerts via email' },
  { key: 'telegram',     label: 'Telegram notifications',  desc: 'Get instant alerts in Telegram' },
  { key: 'weeklyDigest', label: 'Weekly digest',           desc: 'Summary of your referral performance every Monday' },
  { key: 'newLeadAlert', label: 'New lead alerts',         desc: 'Get notified immediately when a new prospect signs up' },
] as const

const defaultProfile: ProfileData = {
  fullName: '', email: '', phone: '', company: '', bio: '',
  timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'America/New_York',
  socialLinks:   { facebook: '', instagram: '', youtube: '', linkedin: '', twitter: '', tiktok: '' },
  notifications: { email: true,  telegram: false, weeklyDigest: true, newLeadAlert: true },
}

/* ── Animated section card ────────────────────────────────────── */
function SectionCard({
  title, icon, delay = 0, children,
}: {
  title: string
  icon:  string
  delay?: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card padding="flush" className="overflow-hidden">
        <div className="border-b border-[#e0e2e6] bg-[#f8fafc] px-6 py-4">
          <h2 className="flex items-center gap-2 font-[var(--font-sora)] text-base font-semibold text-[#181d26]">
            <span>{icon}</span> {title}
          </h2>
        </div>
        <div className="p-6">{children}</div>
      </Card>
    </motion.div>
  )
}

export default function SettingsPage() {
  const [profile, setProfile]       = useState<ProfileData>(defaultProfile)
  const [passwords, setPasswords]   = useState<PasswordData>({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [saving, setSaving]         = useState<string | null>(null)
  const [toast, setToast]           = useState<{ message: string; type: ToastType } | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  /* ── Load profile data ── */
  const loadProfile = useCallback(async () => {
    const demoUser = localStorage.getItem('autopilotroi-demo-user')
    if (demoUser) {
      const parsed = JSON.parse(demoUser)
      setIsDemoMode(true)
      setProfile(prev => ({ ...prev, fullName: parsed.name || '', email: parsed.email || '' }))
      const savedProfile = localStorage.getItem('autopilotroi-partner-profile')
      if (savedProfile) {
        const saved = JSON.parse(savedProfile)
        setProfile(prev => ({ ...prev, ...saved }))
      }
      return
    }

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
            email:    profileData.email || user.email || '',
            phone:    profileData.phone || '',
            company:  profileData.company || '',
            bio:      profileData.bio || '',
            timezone: profileData.timezone || defaultProfile.timezone,
            socialLinks:   profileData.social_links || defaultProfile.socialLinks,
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

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const updateProfile = useCallback(<K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfile(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateSocial = useCallback((key: keyof ProfileData['socialLinks'], value: string) => {
    setProfile(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }))
  }, [])

  const updateNotification = useCallback((key: keyof ProfileData['notifications'], value: boolean) => {
    setProfile(prev => ({ ...prev, notifications: { ...prev.notifications, [key]: value } }))
  }, [])

  /* ── Save personal info ── */
  const savePersonalInfo = useCallback(async () => {
    setSaving('personal')
    try {
      if (isDemoMode) {
        const demoUser = JSON.parse(localStorage.getItem('autopilotroi-demo-user') || '{}')
        demoUser.name = profile.fullName
        localStorage.setItem('autopilotroi-demo-user', JSON.stringify(demoUser))
        localStorage.setItem('autopilotroi-partner-profile', JSON.stringify({
          fullName: profile.fullName, phone: profile.phone, company: profile.company,
          bio: profile.bio, timezone: profile.timezone,
        }))
        showToast('Profile saved successfully!', 'success')
      } else {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { error } = await supabase.from('profiles').update({
            full_name: profile.fullName,
            phone:     profile.phone,
            company:   profile.company,
            bio:       profile.bio,
            timezone:  profile.timezone,
          }).eq('id', user.id)
          if (error) throw error
          showToast('Profile saved successfully!', 'success')
        }
      }
    } catch {
      showToast('Failed to save profile. Please try again.', 'error')
    } finally {
      setSaving(null)
    }
  }, [isDemoMode, profile, showToast])

  /* ── Save social links ── */
  const saveSocialLinks = useCallback(async () => {
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
          const { error } = await supabase.from('profiles')
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
  }, [isDemoMode, profile.socialLinks, showToast])

  /* ── Save notification prefs ── */
  const saveNotifications = useCallback(async () => {
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
          const { error } = await supabase.from('profiles')
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
  }, [isDemoMode, profile.notifications, showToast])

  /* ── Change password ── */
  const changePassword = useCallback(async () => {
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
        const { error } = await supabase.auth.updateUser({ password: passwords.newPassword })
        if (error) throw error
        showToast('Password updated successfully!', 'success')
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch {
      showToast('Failed to update password. Check your current password.', 'error')
    } finally {
      setSaving(null)
    }
  }, [isDemoMode, passwords, showToast])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SectionHeader
        title="Profile settings"
        subtitle="Manage your partner profile, security, and notification preferences."
      />

      {isDemoMode && (
        <div className="flex items-center gap-2">
          <StatusBadge tone="amber">🟡 Demo mode</StatusBadge>
          <span className="text-xs text-[rgba(4,14,32,0.55)]">Changes are saved locally to this browser.</span>
        </div>
      )}

      {/* ── Personal info ── */}
      <SectionCard title="Personal information" icon="👤" delay={0.05}>
        <div className="space-y-4">
          <FormRow>
            <FormField label="Full name" required>
              <FormInput
                value={profile.fullName}
                onChange={(e) => updateProfile('fullName', e.target.value)}
                placeholder="Your full name"
              />
            </FormField>
            <FormField label="Email" help="Contact support to change email">
              <FormInput value={profile.email} readOnly disabled />
            </FormField>
          </FormRow>

          <FormRow>
            <FormField label="Phone number">
              <FormInput
                value={profile.phone}
                onChange={(e) => updateProfile('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </FormField>
            <FormField label="Company / organization">
              <FormInput
                value={profile.company}
                onChange={(e) => updateProfile('company', e.target.value)}
                placeholder="Your company name"
              />
            </FormField>
          </FormRow>

          <FormField label="Bio" help={`${profile.bio.length}/280 characters`}>
            <FormTextarea
              value={profile.bio}
              onChange={(e) => updateProfile('bio', e.target.value)}
              placeholder="Tell prospects a bit about yourself (280 characters max)"
              maxLength={280}
              rows={3}
            />
          </FormField>

          <div className="sm:w-1/2">
            <FormField label="Timezone">
              <FormSelect
                value={profile.timezone}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateProfile('timezone', e.target.value)}
              >
                {TIMEZONES.map(tz => (
                  <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </FormSelect>
            </FormField>
          </div>

          <div className="flex justify-end pt-2">
            <FormButton variant="primary" loading={saving === 'personal'} onClick={savePersonalInfo}>
              {saving === 'personal' ? 'Saving…' : 'Save personal info'}
            </FormButton>
          </div>
        </div>
      </SectionCard>

      {/* ── Security ── */}
      <SectionCard title="Security" icon="🔒" delay={0.1}>
        <div className="space-y-4">
          <FormField label="Current password">
            <FormInput
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords(p => ({ ...p, currentPassword: e.target.value }))}
              placeholder="Enter current password"
            />
          </FormField>
          <FormRow>
            <FormField label="New password" help="Min 8 characters">
              <FormInput
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords(p => ({ ...p, newPassword: e.target.value }))}
                placeholder="Min 8 characters"
              />
            </FormField>
            <FormField label="Confirm new password">
              <FormInput
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Re-enter new password"
              />
            </FormField>
          </FormRow>
          <div className="flex justify-end pt-2">
            <FormButton
              variant="primary"
              loading={saving === 'password'}
              disabled={!passwords.newPassword}
              onClick={changePassword}
            >
              {saving === 'password' ? 'Updating…' : 'Update password'}
            </FormButton>
          </div>
        </div>
      </SectionCard>

      {/* ── Social links ── */}
      <SectionCard title="Social links" icon="🌐" delay={0.15}>
        <p className="text-xs text-[rgba(4,14,32,0.55)] mb-4">
          Add your social profiles so prospects can learn more about you. All fields are optional.
        </p>
        <FormRow>
          {SOCIAL_FIELDS.map((social) => (
            <FormField key={social.key} label={`${social.icon} ${social.label}`}>
              <FormInput
                type="url"
                value={profile.socialLinks[social.key]}
                onChange={(e) => updateSocial(social.key, e.target.value)}
                placeholder={social.placeholder}
              />
            </FormField>
          ))}
        </FormRow>
        <div className="flex justify-end pt-4">
          <FormButton variant="primary" loading={saving === 'social'} onClick={saveSocialLinks}>
            {saving === 'social' ? 'Saving…' : 'Save social links'}
          </FormButton>
        </div>
      </SectionCard>

      {/* ── Notifications ── */}
      <SectionCard title="Notification preferences" icon="🔔" delay={0.2}>
        <div className="space-y-3">
          {NOTIFICATION_PREFS.map((pref) => (
            <div
              key={pref.key}
              className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3 border border-[#e0e2e6]"
            >
              <div>
                <div className="text-sm font-medium text-[#181d26]">{pref.label}</div>
                <div className="text-xs text-[rgba(4,14,32,0.55)]">{pref.desc}</div>
              </div>
              <button
                type="button"
                onClick={() => updateNotification(pref.key, !profile.notifications[pref.key])}
                aria-pressed={profile.notifications[pref.key]}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  profile.notifications[pref.key] ? 'bg-[#1b61c9]' : 'bg-[#cbd5e1]'
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
            <FormButton variant="primary" loading={saving === 'notifications'} onClick={saveNotifications}>
              {saving === 'notifications' ? 'Saving…' : 'Save preferences'}
            </FormButton>
          </div>
        </div>
      </SectionCard>

      {/* ── Toast ── */}
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  )
}
