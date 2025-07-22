import { createBrowserClient } from '@supabase/ssr'

// This will be properly implemented in Feature 1.4
// For now, it's a placeholder that re-exports the existing client

export function createClient() {
  // TODO: Feature 1.4 - Implement proper browser client with cookies
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Temporary export for backward compatibility
// Will be removed in Feature 1.4
export { supabase } from '@/lib/supabase'