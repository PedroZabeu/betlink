export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'Master' | 'Admin' | 'Tipster' | 'Cliente'
          phone: string
          telegram_username: string
          user_id: string
          created_at: string
          last_login_at: string | null
          login_attempts: number
          locked_until: string | null
          password_changed_at: string | null
          terms_accepted_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: 'Master' | 'Admin' | 'Tipster' | 'Cliente'
          phone?: string
          telegram_username?: string
          user_id: string
          created_at?: string
          last_login_at?: string | null
          login_attempts?: number
          locked_until?: string | null
          password_changed_at?: string | null
          terms_accepted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'Master' | 'Admin' | 'Tipster' | 'Cliente'
          phone?: string
          telegram_username?: string
          user_id?: string
          created_at?: string
          last_login_at?: string | null
          login_attempts?: number
          locked_until?: string | null
          password_changed_at?: string | null
          terms_accepted_at?: string | null
        }
      }
    }
  }
} 