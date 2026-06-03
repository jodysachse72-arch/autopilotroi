import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { submitToThriveDesk } from '@/lib/integrations/thrivedesk'

// Service-role client for public contact form (bypasses RLS)
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url === 'placeholder' || key === 'placeholder') {
    return null
  }

  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 submissions per minute per IP
    const { allowed, resetAt } = checkRateLimit(request, {
      maxRequests: 5,
      windowSeconds: 60,
      prefix: 'contact',
    })
    if (!allowed) return rateLimitResponse(resetAt)

    const body = await request.json()
    const { name, email, subject, message, turnstileToken } = body

    // ── Turnstile bot protection ──
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret && turnstileSecret !== 'placeholder') {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: 'Bot verification required. Please complete the CAPTCHA.' },
          { status: 400 }
        )
      }

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      })
      const verifyData = await verifyRes.json()

      if (!verifyData.success) {
        console.error('[Turnstile] Verification failed:', verifyData)
        return NextResponse.json(
          { error: 'Bot verification failed. Please try again.' },
          { status: 403 }
        )
      }
    }

    // ── Validate required fields ──
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    if (!supabase) {
      console.log('[Contact] Supabase not configured — demo mode for:', email)
      return NextResponse.json({ success: true, demo: true })
    }

    // ── Insert into contact_messages (durable store) ──
    const { data: row, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subject: subject?.trim() || null,
        message: message.trim(),
        source: 'contact',
      })
      .select('id')
      .single()

    if (error) {
      console.error('[Contact] Insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save your message' },
        { status: 500 }
      )
    }

    // ── ThriveDesk dual-write (fire-and-forget, fail-safe) ──
    // No-ops cleanly when THRIVEDESK_API_KEY is not set.
    try {
      const tdResult = await submitToThriveDesk({
        name,
        email,
        notes: `[Contact Form] ${subject ? `Subject: ${subject}\n\n` : ''}${message}`,
      })
      if (tdResult.success && row?.id) {
        await supabase
          .from('contact_messages')
          .update({ thrivedesk_synced: true })
          .eq('id', row.id)
      }
    } catch (err) {
      console.warn('[Contact] ThriveDesk dual-write error (non-blocking):', err)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact] Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
