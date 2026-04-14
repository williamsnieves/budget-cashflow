export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string | null;
  categorySource: 'auto' | 'manual' | null;
  status: 'cleared' | 'pending';
  source: string;
  importedAt: string;
  categorizedAt: string | null;
}

export interface ImportSession {
  id: string;
  fileName: string;
  fileSize: number;
  status: 'parsing' | 'mapping' | 'preview' | 'confirming' | 'completed' | 'cancelled';
  totalRows: number;
  validRows: number;
  errorRows: number;
  warningRows: number;
  errors: ImportError[];
  warnings: ImportWarning[];
  columnMappings: ColumnMapping[];
  createdAt: string;
}

export interface ImportError {
  row: number;
  message: string;
}

export interface ImportWarning {
  row: number;
  message: string;
}

export interface ColumnMapping {
  csvColumn: string;
  targetField: 'date' | 'description' | 'amount' | 'category' | null;
  confidence: number;
}