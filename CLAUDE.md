# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BetLink** is a tipster management platform that connects professional tipsters with betting clients. The platform provides subscription management, Telegram integration, and automated payment processing.

### Key Features
- Multi-role user system (Master, Admin, Tipster, Cliente)
- Subscription-based tipster channels
- Automated Telegram integration for channel access
- Payment processing with Stripe/MercadoPago
- Bet tracking and ROI calculation
- Waiting list management for full channels

## Architecture

BetLink is an **active development project**. The codebase is organized with a comprehensive documentation structure in the `betlink/docs/` directory that tracks all development progress.

### Planned Tech Stack
- **Frontend**: Next.js with React
- **UI Components**: Shadcn/ui + Origin UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment Processing**: Stripe + MercadoPago
- **Messaging**: Telegram API
- **Deployment**: Vercel

### Configured MCPs
- **context7**: Context management and project understanding  
- **supabase**: ⚠️ **USE CURSOR ONLY** - Database operations via Cursor IDE
- **playwright**: Automated testing and browser automation
- **github-server**: GitHub repository management and API integration

### Supabase MCP Protocol
**IMPORTANT**: All Supabase database operations must be done through **Cursor IDE** with its Supabase MCP integration.

**When Claude Code needs Supabase operations:**
1. **DO NOT** attempt direct Supabase MCP calls
2. **CREATE** instruction document in `docs/cursor-instructions/`
3. **DOCUMENT** exact SQL commands and operations needed
4. **NOTIFY** human to execute via Cursor IDE
5. **CONTINUE** with feature development after database operations complete

### Database Schema
The complete database schema is defined in `.planning/db_schema.txt` with:
- User profiles with role-based permissions
- Channel management with Telegram integration
- Subscription and payment tracking
- Bet tracking with automatic ROI calculation
- Activity logging and audit trails

## Documentation Structure

### Master Planning Documents
- **`betlink/docs/project-master-plan.md`**: **MASTER PROJECT PLAN** - Complete roadmap with all epics and features
- **`.planning/`**: Original requirements and specifications (reference only)

### Current Documentation Organization
```
betlink/docs/
├── project-master-plan.md     # Master roadmap and status tracking  
├── features/                  # Feature-level docs (6-stage workflow)
│   ├── planning/             # Stage 1: Feature plans
│   ├── progress/             # Live progress tracking
│   ├── testing/              # Stage 4: Human testing checklists
│   ├── learnings/            # Stage 6: Implementation insights
│   └── handover/             # Stage 6: Setup for next features
├── cursor-instructions/       # Database operations for Cursor IDE
├── epics/                    # Epic-level documentation
│   ├── epic-1-foundation/
│   ├── epic-2-public-area/
│   └── [other epics...]
└── technical/                # System architecture and schemas
```

## User Roles & Permissions

1. **Master**: Full system access, can manage all users and settings
2. **Admin**: Can manage all users except Master/Admin, created by Master
3. **Tipster**: Access to tipster dashboard, manage own channels and subscribers
4. **Cliente**: Access to client dashboard, can subscribe to channels

## Development Approach

Since this is a planning-stage project, development should follow this sequence:

1. **Project Setup**: Initialize Next.js project with TypeScript
2. **Database Setup**: Configure Supabase with the provided schema
3. **Authentication**: Implement Supabase Auth with role-based access
4. **Core Pages**: Create placeholder pages for all user types
5. **API Routes**: Implement CRUD operations for all entities
6. **Telegram Integration**: Set up bot and channel management
7. **Payment Integration**: Configure Stripe and MercadoPago
8. **Testing**: Comprehensive testing of all workflows

## 🤖 AI Development Protocol

### 🎯 Feature Development Rules - INCREMENTAL VISIBILITY PRINCIPLE

**EVERY feature must show something new at localhost:3000**

When planning features, the AI MUST ensure:
1. **Visible Change**: Each feature produces something visible/testable at localhost:3000
2. **Immediate Testing**: User can test the feature immediately after implementation
3. **Incremental Schema**: Database schema built piece by piece, not all at once
4. **Real Data Testing**: RLS policies tested with actual mock data as they're added

### Bad Examples:
❌ "Create users table + insert mock users" - Only visible in Supabase dashboard
❌ "Setup all RLS policies" - Too many things to test at once
❌ "Create login page" - Can't test without users existing

