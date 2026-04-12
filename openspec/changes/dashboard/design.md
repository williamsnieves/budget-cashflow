# Design: Dashboard

## Technical Approach

The Dashboard is the default landing page, built as a composition of KPI cards, chart, transaction list, and promotional banner. Data is aggregated from the transaction store on mount and refreshed when transactions change.

### Architecture Decision: Aggregated Data Layer

Dashboard metrics are computed from the transaction store using memoized aggregators. This ensures:

- Consistent data with the Reports module
- Single source of truth (transactions)
- Automatic recalculation when transactions change

### Architecture Decision: Chart Library

Using a lightweight chart library (e.g., Recharts or Chart.js) because:

- Bar charts for cash flow require proper axis rendering
- Responsive sizing and animation support
- Consistent theming with app colors

### Architecture Decision: Layout Shell

Using a sidebar + main content layout pattern because:

- Provides persistent navigation (matching `docs/home.png` reference)
- Sidebar state (collapsed/expanded) can be stored in user preferences
- Main content area uses CSS Grid for card layout

## Data Flow

```
Transaction Store
       │
       ├──► Dashboard Aggregator
       │      ├── Total Net Liquidity KPI
       │      ├── Income Summary
       │      ├── Expenses Summary
       │      └── Trend Calculations
       │
       ├──► Cash Flow Chart Data
       │      └── Monthly income/expenses grouped
       │
       └──► Recent Ledger
              └── Last 10 transactions with status
```

## Data Model

```
DashboardMetrics:
  totalNetLiquidity: number
  totalIncome: number
  totalExpenses: number
  incomeTrend: TrendIndicator
  expenseTrend: TrendIndicator

TrendIndicator:
  direction: 'up' | 'down' | 'flat'
  percentage: number
  previousPeriodValue: number

CashFlowDataPoint:
  month: string (e.g., "Jan 2026")
  income: number
  expenses: number

RecentTransaction:
  id: string
  description: string
  date: Date
  amount: number
  category: string
  status: 'cleared' | 'pending'
  type: 'income' | 'expense'
```

## Component Structure

```
App/
└── LayoutShell/
    ├── Sidebar/
    │   ├── Branding.tsx              ("Architectural Ledger" header)
    │   ├── NavItems.tsx              (Dashboard, Transactions, Categories, Reports)
    │   ├── CtaButton.tsx             ("New Invoice" button)
    │   └── SidebarFooter.tsx         (Support, Sign Out)
    └── MainContent/
        └── Dashboard/
            ├── DashboardPage.tsx     (grid layout orchestrator)
            ├── KpiCard.tsx           (Total Net Liquidity)
            ├── SummaryCard.tsx        (Income / Expenses)
            ├── CashFlowChart.tsx     (bar chart)
            ├── RecentLedger.tsx      (transaction list)
            ├── LedgerRow.tsx          (individual transaction row)
            └── PromoBanner.tsx        (dark gradient banner)

Services/
├── dashboardService.ts             (metric aggregations)
└── promoPreferences.ts             (banner dismiss state)
```

## File Changes

- `src/layouts/LayoutShell.tsx` (new)
- `src/layouts/Sidebar/Branding.tsx` (new)
- `src/layouts/Sidebar/NavItems.tsx` (new)
- `src/layouts/Sidebar/CtaButton.tsx` (new)
- `src/layouts/Sidebar/SidebarFooter.tsx` (new)
- `src/pages/DashboardPage.tsx` (new)
- `src/components/Dashboard/KpiCard.tsx` (new)
- `src/components/Dashboard/SummaryCard.tsx` (new)
- `src/components/Dashboard/CashFlowChart.tsx` (new)
- `src/components/Dashboard/RecentLedger.tsx` (new)
- `src/components/Dashboard/LedgerRow.tsx` (new)
- `src/components/Dashboard/PromoBanner.tsx` (new)
- `src/services/dashboardService.ts` (new)
- `src/services/promoPreferences.ts` (new)
- `src/types/dashboard.ts` (new)