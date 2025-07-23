/**
 * Session management utilities
 * Feature 1.4: Basic Authentication
 */

import { User } from '@supabase/supabase-js';
import { Profile } from '@/types';

/**
 * Session configuration
 */
export const SESSION_CONFIG = {
  // Session duration in seconds (24 hours)
  sessionDuration: 86400,
  
  // Refresh token duration in seconds (30 days)
  refreshTokenDuration: 2592000,
  
  // Maximum concurrent sessions per user
  maxConcurrentSessions: 3,
  
  // Session refresh threshold (refresh if less than this many seconds left)
  refreshThreshold: 3600, // 1 hour
  
  // Cookie configuration
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 86400, // 24 hours
    path: '/'
  }
};

/**
 * User session data structure
 */
export interface UserSession {
  user: User;
  profile: Profile;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

/**
 * Checks if a session is valid
 */
export function isSessionValid(session: UserSession | null): boolean {
  if (!session) {
    console.log('[Session] No session found');
    return false;
  }
  
  const now = new Date();
  const isValid = session.expiresAt > now;
  
  console.log('[Session] Session validity check:', {
    expiresAt: session.expiresAt,
    now,
    isValid
  });
  
  return isValid;
}

/**
 * Checks if a session needs refresh
 */
export function shouldRefreshSession(session: UserSession | null): boolean {
  if (!session) return false;
  
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  const secondsUntilExpiry = (expiresAt.getTime() - now.getTime()) / 1000;
  
  const shouldRefresh = secondsUntilExpiry < SESSION_CONFIG.refreshThreshold;
  
  console.log('[Session] Refresh check:', {
    secondsUntilExpiry,
    threshold: SESSION_CONFIG.refreshThreshold,
    shouldRefresh
  });
  
  return shouldRefresh;
}

/**
 * Creates a session object from Supabase auth data
 */
export function createSession(
  user: User,
  profile: Profile,
  accessToken: string,
  refreshToken: string,
  expiresIn: number
): UserSession {
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  
  const session: UserSession = {
    user,
    profile,
    accessToken,
    refreshToken,
    expiresAt
  };
  
  console.log('[Session] Created new session:', {
    userId: user.id,
    userEmail: user.email,
    role: profile.role,
    expiresAt
  });
  
  return session;
}

/**
 * Extracts session data for client-side use (no tokens)
 */
export function getClientSession(session: UserSession) {
  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      role: session.profile.role,
      name: session.profile.name
    },
    profile: {
      ...session.profile,
      // Don't send sensitive fields to client
      login_attempts: undefined,
      locked_until: undefined
    },
    expiresAt: session.expiresAt
  };
}

/**
 * Session storage keys
 */
export const SESSION_STORAGE_KEYS = {
  accessToken: 'sb-access-token',
  refreshToken: 'sb-refresh-token',
  user: 'sb-user',
  profile: 'sb-profile',
  expiresAt: 'sb-expires-at'
};

/**
 * Clears all session data from storage
 */
export function clearSessionStorage(): void {
  console.log('[Session] Clearing session storage');
  
  if (typeof window !== 'undefined') {
    Object.values(SESSION_STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Also clear any Supabase-specific storage
    localStorage.removeItem('supabase.auth.token');
  }
}

/**
 * Gets session expiry time in human-readable format
 */
export function getSessionExpiryMessage(expiresAt: Date): string {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  
  if (diff <= 0) {
    return 'Sessão expirada';
  }
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `Sessão expira em ${days} dia${days > 1 ? 's' : ''}`;
  }
  
  if (hours > 0) {
    return `Sessão expira em ${hours} hora${hours > 1 ? 's' : ''}`;
  }
  
  return `Sessão expira em ${minutes} minuto${minutes > 1 ? 's' : ''}`;
}

/**
 * Monitors session and warns before expiry
 */
export function startSessionMonitor(
  session: UserSession,
  onExpiringSoon: () => void,
  onExpired: () => void
): () => void {
  console.log('[Session] Starting session monitor');
  
  const checkInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = session.expiresAt.getTime() - now.getTime();
    
    if (timeLeft <= 0) {
      console.log('[Session] Session expired');
      onExpired();
      clearInterval(checkInterval);
    } else if (timeLeft <= 5 * 60 * 1000) { // 5 minutes warning
      console.log('[Session] Session expiring soon');
      onExpiringSoon();
    }
  }, 60000); // Check every minute
  
  // Return cleanup function
  return () => {
    console.log('[Session] Stopping session monitor');
    clearInterval(checkInterval);
  };
}