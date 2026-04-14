import Papa from 'papaparse';

export interface ParsedCSV {
  headers: string[];
  rows: string[][];
  totalRows: number;
  errors: { row: number; message: string }[];
  warnings: { row: number; message: string }[];
}

export function parseCSV(file: File): Promise<ParsedCSV> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        const headers = results.data[0] as string[];
        const rows = (results.data as string[][]).slice(1).filter(row => row.some(cell => cell.trim() !== ''));
        const errors = (results.errors || []).map(e => ({ row: e.row ?? 0, message: e.message }));
        const warnings: { row: number; message: string }[] = [];
        rows.forEach((row, i) => {
          if (row.length !== headers.length) {
            warnings.push({ row: i + 2, message: `Row has ${row.length} columns, expected ${headers.length}` });
          }
        });
        resolve({ headers, rows, totalRows: rows.length, errors, warnings });
      },
      error: (error) => reject(error),
    });
  });
}

export function detectDateFormat(values: string[]): string {
  const patterns: { pattern: RegExp; format: string }[] = [
    { pattern: /^\d{4}-\d{2}-\d{2}$/, format: 'YYYY-MM-DD' },
    { pattern: /^\d{2}\/\d{2}\/\d{4}$/, format: 'MM/DD/YYYY' },
    { pattern: /^\d{2}-\d{2}-\d{4}$/, format: 'MM-DD-YYYY' },
    { pattern: /^\w+ \d{1,2}, \d{4}$/, format: 'Month DD, YYYY' },
  ];
  for (const { pattern, format } of patterns) {
    if (values.some(v => pattern.test(v.trim()))) return format;
  }
  return 'unknown';
}

export function parseAmount(value: string): number | null {
  const cleaned = value.replace(/[^0-9.\-()]/g, '');
  if (!cleaned) return null;
  const num = parseFloat(cleaned);
  if (isNaN(num)) return null;
  const isNegative = value.includes('(') || value.startsWith('-');
  return isNegative ? -Math.abs(num) : num;
}