# BetLink - Feature Workflow

## 📋 Overview

Each feature is an incremental, testable evolution of the application. This workflow ensures that each implementation is isolated, testable, and doesn't break existing functionality.

---

## 🔄 The 6 Stages of Feature Workflow

### **1️⃣ PLANNING** 📋

#### Objective
Create a clear and specific contract of what will be built, with well-defined human testing.

#### Planning Template

```markdown
# Feature: [Feature Name]

## 1. Human Test
**What to test**: [Clear description of what the user should be able to do]
**How to test**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected result**: [Description or screenshot of final result]

## 2. Dependencies
- **Previous features**: [List of features that must be working]
- **Existing files**: 
  - `/path/to/file1.ts`
  - `/path/to/file2.tsx`
- **Required libraries**: 
  - `@supabase/supabase-js`
  - `react-hook-form`

## 3. Guardrails
### DO NOT MODIFY
- `/app/layout.tsx` - Main layout
- `/lib/supabase/client.ts` - Base configuration
- [Other critical files]

### MUST MAINTAIN
- Existing navigation working
- Authentication (if already implemented)
- [Other behaviors]

### CAN CREATE
- `/app/[new-route]/page.tsx`
- `/components/features/[feature]/`
- [Other allowed files]

### MUST REUSE
- `Button` component from `/components/ui/`
- `useAuth` hook from `/hooks/`
- [Other existing resources]

## 4. Technical Context
### Which documents should I use as context?
- [List relevant documentation files]
- [Schema files]
- [API documentation]

### Database Schema (only relevant)
```sql
-- Only tables needed for this feature
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  ...
);
```

### Available APIs/Functions
```typescript
// Example of available function
async function getUser(id: string) { ... }
```

### Project Patterns
- Naming: PascalCase for components
- Imports: Specific order (see guide)
- [Other patterns]

## 5. Estimate
- **Complexity**: Low/Medium/High
- **Estimated time**: X hours
- **Identified risks**: [List]
```

---

### **2️⃣ EXECUTION** 🚀

#### Implementation Strategies

##### A. Structured Logging System
```typescript
// Pattern for traceability logs
const FEATURE_NAME = '[Feature: FeatureName]';

console.log(`${FEATURE_NAME} Starting process...`);
console.error(`${FEATURE_NAME} Error found:`, error);
console.warn(`${FEATURE_NAME} Warning:`, warning);

// In React components
useEffect(() => {
  console.log(`${FEATURE_NAME} Component mounted`);
  return () => console.log(`${FEATURE_NAME} Component unmounted`);
}, []);
```

##### B. Guardrail Comments
```typescript
/**
 * @feature: Login
 * @guardrail: This file is base - DO NOT MODIFY
 * @dependencies: supabase, react-hook-form
 * @created: Feature 1
 */

// At the top of critical files
// @protected: Do not modify without approval
```

##### C. Error Boundaries per Feature
```typescript
// components/features/[feature]/error-boundary.tsx
export function FeatureErrorBoundary({ 
  children, 
  feature 
}: { 
  children: React.ReactNode;
  feature: string;
}) {
  return (
    <ErrorBoundary
      fallback={<div>Error in feature: {feature}</div>}
      onError={(error) => {
        console.error(`[Feature: ${feature}] Error captured:`, error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

##### D. Feature Flags
```typescript
// config/feature-flags.ts
export const FEATURES = {
  AUTH: true,           // ✅ Implemented
  CANAIS_LIST: true,    // ✅ Implemented
  PAYMENT: false,       // 🚧 In development
  TELEGRAM_BOT: false,  // ⏳ Planned
} as const;

// Usage in code
if (FEATURES.PAYMENT) {
  return <PaymentComponent />;
}
return <ComingSoon feature="Payments" />;
```

---

### **3️⃣ AI TESTING** 🤖

#### Playwright Test Template

```typescript
// tests/features/[feature-name].spec.ts
import { test, expect } from '@playwright/test';

const FEATURE_NAME = 'Feature Name';

