# Forge Ledger — Budget & Cashflow

A fintech application to analyze income, expenses, and cash flow from transaction data. Built for freelancers and small businesses.

## Quick Start

```bash
npm install
npm run dev        # Start dev server
npm run build      # Production build
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | TailwindCSS v4 (CSS custom properties) |
| Charts | Recharts |
| Routing | React Router DOM v7 |
| CSV Parsing | PapaParse |
| Storage | IndexedDB (via idb) |
| Icons | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── Categories/       # Category list, forms, rule management, bulk categorize
│   ├── Dashboard/        # KPI card, summary cards, cash flow chart, recent ledger, promo banner
│   ├── ImportWizard/     # Multi-step CSV import wizard
│   ├── Reports/          # Summary, category breakdown, cash flow, date filter, export
│   └── Transactions/     # Transaction table and filters
├── context/
│   └── DataContext.tsx    # Shared app state (transactions, categories, rules)
├── db/
│   └── index.ts           # IndexedDB operations (CRUD for all entities)
├── layouts/
│   └── LayoutShell.tsx    # Sidebar + main content layout
├── pages/
│   ├── DashboardPage.tsx
│   ├── TransactionsPage.tsx
│   ├── TransactionsImportPage.tsx
│   ├── CategoriesPage.tsx
│   └── ReportsPage.tsx
├── services/
│   ├── categorizationEngine.ts   # Rule matching and auto-categorization
│   ├── categoryService.ts         # Category CRUD, rename, merge
│   ├── csvExport.ts               # CSV file generation and download
│   ├── dashboardService.ts        # KPI metrics, cash flow data, recent transactions
│   ├── defaultCategories.ts       # 10 seed categories
│   ├── promoPreferences.ts        # Promo banner dismiss state
│   ├── reportService.ts           # Report aggregation and filtering
│   ├── ruleService.ts             # Categorization rule CRUD and reordering
│   └── transactionService.ts      # Transaction queries and formatters
├── types/
│   ├── category.ts       # Category, CategorizationRule
│   ├── dashboard.ts      # DashboardMetrics, TrendIndicator, CashFlowDataPoint
│   ├── report.ts         # ReportFilters, IncomeExpensesSummary, CategoryBreakdown, CashFlowEntry
│   └── transaction.ts    # Transaction, ImportSession, ColumnMapping, ImportError/Warning
└── utils/
    ├── CSVParser.ts       # PapaParse wrapper, date/amount parsing
    ├── ColumnMapper.ts    # Auto-detect CSV column mappings
    └── ImportValidator.ts # Row-level validation for imports
```

## Features

### Dashboard
- Total Net Liquidity KPI with trend percentage
- Income and Expenses summary cards (green/red accents)
- Cash flow bar chart (monthly income vs expenses)
- Recent Ledger showing last 10 transactions with status pills
- Dismissible promo banner

### Transaction Import
- Multi-step wizard: Upload → Quality → Mapping → Preview → Confirm
- CSV parsing with delimiter detection and error collection
- Auto column mapping with manual override
- Import quality panel with error/warning indicators
- Data preview with color-coded amounts
- Persists transactions to IndexedDB

### Categorization Engine
- 10 default financial categories
- Rule-based auto-categorization (contains, startsWith, regex)
- Priority-ordered rules with active/inactive toggle
- Manual category override with source tracking
- Category CRUD: add, rename, merge, delete
- Bulk categorization for uncategorized transactions

### Reports
- Income vs Expenses summary
- Category breakdown with percentages and visual bars
- Cash flow report (monthly or weekly grouping)
- Date range presets and custom range
- CSV export

## Design System

The UI follows a modern fintech aesthetic based on design references:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#F5F7FA` | Page background |
| `--color-bg-card` | `#FFFFFF` | Card surfaces |
| `--color-text-primary` | `#0F172A` | Headings, body |
| `--color-text-secondary` | `#6B7280` | Labels, captions |
| `--color-accent-green` | `#22C55E` | Income, positive, CTAs |
| `--color-accent-red` | `#F87171` | Expenses, negative |
| `--color-border` | `#E5E7EB` | Dividers, borders |
| `--shadow-card` | `0 4px 12px rgba(0,0,0,0.05)` | Card elevation |
| `--radius-card` | `14px` | Card corners |

## Data Storage

All data is stored locally in IndexedDB (no backend required):

| Store | Key | Indexes |
|-------|-----|---------|
| `transactions` | `id` | `date`, `category`, `status` |
| `categories` | `id` | — |
| `rules` | `id` | `priority` |
| `importSessions` | `id` | — |

## Test Data

A sample CSV with 50 transactions across Jan–Mar 2026 is available at `docs/test-data.csv`. It includes income, expenses across all default categories, and mixed cleared/pending statuses.

Import it via **Transactions → Import CSV** in the app.

## OpenSpec Workflow

This project was built using an **OpenSpec-first** workflow. The process followed these phases:

### Phase 1: Specs (Source of Truth)

Four OpenSpec changes were created in `openspec/changes/`, each containing a full artifact set:

| Change | Artifacts |
|--------|-----------|
| `transaction-import` | proposal, spec, design, tasks |
| `categorization-engine` | proposal, spec, design, tasks |
| `reports` | proposal, spec, design, tasks |
| `dashboard` | proposal, spec, design, tasks |

Each spec defines requirements with Given/When/Then scenarios, and each design includes data models, component structure, and file change lists. UI references to `docs/home.png` and `docs/transactions.png` are cited in the specs.

### Phase 2: Implementation Order

Implementation followed a dependency-aware order:

1. **Dashboard + Layout Shell** — Foundation layout, sidebar, routing, design tokens
2. **Transaction Import** — Core data layer (IndexedDB, types, services) + import wizard
3. **Categorization Engine** — Extends transactions with rules, categories, manual override
4. **Reports** — Aggregates data from all of the above

### Phase 3: Data Layer Architecture

Services were built first (bottom-up), then UI components consumed them:

```
Types → DB (IndexedDB) → Services → React Context → Pages/Components
```

### Branch Strategy

- `feat/init-specs` — All OpenSpec change artifacts (merged via PR #1)
- `feat/implement-specs` — Full implementation (this branch)

## AI Assistance

This project was built with **GLM-5.1** (`opencode-go/glm-5.1`) as the coding assistant. The model was used across all phases:

- **Spec creation** — Authored OpenSpec change artifacts (proposals, specs, designs, tasks) driven by the PRD and UI references
- **Implementation** — Wrote all application code, services, and components
- **Debugging** — Resolved TypeScript build errors and type mismatches

The OpenSpec-first workflow ensured specs were the source of truth before any code was written.

## License

Private