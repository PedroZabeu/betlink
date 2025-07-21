# BetLink Documentation Structure

This directory contains all project documentation organized by purpose and development lifecycle.

## 📁 Folder Structure

```
docs/
├── README.md                    # This file - Documentation navigation guide  
├── project-master-plan.md       # MASTER PROJECT PLAN - All epics and features
├── features/                    # Feature-level documentation (6-stage workflow)
│   ├── planning/               # Stage 1: Feature planning documents
│   │   ├── feature-1-1-plan.md          # Moved from .feature-plans/
│   │   └── feature-X-Y-plan.md
│   ├── progress/               # Live feature progress tracking
│   │   ├── feature-1-1-progress.md      # Moved from .feature-plans/
│   │   └── feature-X-Y-progress.md
│   ├── testing/                # Stage 4: Human testing checklists
│   │   ├── feature-1-1-test.md          # Moved from root HUMAN-TEST-FEATURE-1-1.md
│   │   └── feature-X-Y-test.md
│   ├── learnings/              # Stage 6: Post-implementation insights
│   │   └── feature-X-Y-learning.md
│   └── handover/               # Stage 6: Handover docs between features
│       └── to-feature-X-Y.md
├── epics/                      # Epic-level documentation
│   ├── epic-1-foundation/
│   │   ├── definition.md       # Moved from .epic-plans/epic-1-authentication-definition.md
│   │   ├── progress.md         # Moved from .epic-plans/epic-1-authentication-progress.md
│   │   └── retrospective.md    # Created after epic completion
│   ├── epic-2-public-area/
│   ├── epic-3-tipster-central/
│   ├── epic-4-admin-panel/
│   ├── epic-5-payment-system/
│   └── epic-6-telegram-automation/
├── technical/                  # Technical documentation
│   ├── architecture.md
│   ├── database-schema.md
│   └── deployment.md
├── user/                       # User-facing documentation
│   ├── user-guide.md
│   └── admin-guide.md
└── development/                # Development process docs
    ├── setup.md
    ├── workflows.md
    └── testing-strategy.md
```

## 🎯 Document Types by Development Stage

### Epic Level
1. **Epic Definition** (`epics/epic-X-name/definition.md`)
2. **Epic Progress** (`epics/epic-X-name/progress.md`) - Live tracking
3. **Epic Retrospective** (`epics/epic-X-name/retrospective.md`) - After completion

### Feature Level (6-Stage Workflow)
1. **Stage 1 - Planning** (`features/planning/feature-X-Y-plan.md`)
2. **Stage 2 - Execution** (Code implementation - no specific doc)
3. **Stage 3 - AI Testing** (Automated tests in `/tests/features/`)
4. **Stage 4 - Human Testing** (`features/testing/feature-X-Y-test.md`)
5. **Stage 5 - Refinement** (Updates to testing doc or issues)
6. **Stage 6 - Documentation** 
   - `features/learnings/feature-X-Y-learning.md`
   - `features/handover/to-feature-X-Y+1.md`

### Project Level
- **Master Plan** (`project-master-plan.md`) - Overall roadmap and status

## 🔄 Information Flow

```
Master Plan (project-master-plan.md)
    ↓ defines
Epic Definition (epics/epic-X/definition.md)
    ↓ tracks in
Epic Progress (epics/epic-X/progress.md)
    ↓ breaks down into
Feature Planning (features/planning/feature-X-Y-plan.md)
    ↓ tracks progress in
Feature Progress (features/progress/feature-X-Y-progress.md)
    ↓ tests with
Feature Testing (features/testing/feature-X-Y-test.md)
    ↓ documents insights in
Feature Learning (features/learnings/feature-X-Y-learning.md)
    ↓ prepares next with
Feature Handover (features/handover/to-feature-X-Y+1.md)
    ↓ updates back to
Master Plan & Epic Progress ← cycle continues
```

## 📋 When to Create/Update Each Document

### Starting New Epic
1. Read: `project-master-plan.md` for epic definition
2. Create: `epics/epic-X-name/definition.md` (detailed epic plan)
3. Create: `epics/epic-X-name/progress.md` (live tracking)

### Starting New Feature
1. Read: `features/handover/to-feature-X-Y.md` (setup from previous feature)
2. Create: `features/planning/feature-X-Y-plan.md` (Stage 1: Planning)
3. Create: `features/progress/feature-X-Y-progress.md` (live tracking)

### During Feature Development
- Update: `features/progress/feature-X-Y-progress.md` (ongoing)
- Update: `epics/epic-X-name/progress.md` (milestone updates)

### Testing Feature
1. Create: `features/testing/feature-X-Y-test.md` (Stage 4: Human Testing)
2. Human completes manual testing checklist

### Completing Feature
1. Create: `features/learnings/feature-X-Y-learning.md` (Stage 6: What we learned)
2. Create: `features/handover/to-feature-X-Y+1.md` (Stage 6: Setup for next)
3. Update: `project-master-plan.md` (mark feature complete)
4. Update: `epics/epic-X-name/progress.md` (epic progress)

### Completing Epic
1. Create: `epics/epic-X-name/retrospective.md` (epic retrospective)
2. Update: `project-master-plan.md` (mark epic complete)

## 🎯 Quick Navigation

### For Current Work
- **Master Plan**: `project-master-plan.md` - Overall status
- **Current Epic**: `epics/epic-1-foundation/progress.md`
- **Current Feature**: `features/progress/feature-1-1-progress.md`

### For Planning New Feature
1. Read: `features/handover/to-feature-X-Y.md` (what's available)
2. Create: `features/planning/feature-X-Y-plan.md` (new plan)

### For Testing Feature
- Use: `features/testing/feature-X-Y-test.md` (testing checklist)

### For Understanding Project
- Start: `project-master-plan.md` (big picture)
- Deep dive: `epics/epic-X-name/definition.md` (epic details)
- Technical: `technical/architecture.md` (system design)

## 🔧 File Naming Conventions

- **Features**: `feature-X-Y-[type].md` (e.g., `feature-1-2-plan.md`)
- **Epics**: `epic-X-[type].md` (e.g., `epic-1-retrospective.md`)
- **Technical**: `kebab-case.md` (e.g., `database-schema.md`)

## 🚀 Migration Status

✅ **Completed Migrations:**
- `project_checklist.md` → `docs/project-master-plan.md`
- `.feature-plans/feature-1-1-initial-setup.md` → `docs/features/planning/feature-1-1-plan.md`
- `.feature-plans/feature-1-1-initial-setup-progress.md` → `docs/features/progress/feature-1-1-progress.md`
- `.epic-plans/epic-1-authentication-definition.md` → `docs/epics/epic-1-foundation/definition.md`
- `.epic-plans/epic-1-authentication-progress.md` → `docs/epics/epic-1-foundation/progress.md`
- `HUMAN-TEST-FEATURE-1-1.md` → `docs/features/testing/feature-1-1-test.md`

✅ **Updated References:**
- All epic progress file paths in master plan updated