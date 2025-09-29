import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/auth"


const protectedRoutes = ['/rankings', '/reviews']

export default async function middleware(request: NextRequest) {
  /* const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-current-pathname', request.nextUrl.pathname) */

  const session = await auth()
  const { pathname } = request.nextUrl
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next({
    /* request: {
      headers: requestHeaders,
    }, */
  })
}

/* export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
} */

//export { auth as middleware } from "@/auth"