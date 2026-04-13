# Design: Reports

## Technical Approach

Reports are computed from persisted transaction data using aggregation functions. No separate data store — reports query transactions directly with date and category filters. Results are memoized per query to avoid redundant computation.

### Architecture Decision: Client-Side Computation

Reports are computed client-side because:

- Dataset size is expected to be manageable (individual/small business transactions)
- No server dependency keeps the app simple and fast
- IndexedDB queries with proper indexes handle up to tens of thousands of records efficiently

### Architecture Decision: Composable Report Engine

Each report type is a composable function that accepts filters and returns typed data. This allows:

- Shared filter logic across all report types
- Easy addition of new report types
- Consistent output format for CSV export

## Data Flow

```
Transaction Store (IndexedDB)
       │
       ▼
Report Engine
  ├── Filters: dateRange, categories
  ├── Aggregators: sum, groupBy, percentage
  └── Formatters: currency, percentage, date
       │
       ▼
Report Components
  ├── IncomeVsExpensesCard
  ├── CategoryBreakdownTable
  └── CashFlowChart
       │
       ▼
CSV Export (when requested)
```

## Data Model

```
ReportFilters:
  dateRange: { start: Date, end: Date }
  categories: string[] | null  (null = all)
  groupBy: 'week' | 'month'

IncomeExpensesSummary:
  totalIncome: number
  totalExpenses: number
  netCashFlow: number
  period: { start: Date, end: Date }

CategoryBreakdown:
  categoryId: string
  categoryName: string
  totalAmount: number
  percentage: number
  transactionCount: number

CashFlowEntry:
  period: string (e.g., "2026-03" or "2026-W09")
  income: number
  expenses: number
  netCashFlow: number
  trend: 'up' | 'down' | 'flat'
  trendPercentage: number
```

## Component Structure

```
ReportsPage/
├── ReportsPage.tsx            (tab layout for 3 report types)
├── IncomeExpensesCard.tsx     (summary card with green/red accents)
├── CategoryBreakdownTable.tsx (category list with bars and percentages)
├── CashFlowChart.tsx          (time series bars for income/expenses)
├── DateRangeFilter.tsx        (preset + custom date range picker)
├── CategoryFilter.tsx         (multi-select category filter)
└── ExportButton.tsx           (CSV export trigger)

Services/
├── reportService.ts           (aggregation and computation logic)
└── csvExport.ts                (CSV file generation and download)
```

## File Changes

- `src/pages/ReportsPage.tsx` (new)
- `src/components/ReportsPage/IncomeExpensesCard.tsx` (new)
- `src/components/ReportsPage/CategoryBreakdownTable.tsx` (new)
- `src/components/ReportsPage/CashFlowChart.tsx` (new)
- `src/components/ReportsPage/DateRangeFilter.tsx` (new)
- `src/components/ReportsPage/CategoryFilter.tsx` (new)
- `src/components/ReportsPage/ExportButton.tsx` (new)
- `src/services/reportService.ts` (new)
- `src/services/csvExport.ts` (new)
- `src/types/report.ts` (new)