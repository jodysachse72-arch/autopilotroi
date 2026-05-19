import { type NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Puck API & editor — public access for now (Phase 1)
  if (pathname.startsWith('/api/puck') || pathname.startsWith('/admin/edit')) {
    return NextResponse.next()
  }

  // All other routes pass through without auth checks for Phase 1
  // Auth protection for /admin, /dashboard will be added in Phase 2
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