### Good Examples:
✅ "Create users table + display users on homepage" - Visible at localhost:3000
✅ "Add login page + test with mock users" - Can immediately test login
✅ "Add RLS to users table + test access" - Can test specific access control

### Feature Planning Checklist:
Before implementing any feature, ask:
- [ ] Will this show something new at localhost:3000?
- [ ] Can the user test this immediately?
- [ ] Are we adding too many things at once?
- [ ] Is the database schema being built incrementally?
- [ ] Can RLS policies be tested with real data?
- [ ] Is there a clear user interaction to test?

### Feature Development Protocol (6-Stage Workflow)
When implementing features, **ALWAYS** follow this protocol:

1. **Read Context Documents**: Before starting any feature, read:
   - `betlink/docs/project-master-plan.md` - Current project status and roadmap
   - `betlink/docs/features/handover/to-feature-X-Y.md` - Setup from previous feature
   - `.planning/` directory - Original requirements and specifications
   - `feature_wf.md` and `epic_wf.md` - Development workflows

2. **Stage 1 - PLANNING**: Create `betlink/docs/features/planning/feature-X-Y-plan.md`
   - Define human test requirements
   - Document dependencies and constraints  
   - Set technical context and guardrails
   - Provide time estimates

3. **Stage 2 - EXECUTION**: Implement the feature
   - Create `betlink/docs/features/progress/feature-X-Y-progress.md` for live tracking
   - Update `betlink/docs/project-master-plan.md` to mark feature in progress
   - Update `betlink/docs/epics/epic-X-name/progress.md` for epic milestones

4. **Stage 3 - AI TESTING**: Create automated tests in `/tests/features/`

5. **Stage 4 - HUMAN TESTING**: Create `betlink/docs/features/testing/feature-X-Y-test.md`
   - Comprehensive manual testing checklist
   - Regression testing requirements
   - Performance and accessibility checks

6. **Stage 5 - REFINEMENT**: Fix issues discovered during testing

7. **Stage 6 - DOCUMENTATION**: Create completion documentation
   - `betlink/docs/features/learnings/feature-X-Y-learning.md` - Implementation insights
   - `betlink/docs/features/handover/to-feature-X-Y+1.md` - Setup for next feature
   - Update `betlink/docs/project-master-plan.md` to mark feature complete

### Mandatory Actions for Each Feature

#### 📋 Before Starting Any Feature:
```markdown
1. Read context: project-master-plan.md, previous handover, .planning files
2. Create: betlink/docs/features/planning/feature-X-Y-plan.md
3. Create: betlink/docs/features/progress/feature-X-Y-progress.md
4. Update: betlink/docs/project-master-plan.md (mark in progress)
5. Update: betlink/docs/epics/epic-X-name/progress.md
6. Notify human of feature start and checklist updates
```

#### 🚀 During Feature Implementation:
```markdown
1. Follow the 6-stage feature workflow strictly
2. Update: betlink/docs/features/progress/feature-X-Y-progress.md regularly
3. Update: betlink/docs/project-master-plan.md for milestones
4. Create: betlink/docs/features/testing/feature-X-Y-test.md for Stage 4
5. **SUPABASE OPERATIONS**: Create instruction documents in docs/cursor-instructions/
6. Notify human of significant progress updates and database operations needed
```

#### ✅ After Feature Completion:
```markdown
1. Create: betlink/docs/features/learnings/feature-X-Y-learning.md
2. Create: betlink/docs/features/handover/to-feature-X-Y+1.md
3. Update: betlink/docs/project-master-plan.md (mark complete)
4. Update: betlink/docs/epics/epic-X-name/progress.md
5. **MANDATORY: Create git commit and push to GitHub**
   - Run git add, git commit with descriptive message
   - Push changes to GitHub repository
   - Ensure all feature work is backed up before moving to next feature
6. Notify human of feature completion
```

### Human Notification Protocol

**ALWAYS notify the human when:**
- `betlink/docs/project-master-plan.md` is updated (any change)
- Any progress documents are updated (`features/progress/`, `epics/*/progress.md`)
- A feature is started, blocked, or completed
- A new feature plan or testing document is created
- Major milestones are reached
- AI suggestions are made that affect the roadmap
- Stage 4 (Human Testing) is ready to begin
- **Supabase database operations are needed** (create instruction document)

