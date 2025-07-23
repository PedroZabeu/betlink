/**
 * Rate limiting implementation for authentication
 * Feature 1.4: Basic Authentication
 */

import { supabase } from '@/lib/supabase';

/**
 * Rate limiting configuration
 */
export const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,
  lockoutDurationMinutes: 15,
  resetWindowMinutes: 15
};

/**
 * Checks if an account is currently locked due to rate limiting
 */
export async function checkRateLimit(email: string): Promise<void> {
  console.log('[RateLimit] Checking rate limit for:', email);
  
  try {
    // Fetch profile to check rate limit status
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('login_attempts, locked_until')
      .eq('email', email)
      .single();
    
    if (error || !profile) {
      // If profile doesn't exist, allow the attempt (will fail at auth)
      console.log('[RateLimit] No profile found, allowing attempt');
      return;
    }
    
    // Check if account is locked
    if (profile.locked_until) {
      const lockUntil = new Date(profile.locked_until);
      const now = new Date();
      
      if (lockUntil > now) {
        const minutesLeft = Math.ceil((lockUntil.getTime() - now.getTime()) / 60000);
        console.error('[RateLimit] Account locked:', {
          email,
          lockUntil,
          minutesLeft
        });
        throw new Error(`Conta bloqueada. Tente novamente em ${minutesLeft} minutos.`);
      } else {
        // Lock expired, reset it
        console.log('[RateLimit] Lock expired, resetting');
        await resetLoginAttempts(email);
      }
    }
    
    // Check if at attempt limit
    if (profile.login_attempts >= RATE_LIMIT_CONFIG.maxAttempts) {
      console.error('[RateLimit] Max attempts reached, locking account:', email);
      await lockAccount(email);
      throw new Error('Muitas tentativas. Conta bloqueada por 15 minutos.');
    }
    
    console.log('[RateLimit] Rate limit check passed:', {
      email,
      attempts: profile.login_attempts,
      maxAttempts: RATE_LIMIT_CONFIG.maxAttempts
    });
    
  } catch (error) {
    // Re-throw if it's our rate limit error
    if (error instanceof Error && error.message.includes('bloqueada')) {
      throw error;
    }
    
    // Log other errors but don't block login attempt
    console.error('[RateLimit] Error checking rate limit:', error);
  }
}

/**
 * Increments failed login attempts
 */
export async function incrementLoginAttempts(email: string): Promise<void> {
  console.log('[RateLimit] Incrementing login attempts for:', email);
  
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        login_attempts: supabase.sql`login_attempts + 1` 
      })
      .eq('email', email);
    
    if (error) {
      console.error('[RateLimit] Error incrementing attempts:', error);
    } else {
      console.log('[RateLimit] Login attempts incremented');
    }
  } catch (error) {
    console.error('[RateLimit] Failed to increment attempts:', error);
  }
}

/**
 * Resets login attempts after successful login
 */
export async function resetLoginAttempts(email: string): Promise<void> {
  console.log('[RateLimit] Resetting login attempts for:', email);
  
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        login_attempts: 0,
        locked_until: null 
      })
      .eq('email', email);
    
    if (error) {
      console.error('[RateLimit] Error resetting attempts:', error);
    } else {
      console.log('[RateLimit] Login attempts reset');
    }
  } catch (error) {
    console.error('[RateLimit] Failed to reset attempts:', error);
  }
}

/**
 * Locks an account for the configured duration
 */
export async function lockAccount(
  email: string, 
  durationMinutes: number = RATE_LIMIT_CONFIG.lockoutDurationMinutes
): Promise<void> {
  console.log('[RateLimit] Locking account:', {
    email,
    durationMinutes
  });
  
  try {
    const lockUntil = new Date(Date.now() + durationMinutes * 60 * 1000);
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        locked_until: lockUntil.toISOString(),
        login_attempts: RATE_LIMIT_CONFIG.maxAttempts 
      })
      .eq('email', email);
    
    if (error) {
      console.error('[RateLimit] Error locking account:', error);
    } else {
      console.log('[RateLimit] Account locked until:', lockUntil);
    }
  } catch (error) {
    console.error('[RateLimit] Failed to lock account:', error);
  }
}

/**
 * Updates last login timestamp
 */
export async function updateLastLogin(email: string): Promise<void> {
  console.log('[RateLimit] Updating last login for:', email);
  
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        last_login_at: new Date().toISOString() 
      })
      .eq('email', email);
    
    if (error) {
      console.error('[RateLimit] Error updating last login:', error);
    } else {
      console.log('[RateLimit] Last login updated');
    }
  } catch (error) {
    console.error('[RateLimit] Failed to update last login:', error);
  }
}

/**
 * Checks if an IP address has too many failed attempts
 * Note: This would require additional infrastructure in production
 */
export async function checkIPRateLimit(ipAddress: string): Promise<boolean> {
  // For MVP, we're only doing email-based rate limiting
  // IP-based rate limiting would require:
  // 1. A separate table for IP tracking
  // 2. Edge function or middleware to get real IP
  // 3. Redis or similar for performance
  
  console.log('[RateLimit] IP rate limiting not implemented for MVP');
  return true;
}

/**
 * Cleans up old rate limit records
 * This should be run periodically (e.g., daily cron job)
 */
export async function cleanupRateLimitRecords(): Promise<void> {
  console.log('[RateLimit] Cleaning up expired locks');
  
  try {
    const { error, data } = await supabase
      .from('profiles')
      .update({ 
        locked_until: null,
        login_attempts: 0 
      })
      .lt('locked_until', new Date().toISOString())
      .not('locked_until', 'is', null);
    
    if (error) {
      console.error('[RateLimit] Error cleaning up locks:', error);
    } else {
      console.log('[RateLimit] Cleaned up locks:', data?.length || 0);
    }
  } catch (error) {
    console.error('[RateLimit] Failed to cleanup locks:', error);
  }
}