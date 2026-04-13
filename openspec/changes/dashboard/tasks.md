# Tasks

## 1. Layout Shell
- [ ] 1.1 Build LayoutShell with sidebar + main content pattern
- [ ] 1.2 Build Sidebar with Branding component ("Architectural Ledger / Freelancer Pro")
- [ ] 1.3 Build NavItems component (Dashboard, Transactions, Categories, Reports)
- [ ] 1.4 Build CtaButton component ("New Invoice" green accent)
- [ ] 1.5 Build SidebarFooter (Support, Sign Out links)
- [ ] 1.6 Implement active state highlighting for current route
- [ ] 1.7 Set up routing with Dashboard as default route

## 2. Design System & Tokens
- [ ] 2.1 Define CSS custom properties for color tokens (matching `docs/home.png`)
- [ ] 2.2 Define typography scale (H1 32-40px, section titles 18-24px, body 14-16px)
- [ ] 2.3 Define card styles (white bg, 12-16px rounded, soft shadow)
- [ ] 2.4 Define status pill styles (green cleared, gray pending)
- [ ] 2.5 Define button variants (green primary, ghost secondary, dark CTA)

## 3. KPI Card
- [ ] 3.1 Build KpiCard component for Total Net Liquidity
- [ ] 3.2 Large bold amount display (e.g., "$142,850.00")
- [ ] 3.3 Trend indicator with percentage (green up arrow, red down arrow)
- [ ] 3.4 Handle zero/empty state with "Import transactions" prompt

## 4. Summary Cards
- [ ] 4.1 Build SummaryCard component (reusable for Income and Expenses)
- [ ] 4.2 Income card with green accent (#22C55E)
- [ ] 4.3 Expenses card with red accent (#F87171)
- [ ] 4.4 Trend indicators on each card

## 5. Cash Flow Chart
- [ ] 5.1 Set up chart library (Recharts or Chart.js)
- [ ] 5.2 Build CashFlowChart with grouped bar chart
- [ ] 5.3 Income bars in green (#22C55E), expenses in red (#F87171) or neutral
- [ ] 5.4 Clean axis styling (no heavy gridlines)
- [ ] 5.5 Handle sparse/zero data gracefully
- [ ] 5.6 Empty state with "Import transactions" prompt

## 6. Recent Ledger
- [ ] 6.1 Build RecentLedger component (last 10 transactions)
- [ ] 6.2 Build LedgerRow with icon, description, date, amount, status pill
- [ ] 6.3 Color-code amounts (green for income, red for expenses)
- [ ] 6.4 Status pills (green "Cleared", gray "Pending")
- [ ] 6.5 Click-to-navigate to Transactions page filtered to transaction
- [ ] 6.6 Empty state message

## 7. Promo Banner
- [ ] 7.1 Build PromoBanner with dark gradient background (#0B1F3A → #1E3A5F)
- [ ] 7.2 High contrast typography for headline and description
- [ ] 7.3 Dual CTA buttons (primary green, secondary outline)
- [ ] 7.4 Dismiss/close functionality with localStorage persistence

## 8. Dashboard Aggregator Service
- [ ] 8.1 Implement dashboardService for metric computation
- [ ] 8.2 Calculate total net liquidity (income - expenses)
- [ ] 8.3 Calculate period-over-period trend percentages
- [ ] 8.4 Aggregate monthly data for cash flow chart
- [ ] 8.5 Fetch last 10 transactions for recent ledger
- [ ] 8.6 Handle empty/zero data states

## 9. Dashboard Page Composition
- [ ] 9.1 Build DashboardPage with CSS Grid layout
- [ ] 9.2 Compose KPI card, summary cards, chart, ledger, banner
- [ ] 9.3 Responsive layout (sidebar collapses on mobile)
- [ ] 9.4 Loading states for data fetching
- [ ] 9.5 Error states for failed data loads

## 10. Testing
- [ ] 10.1 Unit tests for dashboardService aggregations
- [ ] 10.2 Unit tests for trend calculations
- [ ] 10.3 Component tests for KPI card rendering (positive/negative/zero)
- [ ] 10.4 Component tests for Recent Ledger (transaction list, empty state)
- [ ] 10.5 Visual regression tests matching `docs/home.png`