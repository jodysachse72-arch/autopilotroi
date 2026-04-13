'use client'

/* ═══════════════════════════════════════════════════════════════
   CONTENT STORE — In-app CMS engine
   
   localStorage-first, Supabase-ready architecture.
   Manages: Blog posts, FAQs, University videos, Resources,
   and per-page editable copy (homepage, products, etc.)
   
   Features:
   - CRUD for all content types
   - 50-step undo history (Ctrl+Z)
   - Export/Import as JSON
   - Demo seed data on first visit
   - Change timestamps + actor tracking
   ═══════════════════════════════════════════════════════════════ */

// ── Types ───────────────────────────────────────────────────

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string           // markdown or plain text
  author: string
  category: string
  featured: boolean
  publishedAt: string    // ISO date
  updatedAt: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

export interface VideoItem {
  id: string
  title: string
  youtubeId: string
  description: string
  category: string
  duration: string
  order: number
  featured: boolean
  section: 'university' | 'media'   // which page it belongs to
}

export interface ResourceItem {
  id: string
  title: string
  category: string
  type: string           // 'video' | 'pdf' | 'link' | 'tool'
  url: string
  duration?: string
  source?: string
  badge?: string
  note?: string
  order: number
}

export interface PageCopy {
  [key: string]: string  // flexible key-value for any page section
}

export interface ContentStore {
  blogs: BlogPost[]
  faqs: FaqItem[]
  videos: VideoItem[]
  resources: ResourceItem[]
  pages: Record<string, PageCopy>   // keyed by page name
}

// ── Undo System ─────────────────────────────────────────────

interface UndoEntry {
  timestamp: string
  description: string
  snapshot: string        // JSON snapshot of full store before change
}

const STORAGE_KEY = 'autopilotroi-cms-content'
const UNDO_KEY = 'autopilotroi-cms-undo'
const MAX_UNDO = 50

// ── Demo Seed Data ──────────────────────────────────────────

const SEED_BLOGS: BlogPost[] = [
  {
    id: 'blog-1', title: 'Getting Started with the Aurum Ecosystem', slug: 'getting-started-with-aurum',
    excerpt: "A complete beginner's guide to understanding what Aurum offers, how the products work together, and why this ecosystem is different from anything else in the market.",
    body: '', author: 'Barry Goss', category: 'education', featured: true,
    publishedAt: '2026-04-10', updatedAt: '2026-04-10',
  },
  {
    id: 'blog-2', title: 'EX-AI Bot Performance: March 2026 Report', slug: 'ex-ai-bot-performance',
    excerpt: "Breaking down the EX-AI Bot's performance over the past month, including ROI metrics, market conditions, and strategy adjustments made by the AI.",
    body: '', author: 'Team AutoPilot ROI', category: 'product-updates', featured: false,
    publishedAt: '2026-04-05', updatedAt: '2026-04-05',
  },
  {
    id: 'blog-3', title: 'Partner Onboarding Best Practices', slug: 'partner-onboarding-best-practices',
    excerpt: 'How top partners are converting prospects into active members with a structured onboarding approach. Tips, scripts, and the psychology behind it.',
    body: '', author: 'Barry Goss', category: 'partner-resources', featured: false,
    publishedAt: '2026-04-02', updatedAt: '2026-04-02',
  },
  {
    id: 'blog-4', title: 'Why VPNs Matter for Crypto Users in 2026', slug: 'understanding-vpns-for-crypto',
    excerpt: 'A practical guide to VPNs — what they are, why you need one for crypto, and which ones we recommend for Aurum members.',
    body: '', author: 'Team AutoPilot ROI', category: 'education', featured: false,
    publishedAt: '2026-03-28', updatedAt: '2026-03-28',
  },
  {
    id: 'blog-5', title: 'Aurum NeoBank: The Future of Banking is Here', slug: 'neobank-launch',
    excerpt: "Aurum's NeoBank combines the best of traditional banking with Web 3.0 technology. Store, earn, and spend — all from one platform.",
    body: '', author: 'Barry Goss', category: 'announcements', featured: false,
    publishedAt: '2026-03-20', updatedAt: '2026-03-20',
  },
  {
    id: 'blog-6', title: 'Crypto Market Outlook: Q2 2026', slug: 'market-outlook-q2-2026',
    excerpt: "Our analysis of the current crypto market, upcoming catalysts, and how Aurum's AI bots are positioned to capitalize on volatility.",
    body: '', author: 'Team AutoPilot ROI', category: 'market-insights', featured: false,
    publishedAt: '2026-03-15', updatedAt: '2026-03-15',
  },
]

