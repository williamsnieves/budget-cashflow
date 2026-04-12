# Reports Specification

## Purpose

Define the behavior for generating and displaying financial reports that summarize transaction data by category and time period.

## Requirements

### Requirement: Income vs. Expenses Summary

The system SHALL provide a summary report comparing total income against total expenses for a given period.

#### Scenario: View income vs expenses summary

- GIVEN the user navigates to the Reports page
- WHEN the user selects a date range (e.g., "Last 30 days")
- THEN the system displays total income and total expenses for that period
- AND income is shown with a green accent (`#22C55E`)
- AND expenses are shown with a red accent (`#F87171`)
- AND net (income minus expenses) is displayed

#### Scenario: Zero transactions in period

- GIVEN the user selects a date range with no transactions
- WHEN the summary report is generated
- THEN all values are displayed as $0.00
- AND a message indicates "No transactions found for this period"

### Requirement: Category Breakdown Report

The system SHALL provide a report showing spending breakdown by category.

#### Scenario: View category breakdown

- GIVEN the user has categorized transactions in the selected period
- WHEN the user views the Category Breakdown report
- THEN each category is listed with its total amount
- AND categories are sorted by total amount descending
- AND each category shows the percentage of total expenses
- AND a visual bar indicator shows relative size

#### Scenario: Filter by specific category

- GIVEN the Category Breakdown report is displayed
- WHEN the user filters by one or more categories
- THEN only transactions matching those categories are included
- AND totals are recalculated based on the filtered data

#### Scenario: Uncategorized transactions

- GIVEN there are uncategorized transactions in the period
- WHEN the Category Breakdown report is generated
- THEN an "Uncategorized" entry is included in the breakdown
- AND it shows the total amount of uncategorized transactions

### Requirement: Cash Flow Report

The system SHALL provide a cash flow report showing income and expenses over time periods.

#### Scenario: View monthly cash flow

- GIVEN the user has transactions spanning multiple months
- WHEN the user views the Cash Flow report with monthly grouping
- THEN each month is displayed with total income and total expenses
- AND net cash flow (income minus expenses) is shown per month
- AND a trend indicator shows whether cash flow improved or declined vs. prior period

#### Scenario: View weekly cash flow

- GIVEN the user has transactions within a month or more
- WHEN the user views the Cash Flow report with weekly grouping
- THEN each week is displayed with total income and total expenses
- AND net cash flow is shown per week

#### Scenario: Consistent zero months in range

- GIVEN the user selects a date range that includes months with no transactions
- WHEN the Cash Flow report is generated
- THEN months with no transactions are still displayed with $0.00 values
- AND the time series is continuous with no gaps

### Requirement: Date Range Filtering

The system SHALL support date range filtering for all reports.

#### Scenario: Preset date ranges

- GIVEN the user is on any report
- WHEN the user clicks the date range selector
- THEN preset options are available: "Last 7 days", "Last 30 days", "Last 90 days", "This Month", "This Year", "Custom Range"

#### Scenario: Custom date range

- GIVEN the user selects "Custom Range"
- WHEN the user picks start and end dates
- THEN all reports update to show data within that range only

#### Scenario: No transactions in selected range

- GIVEN the user selects a range with no imported transactions
- WHEN reports are generated
- THEN a clear message indicates no data is available
- AND the user is prompted to import transactions or adjust the date range

### Requirement: Report Export

The system SHALL allow exporting report data as CSV files.

#### Scenario: Export summary report as CSV

- GIVEN a report is displayed on screen
- WHEN the user clicks "Export CSV"
- THEN a CSV file is downloaded containing the report data
- AND the filename includes the report type and date range (e.g., "income-expenses-2026-01-01-to-2026-03-31.csv")

#### Scenario: Export with no data

- GIVEN a report has no data (empty period)
- WHEN the user clicks "Export CSV"
- THEN a CSV with headers only is downloaded
- AND a message warns the export contains no data rows