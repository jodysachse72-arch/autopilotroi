'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFeatureFlags, FEATURE_META, type FeatureFlags } from '@/lib/feature-flags'
import { getAnnouncementMessage, setAnnouncementMessage } from '@/components/layout/AnnouncementBanner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ToggleLeft, ToggleRight, ChevronDown, ChevronRight } from 'lucide-react'

const riskStyle: Record<string, string> = {
  none:   'bg-green-100 text-green-800',
  low:    'bg-blue-100 text-blue-800',
  medium: 'bg-amber-100 text-amber-800',
  high:   'bg-red-100 text-red-800',
}

const riskLabel: Record<string, string> = {
  none:   'Safe',
  low:    'Low Risk',
  medium: 'Medium Risk',
  high:   '⚠️ High Risk',
}

export default function FeatureTogglesPage() {
  const { flags, setFlag } = useFeatureFlags()
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [bannerMsg, setBannerMsg] = useState('')
  const [bannerSaved, setBannerSaved] = useState(false)

  useEffect(() => {
    setBannerMsg(getAnnouncementMessage())
  }, [])

  const categories = [...new Set(Object.values(FEATURE_META).map((m) => m.category))]
  const activeCount = Object.values(flags).filter(Boolean).length
  const totalCount = Object.keys(flags).length

  const matchesSearch = (key: string) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    const meta = FEATURE_META[key as keyof FeatureFlags]
    return (
      meta.label.toLowerCase().includes(q) ||
      meta.description.toLowerCase().includes(q) ||
      meta.category.toLowerCase().includes(q)
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Feature Flags</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Turn features on and off instantly. Click any feature to see what it does.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active', value: activeCount },
          { label: 'Disabled', value: totalCount - activeCount },
          { label: 'Total', value: totalCount },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Categories */}
      {categories.map((category) => {
        const categoryFlags = (
          Object.entries(FEATURE_META) as [keyof FeatureFlags, typeof FEATURE_META[keyof FeatureFlags]][]
        ).filter(([key, meta]) => meta.category === category && matchesSearch(key))

        if (categoryFlags.length === 0) return null

        return (
          <Card key={category}>
            <CardHeader className="pb-0">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {categoryFlags.map(([key, meta]) => {
                  const isOn = flags[key]
                  const isDangerous = meta.risk === 'high'
                  const isExpanded = expandedFlag === key

                  return (
                    <div key={key} className={isDangerous && isOn ? 'bg-red-50/50' : ''}>
                      {/* Toggle row */}
                      <div className="flex items-center justify-between px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setExpandedFlag(isExpanded ? null : key)}
                          className="flex-1 min-w-0 pr-4 text-left"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">{meta.label}</span>
                            <Badge
                              className={`text-[10px] ${riskStyle[meta.risk]}`}
                              variant="outline"
                            >
                              {riskLabel[meta.risk]}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground rounded-full px-2 py-0.5 bg-muted">
                              {meta.phase}
                            </span>
                            {isExpanded
                              ? <ChevronDown className="h-3 w-3 text-muted-foreground" />
                              : <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            }
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{meta.description}</p>
                        </button>

                        {/* Toggle switch */}
                        <button
                          type="button"
                          onClick={() => setFlag(key, !isOn)}
                          aria-pressed={isOn}
                          aria-label={`${isOn ? 'Disable' : 'Enable'} ${meta.label}`}
                          className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          style={{ background: isOn ? (isDangerous ? '#ef4444' : '#1b61c9') : '#d1d5db' }}
                        >
                          <span
                            className="inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200"
                            style={{ transform: isOn ? 'translateX(22px)' : 'translateX(4px)' }}
                          />
                        </button>
                      </div>

                      {/* Expanded documentation */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 space-y-3 bg-muted/30">
                              <div className="rounded-lg border bg-background p-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">What It Does</h4>
                                <p className="text-sm text-muted-foreground">{meta.description}</p>
                              </div>
                              <div className="rounded-lg border bg-background p-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-1">Why It Matters</h4>
                                <p className="text-sm text-muted-foreground">{meta.why}</p>
                              </div>
                              <div className="rounded-lg border bg-background p-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">When To Use</h4>
                                <p className="text-sm text-muted-foreground">{meta.whenToUse}</p>
                              </div>
                              {key === 'announcementBanner' && (
                                <div className="rounded-lg border bg-blue-50 p-3">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Edit Banner Message</h4>
                                  <div className="flex gap-2">
                                    <Input
                                      value={bannerMsg}
                                      onChange={(e) => { setBannerMsg(e.target.value); setBannerSaved(false) }}
                                      placeholder="Enter announcement message…"
                                      className="flex-1 bg-white"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => { setAnnouncementMessage(bannerMsg); setBannerSaved(true); window.setTimeout(() => setBannerSaved(false), 2000) }}
                                    >
                                      {bannerSaved ? '✓ Saved' : 'Save'}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
