# Dashboard Specification

## Purpose

Define the behavior for the main dashboard view that displays financial KPIs, cash flow visualization, and recent transaction activity.

## Requirements

### Requirement: Total Net Liquidity KPI

The system SHALL display a primary KPI card showing total net liquidity with a trend indicator.

#### Scenario: Positive net liquidity with upward trend

- GIVEN the user has more income than expenses and the current period is better than the previous
- WHEN the Dashboard loads
- THEN the KPI card displays "Total Net Liquidity" as the label
- AND the net amount is shown in large bold figures (e.g., "$142,850.00")
- AND a green trend indicator shows the percentage change (e.g., "+12.4%")
- AND the trend is compared to the previous equivalent period

#### Scenario: Negative net liquidity with downward trend

- GIVEN the user has more expenses than income and the trend is declining
- WHEN the Dashboard loads
- THEN the KPI card displays the negative net amount
- AND a red trend indicator shows the percentage decline (e.g., "-8.2%")

#### Scenario: User has no transactions

- GIVEN a new user with no imported transactions
- WHEN the Dashboard loads
- THEN the KPI card displays "$0.00"
- AND a message prompts the user to import transactions

### Requirement: Income and Expenses Summary Cards

The system SHALL display summary cards for total income and total expenses.

#### Scenario: Income summary card

- GIVEN the user has imported transactions
- WHEN the Dashboard loads
- THEN an Income card displays total income for the current period
- AND the card uses green accent color (`#22C55E`) for the value
- AND a small trend indicator shows period-over-period change

#### Scenario: Expenses summary card

- GIVEN the user has imported transactions
- WHEN the Dashboard loads
- THEN an Expenses card displays total expenses for the current period
- AND the card uses red accent color (`#F87171`) for the value
- AND a small trend indicator shows period-over-period change

#### Scenario: Zero income or expenses

- GIVEN the user has transactions but no income entries (or no expense entries)
- WHEN the Dashboard loads
- THEN the respective card displays "$0.00"
- AND no trend indicator is shown (no prior period to compare)

### Requirement: Cash Flow Chart

The system SHALL display a minimalist bar chart showing monthly income vs. expenses.

#### Scenario: View cash flow chart with data

- GIVEN the user has transactions across multiple months
- WHEN the Dashboard loads
- THEN a bar chart displays grouped bars for each month
- AND income bars use the primary accent color (`#22C55E`)
- AND expense bars use the negative accent color (`#F87171`) or a neutral tone
- AND the chart has clean styling with no heavy gridlines
- AND the x-axis shows month labels and the y-axis shows amounts

#### Scenario: View cash flow chart with sparse data

- GIVEN the user has transactions in only 1-2 months
- WHEN the Dashboard loads
- THEN the chart displays available months with appropriate spacing
- AND months without data show zero-height bars

#### Scenario: No transaction data

- GIVEN a user with no imported transactions
- WHEN the Dashboard loads
- THEN the chart area displays an empty state message
- AND a prompt suggests importing transactions

### Requirement: Recent Ledger

The system SHALL display a list of recent transactions with status indicators.

#### Scenario: View recent ledger with transactions

- GIVEN the user has imported transactions
- WHEN the Dashboard loads
- THEN the Recent Ledger section shows the 10 most recent transactions
- AND each transaction displays: icon, description, date, amount, and status pill
- AND income amounts are shown in green (`#22C55E`)
- AND expense amounts are shown in red (`#F87171`)
- AND status pills show: "Cleared" (green), "Pending" (gray)

#### Scenario: View recent ledger with no transactions

- GIVEN a new user with no transactions
- WHEN the Dashboard loads
- THEN the Recent Ledger section shows an empty state
- AND a prompt suggests importing transactions to get started

#### Scenario: Click transaction in ledger

- GIVEN the Recent Ledger shows transactions
- WHEN the user clicks a transaction row
- THEN the user is navigated to the Transactions page filtered to that transaction

### Requirement: Promo Banner

The system SHALL display a promotional/informational banner section.

#### Scenario: Display promo banner

- GIVEN the Dashboard is loaded
- WHEN the promo section renders
- THEN a banner with dark gradient background (#0B1F3A → #1E3A5F) is displayed
- AND the banner includes a headline and descriptive text with high contrast typography
- AND two CTA buttons are shown (primary and secondary)

#### Scenario: Promotional banner is dismissible

- GIVEN the promo banner is visible
- WHEN the user clicks the dismiss/close button
- THEN the banner is hidden
- AND the preference is stored so it remains hidden on subsequent visits

### Requirement: Sidebar Navigation

The system SHALL provide a sidebar with navigation and branding.

#### Scenario: Navigate via sidebar

- GIVEN the Dashboard is loaded
- WHEN the user clicks a navigation item (Dashboard, Transactions, Categories, Reports)
- THEN the app navigates to the corresponding page
- AND the active item is visually highlighted

#### Scenario: Sidebar branding

- GIVEN the Dashboard is loaded
- WHEN the sidebar renders
- THEN the sidebar header displays "Architectural Ledger" with subtitle "Freelancer Pro"
- AND a "New Invoice" CTA button is visible (green accent, white text)

#### Scenario: Sidebar footer

- GIVEN the Dashboard is loaded
- WHEN the sidebar renders
- THEN footer links for "Support" and "Sign Out" are visible at the bottom

## UI Reference

The Dashboard UI follows the design shown in **`docs/home.png`** (Screen 1: Forge Ledger Dashboard), which includes:

### Layout Structure
- **Grid-based layout** (12-column system)
- Sidebar on the left, main content on the right
- Generous padding and whitespace between sections

### Color Tokens
| Element | Color |
|---------|-------|
| Primary Background | `#F5F7FA` |
| Primary Text | `#0F172A` |
| Secondary Text | `#6B7280` |
| Positive/Income Accent | `#22C55E` |
| Dark Green (charts) | `#166534` |
| Negative/Expense Accent | `#F87171` |
| Card Background | `#FFFFFF` |
| Card Surface (alt) | `#F9FAFB` |
| Borders/Dividers | `#E5E7EB` |
| Promo Gradient Start | `#0B1F3A` |
| Promo Gradient End | `#1E3A5F` |

### Component Styles
- **Cards**: `#FFFFFF` bg, 12-16px rounded corners, `box-shadow: 0 4px 12px rgba(0,0,0,0.05)`
- **Typography**: Modern sans-serif (Inter/SF Pro), H1 32-40px bold, section titles 18-24px, body 14-16px
- **Status Pills**: Green for "Cleared", gray for "Pending", blue for informational
- **Buttons**: Green solid primary, outline/ghost secondary, dark (#0F172A) for strong CTAs