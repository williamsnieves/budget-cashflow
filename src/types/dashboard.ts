export interface DashboardMetrics {
  totalNetLiquidity: number;
  totalIncome: number;
  totalExpenses: number;
  incomeTrend: TrendIndicator;
  expenseTrend: TrendIndicator;
}

export interface TrendIndicator {
  direction: 'up' | 'down' | 'flat';
  percentage: number;
  previousPeriodValue: number;
}

export interface CashFlowDataPoint {
  month: string;
  income: number;
  expenses: number;
}

export interface RecentTransaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  category: string | null;
  status: 'cleared' | 'pending';
  type: 'income' | 'expense';
}