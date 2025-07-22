import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// This will be properly implemented in Feature 1.4
// Placeholder middleware for future auth implementation

export async function middleware(request: NextRequest) {
  // TODO: Feature 1.4 - Implement route protection based on user roles
  // For now, all routes are accessible
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}