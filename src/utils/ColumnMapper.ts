import type { ColumnMapping } from '../types/transaction';

const FIELD_KEYWORDS: Record<string, string[]> = {
  date: ['date', 'transaction date', 'trans date', 'posting date', 'post date', 'time'],
  description: ['description', 'transaction', 'memo', 'payee', 'merchant', 'details', 'name', 'narration'],
  amount: ['amount', 'debit', 'credit', 'value', 'sum', 'total', 'withdrawal', 'deposit', 'price'],
  category: ['category', 'type', 'group', 'class', 'subcategory'],
};

export function autoMapColumns(headers: string[]): ColumnMapping[] {
  return headers.map(header => {
    const lower = header.toLowerCase().trim();
    let bestField: 'date' | 'description' | 'amount' | 'category' | null = null;
    let bestConfidence = 0;
    for (const [field, keywords] of Object.entries(FIELD_KEYWORDS)) {
      for (const keyword of keywords) {
        if (lower === keyword) {
          bestField = field as 'date' | 'description' | 'amount' | 'category';
          bestConfidence = 1.0;
          break;
        }
        if (lower.includes(keyword)) {
          const confidence = keyword.length / lower.length;
          if (confidence > bestConfidence) {
            bestField = field as 'date' | 'description' | 'amount' | 'category';
            bestConfidence = confidence;
          }
        }
      }
      if (bestConfidence === 1.0) break;
    }
    return {
      csvColumn: header,
      targetField: bestField,
      confidence: bestConfidence,
    };
  });
}

export function validateMappings(mappings: ColumnMapping[]): string[] {
  const missing: string[] = [];
  const hasDate = mappings.some(m => m.targetField === 'date');
  const hasAmount = mappings.some(m => m.targetField === 'amount');
  if (!hasDate) missing.push('Date');
  if (!hasAmount) missing.push('Amount');
  return missing;
}