# Feature 1.2: Supabase Connection + Mock Users Display

## 1. Human Test
**What to test**: Connect to Supabase, create a basic profiles table, insert mock users, and display them on the homepage

**How to test**:

### Part A: Frontend Testing (Main Page Display)
1. Open terminal in `C:\Users\pedro\Projetos\betlink\betlink`
2. Run `npm run dev`
3. Navigate to `http://localhost:3000` in browser
4. Verify the MAIN HOMEPAGE (`/`) now shows database content

### Part B: Supabase Database Verification
1. Open Supabase dashboard in browser
2. Navigate to your BetLink project
3. Go to "Table Editor" section
4. Verify the `profiles` table exists and contains expected data
5. Check SQL Editor functionality with test queries

**Expected result for Part A (Frontend at localhost:3000)**: 
- Page loads without errors
- **Location**: Main homepage at `http://localhost:3000` (NOT a separate page)
- Displays "Hello BetLink" from Feature 1.1 (preserved at top)
- Shows a NEW section below Feature 1.1 content: "Users from Database"
- Lists exactly 4 mock users in card format:
  - **Master User**: admin@betlink.com (Role: Master)
  - **Admin User**: admin-user@betlink.com (Role: Admin) 
  - **Tipster User**: tipster@betlink.com (Role: Tipster)
  - **Client User**: client@betlink.com (Role: Cliente)
- Each user card shows: Name, Email, Role Badge
- Cards are responsive and styled with Tailwind CSS
- No console errors in browser developer tools

**Expected result for Part B (Supabase Dashboard)**:
- Navigate to: https://supabase.com/dashboard/projects
- Select your BetLink project
- **Table Editor → profiles table**:
  - Table exists with columns: `id`, `email`, `name`, `role`, `created_at`
  - Contains exactly 4 rows with the mock user data
  - `role` column values are: 'Master', 'Admin', 'Tipster', 'Cliente'
- **SQL Editor**: Can run `SELECT * FROM profiles;` successfully
- **API → Settings**: Project URL and anon key are configured

## 2. Dependencies

### Previous features
- ✅ Feature 1.1: Initial Setup - Hello BetLink (COMPLETE)
  - Next.js project structure established
  - Tailwind CSS working
  - shadcn/ui configured
  - Homepage rendering correctly

### Existing files that MUST work
- `/betlink/app/page.tsx` - Homepage (will be modified to add user display)
- `/betlink/app/layout.tsx` - Root layout with Tailwind CSS
- `/betlink/lib/utils.ts` - shadcn/ui utilities
- All files from Feature 1.1 dependencies

### Required libraries (already installed)
- `@supabase/supabase-js` - Database client
- `@supabase/ssr` - Server-side rendering support
- `next` - React framework with server components
- `react` & `react-dom` - Core React

### Required Environment Setup
- Supabase project created
- Environment variables configured (.env.local)
- Database connection established

### Available MCPs (Model Context Protocol integrations)
- **supabase**: Direct Supabase integration and management (PRIMARY for this feature)
- **context7**: Documentation lookup for Supabase best practices
- **playwright**: Automated testing validation

## 3. Guardrails

### DO NOT MODIFY
- `/betlink/app/layout.tsx` - Keep the root layout structure intact
- `/betlink/lib/utils.ts` - shadcn/ui utilities
- `/betlink/components.json` - shadcn/ui config
- `/betlink/package.json` - Dependencies are correctly installed
- Existing "Hello BetLink" content from Feature 1.1

### MUST MAINTAIN
- Feature 1.1 homepage content (preserve existing sections)
- Tailwind CSS styling consistency
- TypeScript strict mode compliance
- No build or lint errors
- Clean console output
- App Router structure (using `/app` directory)

### CAN CREATE/MODIFY
- `/betlink/app/page.tsx` - Add user display section
- `/betlink/.env.local` - Environment variables (if needed)
- Any new components in `/betlink/components/` for user display
- Supabase database schema (profiles table)

### MUST REUSE
- Existing Tailwind CSS classes for styling
- shadcn/ui utilities from `/lib/utils.ts`
- Existing layout and styling patterns from Feature 1.1

