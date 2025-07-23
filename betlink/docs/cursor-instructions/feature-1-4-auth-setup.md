# Cursor Instructions: Feature 1.4 - Authentication Database Setup

## 🎯 Objective
Set up the database schema and auth configuration required for Feature 1.4 Basic Authentication implementation.

## ⚠️ CRITICAL: Execute in Order
These operations must be executed in the exact order listed below to avoid dependency issues.

## 📋 Cursor Commands

### Step 1: Update Profiles Table Schema
Open Cursor IDE and use these exact commands with @supabase:

```
@supabase Add the following columns to the profiles table:

1. phone VARCHAR(20) NOT NULL DEFAULT ''
2. telegram_username VARCHAR(32) NOT NULL DEFAULT ''
3. password_changed_at TIMESTAMP NULL
4. terms_accepted_at TIMESTAMP NULL
5. last_login_at TIMESTAMP NULL
6. login_attempts INTEGER DEFAULT 0
7. locked_until TIMESTAMP NULL

Use ALTER TABLE statements to add each column.
```

### Step 2: Update Existing Test Users
After adding columns, update the test users:

```
@supabase Update the existing 4 users in the profiles table with this data:

1. admin@betlink.com:
   - phone: '(11) 99999-0001'
   - telegram_username: 'admin_betlink'

2. admin-user@betlink.com:
   - phone: '(11) 99999-0002'
   - telegram_username: 'admin_user'

3. tipster@betlink.com:
   - phone: '(11) 99999-0003'
   - telegram_username: 'joao_tipster'

4. client@betlink.com:
   - phone: '(11) 99999-0004'
   - telegram_username: 'maria_cliente'
```

### Step 3: Create Auth Users
Create auth.users entries for testing:

```
@supabase Create auth users for the 4 test emails with these requirements:

Emails:
- admin@betlink.com
- admin-user@betlink.com
- tipster@betlink.com
- client@betlink.com

Password for all: Test123!@#
Mark all emails as confirmed (email_confirmed_at = NOW())

IMPORTANT: Use Supabase Auth Admin API or dashboard to create these users properly.
```

### Step 4: Configure Supabase Auth Settings
Configure authentication settings:

```
@supabase Configure the following auth settings in the Supabase dashboard:

1. Enable Email/Password authentication
2. Disable email confirmation requirement for development
3. Set JWT expiry to 24 hours (86400 seconds)
4. Set refresh token expiry to 30 days (2592000 seconds)
5. Enable refresh token rotation
6. Set maximum concurrent sessions to 3

Also ensure the following environment variables are set in the project:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (for server-side operations)
```

### Step 5: Create Performance Indexes
Add indexes for better query performance:

```
@supabase Create the following indexes on the profiles table:

1. CREATE INDEX idx_profiles_email ON profiles(email);
2. CREATE INDEX idx_profiles_locked_until ON profiles(locked_until) WHERE locked_until IS NOT NULL;
3. CREATE INDEX idx_profiles_role ON profiles(role);

These indexes will improve authentication query performance.
```

### Step 6: Verify Setup
Run verification queries:

```
@supabase Run these queries to verify the setup is complete:

1. SELECT email, role, phone, telegram_username, login_attempts FROM profiles;
   -- Should show 4 users with phone and telegram data

2. SELECT column_name, data_type, is_nullable 
   FROM information_schema.columns 
   WHERE table_name = 'profiles' 
   AND column_name IN ('phone', 'telegram_username', 'password_changed_at', 'login_attempts', 'locked_until');
   -- Should show all new columns

3. Check auth.users table has 4 entries (through Supabase dashboard)
```

## 🔍 Verification Steps

After completing all steps:

1. **Check Profiles Table**:
   - All 4 users have phone numbers in format (11) 99999-000X
   - All 4 users have telegram usernames without @ symbol
   - New columns exist and have correct types

2. **Check Auth Configuration**:
   - Can create a test session with email/password
   - Sessions expire after 24 hours
   - Refresh tokens work properly

3. **Test Authentication**:
   - Try logging in with admin@betlink.com / Test123!@#
   - Should receive a valid JWT token
   - Profile data should be accessible

## ➡️ Next Steps

Once this is complete, Claude Code will:
1. Display test credentials on the homepage
2. Implement the login form with validation
3. Create auth server actions
4. Test the complete authentication flow

## 🚨 Troubleshooting

If you encounter errors:

1. **"Column already exists"**: Skip that ALTER TABLE command
2. **"User already exists"**: Check if auth.users already has the email
3. **"Permission denied"**: Ensure you're using the service role key for auth operations
4. **Profile not linking**: Make sure email in auth.users matches email in profiles exactly

## 📝 Notes

- All passwords are set to `Test123!@#` for development
- Phone numbers use São Paulo area code (11)
- Telegram usernames are lowercase with underscores
- This setup is for development only - production will have different security settings

---

**IMPORTANT**: Please execute these commands in order and notify Claude Code when complete or if you encounter any errors.