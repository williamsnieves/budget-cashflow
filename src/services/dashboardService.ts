import type { Transaction } from '../types/transaction';
import type { DashboardMetrics, TrendIndicator, CashFlowDataPoint, RecentTransaction } from '../types/dashboard';
import { getAllTransactions } from '../db';

export function calculateTrend(current: number, previous: number): TrendIndicator {
  if (previous === 0) {
    return { direction: current >= 0 ? 'up' : 'down', percentage: 0, previousPeriodValue: previous };
  }
  const percentage = Math.round(((current - previous) / Math.abs(previous)) * 100);
  return {
    direction: percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'flat',
    percentage: Math.abs(percentage),
    previousPeriodValue: previous,
  };
}

export function computeDashboardMetrics(transactions: Transaction[], periodDays: number = 30): DashboardMetrics {
  const now = new Date();
  const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
  const prevStart = new Date(periodStart.getTime() - periodDays * 24 * 60 * 60 * 1000);

  const currentTx = transactions.filter(t => new Date(t.date) >= periodStart && new Date(t.date) <= now);
  const prevTx = transactions.filter(t => new Date(t.date) >= prevStart && new Date(t.date) < periodStart);

  const currentIncome = currentTx.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const currentExpenses = currentTx.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const prevIncome = prevTx.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const prevExpenses = prevTx.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return {
    totalNetLiquidity: currentIncome - currentExpenses,
    totalIncome: currentIncome,
    totalExpenses: currentExpenses,
    incomeTrend: calculateTrend(currentIncome, prevIncome),
    expenseTrend: calculateTrend(currentExpenses, prevExpenses),
  };
}

export function computeCashFlowData(transactions: Transaction[], months: number = 6): CashFlowDataPoint[] {
  const now = new Date();
  const data: CashFlowDataPoint[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const monthTx = transactions.filter(t => {
      const d = new Date(t.date);
      return d >= monthStart && d <= monthEnd;
    });
    const income = monthTx.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTx.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    data.push({
      month: monthStart.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      income,
      expenses,
    });
  }
  return data;
}

export function getRecentTransactions(transactions: Transaction[], limit: number = 10): RecentTransaction[] {
  return transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
    .map(t => ({
      id: t.id,
      description: t.description,
      date: t.date,
      amount: t.amount,
      category: t.category,
      status: t.status,
      type: t.amount >= 0 ? 'income' as const : 'expense' as const,
    }));
}

export async function getDashboardData() {
  const transactions = await getAllTransactions();
  const metrics = computeDashboardMetrics(transactions);
  const cashFlowData = computeCashFlowData(transactions);
  const recentTransactions = getRecentTransactions(transactions);
  return { metrics, cashFlowData, recentTransactions, hasData: transactions.length > 0 };
}