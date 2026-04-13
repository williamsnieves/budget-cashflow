# Proposal: Categorization Engine

## Intent

Provide a rule-based system that automatically categorizes imported transactions into expense and income categories, with manual override capabilities and persistent rules.

## Scope

### In scope

- Default set of financial categories (Income, Housing, Food, Transport, Utilities, Entertainment, Healthcare, Other)
- User-defined categorization rules based on transaction description matching (contains, starts with, regex)
- Automatic category assignment during and after import
- Manual category override on individual transactions
- Bulk categorization for uncategorized transactions
- Category management (add, rename, merge, delete)

### Out of scope

- AI/ML-based categorization
- Category suggestions based on amount patterns
- Cross-user category learning
- Category-based budget limits (future feature)

## Approach

Build a rule engine that evaluates transactions against user-defined rules in priority order. Rules match on transaction description text and assign a category. The system operates in two modes:

1. **Auto-categorize** — Rules are applied automatically when transactions are imported or when new rules are created
2. **Manual override** — Users can change any auto-assigned category, and the override is preserved even if rules change

Categories page accessible from the sidebar navigation (following the UI reference in `docs/home.png` where "Categories" is a sidebar nav item).