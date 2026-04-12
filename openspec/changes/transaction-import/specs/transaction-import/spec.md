# Transaction Import Specification

## Purpose

Define the behavior for importing financial transaction data from CSV files into the application, including parsing, validation, column mapping, preview, and persistence.

## Requirements

### Requirement: CSV File Upload

The system SHALL accept CSV file uploads via drag-and-drop and file picker.

#### Scenario: User uploads CSV via drag-and-drop

- GIVEN the user is on the Transactions Import page
- WHEN the user drags a CSV file onto the upload dropzone
- THEN the file is accepted and parsing begins immediately
- AND the dropzone shows the filename and file size

#### Scenario: User uploads CSV via file picker

- GIVEN the user is on the Transactions Import page
- WHEN the user clicks the upload area and selects a CSV file
- THEN the file is accepted and parsing begins immediately

#### Scenario: User uploads a non-CSV file

- GIVEN the user is on the Transactions Import page
- WHEN the user attempts to upload a non-CSV file (e.g., .xlsx, .pdf)
- THEN an error message is displayed indicating only CSV files are accepted
- AND the file is rejected

### Requirement: CSV Parsing

The system SHALL parse uploaded CSV files and extract structured transaction data.

#### Scenario: Well-formed CSV with headers

- GIVEN a CSV file with a header row and consistent delimiters
- WHEN the file is parsed
- THEN each row is extracted as a transaction record
- AND the header row is used as column identifiers for mapping

#### Scenario: CSV with inconsistent delimiters

- GIVEN a CSV file with mixed delimiters (e.g., commas and tabs)
- WHEN the file is parsed
- THEN the most common delimiter is detected and used for parsing
- AND rows with inconsistent delimiters are flagged as warnings

#### Scenario: Malformed CSV file

- GIVEN a CSV file with structural errors (e.g., unbalanced quotes, missing delimiters)
- WHEN the file is parsed
- THEN parseable rows are extracted successfully
- AND unparseable rows are flagged as errors with line numbers
- AND the import quality panel displays the error count and details

#### Scenario: Empty CSV file

- GIVEN a CSV file with no data rows (only headers or completely empty)
- WHEN the file is parsed
- THEN an error message is displayed indicating no transaction data found
- AND the user is prompted to upload a valid file

### Requirement: Import Quality Validation

The system SHALL validate parsed data and display quality metrics in a dedicated panel.

#### Scenario: Successful validation with no issues

- GIVEN a CSV file is parsed successfully
- WHEN validation runs
- THEN the quality panel shows total row count in green
- AND zero errors and zero warnings are displayed

#### Scenario: Validation with errors

- GIVEN a parsed CSV contains rows with missing required fields
- WHEN validation runs
- THEN the quality panel displays error count in red
- AND the panel lists each error with row number and description

#### Scenario: Validation with warnings

- GIVEN a parsed CSV contains rows with suspicious but not invalid data (e.g., unusually large amounts)
- WHEN validation runs
- THEN the quality panel displays warning count in yellow
- AND the panel lists each warning with row number and description

### Requirement: Column Mapping

The system SHALL allow users to map CSV columns to transaction fields via dropdown selectors.

#### Scenario: Automatic column mapping

- GIVEN a parsed CSV file with recognizable header names
- WHEN the column mapping step loads
- THEN the system automatically maps headers to matching transaction fields (Date, Description, Amount, Category)
- AND the user can review and adjust mappings

#### Scenario: Manual column mapping

- GIVEN a parsed CSV file with unrecognized or ambiguous header names
- WHEN the column mapping step loads
- THEN unmapped columns display empty dropdown selectors
- AND the user MUST map required fields (Date, Amount) before proceeding

#### Scenario: Required field not mapped

- GIVEN the user has not mapped all required fields (Date, Amount)
- WHEN the user attempts to proceed to preview
- THEN a validation error is shown listing required unmapped fields
- AND the user cannot proceed until required fields are mapped

### Requirement: Data Preview

The system SHALL display a read-only preview table of parsed and mapped transaction data before confirmation.

#### Scenario: Preview displays mapped transactions

- GIVEN the user has completed column mapping
- WHEN the preview step loads
- THEN a table displays all parsed transactions with mapped fields
- AND income amounts are shown in green
- AND expense amounts are shown in red
- AND each row shows Date, Description, Amount, and Category

#### Scenario: Preview with validation errors

- GIVEN some rows have validation errors
- WHEN the preview step loads
- THEN error rows are highlighted with a red indicator
- AND hovering the indicator shows the error description

### Requirement: Import Confirmation

The system SHALL persist imported transactions only after explicit user confirmation.

#### Scenario: Successful import confirmation

- GIVEN the user has reviewed the data preview
- WHEN the user clicks the "Confirm Import" button
- THEN all valid transactions are persisted to the database
- AND a success message is displayed with the count of imported transactions
- AND the user is redirected to the Transactions list

#### Scenario: Partial import with errors

- GIVEN the preview includes rows with validation errors
- WHEN the user clicks "Confirm Import"
- THEN only valid rows are persisted
- AND a warning message indicates how many rows were skipped due to errors
- AND the user can view the skipped rows

#### Scenario: User cancels import

- GIVEN the user is at any step in the import wizard
- WHEN the user clicks "Cancel"
- THEN no transactions are persisted
- AND the user is returned to the Transactions list

## UI Reference

The Transaction Import UI follows the design shown in **`docs/transactions.png`** (Screen 2: Transactions — Import Records), which includes:

- **Upload Area**: Dashed-border dropzone with centered icon and text on neutral background
- **Import Quality Panel**: Dark navy card with bright green indicators and high-contrast text
- **Column Mapping**: Form-like layout with dropdown selectors, icon + label pairing
- **Data Preview**: Minimal table with subtle separators, mixed color amounts (green/red)
- **Confirm Import CTA**: Bold, dark button for strong emphasis

### Design Tokens

- Upload dropzone border: `#E5E7EB` dashed
- Quality panel background: `#0B1F3A` to `#1E3A5F` gradient
- Quality indicators: `#22C55E` (green)
- Amount positive: `#22C55E`
- Amount negative: `#F87171`
- Confirm button background: `#0F172A`