# Feature 1.4: Basic Authentication - Implementation Plan

## 📋 Feature Overview
**Goal**: Implement basic authentication with Supabase Auth, enabling users to login and be redirected based on their roles, with proper validation and security measures.

## 🎯 Strategy: Incremental Implementation with Visible Progress

### Core Strategy
We'll implement authentication in small, testable increments, ensuring each step is visible at localhost:3000 and can be tested immediately. Error logging will be comprehensive to enable quick debugging.

### Implementation Phases
1. **Phase 1: Profile Schema Update & Credentials Display** (Database setup)
2. **Phase 2: Login Form with Full Validation** (Complete form UI)
3. **Phase 3: Supabase Auth Integration** (Login functionality)
4. **Phase 4: Role-Based Redirects & Session Management** (Complete flow)
5. **Phase 5: Security Hardening** (Rate limiting, audit logs)

## ⚠️ Critical Points & Risk Mitigation

### 1. **Profile Schema Updates** 🔴 CRITICAL
**Risk**: Missing required fields for Telegram integration and user management
**Required Fields**:
```sql
-- MUST add to profiles table
phone VARCHAR(20) NOT NULL,              -- Brazilian format (11) 99999-9999
telegram_username VARCHAR(32) NOT NULL,   -- Without @ symbol
password_changed_at TIMESTAMP,            -- For tipster first login
terms_accepted_at TIMESTAMP,              -- Legal compliance
last_login_at TIMESTAMP,                  -- Activity tracking
login_attempts INT DEFAULT 0,             -- Rate limiting
locked_until TIMESTAMP                    -- Account lockout
```

### 2. **Supabase Auth Configuration** 🔴 CRITICAL
**Risk**: Auth not properly configured, users can't be created
**Mitigation**:
- Create Cursor instruction document for auth setup
- Configure session: 24h active, 30d refresh token
- Set max 3 concurrent sessions per user
- Enable email/password provider
- Configure cookie settings: httpOnly, secure, sameSite: 'strict'

### 3. **Auth.users ↔ Profiles Sync** 🔴 CRITICAL
**Risk**: User logs in but no profile data, causing app crashes
**Mitigation**:
```typescript
// Always check profile exists after auth
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('email', user.email)
  .single();

if (!profile) {
  console.error('[Auth] No profile found for user:', user.email);
  throw new Error('Perfil não encontrado. Entre em contato com o suporte.');
}

// Validate required fields
if (!profile.phone || !profile.telegram_username) {
  throw new Error('Dados incompletos. Atualize seu perfil.');
}
```

### 4. **Password Validation** 🔴 CRITICAL
**Risk**: Weak passwords compromise security
**Requirements**:
```typescript
const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
  commonPasswords: ['12345678', 'password', 'qwerty123']
};

function validatePassword(password: string): string[] {
  const errors = [];
  if (password.length < 8) errors.push('Mínimo 8 caracteres');
  if (!/[A-Z]/.test(password)) errors.push('Precisa letra maiúscula');
  if (!/[a-z]/.test(password)) errors.push('Precisa letra minúscula');
  if (!/[0-9]/.test(password)) errors.push('Precisa número');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Precisa caractere especial');
  return errors;
}
```

### 5. **Rate Limiting Implementation** 🔴 CRITICAL
**Risk**: Brute force attacks, system abuse
**Implementation**:
```typescript
// Track in profiles table
async function checkRateLimit(email: string) {
  const profile = await getProfile(email);
  
  // Check if locked
  if (profile.locked_until && profile.locked_until > new Date()) {
    const minutes = Math.ceil((profile.locked_until - new Date()) / 60000);
    throw new Error(`Conta bloqueada. Tente novamente em ${minutes} minutos.`);
  }
  
  // Check attempts
  if (profile.login_attempts >= 5) {
    // Lock for 15 minutes
    await lockAccount(email, 15);
    throw new Error('Muitas tentativas. Conta bloqueada por 15 minutos.');
  }
}
```

