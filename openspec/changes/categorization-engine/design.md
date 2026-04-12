# Design: Categorization Engine

## Technical Approach

The categorization engine uses a priority-ordered rule system evaluated against transaction descriptions. Rules are persisted and applied both at import time and on-demand. Manual overrides are tracked separately to prevent rule re-evaluation from overwriting user decisions.

### Architecture Decision: Priority-Based Rule Evaluation

Rules are evaluated in priority order (lower number = higher priority). First match wins. This avoids ambiguity and provides predictable behavior.

### Architecture Decision: Override Tracking

Each transaction stores both `categoryId` and `categorySource` (`auto` | `manual`). When `categorySource` is `manual`, rule evaluation skips that transaction. This ensures user decisions are never overwritten by automated rules.

## Data Flow

```
Imported Transaction
       │
       ▼
Rule Engine (priority-ordered evaluation)
       │
  ┌────┴────┐
  │         │
Match    No Match
  │         │
  ▼         ▼
Assign    Mark as
Category  "Uncategorized"
  │
  ▼
Manual Override? ──► Yes ──► Update category, set source=manual
```

## Data Model

```
Category:
  id: string (UUID)
  name: string
  type: 'income' | 'expense'
  color: string (hex)
  icon: string | null
  isDefault: boolean
  createdAt: Date
  updatedAt: Date

CategorizationRule:
  id: string (UUID)
  name: string
  matchType: 'contains' | 'startsWith' | 'regex'
  pattern: string
  categoryId: string (FK → Category)
  priority: number (lower = higher priority)
  isActive: boolean
  createdAt: Date
  updatedAt: Date

Transaction (extended from import spec):
  categorySource: 'auto' | 'manual' | null
  categorizedAt: Date | null
```

## Component Structure

```
CategoriesPage/
├── CategoryList.tsx           (list of categories with counts)
├── CategoryForm.tsx           (add/edit category modal)
├── CategoryMergeDialog.tsx    (merge two categories)
├── RuleList.tsx               (priority-ordered rule list)
├── RuleForm.tsx               (add/edit rule form)
└── BulkCategorizePanel.tsx    (bulk assign uncategorized)

Services/
├── categoryService.ts         (CRUD for categories)
├── ruleService.ts             (CRUD for rules)
└── categorizationEngine.ts    (rule evaluation engine)
```

## File Changes

- `src/pages/CategoriesPage.tsx` (new)
- `src/components/CategoriesPage/CategoryList.tsx` (new)
- `src/components/CategoriesPage/CategoryForm.tsx` (new)
- `src/components/CategoriesPage/CategoryMergeDialog.tsx` (new)
- `src/components/CategoriesPage/RuleList.tsx` (new)
- `src/components/CategoriesPage/RuleForm.tsx` (new)
- `src/components/CategoriesPage/BulkCategorizePanel.tsx` (new)
- `src/services/categoryService.ts` (new)
- `src/services/ruleService.ts` (new)
- `src/services/categorizationEngine.ts` (new)
- `src/data/defaultCategories.ts` (new)
- `src/types/category.ts` (new)