## 4. Technical Context

### Which documents should I use as context?
- `/mnt/c/Users/pedro/Projetos/betlink/CLAUDE.md` - Project overview and Supabase integration notes
- `/mnt/c/Users/pedro/Projetos/betlink/.planning/db_schema.txt` - Complete database schema reference
- Master project plan - User roles and permissions structure

### Database Schema (Minimal for Feature 1.2)
```sql
-- profiles table (basic version for Feature 1.2)
CREATE TABLE profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Master', 'Admin', 'Tipster', 'Cliente')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mock data to insert (EXACTLY these 4 records)
INSERT INTO profiles (email, name, role) VALUES
('admin@betlink.com', 'Sistema Master', 'Master'),
('admin-user@betlink.com', 'Administrador', 'Admin'),
('tipster@betlink.com', 'João Tipster', 'Tipster'),
('client@betlink.com', 'Maria Cliente', 'Cliente');
```

### Supabase Verification Checklist
**After implementation, verify in Supabase Dashboard:**

1. **Project exists**: BetLink project visible in dashboard
2. **Table created**: `profiles` table in Table Editor with correct structure
3. **Data inserted**: Exactly 4 rows with the mock users above
4. **API access**: Project URL and anon key available in Settings → API
5. **SQL access**: Can query `SELECT * FROM profiles ORDER BY role;` in SQL Editor

**Expected Table Structure in Supabase:**
| id (UUID) | email | name | role | created_at |
|-----------|-------|------|------|------------|
| [generated] | admin@betlink.com | Sistema Master | Master | [timestamp] |
| [generated] | admin-user@betlink.com | Administrador | Admin | [timestamp] |
| [generated] | tipster@betlink.com | João Tipster | Tipster | [timestamp] |
| [generated] | client@betlink.com | Maria Cliente | Cliente | [timestamp] |

### Available APIs/Functions
```typescript
// Supabase client setup
import { createClient } from '@supabase/supabase-js'

// Server-side data fetching in Next.js
export default async function HomePage() {
  const users = await supabase.from('profiles').select('*')
  // ...
}

// Type definitions
interface Profile {
  id: string
  email: string
  name: string
  role: 'Master' | 'Admin' | 'Tipster' | 'Cliente'
  created_at: string
}
```

### MCP Integration Strategy
**For Feature 1.2 (Current)**:
- **supabase MCP**: PRIMARY - Create project, tables, insert data, test connection
- **context7**: Lookup Next.js server component patterns and Supabase integration
- **playwright**: Validate data display and database connectivity

**Specific MCP Usage Plan**:
1. **supabase MCP**: `list_projects` to see available projects
2. **supabase MCP**: Create/configure project if needed
3. **supabase MCP**: `execute_sql` to create profiles table
4. **supabase MCP**: `execute_sql` to insert mock users
5. **context7**: Look up Next.js + Supabase integration patterns

### Project Patterns
**Data Fetching Pattern:**
- Use Next.js Server Components for initial data load
- Server-side Supabase client configuration
- Error handling for database connection issues

**Component Structure:**
```typescript
// Server Component pattern
export default async function HomePage() {
  try {
    const { data: users, error } = await supabase.from('profiles').select('*')
    if (error) throw error
    
    return (
      <div>
        {/* Feature 1.1 content preserved */}
        <UsersList users={users} />
      </div>
    )
  } catch (error) {
    return <div>Error loading users: {error.message}</div>
  }
}
```

## 5. Implementation Strategy

### Phase 1: Supabase Setup (45 min)
1. **Configure Supabase project using MCP**
   - List existing projects or create new one
   - Get project URL and anon key
   - Set up environment variables
   
2. **Create database schema**
   - Create profiles table with basic structure
   - Insert 4 mock users with different roles
   - Test database connection

### Phase 2: Next.js Integration (30 min)
3. **Setup Supabase client**
   - Configure server-side client
   - Create reusable client instance
   - Add proper TypeScript types

4. **Update homepage to fetch and display users**
   - Modify `/betlink/app/page.tsx` (main homepage file)
   - Add server-side data fetching function
   - Preserve ALL existing Feature 1.1 content at the top
   - Add new section BELOW the existing content