### 6. **Input Validation** 🟡 IMPORTANT
**Risk**: Invalid data causing system errors
**Validation Rules**:
```typescript
const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{2}\) \d{5}-\d{4}$/,  // (11) 99999-9999
  telegram: {
    pattern: /^[a-zA-Z0-9_]{5,32}$/,
    minLength: 5,
    maxLength: 32,
    forbiddenChars: ['@', ' ', '-', '.']
  }
};
```

### 7. **Error Handling & User Feedback** 🟡 IMPORTANT
**Risk**: Generic errors confuse users, sensitive info leaked
**Mitigation**:
```typescript
// Comprehensive error mapping
const ERROR_MESSAGES: Record<string, string> = {
  // Auth errors
  'Invalid login credentials': 'Email ou senha incorretos',
  'Email not confirmed': 'Por favor, confirme seu email primeiro',
  'User not found': 'Email ou senha incorretos', // Don't reveal user existence
  
  // Validation errors  
  'Invalid phone format': 'Telefone inválido. Use (11) 99999-9999',
  'Invalid telegram username': 'Username do Telegram inválido (5-32 caracteres, apenas letras, números e _)',
  'Telegram username taken': 'Este username do Telegram já está em uso',
  
  // Rate limiting
  'Too many requests': 'Muitas tentativas. Aguarde 15 minutos',
  'Account locked': 'Conta temporariamente bloqueada por segurança',
  
  // Profile errors
  'Profile not found': 'Perfil não encontrado. Entre em contato com o suporte',
  'Incomplete profile': 'Complete seu perfil antes de continuar',
  
  // Generic
  'Network error': 'Erro de conexão. Tente novamente',
  'Unknown error': 'Erro inesperado. Tente novamente ou contate o suporte'
};
```

### 8. **Session Management** 🟡 IMPORTANT
**Risk**: Sessions not persisting, users logged out randomly
**Mitigation**:
```typescript
// Supabase session config
const sessionConfig = {
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: false,
  flowType: 'pkce',
  storage: {
    // Custom storage for better control
    getItem: (key: string) => {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
      }
    },
    setItem: (key: string, value: string) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    },
    removeItem: (key: string) => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    }
  }
};
```

### 9. **Audit Logging** 🟡 IMPORTANT
**Risk**: No visibility into security events
**Implementation**:
```typescript
// Log all auth events
async function logAuthEvent(event: {
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'account_locked';
  userId?: string;
  email: string;
  ip?: string;
  userAgent?: string;
  metadata?: any;
}) {
  console.log('[AuthAudit]', {
    ...event,
    timestamp: new Date().toISOString()
  });
  
  // In production, save to auth_logs table
  if (process.env.NODE_ENV === 'production') {
    await supabase.from('auth_logs').insert(event);
  }
}
```

## 🛡️ Security Checklist

- [ ] No passwords in console.log (only in dev mode)
- [ ] HTTPS required for production
- [ ] Rate limiting: 5 login attempts per 15 minutes
- [ ] Secure cookie settings: httpOnly, secure, sameSite: 'strict'
- [ ] CSRF protection via Supabase
- [ ] No sensitive data in error messages
- [ ] Proper CORS configuration
- [ ] Phone number validation (Brazilian format)
- [ ] Telegram username validation (5-32 chars, alphanumeric + underscore)
- [ ] Password complexity validation
- [ ] Account lockout mechanism
- [ ] Audit logging for all auth events
- [ ] Session timeout after 24 hours
- [ ] Max 3 concurrent sessions per user

## 📝 Detailed Implementation Steps

