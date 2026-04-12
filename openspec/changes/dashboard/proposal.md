# Proposal: Dashboard

## Intent

Create a financial dashboard landing page that provides an at-a-glance view of the user's financial health, including key performance indicators, cash flow visualization, and recent transaction activity.

## Scope

### In scope

- Total Net Liquidity KPI card with trend percentage
- Income and Expenses summary cards
- Cash flow bar chart showing monthly income vs. expenses
- Recent Ledger (transaction list with status pills and color-coded amounts)
- Promo/informational banner section
- Sidebar navigation (Dashboard, Transactions, Categories, Reports)
- Responsive layout with grid-based structure

### Out of scope

- Account settings page
- Notifications system
- Search functionality (future)
- Dark mode toggle
- Real-time data updates via WebSocket

## Approach

Build the Dashboard page as the default landing view, directly following the UI design shown in **`docs/home.png`** (Screen 1: Forge Ledger Dashboard). The layout uses a sidebar + main content area pattern with grid-based cards. Key design elements from the reference:

- **KPI Card**: Displays "Total Net Liquidity" with large bold number and green trend indicator (+12.4%)
- **Summary Cards**: Income (green accent) and Expenses (red accent) cards
- **Cash Flow Chart**: Minimalist bar chart with neutral + accent colors, no heavy gridlines
- **Recent Ledger**: Transaction list with icons, status pills (green=cleared, gray=pending), and color-coded amounts
- **Promo Banner**: Dark gradient background (#0B1F3A → #1E3A5F) with high-contrast typography and dual CTAs
- **Sidebar**: "Architectural Ledger (Freelancer Pro)" header, nav items, "New Invoice" CTA, footer links

The dashboard aggregates data from transactions and provides quick navigation to other sections.