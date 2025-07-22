# Cursor Instructions: Feature 1.2 - Database Operations

## 🎯 Objective
Create profiles table in Supabase and insert 4 test users for Feature 1.2 (Supabase Connection + Real Database Users).

## 📋 Cursor Commands
Open Cursor IDE and use this exact command with @supabase:

```
@supabase I need to create a profiles table and insert test data for Feature 1.2.

Create table with SQL:
CREATE TABLE profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Master', 'Admin', 'Tipster', 'Cliente')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

Then insert these 4 users:
INSERT INTO profiles (email, name, role) VALUES
('admin@betlink.com', 'Sistema Master', 'Master'),
('admin-user@betlink.com', 'Administrador', 'Admin'),
('tipster@betlink.com', 'João Tipster', 'Tipster'),
('client@betlink.com', 'Maria Cliente', 'Cliente');
```

## 🔍 Verification
After execution, verify in Supabase dashboard:
- Check if `profiles` table exists with 5 columns (id, email, name, role, created_at)
- Verify exactly 4 rows exist with the specified users
- Test query: `SELECT * FROM profiles ORDER BY role;`

Expected result:
- Sistema Master (Master)
- Administrador (Admin)
- João Tipster (Tipster)
- Maria Cliente (Cliente)

## ➡️ Next Steps
After database operations complete:
- Claude Code will continue Feature 1.2 implementation
- Homepage will fetch and display these 4 users from database
- Feature 1.2 testing can proceed at localhost:3000

## ✅ Status
- [✅] **COMPLETED** - Database operations executed successfully
- [✅] **VERIFIED** - 4 users confirmed in profiles table
- [✅] **READY** - Feature 1.2 can display live database data