### Step 1: Update Profile Schema via Cursor (1 hour)
**Critical**: Must be done via Cursor IDE first
```sql
-- Add these columns to profiles table
ALTER TABLE profiles ADD COLUMN phone VARCHAR(20) NOT NULL DEFAULT '';
ALTER TABLE profiles ADD COLUMN telegram_username VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE profiles ADD COLUMN password_changed_at TIMESTAMP;
ALTER TABLE profiles ADD COLUMN terms_accepted_at TIMESTAMP;
ALTER TABLE profiles ADD COLUMN last_login_at TIMESTAMP;
ALTER TABLE profiles ADD COLUMN login_attempts INT DEFAULT 0;
ALTER TABLE profiles ADD COLUMN locked_until TIMESTAMP;

-- Update existing test users with phone and telegram
UPDATE profiles SET 
  phone = '(11) 99999-0001',
  telegram_username = 'admin_betlink'
WHERE email = 'admin@betlink.com';

UPDATE profiles SET 
  phone = '(11) 99999-0002',
  telegram_username = 'admin_user'
WHERE email = 'admin-user@betlink.com';

UPDATE profiles SET 
  phone = '(11) 99999-0003',
  telegram_username = 'joao_tipster'
WHERE email = 'tipster@betlink.com';

UPDATE profiles SET 
  phone = '(11) 99999-0004',
  telegram_username = 'maria_cliente'
WHERE email = 'client@betlink.com';
```

### Step 2: Display Test Credentials (30 min)
**Visibility**: Homepage shows complete login credentials
```typescript
// Homepage addition with all user data
const testCredentials = [
  {
    role: 'Master',
    email: 'admin@betlink.com',
    password: 'Admin123!',
    phone: '(11) 99999-0001',
    telegram: '@admin_betlink'
  },
  // ... other users
];
```

### Step 3: Create Auth Users via Cursor (45 min)
**Critical**: Must create auth.users entries
```sql
-- Create auth users with test passwords
-- Password for all: Test123!@#
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES 
  ('admin@betlink.com', crypt('Test123!@#', gen_salt('bf')), NOW()),
  ('admin-user@betlink.com', crypt('Test123!@#', gen_salt('bf')), NOW()),
  ('tipster@betlink.com', crypt('Test123!@#', gen_salt('bf')), NOW()),
  ('client@betlink.com', crypt('Test123!@#', gen_salt('bf')), NOW());
```

### Step 4: Create Validation Utilities (1 hour)
**New files to create**:
```typescript
// lib/auth/validation.ts
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
};

export const validateTelegramUsername = (username: string): string | null => {
  if (username.length < 5) return 'Mínimo 5 caracteres';
  if (username.length > 32) return 'Máximo 32 caracteres';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Apenas letras, números e underscore';
  if (username.includes('@')) return 'Não inclua o @ no username';
  return null;
};

export const validatePassword = (password: string): string[] => {
  const errors = [];
  if (password.length < 8) errors.push('Mínimo 8 caracteres');
  if (!/[A-Z]/.test(password)) errors.push('Precisa letra maiúscula');
  if (!/[a-z]/.test(password)) errors.push('Precisa letra minúscula');
  if (!/[0-9]/.test(password)) errors.push('Precisa número');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Precisa caractere especial');
  return errors;
};
```

