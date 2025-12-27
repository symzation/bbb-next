import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthSession } from '@/actions/sessionActions'
import { ENUM_ROLE } from '@/types/enums'

const protectedRoutes: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/articles': ['USER', 'ADMIN'],
  '/author': ['USER', 'ADMIN'],
  '/compose': ['AUTHOR', 'ADMIN'],
  '/rankings': ['USER', 'AUTHOR', 'ADMIN'],
  '/reviews': ['USER', 'AUTHOR', 'ADMIN'],
  '/settings': ['USER', 'AUTHOR', 'ADMIN'],
}

export default async function proxy(request: NextRequest) {
  const session: any = await getAuthSession()
  const userRole: ENUM_ROLE = session?.user?.role
  const { pathname } = request.nextUrl
  
  console.log('Proxy - Session: ', session)
  console.log('Proxy - Role: ', userRole)
  
  if (protectedRoutes[pathname]) {
    const requiredRoles = protectedRoutes[pathname]
    console.log('Proxy - Required Roles: ', requiredRoles)

    // Check if the user is authenticated and has the required role
    if (!session || !userRole || !requiredRoles.includes(userRole)) {
      // If not authorized, redirect to an unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
