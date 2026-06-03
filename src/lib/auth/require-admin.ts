/* ═══════════════════════════════════════════════════════════════
   REQUIRE ADMIN — defense-in-depth guard for /api/admin routes.

   Reads the caller's session from cookies via the SSR client
   (anon key), checks profiles.role === 'admin'. Returns a
   NextResponse error if the check fails, or null on success.
   ═══════════════════════════════════════════════════════════════ */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function requireAdmin(): Promise<NextResponse | null> {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {
            // Route handlers don't need to set cookies for auth reads
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    // Use security-definer function to avoid RLS recursion
    const { data: role } = await supabase.rpc('get_my_role')

    if (!role || role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: admin role required' },
        { status: 403 },
      )
    }

    return null // success — caller is an authenticated admin
  } catch {
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 },
    )
  }
}