## 🎯 Cursor IDE Integration Protocol

### Database Operations via Cursor
When any Supabase database work is required, Claude Code must:

1. **Create Cursor Instruction Document**:
   ```
   File: docs/cursor-instructions/[feature-name]-database-ops.md
   Content: Step-by-step instructions for Cursor IDE execution
   ```

2. **Document Template**:
   ```markdown
   # Cursor Instructions: [Feature Name] - Database Operations
   
   ## 🎯 Objective
   [What needs to be accomplished]
   
   ## 📋 Cursor Commands
   Open Cursor IDE and use these exact commands with @supabase:
   
   ```
   @supabase [Exact prompt for Cursor]
   ```
   
   ## 🔍 Verification
   [How to verify the operations worked]
   
   ## ➡️ Next Steps
   [What Claude Code will do after this is complete]
   ```

3. **Notification Process**:
   - Create the instruction document
   - Update feature progress with "⏳ Waiting for Cursor database operations"
   - Notify human: "Database operations needed - see docs/cursor-instructions/"
   - Pause feature development until database operations complete

### Current Documentation Status

After migration to new structure:
```
betlink/docs/
├── project-master-plan.md           # ✅ Master project plan (updated paths)
├── features/
│   ├── planning/
│   │   └── feature-1-1-plan.md      # ✅ Moved from .feature-plans/
│   ├── progress/  
│   │   └── feature-1-1-progress.md  # ✅ Moved from .feature-plans/
│   └── testing/
│       └── feature-1-1-test.md      # ✅ Moved from root directory
├── epics/epic-1-foundation/
│   ├── definition.md                # ✅ Moved from .epic-plans/
│   └── progress.md                  # ✅ Moved from .epic-plans/
└── README.md                        # ✅ Documentation navigation guide
```

### Required Documentation Updates

Every feature implementation must result in:
- Updated `betlink/docs/project-master-plan.md`
- Individual feature progress tracking in `betlink/docs/features/progress/`
- Learning documentation in `betlink/docs/features/learnings/`
- Handover documentation in `betlink/docs/features/handover/`
- Epic progress updates in `betlink/docs/epics/epic-X-name/progress.md`

## Git Workflow Protocol

### Repository Information
- **GitHub Repository**: https://github.com/PedroZabeu/betlink
- **Default Branch**: main
- **MCP Integration**: GitHub MCP server configured for repository operations

### Mandatory Git Operations

#### After Each Feature Completion:
```bash
# 1. Stage all changes
git add .

# 2. Create descriptive commit message
git commit -m "$(cat <<'EOF'
Complete Feature X.Y: [Feature Name]

- [Key implementation detail 1]
- [Key implementation detail 2]
- [Key implementation detail 3]
- Updated documentation and progress tracking

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# 3. Push to GitHub
git push origin main
```

#### Critical Git Rules:
- **NEVER** move to the next feature without committing current work
- **ALWAYS** push to GitHub after feature completion
- **ALWAYS** include documentation updates in the commit
- **ALWAYS** use descriptive commit messages following the template above
- Create commits for major milestones within features if implementation is complex

## Naming Conventions

### File and Folder Structure

#### Routes and Pages
- **Route folders**: Use `kebab-case` for URLs (e.g., `meus-canais/`, `betting-history/`)
- **Route groups**: Use parentheses for grouping without affecting URL (e.g., `(auth)/`, `(admin)/`)
- **Dynamic routes**: Use square brackets (e.g., `[id]/`, `[slug]/`)
- **Private folders**: Use underscore prefix (e.g., `_components/`)

#### Components
- **Component files**: Use `PascalCase.tsx` (e.g., `BettingCard.tsx`, `LoginForm.tsx`)
- **Component folders**: Match component name (e.g., `BettingCard/index.tsx`)
- **Test files**: Same name + `.test.tsx` (e.g., `BettingCard.test.tsx`)
- **Style modules**: Same name + `.module.css` (e.g., `BettingCard.module.css`)

#### Utilities and Hooks
- **Hook files**: Use `camelCase` with 'use' prefix (e.g., `useAuth.ts`, `useBettingCart.ts`)
- **Utility files**: Use `camelCase` (e.g., `calculateProfit.ts`, `formatCurrency.ts`)
- **Service files**: Use `camelCase` with '.service' suffix (e.g., `auth.service.ts`)

