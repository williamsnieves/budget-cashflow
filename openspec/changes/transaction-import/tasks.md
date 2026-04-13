# Tasks

## 1. Project Setup
- [ ] 1.1 Initialize project with chosen framework (React + TypeScript)
- [ ] 1.2 Set up routing and layout shell (sidebar navigation matching UI reference)
- [ ] 1.3 Configure CSS/design tokens matching `docs/transactions.png`
- [ ] 1.4 Install CSV parsing library (PapaParse or equivalent)

## 2. Data Layer
- [ ] 2.1 Define Transaction data model and types
- [ ] 2.2 Define ImportSession data model and types
- [ ] 2.3 Define ColumnMapping types
- [ ] 2.4 Create transactionService with CRUD operations
- [ ] 2.5 Create import storage (localStorage or IndexedDB for session state)

## 3. CSV Parser Utility
- [ ] 3.1 Implement streaming CSV parser with delimiter detection
- [ ] 3.2 Implement encoding detection (UTF-8, Latin-1)
- [ ] 3.3 Handle edge cases (quoted fields, escaped characters, inconsistent rows)
- [ ] 3.4 Add error collection per row with line numbers

## 4. Import Validator
- [ ] 4.1 Validate required fields (Date, Amount)
- [ ] 4.2 Validate date formats (multiple common formats)
- [ ] 4.3 Validate amount parsing (positive/negative, currency symbols)
- [ ] 4.4 Flag suspicious data (unusually large amounts, future dates)
- [ ] 4.5 Aggregate errors and warnings with counts

## 5. Column Mapper
- [ ] 5.1 Implement automatic column name matching to transaction fields
- [ ] 5.2 Support manual mapping via dropdown selectors
- [ ] 5.3 Validate that required fields are mapped before proceeding
- [ ] 5.4 Store and restore mapping preferences

## 6. ImportWizard Components
- [ ] 6.1 Build UploadStep with drag-and-drop dropzone and file picker
- [ ] 6.2 Build QualityPanel (dark navy card with green metrics)
- [ ] 6.3 Build MappingStep with column dropdown selectors
- [ ] 6.4 Build PreviewStep with color-coded amounts table
- [ ] 6.5 Build ConfirmStep with dark CTA button
- [ ] 6.6 Wire wizard step navigation and state management

## 7. Integration
- [ ] 7.1 Create TransactionsImportPage routing entry
- [ ] 7.2 Connect wizard steps to parser, validator, mapper
- [ ] 7.3 Persist transactions on confirm
- [ ] 7.4 Handle cancel flow (no data saved)
- [ ] 7.5 Show success/error feedback after import

## 8. Testing
- [ ] 8.1 Unit tests for CSV parser (well-formed, malformed, empty files)
- [ ] 8.2 Unit tests for validator (required fields, edge cases)
- [ ] 8.3 Unit tests for column mapper (auto-detect, manual override)
- [ ] 8.4 Integration tests for full import wizard flow
- [ ] 8.5 Visual regression tests for import pages matching `docs/transactions.png`