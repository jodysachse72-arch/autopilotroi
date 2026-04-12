import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, rateLimitResponse } from '@/lib/rate-limit'

// Use service-level client for public lead creation (bypasses RLS)
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 signups per minute per IP
    const { allowed, resetAt } = checkRateLimit(request, {
      maxRequests: 5,
      windowSeconds: 60,
      prefix: 'leads',
    })
    if (!allowed) return rateLimitResponse(resetAt)
    const body = await request.json()
    const { name, email, ref, turnstileToken } = body

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

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Check if lead already exists
    const { data: existing } = await supabase
      .from('leads')
      .select('id, readiness_score')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      // Lead exists — return their ID so they can continue the quiz
      return NextResponse.json({
        success: true,
        leadId: existing.id,
        alreadyAssessed: existing.readiness_score !== null,
        message: 'Welcome back!'
      })
    }

    // Create new lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        referred_by: ref || null,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[Leads] Insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save your information' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      alreadyAssessed: false,
    })
  } catch (error) {
    console.error('[Leads] Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
