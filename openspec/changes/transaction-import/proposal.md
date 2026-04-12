# Proposal: Transaction Import

## Intent

Enable users to import financial transaction data from CSV files into the Budget & Cashflow application, providing a guided workflow from file upload through data validation, column mapping, and final confirmation.

## Scope

### In scope

- CSV file upload via drag-and-drop and file picker
- Automatic CSV parsing with delimiter and encoding detection
- Column mapping interface to map CSV columns to transaction fields
- Import quality validation panel with error/warning indicators
- Data preview table showing mapped transactions before confirmation
- Confirmation step to persist imported transactions
- Handling of malformed CSV files with clear error reporting

### Out of scope

- Automatic bank integrations or API-based imports
- Import of non-CSV formats (OFX, QIF, JSON)
- Duplicate detection across multiple imports
- Undo/rollback of completed imports

## Approach

Build a multi-step import wizard following the pattern shown in the **Transactions — Import Records** UI reference (`docs/transactions.png`). The flow will be:

1. **Upload** — Dashed-border dropzone for file selection
2. **Quality Check** — Dark card panel showing import quality metrics (row count, errors, warnings)
3. **Column Mapping** — Form with dropdown selectors mapping CSV columns to system fields (Date, Description, Amount, Category)
4. **Preview** — Read-only table displaying parsed data with color-coded amounts (green for income, red for expenses)
5. **Confirmation** — Bold dark "Confirm Import" CTA button to persist data

The module will use streaming CSV parsing for large files and provide inline validation feedback throughout the wizard.