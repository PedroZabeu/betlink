'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAuthErrorMessage } from '@/lib/auth/errors'

type LoginResult = {
  success: boolean
  redirect: string
  error?: string
}

export async function signIn(
  email: string, 
  password: string, 
  loginType: 'client' | 'tipster' | 'admin' = 'client'
): Promise<LoginResult> {
  console.log('[Auth Action] Sign in attempt:', { email, loginType })
  
  const cookieStore = await cookies()
  
  // Use service role key for server-side database operations
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  try {
    // Check if account is locked
    const { data: profile } = await supabase
      .from('profiles')
      .select('login_attempts, locked_until, role, user_id')
      .eq('email', email)
      .single()

    if (!profile) {
      return {
        success: false,
        redirect: '',
        error: 'Email ou senha incorretos'
      }
    }

    if (profile.locked_until) {
      const lockExpiry = new Date(profile.locked_until)
      if (lockExpiry > new Date()) {
        return {
          success: false,
          redirect: '',
          error: 'Conta bloqueada temporariamente. Tente novamente em alguns minutos.'
        }
      }
    }

    // Verify password directly in database using crypt function
    console.log('[Auth Action] Verifying password for user:', profile.user_id)
    const { data: authResult } = await supabase.rpc('verify_user_password', {
      user_email: email,
      input_password: password
    })

    console.log('[Auth Action] Password verification result:', authResult)

    if (!authResult) {
      console.log('[Auth Action] Password verification failed')
      
      // Increment login attempts on failed login
      const newAttempts = (profile.login_attempts || 0) + 1
      const shouldLock = newAttempts >= 5
      
      await supabase
        .from('profiles')
        .update({
          login_attempts: newAttempts,
          locked_until: shouldLock 
            ? new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
            : null
        })
        .eq('email', email)
      
      return {
        success: false,
        redirect: '',
        error: 'Email ou senha incorretos'
      }
    }

    // Password verified successfully - create client session
    console.log('[Auth Action] Password verified, creating session')
    
    // Use anon key for client-side session creation
    const clientSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    // Sign in with client for session management
    const { data: sessionData, error: sessionError } = await clientSupabase.auth.signInWithPassword({
      email,
      password,
    })

    if (sessionError) {
      console.error('[Auth Action] Session creation failed:', sessionError)
      // Fallback: manual session handling could be implemented here
    }

    // Reset login attempts and update last login
    await supabase
      .from('profiles')
      .update({
        login_attempts: 0,
        locked_until: null,
        last_login_at: new Date().toISOString()
      })
      .eq('user_id', profile.user_id)

    // Determine redirect based on role
    let redirectPath = '/dashboard'
    
    switch (profile.role) {
      case 'Master':
      case 'Admin':
        redirectPath = '/admin'
        break
      case 'Tipster':
        redirectPath = '/meus-canais'
        break
      case 'Cliente':
        redirectPath = '/dashboard'
        break
    }

    console.log('[Auth Action] Login successful, redirecting to:', redirectPath)
    
    return {
      success: true,
      redirect: redirectPath
    }

  } catch (error) {
    console.error('[Auth Action] Unexpected error:', error)
    return {
      success: false,
      redirect: '',
      error: 'Erro inesperado. Tente novamente.'
    }
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  
  // Use anon key for client-side operations
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.signOut()
  redirect('/')
}

/**
 * Sign up a new user (placeholder for future feature)
 */
export async function signUp(email: string, password: string, userData: Record<string, unknown>) {
  console.log('[Auth] Sign up not implemented in Feature 1.4');
  throw new Error('Cadastro será implementado em breve');
}

/**
 * Reset password (placeholder for future feature)
 */
export async function resetPassword(email: string) {
  console.log('[Auth] Password reset not implemented in Feature 1.4');
  throw new Error('Recuperação de senha será implementada em breve');
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }
    
    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', user.email)
      .single();
    
    return {
      user,
      profile
    };
    
  } catch (error) {
    console.error('[Auth] Error getting current user:', error);
    return null;
  }
}