### Step 5: Implement Supabase Clients (1.5 hours)
**Enhanced clients with proper session handling**:
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        flowType: 'pkce',
        storage: {
          getItem: (key: string) => {
            if (typeof window !== 'undefined') {
              return window.localStorage.getItem(key);
            }
            return null;
          },
          setItem: (key: string, value: string) => {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem(key, value);
            }
          },
          removeItem: (key: string) => {
            if (typeof window !== 'undefined') {
              window.localStorage.removeItem(key);
            }
          }
        }
      },
      global: {
        headers: {
          'x-application-name': 'betlink'
        }
      }
    }
  );
}
```

### Step 6: Build Enhanced Login Form (2 hours)
**Complete form with all validations**:
```typescript
// components/features/auth/LoginForm.tsx
export function LoginForm({ loginType = 'client' }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(', ');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    console.log('[LoginForm] Submitting login:', {
      email: formData.email,
      loginType,
      timestamp: new Date().toISOString()
    });
    
    try {
      const result = await signIn(formData.email, formData.password, loginType);
      console.log('[LoginForm] Login successful, redirecting to:', result.redirect);
      router.push(result.redirect);
    } catch (error) {
      console.error('[LoginForm] Login error:', error);
      setErrors({ 
        submit: error.message || 'Erro ao fazer login. Tente novamente.' 
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Form JSX with proper error display
}
```

### Step 7: Implement Complete Auth Flow (2.5 hours)
**Server action with all security features**:
```typescript
// app/actions/auth.ts
export async function signIn(email: string, password: string, loginType: 'client' | 'tipster' | 'admin' = 'client') {
  console.log('[Auth] Login attempt:', { email, loginType, timestamp: new Date().toISOString() });
  
  try {
    // Check rate limiting first
    await checkRateLimit(email);
    
    // Attempt authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      // Increment failed attempts
      await incrementLoginAttempts(email);
      
      // Log failed attempt
      await logAuthEvent({
        type: 'failed_login',
        email,
        ip: request.headers.get('x-forwarded-for'),
        userAgent: request.headers.get('user-agent'),
        metadata: { error: error.message }
      });
      
      // Map to Portuguese error
      const userMessage = ERROR_MESSAGES[error.message] || 'Email ou senha incorretos';
      throw new Error(userMessage);
    }
    
    // Fetch and validate profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();
      
    if (!profile) {
      throw new Error('Perfil não encontrado. Entre em contato com o suporte.');
    }
    
    // Validate required fields
    if (!profile.phone || !profile.telegram_username) {
      throw new Error('Complete seu perfil antes de continuar.');
    }
    
    // Check role matches login type
    if (loginType === 'tipster' && profile.role !== 'Tipster') {
      throw new Error('Acesso negado. Use a área de login correta.');
    }
    
    if (loginType === 'admin' && !['Admin', 'Master'].includes(profile.role)) {
      throw new Error('Acesso negado. Área administrativa.');
    }
    
    // Check tipster first login
    if (profile.role === 'Tipster' && !profile.password_changed_at) {
      return { redirect: '/tipster/change-password' };
    }
    
    // Reset failed attempts
    await resetLoginAttempts(email);
    
    // Update last login
    await updateLastLogin(email);
    
    // Log successful login
    await logAuthEvent({
      type: 'login',
      userId: data.user.id,
      email,
      ip: request.headers.get('x-forwarded-for'),
      userAgent: request.headers.get('user-agent'),
      metadata: { role: profile.role }
    });
    
    // Determine redirect based on role
    const ROLE_REDIRECTS = {
      'Master': '/admin',
      'Admin': '/admin',
      'Tipster': '/meus-canais',
      'Cliente': '/dashboard',
    };
    
    const redirectPath = ROLE_REDIRECTS[profile.role] || '/';
    
    return { 
      user: data.user, 
      profile,
      redirect: redirectPath 
    };
    
  } catch (error) {
    console.error('[Auth] Login error:', error);
    throw error;
  }
}
```

### Step 8: Implement Rate Limiting (1 hour)
**Database-backed rate limiting**:
```typescript
// lib/auth/rate-limit.ts
async function checkRateLimit(email: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('login_attempts, locked_until')
    .eq('email', email)
    .single();
    
  if (!profile) return; // New user, allow attempt
  
  // Check if account is locked
  if (profile.locked_until && new Date(profile.locked_until) > new Date()) {
    const minutesLeft = Math.ceil((new Date(profile.locked_until).getTime() - Date.now()) / 60000);
    throw new Error(`Conta bloqueada. Tente novamente em ${minutesLeft} minutos.`);
  }
  
  // Check attempt count
  if (profile.login_attempts >= 5) {
    // Lock account for 15 minutes
    const lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    
    await supabase
      .from('profiles')
      .update({ locked_until: lockUntil })
      .eq('email', email);
      
    throw new Error('Muitas tentativas. Conta bloqueada por 15 minutos.');
  }
}
```

## 🔍 Testing Strategy

### Manual Testing Checklist
1. **Homepage**:
   - [ ] Test credentials visible with all user data
   - [ ] Shows email, password, phone, telegram for each role
   - [ ] Navigation shows "Entrar" button

2. **Login Form Validation**:
   - [ ] Email format validation works
   - [ ] Password complexity shown (8 chars, uppercase, lowercase, number, special)
   - [ ] Empty fields show errors
   - [ ] Invalid format shows inline errors
   - [ ] Submit disabled while loading

3. **Authentication Flow**:
   - [ ] Valid credentials login successfully
   - [ ] Invalid credentials show Portuguese error
   - [ ] Profile missing phone/telegram shows error
   - [ ] Loading state during authentication
   - [ ] Console logs show detailed auth process

4. **Role-Based Redirects**:
   - [ ] Master (admin@betlink.com) → /admin
   - [ ] Admin (admin-user@betlink.com) → /admin  
   - [ ] Tipster (tipster@betlink.com) → /meus-canais
   - [ ] Cliente (client@betlink.com) → /dashboard
   - [ ] Wrong login area shows access denied

5. **Rate Limiting**:
   - [ ] 5 failed attempts locks account
   - [ ] Shows time remaining in minutes
   - [ ] Account unlocks after 15 minutes
   - [ ] Successful login resets counter

6. **Session Management**:
   - [ ] Session persists on page refresh
   - [ ] Navigation shows user info and role
   - [ ] Can navigate between allowed pages
   - [ ] Session expires after 24 hours
   - [ ] Auto-refresh before expiration

7. **Error Scenarios**:
   - [ ] Wrong password: "Email ou senha incorretos"
   - [ ] Non-existent email: "Email ou senha incorretos" (no user enumeration)
   - [ ] Locked account: "Conta bloqueada. Tente novamente em X minutos"
   - [ ] Network error: "Erro de conexão. Tente novamente"
   - [ ] Missing profile data: "Complete seu perfil antes de continuar"

8. **Security Checks**:
   - [ ] No passwords in console logs (except dev mode)
   - [ ] Cookies are httpOnly (check DevTools)
   - [ ] HTTPS required in production
   - [ ] No sensitive data in error messages

## 📊 Success Metrics

1. **All 4 test users can login with full validation** ✓
2. **Phone and Telegram fields properly validated** ✓
3. **Rate limiting prevents brute force attacks** ✓
4. **Proper role-based redirects work** ✓
5. **Sessions persist with proper security** ✓
6. **Clear error messages in Portuguese** ✓
7. **Comprehensive console logs for debugging** ✓
8. **No security vulnerabilities** ✓

## ⏱️ Time Estimates

- **Total Duration**: 10-12 hours
- **Cursor Database Work**: 2 hours (blocking - schema updates)
- **Active Coding**: 7-9 hours
- **Testing & Refinement**: 2-3 hours

## 🚧 Potential Blockers

1. **Profile schema updates** → Need Cursor for ALTER TABLE commands
2. **Supabase Auth not enabled** → Need dashboard configuration
3. **Email confirmation required** → Disable for development
4. **Missing phone/telegram data** → Update test users
5. **Rate limiting table access** → Need proper indexes
6. **Cookie configuration** → Verify Supabase settings

## 📚 Resources Needed

- Supabase Auth documentation
- Access to Supabase dashboard for auth configuration
- Cursor IDE for all database operations
- Test phone numbers in Brazilian format
- Test Telegram usernames for all users

## 🔄 Cursor Instructions Summary

### Required Database Operations:
1. **Add columns to profiles table**:
   - phone, telegram_username (required fields)
   - password_changed_at, terms_accepted_at
   - last_login_at, login_attempts, locked_until

2. **Update test users** with phone and telegram data

3. **Create auth.users entries** with test passwords

4. **Configure Supabase Auth**:
   - Enable email/password provider
   - Set session duration (24h/30d)
   - Configure cookie settings

5. **Create indexes** for performance:
   - Index on email for quick lookups
   - Index on locked_until for rate limiting queries

## 🎬 Next Steps After Completion

Feature 1.5 (Middleware + RLS) will:
- Add route protection in middleware
- Implement Row Level Security
- Add logout functionality
- Enhance security further

## 📁 File Modification Guide

### Files to MODIFY (10 files)
1. **lib/supabase.ts** - Enhance with auth methods
2. **lib/supabase/client.ts** - Implement browser client with auth
3. **lib/supabase/server.ts** - Implement server client with cookies
4. **components/features/auth/LoginForm.tsx** - Add real form logic with validation
5. **components/features/auth/AuthProvider.tsx** - Add auth state management
6. **components/layout/Navigation.tsx** - Show user info when logged in
7. **app/actions/auth.ts** - Implement signIn with rate limiting
8. **app/page.tsx** - Add test credentials display section
9. **app/login/page.tsx** - Use real LoginForm component
10. **hooks/useAuth.ts** - Implement auth hook logic

### Files NOT to MODIFY
1. **app/admin/page.tsx** - Keep placeholder as is
2. **app/dashboard/page.tsx** - Keep placeholder as is
3. **app/meus-canais/page.tsx** - Keep placeholder as is
4. **middleware.ts** - Save for Feature 1.5 (RLS implementation)
5. **types/index.ts** - Already has correct types

### Files to CREATE (6 files)
1. **docs/cursor-instructions/feature-1-4-auth-setup.md** - Comprehensive database instructions
2. **lib/auth/validation.ts** - Input validation functions
3. **lib/auth/errors.ts** - Error mapping for Portuguese messages
4. **lib/auth/redirects.ts** - Role-based redirect logic
5. **lib/auth/rate-limit.ts** - Rate limiting implementation
6. **lib/auth/session.ts** - Session management utilities

## 🔐 Authentication Flow Details

### 1. Admin Login Process

**Flow Overview**: Login Form → Server Action → Supabase Auth → Profile Check → Redirect

**Detailed Steps**:
1. **User visits**: `/login` (public page)
2. **LoginForm.tsx**: 
   - User enters email/password
   - Client-side validation
   - Shows loading state
3. **Server Action** (`app/actions/auth.ts`):
   ```typescript
   async function signIn(email, password) {
     // Log attempt
     console.log('[Auth] Admin login attempt:', email);
     
     // Authenticate with Supabase
     const { data, error } = await supabase.auth.signInWithPassword({
       email, password
     });
     
     // Fetch profile to check role
     const profile = await supabase
       .from('profiles')
       .select('*')
       .eq('email', email)
       .single();
     
     // Verify admin role
     if (profile.role !== 'Admin' && profile.role !== 'Master') {
       throw new Error('Invalid login area');
     }
     
     // Return success with redirect path
     return { redirect: '/admin' };
   }
   ```
4. **Client Response**:
   - Receives redirect path
   - Uses Next.js router to navigate
5. **Supabase Session**:
   - Sets secure HTTP-only cookies
   - Session valid for 24 hours
6. **Navigation.tsx**:
   - Updates to show admin info
   - Shows logout button

**Note**: In Feature 1.5, middleware will enforce access control.

### 2. Tipster Login Process

**Flow Overview**: Tipster Login Form → Server Action → Supabase Auth → First Login Check → Redirect

**Detailed Steps**:
1. **User visits**: `/tipster/login` (separate login page)
2. **LoginForm.tsx** (reused with props):
   - Same form, different styling
   - Validates tipster credentials
3. **Server Action** (extended):
   ```typescript
   // In signIn function
   if (loginType === 'tipster') {
     // Verify tipster role
     if (profile.role !== 'Tipster') {
       throw new Error('Acesso negado - área exclusiva para tipsters');
     }
     
     // Check if first login (password not changed)
     if (profile.password_changed_at === null) {
       return { redirect: '/tipster/change-password' }; // Future feature
     }
     
     return { redirect: '/meus-canais' };
   }
   ```
4. **First Login Detection**:
   - Check `password_changed_at` field
   - Force password change (future feature)
5. **Successful Login**:
   - Redirect to `/meus-canais`
   - Show tipster dashboard

### 3. Client Login Process

**Flow Overview**: Public Login → Server Action → Supabase Auth → Email Verification → Redirect

**Detailed Steps**:
1. **User visits**: `/login` (same as admin)
2. **LoginForm.tsx**:
   - Standard email/password form
   - Shows "Esqueci minha senha" link
3. **Server Action**:
   ```typescript
   // For clients
   if (profile.role === 'Cliente') {
     // Check email confirmation
     if (!user.email_confirmed_at) {
       throw new Error('Por favor, confirme seu email antes de fazer login');
     }
     
     // Check account status
     if (profile.status !== 'ativo') {
       throw new Error('Sua conta está suspensa. Entre em contato com o suporte.');
     }
     
     return { redirect: '/dashboard' };
   }
   ```
4. **Email Verification**:
   - Supabase checks `email_confirmed_at`
   - Blocks unverified accounts
5. **Successful Login**:
   - Redirect to `/dashboard`
   - Show client subscriptions

### 4. Non-Authenticated User Experience

**What They Can See**:
1. **Homepage** (`/`) - Public landing page with user cards
2. **Login Page** (`/login`) - Public login form
3. **Signup Page** (`/signup`) - Registration form (future)
4. **Tipster Login** (`/tipster/login`) - Separate tipster entry

**What They CANNOT Access**:
1. **Admin Area** (`/admin/*`) - Blocked, redirect to login
2. **Tipster Area** (`/meus-canais/*`) - Blocked, redirect to login
3. **Client Area** (`/dashboard/*`) - Blocked, redirect to login

**Access Control Process** (Feature 1.5):
```typescript
// middleware.ts (Feature 1.5)
export async function middleware(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    // Redirect to login with return URL
    return NextResponse.redirect('/login?from=' + request.url);
  }
  
  // Check role-based access
  const path = request.nextUrl.pathname;
  if (path.startsWith('/admin') && !['Admin', 'Master'].includes(session.role)) {
    return NextResponse.redirect('/unauthorized');
  }
}
```

**Files Involved**:
- `middleware.ts` - Route protection (Feature 1.5)
- `lib/supabase/middleware.ts` - Session checking
- Protected page files - Will check auth state

### 5. Logout Process

**Complete Logout Flow**:

1. **User clicks logout** (Navigation.tsx):
   ```typescript
   const handleLogout = async () => {
     console.log('[Auth] Logout initiated');
     await signOut();
   };
   ```

2. **Server Action** (`app/actions/auth.ts`):
   ```typescript
   export async function signOut() {
     console.log('[Auth] Processing logout');
     
     const supabase = createServerClient();
     const { error } = await supabase.auth.signOut();
     
     if (error) {
       console.error('[Auth] Logout error:', error);
     }
     
     // Clear any app-specific data
     console.log('[Auth] Session cleared');
     
     // Redirect to home
     redirect('/');
   }
   ```

3. **Supabase Cleanup**:
   - Invalidates refresh token
   - Clears session cookies
   - Removes from active sessions

4. **Client State Update**:
   - AuthProvider detects logout
   - Clears user state
   - Updates Navigation UI

**Files Involved**:
- `components/layout/Navigation.tsx` - Logout button
- `app/actions/auth.ts` - signOut server action
- `lib/supabase/client.ts` - Client cleanup
- `components/features/auth/AuthProvider.tsx` - State update

### 6. Sign-up Process (Future Feature)

**Note**: Sign-up is not part of Feature 1.4, but here's the planned flow:

**Client Registration Flow**:
1. **Visit** `/signup`
2. **SignUpForm.tsx**:
   - Name, email, phone, Telegram username
   - Password with confirmation
   - Terms acceptance checkbox
3. **Server Action** (`createAccount`):
   ```typescript
   // Validate unique email
   // Validate Telegram username format
   // Create auth.users entry
   // Create profile entry
   // Send confirmation email
   ```
4. **Email Confirmation**:
   - Supabase sends magic link
   - User clicks to verify
5. **Auto-login**:
   - After confirmation
   - Redirect to dashboard

**Files for Future**:
- `components/features/auth/SignUpForm.tsx`
- `app/actions/auth.ts` - createAccount action
- `app/signup/page.tsx` - Registration page

---

**Remember**: Each step must be visible and testable at localhost:3000! 🎯