"use client";

import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { getAuthErrorMessage } from '@/lib/auth/errors';

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  role: 'Master' | 'Admin' | 'Tipster' | 'Cliente';
  phone: string;
  telegram_username: string;
  user_id: string;
  created_at: string;
  last_login_at: string | null;
  login_attempts: number;
  locked_until: string | null;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({ error: 'Not implemented' }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserClient();

  // Load user profile from database
  const loadProfile = useCallback(async (userId: string) => {
    console.log('[AuthProvider] Loading profile for user:', userId);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('[AuthProvider] Error loading profile:', error);
        return null;
      }

      console.log('[AuthProvider] Profile loaded:', data);
      return data as UserProfile;
    } catch (error) {
      console.error('[AuthProvider] Unexpected error loading profile:', error);
      return null;
    }
  }, [supabase]);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    
    const newProfile = await loadProfile(user.id);
    if (newProfile) {
      setProfile(newProfile);
    }
  }, [user, loadProfile]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('[AuthProvider] Initializing auth state');
      
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[AuthProvider] Error getting session:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('[AuthProvider] Found existing session for:', session.user.email);
          setUser(session.user);
          
          // Load profile
          const userProfile = await loadProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
          }
        } else {
          console.log('[AuthProvider] No existing session found');
        }
      } catch (error) {
        console.error('[AuthProvider] Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [supabase, loadProfile]);

  // Listen for auth state changes
  useEffect(() => {
    console.log('[AuthProvider] Setting up auth state listener');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthProvider] Auth state change:', { event, user: session?.user?.email });
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        
        // Load profile
        const userProfile = await loadProfile(session.user.id);
        if (userProfile) {
          setProfile(userProfile);
          
          // Update last login timestamp
          await supabase
            .from('profiles')
            .update({ last_login_at: new Date().toISOString() })
            .eq('user_id', session.user.id);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        console.log('[AuthProvider] Token refreshed for:', session.user.email);
        setUser(session.user);
      }
    });

    return () => {
      console.log('[AuthProvider] Cleaning up auth state listener');
      subscription.unsubscribe();
    };
  }, [supabase, loadProfile]);

  // Sign in function
  const signIn = useCallback(async (email: string, password: string) => {
    console.log('[AuthProvider] Signing in user:', email);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('[AuthProvider] Sign in error:', error);
        const errorMessage = getAuthErrorMessage(error.message);
        return { error: errorMessage };
      }

      if (data.user) {
        console.log('[AuthProvider] Sign in successful:', data.user.email);
        
        // User state will be updated by onAuthStateChange listener
        // Get role for redirect
        const userProfile = await loadProfile(data.user.id);
        
        if (userProfile) {
          // Determine redirect based on role
          let redirectPath = '/dashboard';
          
          switch (userProfile.role) {
            case 'Master':
            case 'Admin':
              redirectPath = '/admin';
              break;
            case 'Tipster':
              redirectPath = '/meus-canais';
              break;
            case 'Cliente':
              redirectPath = '/dashboard';
              break;
          }

          console.log('[AuthProvider] Redirecting to:', redirectPath);
          
          // Only redirect if we're on a login page
          if (pathname === '/login' || pathname === '/tipster/login') {
            router.push(redirectPath);
          }
        }
        
        return { error: null };
      }

      return { error: 'Erro desconhecido ao fazer login' };
    } catch (error) {
      console.error('[AuthProvider] Unexpected sign in error:', error);
      return { error: 'Erro inesperado ao fazer login' };
    }
  }, [supabase, router, pathname, loadProfile]);

  // Sign out function
  const signOut = useCallback(async () => {
    console.log('[AuthProvider] Signing out user');
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[AuthProvider] Sign out error:', error);
        return;
      }

      console.log('[AuthProvider] Sign out successful');
      
      // Clear state (will be handled by onAuthStateChange)
      setUser(null);
      setProfile(null);
      
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('[AuthProvider] Unexpected sign out error:', error);
    }
  }, [supabase, router]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      signIn, 
      signOut,
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);