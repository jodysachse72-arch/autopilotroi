import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO Phase 2: Pipe to ThriveDesk / Resend
    // For now, log to console (will be replaced with actual email dispatch)
    console.log('[Contact Form Submission]', { name, email, subject, message })

    return Response.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
