import { parseAmount } from './CSVParser';

export interface ValidationResult {
  validRows: number;
  errorRows: number;
  warningRows: number;
  errors: { row: number; message: string }[];
  warnings: { row: number; message: string }[];
}

export function validateImportData(
  rows: string[][],
  dateCol: number,
  amountCol: number,
  descriptionCol?: number,
): ValidationResult {
  const errors: { row: number; message: string }[] = [];
  const warnings: { row: number; message: string }[] = [];
  let validRows = 0;

  rows.forEach((row, i) => {
    const rowNum = i + 2;
    const dateVal = row[dateCol]?.trim();
    const amountVal = row[amountCol]?.trim();
    const descVal = descriptionCol !== undefined ? row[descriptionCol]?.trim() : '';

    if (!dateVal) {
      errors.push({ row: rowNum, message: 'Missing date value' });
    } else if (isNaN(Date.parse(dateVal))) {
      errors.push({ row: rowNum, message: `Invalid date format: "${dateVal}"` });
    }

    if (!amountVal) {
      errors.push({ row: rowNum, message: 'Missing amount value' });
    } else if (parseAmount(amountVal) === null) {
      errors.push({ row: rowNum, message: `Invalid amount format: "${amountVal}"` });
    }

    const amountNum = parseAmount(amountVal);
    if (amountNum !== null && Math.abs(amountNum) > 100000) {
      warnings.push({ row: rowNum, message: `Unusually large amount: ${amountVal}` });
    }

    if (!descVal && descriptionCol !== undefined) {
      warnings.push({ row: rowNum, message: 'Empty description' });
    }

    if (errors.filter(e => e.row === rowNum).length === 0) {
      validRows++;
    }
  });

  return {
    validRows,
    errorRows: rows.length - validRows,
    warningRows: warnings.length,
    errors,
    warnings,
  };
}