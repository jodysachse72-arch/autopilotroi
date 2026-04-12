'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // In production, this would be a server component fetching from Sanity
  // For now, show a placeholder

  return (
    <div className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/blog"
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            ← Back to Blog
          </Link>

          <div className="mt-8 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 lg:p-10">
            <div className="mb-6 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-[var(--text-secondary)]">
              <strong>Coming Soon:</strong> Blog posts will be published from the
              Sanity CMS. Check back shortly for new content!
            </div>

            <h1 className="font-[var(--font-sora)] text-3xl font-bold text-[var(--text-primary)]">
              Blog Post
            </h1>
            <p className="mt-4 text-[var(--text-tertiary)] leading-relaxed">
              This post will be loaded from the Sanity CMS when Barry publishes
              content. The blog system supports rich text, images, categories,
              and featured posts.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/blog"
                className="rounded-xl bg-[linear-gradient(180deg,#3b82f6_0%,#2563eb_100%)] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/40"
              >
                Browse All Posts
              </Link>
              <Link
                href="/university"
                className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] px-6 py-3 font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-card-hover)]"
              >
                Visit University
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
