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
- **supabase**: Direct Supabase integration and management
- **playwright**: Automated testing and browser automation
- **github-server**: GitHub repository management and API integration

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
5. Notify human of significant progress updates
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