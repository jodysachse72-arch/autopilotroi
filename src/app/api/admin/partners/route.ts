import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

// GET — list all partners
export async function GET() {
  try {
    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ partners: data })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST — create a new partner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, referral_code, phone, telegram } = body

    if (!name || !email || !referral_code) {
      return NextResponse.json(
        { error: 'Name, email, and referral code are required' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    const { data, error } = await supabase
      .from('partners')
      .insert({
        name,
        email,
        referral_code: referral_code.toLowerCase(),
        phone: phone || null,
        telegram: telegram || null,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A partner with that email or referral code already exists' },
          { status: 409 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ partner: data })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH — update partner (toggle active, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Partner ID required' }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { error } = await supabase
      .from('partners')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
