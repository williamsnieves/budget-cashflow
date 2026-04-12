# Proposal: Reports

## Intent

Provide financial reports that summarize income, expenses, and cash flow by category and time period, enabling users to understand their financial health at a glance.

## Scope

### In scope

- Income vs. Expenses summary report
- Category breakdown report (spending by category)
- Cash flow report (monthly/weekly trends)
- Date range filtering for all reports
- Category filtering for all reports
- Export reports as CSV

### Out of scope

- PDF export
- Custom report builder
- Scheduled/automated reports
- Budget vs. actual comparison reports
- Multi-currency reports

## Approach

Build a Reports page accessible from the sidebar navigation (as shown in `docs/home.png`). Reports will be generated from transaction data stored locally. The page provides three core report types with date range and category filters. Results are displayed in clean tables and summary cards following the app's design system (white cards, `#22C55E` green for income, `#F87171` red for expenses).