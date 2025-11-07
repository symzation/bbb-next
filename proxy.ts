import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthSession } from '@/actions/sessionActions'

const protectedRoutes = ['/rankings', '/reviews', '/settings']

export default async function proxy(request: NextRequest) {
  /* const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-current-pathname', request.nextUrl.pathname) */

  const session = await getAuthSession()
  const { pathname } = request.nextUrl
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname.startsWith(route)
)

console.log('proxy - isProtectedRoute:', isProtectedRoute)

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  /* return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  }) */
 return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

//export { auth as proxy } from "@/auth"