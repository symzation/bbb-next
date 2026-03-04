import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { GetAuthSession } from '@/actions/sessionActions'
import { ENUM_ROLE } from '@/types/enums'
export { auth } from "@/lib/auth"

const protectedRoutes: Record<string, string[]> = {
  //'/articles': ['ADMIN', 'AUTHOR', 'AUTHOR_WAITING_APPROVAL', 'USER'],
  '/author': ['ADMIN', 'USER'],
  '/dashboard': ['ADMIN'],
  '/compose': ['AUTHOR', 'ADMIN'],
  '/events': ['ADMIN', 'AUTHOR', 'AUTHOR_WAITING_APPROVAL', 'USER'],
  //'/rankings': ['ADMIN', 'AUTHOR', 'AUTHOR_WAITING_APPROVAL', 'USER'],
  //'/reviews': ['ADMIN', 'AUTHOR', 'AUTHOR_WAITING_APPROVAL', 'USER'],
  '/settings': ['ADMIN', 'AUTHOR', 'AUTHOR_WAITING_APPROVAL', 'USER'],
}

export default async function proxy(request: NextRequest) {
  const session: any = await GetAuthSession()
  const userRole: ENUM_ROLE = session?.user?.role
  const { pathname } = request.nextUrl
  
  /* console.log('Proxy - Session: ', session)
  console.log('Proxy - Role: ', userRole) */
  
  if (protectedRoutes[pathname]) {
    const requiredRoles = protectedRoutes[pathname]
    //console.log('Proxy - Required Roles: ', requiredRoles)

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