const SEED_FAQS: FaqItem[] = [
  { id: 'faq-1', question: 'What is Aurum Foundation?', answer: 'Aurum Foundation is a fintech ecosystem that combines AI-powered trading bots, a crypto exchange, a NeoBank with Visa debit card, and real-world asset (RWA) gold tokenization — all under one platform.', category: 'general', order: 1 },
  { id: 'faq-2', question: 'Is Aurum legitimate?', answer: 'Yes. Aurum has applied for EU MiCA e-money licensing and operates with transparent fee structures. However, as with any investment, do your own due diligence.', category: 'general', order: 2 },
  { id: 'faq-3', question: 'What is the EX-AI Bot?', answer: 'The EX-AI Bot is an AI-driven trading algorithm that executes trades on your behalf. It uses machine learning to analyze market conditions and aims for consistent returns.', category: 'products', order: 3 },
  { id: 'faq-4', question: 'How do I get started?', answer: 'Take our free Readiness Assessment to get your personalized score, then follow the guided onboarding steps. The whole process takes about 15-20 minutes.', category: 'getting-started', order: 4 },
  { id: 'faq-5', question: 'What is AutopilotROI?', answer: 'AutopilotROI is an independent onboarding platform built by partners to help new members understand, evaluate, and join the Aurum ecosystem confidently.', category: 'general', order: 5 },
]

const SEED_VIDEOS: VideoItem[] = [
  { id: 'vid-1', title: 'What is Aurum Foundation?', youtubeId: 'dQw4w9WgXcQ', description: 'CEO overview of the full Aurum ecosystem and vision.', category: 'Overview', duration: '12:30', order: 1, featured: true, section: 'university' },
  { id: 'vid-2', title: 'EX-AI Bot Deep Dive', youtubeId: 'dQw4w9WgXcQ', description: 'Technical breakdown of how the AI trading bot works.', category: 'Products', duration: '18:45', order: 2, featured: false, section: 'university' },
  { id: 'vid-3', title: 'Setting Up Your Account', youtubeId: 'dQw4w9WgXcQ', description: 'Step-by-step walkthrough of the account creation process.', category: 'Getting Started', duration: '8:15', order: 3, featured: false, section: 'university' },
  { id: 'vid-4', title: 'Partner Program Explained', youtubeId: 'dQw4w9WgXcQ', description: 'How the 3-tier referral system works and earning potential.', category: 'Partners', duration: '15:00', order: 4, featured: false, section: 'university' },
]

const SEED_PAGES: Record<string, PageCopy> = {
  homepage: {
    heroHeadline: 'AI-Powered Finance,\nSimplified.',
    heroSubheadline: 'AutopilotROI helps you understand, evaluate, and confidently onboard into the Aurum ecosystem — AI trading bots, crypto banking, and real-world asset tokenization.',
    heroPrimaryCta: 'Take the Free Assessment',
    heroSecondaryCta: 'Watch Demo',
    heroVideoUrl: '',
    finalCtaHeadline: 'Ready to get started?',
    finalCtaDescription: 'Take the free 2-minute readiness assessment and get your personalized onboarding plan.',
  },
}

// ── Core Functions ──────────────────────────────────────────

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

