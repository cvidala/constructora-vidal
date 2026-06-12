import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'cv_admin_token'

async function getExpectedToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET || 'cv-dev-secret'
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('cv-admin'))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/admin/login') return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return NextResponse.redirect(new URL('/admin/login', request.url))

  const expected = await getExpectedToken()
  if (token !== expected) {
    const res = NextResponse.redirect(new URL('/admin/login', request.url))
    res.cookies.delete(COOKIE_NAME)
    return res
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
