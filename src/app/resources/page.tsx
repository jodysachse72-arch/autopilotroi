'use client'

import Link from 'next/link'
import { useState } from 'react'
import { resourcesMeta, resourceSections, socialChannels, backOfficeLinks } from '@/content/resources'

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filterTabs = [
    { id: 'all', label: 'All Resources' },
    ...resourceSections.map((s) => ({ id: s.id, label: `${s.icon} ${s.label}` })),
    { id: 'social', label: '🤼 Social & Community' },
  ]

  const visibleSections = activeFilter === 'all'
    ? resourceSections
    : resourceSections.filter((s) => s.id === activeFilter)

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Gated banner */}
      <div className="bg-gray-900 text-white py-4 px-4 text-center">
        <p className="text-sm font-semibold">{resourcesMeta.gateBadge}</p>
        <p className="text-xs text-gray-400 mt-1">{resourcesMeta.gateDescription}</p>
        <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full font-medium">
          {resourcesMeta.gateStatus}
        </span>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">{resourcesMeta.headline}</h1>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">{resourcesMeta.subheadline}</h2>
              <p className="text-gray-500 max-w-xl">{resourcesMeta.description}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">BG</div>
                <span>Curated by {resourcesMeta.curatorName} · Last updated {resourcesMeta.lastUpdated}</span>
              </div>
            </div>
            <div className="flex gap-6">
              {resourcesMeta.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mt-8 overflow-x-auto pb-2 scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Resource sections */}
        {visibleSections.map((section) => (
          <div key={section.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="font-black text-gray-900 text-lg">{section.title}</h2>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{section.count} resources</span>
                </div>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
              {section.updatedDate && (
                <span className="text-xs text-gray-400 shrink-0">Updated {section.updatedDate}</span>
              )}
            </div>

            <div className="divide-y divide-gray-50">
              {section.resources.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition-colors group"
                >
                  <span className="text-xl shrink-0">{resource.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{resource.title}</span>
                      {resource.badge && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          resource.badge === 'New' || resource.badge === 'New Feature'
                            ? 'bg-green-100 text-green-700'
                            : resource.badge === 'Must Read'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {resource.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {resource.type}{resource.duration && ` · ${resource.duration}`} · {resource.source}
                    </div>
                    {resource.note && (
                      <div className="text-xs text-amber-600 mt-1">🔑 {resource.note}</div>
                    )}
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-500 transition-colors text-sm shrink-0">→</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Social & Community */}
        {(activeFilter === 'all' || activeFilter === 'social') && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50">
              <h2 className="font-black text-gray-900 text-lg">🤼 Aurum Social & Community</h2>
              <p className="text-sm text-gray-500">Official Aurum channels. Stay connected, get updates, and attend MASTERY calls.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {socialChannels.map((channel) => (
                <Link
                  key={channel.platform}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                >
                  <span className="text-xl">{channel.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{channel.platform}</div>
                    <div className="text-xs text-gray-400">{channel.handle}</div>
                  </div>
                  <span className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Office */}
        {(activeFilter === 'all' || activeFilter === 'social') && (
          <div className="bg-gray-900 text-white rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="font-black text-lg">🔐 Back Office & Support</h2>
              <p className="text-sm text-gray-400">Your Aurum dashboard is where everything happens — deposits, withdrawals, bot management, and your portfolio overview.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 p-6">
              {backOfficeLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{link.title}</span>
                  <span className="ml-auto text-gray-600 group-hover:text-gray-300 transition-colors text-sm">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