/** Load full content store from localStorage */
export function loadStore(): ContentStore {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch { /* corrupted data */ }

  // Seed on first visit
  const initial: ContentStore = {
    blogs: SEED_BLOGS,
    faqs: SEED_FAQS,
    videos: SEED_VIDEOS,
    resources: [],
    pages: SEED_PAGES,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
  return initial
}

/** Save full content store, pushing to undo stack first */
export function saveStore(store: ContentStore, description: string): void {
  // Push current state to undo stack before saving new state
  pushUndo(description)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

/** Push current state to undo stack */
function pushUndo(description: string): void {
  try {
    const current = localStorage.getItem(STORAGE_KEY)
    if (!current) return

    const stackRaw = localStorage.getItem(UNDO_KEY)
    const stack: UndoEntry[] = stackRaw ? JSON.parse(stackRaw) : []

    stack.push({
      timestamp: new Date().toISOString(),
      description,
      snapshot: current,
    })

    // Keep max entries
    while (stack.length > MAX_UNDO) stack.shift()
    localStorage.setItem(UNDO_KEY, JSON.stringify(stack))
  } catch { /* storage full */ }
}

/** Undo last change — returns the restored store or null if nothing to undo */
export function undo(): ContentStore | null {
  try {
    const stackRaw = localStorage.getItem(UNDO_KEY)
    if (!stackRaw) return null

    const stack: UndoEntry[] = JSON.parse(stackRaw)
    const entry = stack.pop()
    if (!entry) return null

    // Restore snapshot
    localStorage.setItem(STORAGE_KEY, entry.snapshot)
    localStorage.setItem(UNDO_KEY, JSON.stringify(stack))

    return JSON.parse(entry.snapshot)
  } catch {
    return null
  }
}

/** Get undo stack count */
export function getUndoCount(): number {
  try {
    const stackRaw = localStorage.getItem(UNDO_KEY)
    if (!stackRaw) return 0
    return JSON.parse(stackRaw).length
  } catch {
    return 0
  }
}

// ── CRUD: Blog Posts ────────────────────────────────────────

export function createBlog(post: Omit<BlogPost, 'id' | 'updatedAt'>): ContentStore {
  const store = loadStore()
  const newPost: BlogPost = {
    ...post,
    id: 'blog-' + generateId(),
    updatedAt: new Date().toISOString(),
  }
  store.blogs.unshift(newPost)
  saveStore(store, `Created blog post "${post.title}"`)
  return store
}

export function updateBlog(id: string, updates: Partial<BlogPost>): ContentStore {
  const store = loadStore()
  const idx = store.blogs.findIndex(b => b.id === id)
  if (idx >= 0) {
    store.blogs[idx] = { ...store.blogs[idx], ...updates, updatedAt: new Date().toISOString() }
    saveStore(store, `Updated blog post "${store.blogs[idx].title}"`)
  }
  return store
}

export function deleteBlog(id: string): ContentStore {
  const store = loadStore()
  const post = store.blogs.find(b => b.id === id)
  store.blogs = store.blogs.filter(b => b.id !== id)
  saveStore(store, `Deleted blog post "${post?.title || id}"`)
  return store
}

// ── CRUD: FAQs ──────────────────────────────────────────────

export function createFaq(faq: Omit<FaqItem, 'id'>): ContentStore {
  const store = loadStore()
  store.faqs.push({ ...faq, id: 'faq-' + generateId() })
  saveStore(store, `Created FAQ "${faq.question.substring(0, 40)}..."`)
  return store
}

export function updateFaq(id: string, updates: Partial<FaqItem>): ContentStore {
  const store = loadStore()
  const idx = store.faqs.findIndex(f => f.id === id)
  if (idx >= 0) {
    store.faqs[idx] = { ...store.faqs[idx], ...updates }
    saveStore(store, `Updated FAQ "${store.faqs[idx].question.substring(0, 40)}..."`)
  }
  return store
}

export function deleteFaq(id: string): ContentStore {
  const store = loadStore()
  const faq = store.faqs.find(f => f.id === id)
  store.faqs = store.faqs.filter(f => f.id !== id)
  saveStore(store, `Deleted FAQ "${faq?.question.substring(0, 40) || id}..."`)
  return store
}

export function reorderFaqs(ids: string[]): ContentStore {
  const store = loadStore()
  store.faqs = ids.map((id, i) => {
    const faq = store.faqs.find(f => f.id === id)!
    return { ...faq, order: i + 1 }
  }).filter(Boolean)
  saveStore(store, 'Reordered FAQs')
  return store
}

// ── CRUD: Videos ────────────────────────────────────────────

export function createVideo(video: Omit<VideoItem, 'id'>): ContentStore {
  const store = loadStore()
  store.videos.push({ ...video, id: 'vid-' + generateId() })
  saveStore(store, `Created video "${video.title}"`)
  return store
}

export function updateVideo(id: string, updates: Partial<VideoItem>): ContentStore {
  const store = loadStore()
  const idx = store.videos.findIndex(v => v.id === id)
  if (idx >= 0) {
    store.videos[idx] = { ...store.videos[idx], ...updates }
    saveStore(store, `Updated video "${store.videos[idx].title}"`)
  }
  return store
}

export function deleteVideo(id: string): ContentStore {
  const store = loadStore()
  const video = store.videos.find(v => v.id === id)
  store.videos = store.videos.filter(v => v.id !== id)
  saveStore(store, `Deleted video "${video?.title || id}"`)
  return store
}

// ── CRUD: Resources ─────────────────────────────────────────

export function createResource(resource: Omit<ResourceItem, 'id'>): ContentStore {
  const store = loadStore()
  store.resources.push({ ...resource, id: 'res-' + generateId() })
  saveStore(store, `Created resource "${resource.title}"`)
  return store
}

export function updateResource(id: string, updates: Partial<ResourceItem>): ContentStore {
  const store = loadStore()
  const idx = store.resources.findIndex(r => r.id === id)
  if (idx >= 0) {
    store.resources[idx] = { ...store.resources[idx], ...updates }
    saveStore(store, `Updated resource "${store.resources[idx].title}"`)
  }
  return store
}

export function deleteResource(id: string): ContentStore {
  const store = loadStore()
  const resource = store.resources.find(r => r.id === id)
  store.resources = store.resources.filter(r => r.id !== id)
  saveStore(store, `Deleted resource "${resource?.title || id}"`)
  return store
}

// ── Page Copy ───────────────────────────────────────────────

export function updatePageCopy(pageKey: string, updates: Partial<PageCopy>): ContentStore {
  const store = loadStore()
  const existing = store.pages[pageKey] || {}
  const merged: PageCopy = {}
  for (const k of Object.keys(existing)) merged[k] = existing[k]
  for (const k of Object.keys(updates)) {
    const v = updates[k]
    if (v !== undefined) merged[k] = v
  }
  store.pages[pageKey] = merged
  saveStore(store, `Updated ${pageKey} page copy`)
  return store
}

// ── Export / Import ─────────────────────────────────────────

export function exportContent(): string {
  const store = loadStore()
  return JSON.stringify(store, null, 2)
}

export function importContent(json: string): ContentStore | null {
  try {
    const store: ContentStore = JSON.parse(json)
    // Basic validation
    if (!store.blogs || !store.faqs || !store.videos) {
      throw new Error('Invalid content format')
    }
    pushUndo('Before import')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    return store
  } catch {
    return null
  }
}
