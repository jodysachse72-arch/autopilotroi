import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /plasmic-host — tag the request so the root layout can strip all site
  // chrome (Navbar, Footer, scripts) and serve a bare HTML shell.
  // Plasmic Studio loads this route in an iframe; any extra chrome breaks it.
  if (pathname === '/plasmic-host') {
    const response = NextResponse.next()
    response.headers.set('x-plasmic-host', 'true')
    return response
  }

  // TinaCMS visual editor handles its own Tina Cloud OAuth — do not block it
  if (pathname.startsWith('/admin/index.html') || pathname === '/admin/') {
    return NextResponse.next()
  }

  // Skip Supabase session refresh if not configured
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co'
  ) {
    return
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
