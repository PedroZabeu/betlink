import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SESSION_CONFIG } from '@/lib/auth/session'

/**
 * Creates a Supabase client for server-side usage (App Router)
 * Feature 1.4: Basic Authentication
 */
export async function createClient() {
  console.log('[Supabase Server] Creating server client');
  
  try {
    const cookieStore = await cookies()

    const client = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const value = cookieStore.get(name)?.value;
            console.log('[Supabase Server] Getting cookie:', name, value ? 'found' : 'not found');
            return value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              console.log('[Supabase Server] Setting cookie:', name, options);
              cookieStore.set({ 
                name, 
                value, 
                ...options,
                // Apply our session config
                httpOnly: SESSION_CONFIG.cookieOptions.httpOnly,
                secure: SESSION_CONFIG.cookieOptions.secure,
                sameSite: SESSION_CONFIG.cookieOptions.sameSite,
                maxAge: options.maxAge || SESSION_CONFIG.cookieOptions.maxAge,
                path: options.path || SESSION_CONFIG.cookieOptions.path
              });
            } catch (error) {
              console.error('[Supabase Server] Error setting cookie:', error);
              // Server Components can't set cookies after streaming starts
              // This is expected in some cases
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              console.log('[Supabase Server] Removing cookie:', name);
              cookieStore.set({ 
                name, 
                value: '', 
                ...options,
                maxAge: 0 
              });
            } catch (error) {
              console.error('[Supabase Server] Error removing cookie:', error);
            }
          },
        },
      }
    );
    
    console.log('[Supabase Server] Server client created successfully');
    return client;
    
  } catch (error) {
    console.error('[Supabase Server] Failed to create server client:', error);
    throw error;
  }
}

/**
 * Gets the current user session from server-side
 */
export async function getSession() {
  const supabase = await createClient();
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('[Supabase Server] Error getting session:', error);
      return null;
    }
    
    console.log('[Supabase Server] Session retrieved:', {
      user: session?.user?.email,
      expiresAt: session?.expires_at
    });
    
    return session;
  } catch (error) {
    console.error('[Supabase Server] Failed to get session:', error);
    return null;
  }
}

/**
 * Gets the current user from server-side
 */
export async function getUser() {
  const supabase = await createClient();
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('[Supabase Server] Error getting user:', error);
      return null;
    }
    
    console.log('[Supabase Server] User retrieved:', user?.email);
    return user;
  } catch (error) {
    console.error('[Supabase Server] Failed to get user:', error);
    return null;
  }
}