test.describe(`Feature: ${FEATURE_NAME}`, () => {
  // Setup before all tests
  test.beforeEach(async ({ page }) => {
    console.log(`[Test: ${FEATURE_NAME}] Starting test`);
    await page.goto('/');
  });

  test('Main test: [description of what should work]', async ({ page }) => {
    // Arrange - Prepare
    await page.waitForLoadState('networkidle');
    
    // Act - Action
    await page.click('[data-testid="main-button"]');
    
    // Assert - Verify
    await expect(page.locator('[data-testid="result"]')).toBeVisible();
    
    // Success log
    console.log(`✅ ${FEATURE_NAME}: Main test passed`);
  });

  test('Should not break previous features', async ({ page }) => {
    // Verify navigation still works
    await expect(page.locator('nav')).toBeVisible();
    
    // Verify other routes still load
    await page.goto('/dashboard');
    await expect(page).not.toHaveURL('/404');
    
    console.log(`✅ ${FEATURE_NAME}: Previous features OK`);
  });

  // Error test
  test('Should show appropriate error when failing', async ({ page }) => {
    // Simulate error
    await page.route('**/api/**', route => route.abort());
    
    // Verify handling
    await page.click('[data-testid="action-that-fails"]');
    await expect(page.locator('.error-message')).toBeVisible();
    
    console.log(`✅ ${FEATURE_NAME}: Error handling OK`);
  });
});
```

#### Auto-correction Script

```typescript
// scripts/test-and-fix.ts
async function testAndFix() {
  console.log('🤖 Running automated tests...');
  
  const result = await runTests();
  
  if (!result.success) {
    console.log('❌ Errors found. Trying to fix...');
    
    for (const error of result.errors) {
      if (error.type === 'MISSING_IMPORT') {
        await fixMissingImport(error);
      } else if (error.type === 'TYPE_ERROR') {
        await fixTypeError(error);
      }
      // ... other automatic fixes
    }
    
    // Test again
    const retryResult = await runTests();
    if (retryResult.success) {
      console.log('✅ Errors fixed automatically!');
    } else {
      console.log('⚠️ Some errors need manual intervention');
    }
  }
}
```

---

### **4️⃣ HUMAN TESTING** 👤

#### Validation Checklist

```markdown
## Manual Test Checklist - Feature: [Name]

### Main Functionality
- [ ] Feature works according to test defined in planning?
- [ ] All use cases are covered?
- [ ] UX is intuitive and without visual bugs?

### Regression
- [ ] Previous features continue working?
- [ ] Page navigation is normal?
- [ ] No errors in console?

### Performance
- [ ] Page loads in less than 3 seconds?
- [ ] No unnecessary re-renders?
- [ ] Images and assets are optimized?

### Responsiveness
- [ ] Desktop (1920x1080) ✓
- [ ] Laptop (1366x768) ✓
- [ ] Tablet (768x1024) ✓
- [ ] Mobile (375x667) ✓

### Accessibility
- [ ] Keyboard navigation works?
- [ ] Colors have adequate contrast?
- [ ] Elements have appropriate labels?

### Security
- [ ] Sensitive data doesn't appear in logs?
- [ ] Authentication/authorization working?
- [ ] Inputs are validated?

### Notes
[Space for notes during testing]
```

---

### **5️⃣ REFINEMENT** 🔧

#### Refinement Process

```markdown
## Refinement - Feature: [Name]

### 1. Identified Problems

