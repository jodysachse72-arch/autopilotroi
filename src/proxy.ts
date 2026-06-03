/* ═══════════════════════════════════════════════════════════════
   NEXT.JS PROXY — entry point (Next.js 16 convention).
   Delegates to the Supabase session handler which:
     1. Refreshes the auth session (cookie)
     2. Redirects unauthenticated users from protected routes
     3. Role-gates /admin (admin) and /dashboard (partner+admin)
     4. Returns 401/403 JSON for protected /api/* routes
   ═══════════════════════════════════════════════════════════════ */

import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets.
     * Covers pages, /api/admin/*, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