### Phase 3: UI Implementation (30 min)
5. **Create user display section on main homepage**
   - **SPECIFIC LOCATION**: Add new section below Feature 1.1 content in `/betlink/app/page.tsx`
   - **LAYOUT**: Grid of user cards (2x2 on desktop, 1 column on mobile)
   - **EACH CARD**: Name, email, role badge with color coding
   - **STYLING**: Consistent with Feature 1.1 gradient/card theme
   - **ERROR STATE**: "Unable to connect to database" message if Supabase fails
   - **LOADING STATE**: Not needed (server-side rendering)

### Phase 4: Testing & Validation (15 min)
6. **MCP-Enhanced Testing**
   - Use **playwright MCP** to validate page loads with database data
   - Test error handling scenarios
   - Verify responsive display of user cards

### Structured Logging Pattern
```typescript
const FEATURE_NAME = '[Feature 1.2: Supabase Connection]';

console.log(`${FEATURE_NAME} Connecting to Supabase...`);
console.log(`${FEATURE_NAME} Fetching users from profiles table...`);
console.log(`${FEATURE_NAME} Rendering ${users.length} users`);
```

### Error Handling Strategy
```typescript
// Graceful error handling for database issues
try {
  const users = await fetchUsers()
  return <UsersList users={users} />
} catch (error) {
  console.error(`${FEATURE_NAME} Database error:`, error)
  return <div className="text-red-500">Unable to load users</div>
}
```

## 6. Quality Checks

### Build Validation
- [ ] `npm run build` - Successful production build with database integration
- [ ] `npm run dev` - Development server starts and connects to Supabase
- [ ] No TypeScript errors in server components
- [ ] No ESLint warnings

### Database Validation
- [ ] Supabase project accessible via MCP tools
- [ ] profiles table created with correct schema
- [ ] 4 mock users inserted successfully
- [ ] Database connection working from Next.js

### Visual Validation  
- [ ] Feature 1.1 content preserved (Hello BetLink section)
- [ ] New "Users from Database" section displays
- [ ] 4 user cards show with correct information
- [ ] Each card displays: name, email, role
- [ ] Role badges have appropriate styling/colors
- [ ] Responsive on mobile (375px width)
- [ ] Responsive on desktop (1920px width)

### Technical Validation
- [ ] Server-side data fetching working
- [ ] No console errors or database warnings
- [ ] Proper error handling for connection issues
- [ ] Page renders efficiently with database data
- [ ] TypeScript types properly defined for profiles

## 7. Estimate
- **Complexity**: Medium
- **Estimated time**: 2 hours
- **Identified risks**: 
  - Supabase project setup complications (medium risk)
  - Environment variable configuration (low risk)
  - Server component data fetching issues (medium risk)

## 8. Success Criteria
✅ **Feature Complete When:**
1. Supabase project is configured and accessible
2. profiles table created with 4 mock users
3. Homepage displays all mock users fetched from database
4. Each user shows name, email, and role correctly
5. Feature 1.1 content is preserved and still working
6. No console errors or build failures
7. Responsive design works on all devices
8. Human tester can see database data displayed at localhost:3000

## 9. Next Steps After Completion
- Update Feature 1.2 progress file to mark as complete
- Update EPIC 1 progress tracker (2/7 features complete)
- Update master project plan status
- Create learning documentation in `docs/learnings/feature-1-2-learning.md`
- Create handover documentation for Feature 1.3: Role-Based Placeholder Pages
- Prepare mock data for navigation testing in Feature 1.3

## 10. Incremental Visibility Principle
✅ **This feature follows the principle:**
- **Visible Change**: Homepage now shows dynamic database content
- **Immediate Testing**: User can immediately see 4 mock users at localhost:3000
- **Incremental Schema**: Only basic profiles table, more complex schema added later
- **Real Data Testing**: Uses actual Supabase database connection for testing

---

**Created**: 2025-07-21
**Status**: Ready for Implementation  
**Dependencies**: Feature 1.1 complete ✅
**MCP Priority**: supabase MCP (primary), context7 MCP (secondary)