#### 🔴 Critical (Block release)
1. **Problem**: [Description]
   - **Impact**: [What's broken]
   - **Proposed solution**: [How to fix]
   - **Status**: ⏳ Pending / ✅ Resolved

#### 🟡 Important (Should be fixed)
1. **Problem**: [Description]
   - **Impact**: [What it affects]
   - **Proposed solution**: [How to improve]
   - **Status**: ⏳ Pending / ✅ Resolved

#### 🟢 Nice-to-have (Future improvements)
1. **Improvement**: [Description]
   - **Benefit**: [Why do it]
   - **Complexity**: Low/Medium/High

### 2. Correction Log
```
[Date/Time] - Fixed: [description] - [modified file]
[Date/Time] - Tested: [what was verified] - OK ✅
```

### 3. Technical Decisions
- **Decision**: [What was decided]
  **Reason**: [Why this choice]
  **Alternatives considered**: [Other options]
```

---

### **6️⃣ DOCUMENTATION** 📚

#### A. Status Update (`docs/features-status.md`)

```markdown
# Feature Status - BetLink

## ✅ Completed

### Feature 1: Initial Setup
- **Status**: ✅ Complete
- **Date**: 01/01/2024
- **Test**: "Hello World" with Tailwind working
- **Learnings**: [Link to doc]

### Feature 2: Base UI Components
- **Status**: ✅ Complete
- **Date**: 02/01/2024
- **Test**: Button and Card from shadcn rendered
- **Learnings**: [Link to doc]

## 🚧 In Progress

### Feature 3: Supabase Connection
- **Status**: 🚧 80% - Missing error handling
- **Start**: 03/01/2024
- **Blockers**: RLS configuration

## ⏳ Planned

### Feature 4: Login System
- **Status**: ⏳ Waiting for Feature 3
- **Estimate**: 2 days
- **Dependencies**: Supabase Auth configured
```

#### B. Learning Document (`docs/learnings/feature-[name].md`)

```markdown
# Learnings - Feature: [Name]

## 📅 Information
- **Date**: [Implementation date]
- **Duration**: [Actual vs estimated time]
- **Developer**: [AI + Human]

## ✅ What worked well
1. **Strategy**: [What went right]
   - **Why**: [Reason for success]
   - **Reuse in**: [Where to apply again]

2. **Reused code**: 
   - Component X from Feature Y
   - Hook Z worked perfectly

## ❌ Problems encountered

### Problem 1: [Title]
- **Description**: [Problem details]
- **Error**: `[Error message]`
- **Root cause**: [Why it happened]
- **Solution**: [How it was resolved]
- **Prevention**: [How to avoid in future]
- **Time lost**: [How long it took]

### Problem 2: [Title]
[...]

## 💡 Technical decisions

### Decision 1: [Use library X instead of Y]
- **Context**: [Situation that led to decision]
- **Options considered**:
  - Option A: [Pros and cons]
  - Option B: [Pros and cons]
- **Final choice**: [Which and why]
- **Result**: [Was it a good decision?]

## 📊 Metrics
- **Lines of code**: ~XXX
- **Files created**: Y
- **Files modified**: Z
- **Test coverage**: XX%
- **Bugs found**: N
- **Bugs fixed**: N

## 🔮 Future recommendations
1. [Suggestion for next features]
2. [Process improvements]
3. [Tools that would help]
```

#### C. Handover Document (`docs/handover/to-feature-[next].md`)

```markdown
# Handover to Feature: [Next Feature]

## 📦 Current Project State

### File Structure
```
project/
├── app/
│   ├── layout.tsx ✅ (do not modify)
│   ├── page.tsx ✅ (home working)
│   └── dashboard/
│       └── page.tsx ✅ (new page created)
├── components/
│   ├── ui/ ✅ (shadcn configured)
│   └── features/
│       └── auth/ ✅ (login components)
└── lib/
    └── supabase/
        └── client.ts ✅ (configured and working)
```

### Available APIs and Functions

#### 1. Authentication
```typescript
// lib/auth.ts
export async function signIn(email: string, password: string) { ... }
export async function signOut() { ... }
export function useAuth() { ... } // Hook
```

#### 2. Database
```typescript
// lib/supabase/queries.ts
export async function getCanais() { ... }
export async function getUser(id: string) { ... }
```

### Reusable Components

#### Base UI (shadcn)
- `Button` - All styles configured
- `Card` - With variants
- `Input` - With validation
- `Dialog` - For modals

#### Features
- `LoginForm` - Complete form
- `AuthGuard` - HOC for protected routes

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
# New variables added:
NEXT_PUBLIC_APP_NAME=BetLink
```

### Global State
- Zustand configured in `store/`
- Auth state working
- No other stores yet

## ⚠️ Warnings and Care

### Do Not Modify
1. `middleware.ts` - Critical auth logic
2. `app/layout.tsx` - Root layout
3. Supabase configurations

### Always Test
- [ ] Login/Logout continues working
- [ ] Navigation didn't break
- [ ] Console without errors

### Possible Conflicts
- Payment feature will use `/app/api/`
- Telegram bot may need webhook at `/api/webhooks/`

## 🚀 How to Start

1. **Install dependencies** (if new ones)
```bash
npm install
```

2. **Check environment variables**
```bash
cp .env.example .env.local
# Fill necessary values
```

3. **Run project**
```bash
npm run dev
```

4. **Test previous features**
```bash
npm run test:features
```

## 📝 Important Notes

1. **Import pattern** defined in `.eslintrc`
2. **TypeScript types** generated in `types/database.types.ts`
3. **Logs** should follow pattern `[Feature: Name]`
4. **New components** in `/components/features/[your-feature]/`

## 🎯 Your Feature

Based on current state, your feature can:
- ✅ Use existing authentication
- ✅ Create new pages in `/app/`
- ✅ Reuse UI components
- ✅ Access configured Supabase

Good luck! 🚀
```

---

## 🛠️ Support Tools

### Feature Setup Script
```bash
#!/bin/bash
# scripts/new-feature.sh

FEATURE_NAME=$1
mkdir -p components/features/$FEATURE_NAME
mkdir -p tests/features
mkdir -p docs/learnings

echo "Feature $FEATURE_NAME created!"
echo "- Components in: components/features/$FEATURE_NAME"
echo "- Tests in: tests/features/$FEATURE_NAME.spec.ts"
echo "- Docs in: docs/learnings/feature-$FEATURE_NAME.md"
```

### Quick Test Template
```typescript
// tests/quick-test.ts
export async function quickTest(featureName: string) {
  console.log(`🧪 Quick test: ${featureName}`);
  
  // 1. Build passed?
  await exec('npm run build');
  
  // 2. Lint passed?
  await exec('npm run lint');
  
  // 3. Types OK?
  await exec('npm run type-check');
  
  // 4. Tests passed?
  await exec(`npm run test:feature ${featureName}`);
  
  console.log('✅ All quick tests passed!');
}
```

---

## 📊 Success Metrics

### Per Feature
- ✅ Human test passes on first try: > 80%
- ⏱️ Implementation time vs estimate: < 1.5x
- 🐛 Production bugs: 0
- 🔄 Rework needed: < 20%

### Project Overall
- 📈 Features delivered per sprint: 4-6
- 🎯 Test coverage: > 70%
- 📚 Complete documentation: 100%
- 😊 Developer satisfaction: High

---

## 🚀 Workflow Benefits

1. **Predictability**: Each feature follows same process
2. **Traceability**: Logs and documentation at each stage
3. **Quality**: Tests at multiple layers
4. **Knowledge**: Documented learnings
5. **Efficiency**: Handover eliminates re-explanations
6. **Scalability**: Process works for 10 or 100 features