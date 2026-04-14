export interface ReportFilters {
  dateRange: { start: string; end: string };
  categories: string[] | null;
  groupBy: 'week' | 'month';
}

export interface IncomeExpensesSummary {
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  period: { start: string; end: string };
}

export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
  percentage: number;
  transactionCount: number;
}

export interface CashFlowEntry {
  period: string;
  income: number;
  expenses: number;
  netCashFlow: number;
  trend: 'up' | 'down' | 'flat';
  trendPercentage: number;
}