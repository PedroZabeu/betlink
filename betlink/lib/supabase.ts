import { createClient } from '@supabase/supabase-js'

// BetLink Supabase Configuration using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test credentials for Feature 1.4 - AUTH USERS CREATED ✅
export const TEST_CREDENTIALS = [
  { email: 'admin@betlink.com', password: '123456', role: 'Master', name: 'Sistema Master', user_id: '775f77d3-9abc-4076-bb86-d9da21687f89' },
  { email: 'admin-user@betlink.com', password: '123456', role: 'Admin', name: 'Administrador', user_id: '32865bb7-38b0-4aef-8419-56d805d76d8d' },
  { email: 'tipster@betlink.com', password: '123456', role: 'Tipster', name: 'João Tipster', user_id: '228c060a-8f19-4ac1-8f49-398f8492cec3' },
  { email: 'client@betlink.com', password: '123456', role: 'Cliente', name: 'Maria Cliente', user_id: '451e017f-c9ad-441a-b0cd-61087de45bc9' }
]