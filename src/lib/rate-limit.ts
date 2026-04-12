import { NextRequest, NextResponse } from 'next/server'

/**
 * Simple in-memory rate limiter for API routes.
 * For production at scale, swap to @upstash/ratelimit with Redis.
 * 
 * This is a sliding window implementation — tracks request counts
 * per IP within a configurable time window.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 60s to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (entry.resetAt < now) store.delete(key)
    }
  }, 60_000)
}

interface RateLimitConfig {
  /** Max requests allowed per window */
  maxRequests: number
  /** Window duration in seconds */
  windowSeconds: number
  /** Optional key prefix for different routes */
  prefix?: string
}

/**
 * Check rate limit for a request. Returns { allowed, remaining, resetAt }.
 * Call this at the top of your API route handlers.
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig = { maxRequests: 10, windowSeconds: 60 }
): { allowed: boolean; remaining: number; resetAt: number } {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const key = `${config.prefix || 'api'}:${ip}`
  const now = Date.now()
  const windowMs = config.windowSeconds * 1000

  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + windowMs }
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt }
}

/**
 * Helper to return a rate-limited response with proper headers.
 */
export function rateLimitResponse(resetAt: number): NextResponse {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000)
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
      },
    }
  )
}
