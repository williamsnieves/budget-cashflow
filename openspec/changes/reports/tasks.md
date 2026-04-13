# Tasks

## 1. Data Layer
- [ ] 1.1 Define report filter types (dateRange, categories, groupBy)
- [ ] 1.2 Define report output types (IncomeExpensesSummary, CategoryBreakdown, CashFlowEntry)
- [ ] 1.3 Implement reportService with aggregation functions (sum, groupBy, percentage)
- [ ] 1.4 Implement date grouping logic (weekly and monthly buckets)
- [ ] 1.5 Implement trending calculation (up/down/flat with percentage)

## 2. Income vs Expenses Summary
- [ ] 2.1 Build IncomeExpensesCard component (green for income, red for expenses)
- [ ] 2.2 Display total income, total expenses, net cash flow
- [ ] 2.3 Handle empty state (no transactions message)
- [ ] 2.4 Apply date range filtering

## 3. Category Breakdown Report
- [ ] 3.1 Build CategoryBreakdownTable component (category name, amount, percentage, bar)
- [ ] 3.2 Sort categories by total amount descending
- [ ] 3.3 Handle uncategorized transactions as separate entry
- [ ] 3.4 Build CategoryFilter multi-select component
- [ ] 3.5 Apply category filtering with recalculation

## 4. Cash Flow Report
- [ ] 4.1 Build CashFlowChart component (minimal bar chart, neutral + accent colors)
- [ ] 4.2 Implement monthly grouping view
- [ ] 4.3 Implement weekly grouping view
- [ ] 4.4 Show net cash flow and trend indicators per period
- [ ] 4.5 Handle zero-transaction months/weeks in the timeline

## 5. Date Range Filtering
- [ ] 5.1 Build DateRangeFilter component with preset options (7d, 30d, 90d, this month, this year, custom)
- [ ] 5.2 Implement custom date range picker
- [ ] 5.3 Connect date filter to all report types
- [ ] 5.4 Handle no-data state with clear messaging

## 6. CSV Export
- [ ] 6.1 Implement csvExport utility (generate CSV from report data)
- [ ] 6.2 Build ExportButton component
- [ ] 6.3 Generate filenames with report type and date range
- [ ] 6.4 Handle empty data export (headers only)

## 7. Reports Page Integration
- [ ] 7.1 Build ReportsPage.tsx with tab layout for 3 report types
- [ ] 7.2 Add Reports navigation entry to sidebar
- [ ] 7.3 Wire filters, report engines, and components together
- [ ] 7.4 Handle loading states

## 8. Testing
- [ ] 8.1 Unit tests for reportService aggregations
- [ ] 8.2 Unit tests for date grouping logic (weekly, monthly)
- [ ] 8.3 Unit tests for trend calculations
- [ ] 8.4 Unit tests for CSV export formatting
- [ ] 8.5 Integration tests for each report type with filtered data