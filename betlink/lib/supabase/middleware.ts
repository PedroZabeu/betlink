import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_CONFIG } from '@/lib/auth/session'

/**
 * Updates the user session in middleware
 * Feature 1.4: Basic Authentication
 * Note: Full middleware implementation will be in Feature 1.5 (RLS)
 */
export async function updateSession(request: NextRequest) {
  console.log('[Supabase Middleware] Updating session for:', request.nextUrl.pathname);
  
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const value = request.cookies.get(name)?.value;
            console.log('[Supabase Middleware] Getting cookie:', name, value ? 'found' : 'not found');
            return value;
          },
          set(name: string, value: string, options: CookieOptions) {
            console.log('[Supabase Middleware] Setting cookie:', name);
            
            // Set the cookie on the request
            request.cookies.set({
              name,
              value,
              ...options,
            });
            
            // Also set it on the response
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            
            response.cookies.set({
              name,
              value,
              ...options,
              httpOnly: SESSION_CONFIG.cookieOptions.httpOnly,
              secure: SESSION_CONFIG.cookieOptions.secure,
              sameSite: SESSION_CONFIG.cookieOptions.sameSite,
              maxAge: options.maxAge || SESSION_CONFIG.cookieOptions.maxAge,
              path: options.path || SESSION_CONFIG.cookieOptions.path
            });
          },
          remove(name: string, options: CookieOptions) {
            console.log('[Supabase Middleware] Removing cookie:', name);
            
            // Remove from request
            request.cookies.delete(name);
            
            // Remove from response
            response.cookies.set({
              name,
              value: '',
              ...options,
              maxAge: 0,
            });
          },
        },
      }
    );

    // Refresh session if needed
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('[Supabase Middleware] Session error:', error);
    } else if (session) {
      console.log('[Supabase Middleware] Session valid for:', session.user.email);
      
      // Check if session needs refresh
      const expiresAt = new Date(session.expires_at! * 1000);
      const now = new Date();
      const secondsUntilExpiry = (expiresAt.getTime() - now.getTime()) / 1000;
      
      if (secondsUntilExpiry < SESSION_CONFIG.refreshThreshold) {
        console.log('[Supabase Middleware] Session expiring soon, refreshing');
        const { error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError) {
          console.error('[Supabase Middleware] Failed to refresh session:', refreshError);
        } else {
          console.log('[Supabase Middleware] Session refreshed successfully');
        }
      }
    } else {
      console.log('[Supabase Middleware] No active session');
    }

    return response;
    
  } catch (error) {
    console.error('[Supabase Middleware] Error updating session:', error);
    return NextResponse.next();
  }
}

/**
 * Creates a Supabase client for middleware
 * Used primarily for checking sessions before page loads
 */
export function createMiddlewareClient(request: NextRequest) {
  console.log('[Supabase Middleware] Creating middleware client');
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set() {
          // Middleware client shouldn't set cookies directly
          console.warn('[Supabase Middleware] Attempted to set cookie in read-only client');
        },
        remove() {
          // Middleware client shouldn't remove cookies directly
          console.warn('[Supabase Middleware] Attempted to remove cookie in read-only client');
        },
      },
    }
  );
}