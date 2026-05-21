/**
 * Image Upload API — Supabase Storage upload for AutoPuck editor
 *
 * POST /api/puck/upload  (multipart/form-data with 'file' field)
 *
 * Returns: { url: string } — the public URL of the uploaded image.
 *
 * Constraints:
 * - Max file size: 5 MB
 * - Allowed types: image/jpeg, image/png, image/webp, image/gif, image/svg+xml
 * - Stored in Supabase Storage bucket 'puck-media'
 * - Write-secret required
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]
const BUCKET = 'puck-media'

function requireWriteSecret(request: NextRequest): NextResponse | null {
  const secret = process.env.NEXT_PUBLIC_PUCK_WRITE_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'Server misconfiguration: NEXT_PUBLIC_PUCK_WRITE_SECRET is not set.' },
      { status: 500 }
    )
  }
  const header = request.headers.get('x-puck-write-secret')
  if (!header || header !== secret) {
    return NextResponse.json(
      { error: 'Unauthorized: missing or incorrect x-puck-write-secret header.' },
      { status: 401 }
    )
  }
  return null
}

function getStorageClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || (!serviceKey && !anonKey)) throw new Error('Missing Supabase env vars')
  return createClient(url, serviceKey || anonKey!, {
    auth: { persistSession: false },
  })
}

export async function POST(request: NextRequest) {
  // Auth check
  const authError = requireWriteSecret(request)
  if (authError) return authError

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF, SVG` },
        { status: 400 }
      )
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)} MB. Maximum: 5 MB` },
        { status: 400 }
      )
    }

    const supabase = getStorageClient()

    // Generate unique filename: timestamp-random-originalname
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 50)
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${safeName}.${ext}`
    const filePath = `uploads/${fileName}`

    // Read file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('[Upload API] Storage error:', uploadError)
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath)

    return NextResponse.json({
      url: urlData.publicUrl,
      fileName,
      size: file.size,
      type: file.type,
    })
  } catch (err) {
    console.error('[Upload API] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