### Code Conventions

#### Variables and Constants
```typescript
// Constants - SCREAMING_SNAKE_CASE
const MAX_BET_AMOUNT = 10000
const API_TIMEOUT = 5000

// Boolean variables - is/has prefix
const isLoading = false
const hasError = true

// Arrays - plural names
const users = []
const selectedMatches = []

// Objects - singular names
const currentUser = {}
const betDetails = {}
```

#### Functions
```typescript
// Regular functions - verb prefix, camelCase
function calculateExpectedValue() {}
function validateBetAmount() {}

// Event handlers - handle prefix
const handleSubmit = () => {}
const handleOddsUpdate = () => {}

// Async functions - action verbs
async function fetchUserData() {}
async function createBet() {}
async function updateProfile() {}

// Server Actions - 'Action' suffix
async function createBetAction() {}
```

#### Types and Interfaces
```typescript
// Interfaces - PascalCase, no 'I' prefix
interface User {
  id: string
  email: string
}

// Component Props - PascalCase + 'Props' suffix
interface BettingCardProps {
  bet: Bet
  onSubmit?: () => void
}

// Type aliases - PascalCase
type BetStatus = 'pending' | 'won' | 'lost'
```

### Project-Specific Conventions

#### User Roles
- Always use Portuguese role names: `Master`, `Admin`, `Tipster`, `Cliente`
- Role colors are defined in constants: Purple (Master), Red (Admin), Blue (Tipster), Green (Cliente)

#### Database Fields
- Use `snake_case` for database columns (Supabase/PostgreSQL convention)
- Use `camelCase` when converting to TypeScript objects
- Foreign keys: `tableName_id` pattern (e.g., `user_id`, `channel_id`)

#### API Routes
```
/api/auth/login       # Authentication endpoints
/api/channels         # Resource endpoints (plural)
/api/channels/[id]    # Individual resource
/api/webhooks/stripe  # External service webhooks
```

### Quick Reference Checklist

| Type | Convention | Example |
|------|------------|---------|
| Component files | PascalCase | `ChannelCard.tsx` |
| Route folders | kebab-case | `meus-canais/` |
| Hooks | camelCase + use | `useChannel.ts` |
| Utils | camelCase | `formatCurrency.ts` |
| Constants | SCREAMING_SNAKE | `MAX_CHANNELS` |
| Props interface | PascalCase + Props | `ChannelCardProps` |
| Boolean vars | is/has prefix | `isActive` |
| Arrays | Plural | `channels` |
| Event handlers | handle prefix | `handleClick` |

## Error Prevention & Troubleshooting

### Console Error Logging Strategy
**CRITICAL**: When implementing any feature, ALWAYS add comprehensive error logging to enable debugging via browser DevTools console.

#### Implementation Requirements:
1. **Try-Catch Blocks**: Wrap all async operations and API calls in try-catch blocks with descriptive error logging
2. **Error Context**: Include relevant context in error logs (component name, function, user action, data state)
3. **Console Methods**: Use appropriate console methods:
   - `console.error()` for errors
   - `console.warn()` for warnings
   - `console.log()` for important state changes during development
   - `console.debug()` for detailed debugging info

#### Example Error Logging Pattern:
```typescript
try {
  const result = await someOperation();
  console.log('[ComponentName] Operation successful:', result);
} catch (error) {
  console.error('[ComponentName] Operation failed:', {
    error,
    context: { userId, channelId, action: 'someOperation' },
    timestamp: new Date().toISOString()
  });
  // Re-throw or handle appropriately
}
```

#### Benefits:
- Human can open browser DevTools and immediately see what went wrong
- Errors include enough context to understand the failure point
- Claude Code can analyze the console output to provide targeted fixes
- Reduces debugging time significantly

## Important Notes

- All users (except Master/Admin) require Telegram integration
- Payment processing must handle both Brazilian (MercadoPago) and international (Stripe) payments
- The system requires real-time Telegram channel access management
- ROI calculations are automated via database triggers
- Row Level Security (RLS) policies are essential for data protection

## Future Features (Post-MVP)

- Automated bet tracking via Telegram bot
- Manual bet tracking spreadsheet for clients
- Betting account management tools
- Advanced analytics and reporting