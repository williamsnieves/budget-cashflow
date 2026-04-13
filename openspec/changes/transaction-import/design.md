# Design: Transaction Import

## Technical Approach

The transaction import feature will be implemented as a multi-step wizard component following the UI reference in `docs/transactions.png`. Each step manages its own state slice and validates before allowing progression.

### Architecture Decision: Wizard Pattern

Using a step-based wizard because:

- Multi-step flow maps directly to the import UX (Upload → Quality → Mapping → Preview → Confirm)
- Each step can validate independently
- Users can navigate back to adjust mappings without losing data
- Clear separation of concerns per step

### Architecture Decision: Streaming CSV Parser

Using a streaming CSV parser (e.g., PapaParse) because:

- Supports large files without loading entire content into memory
- Provides progressive parsing feedback
- Handles edge cases like quoted fields with delimiters
- Well-tested library for CSV parsing

## Data Flow

```
CSV File
   │
   ▼
Upload Step (dropzone/file picker)
   │
   ▼
Parser (streaming, delimiter detection)
   │
   ▼
Quality Validation ─── Error/Warning Panel
   │
   ▼
Column Mapping (auto-detect + manual override)
   │
   ▼
Data Preview Table (read-only, color-coded)
   │
   ▼
Confirm Import ─── Persist to Database
```

## Data Model

```
Transaction:
  id: string (UUID)
  date: Date
  description: string
  amount: number (positive = income, negative = expense)
  category: string | null
  source: string (CSV filename)
  importedAt: Date

ImportSession:
  id: string (UUID)
  fileName: string
  fileSize: number
  status: 'parsing' | 'mapping' | 'preview' | 'confirming' | 'completed' | 'cancelled'
  totalRows: number
  validRows: number
  errorRows: number
  warningRows: number
  errors: ImportError[]
  warnings: ImportWarning[]
  columnMappings: ColumnMapping[]
  createdAt: Date

ColumnMapping:
  csvColumn: string
  targetField: 'date' | 'description' | 'amount' | 'category'
  confidence: number
```

## Component Structure

```
ImportWizard/
├── UploadStep.tsx         (dropzone + file picker)
├── QualityPanel.tsx      (dark card with metrics)
├── MappingStep.tsx        (column mapping form)
├── PreviewStep.tsx        (read-only data table)
└── ConfirmStep.tsx        (final CTA button)

CSVParser.ts              (streaming parser utility)
ImportValidator.ts        (validation logic)
ColumnMapper.ts           (auto-detection + mapping)
```

## File Changes

- `src/components/ImportWizard/UploadStep.tsx` (new)
- `src/components/ImportWizard/QualityPanel.tsx` (new)
- `src/components/ImportWizard/MappingStep.tsx` (new)
- `src/components/ImportWizard/PreviewStep.tsx` (new)
- `src/components/ImportWizard/ConfirmStep.tsx` (new)
- `src/components/ImportWizard/ImportWizard.tsx` (new)
- `src/utils/CSVParser.ts` (new)
- `src/utils/ImportValidator.ts` (new)
- `src/utils/ColumnMapper.ts` (new)
- `src/services/transactionService.ts` (new)
- `src/pages/TransactionsImportPage.tsx` (new)