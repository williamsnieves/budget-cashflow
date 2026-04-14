import type { Transaction } from '../types/transaction';
import type { IncomeExpensesSummary, CategoryBreakdown, CashFlowEntry, ReportFilters } from '../types/report';
import { getAllTransactions } from '../db';
import { getCategories } from './categoryService';

export function filterTransactions(transactions: Transaction[], filters: ReportFilters): Transaction[] {
  const start = new Date(filters.dateRange.start);
  const end = new Date(filters.dateRange.end);
  let filtered = transactions.filter(t => {
    const d = new Date(t.date);
    return d >= start && d <= end;
  });
  if (filters.categories) {
    filtered = filtered.filter(t => t.category && filters.categories!.includes(t.category));
  }
  return filtered;
}

export function computeIncomeExpensesSummary(transactions: Transaction[], filters: ReportFilters): IncomeExpensesSummary {
  const filtered = filterTransactions(transactions, filters);
  const totalIncome = filtered.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filtered.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  return {
    totalIncome,
    totalExpenses,
    netCashFlow: totalIncome - totalExpenses,
    period: filters.dateRange,
  };
}

export async function computeCategoryBreakdown(transactions: Transaction[], filters: ReportFilters): Promise<CategoryBreakdown[]> {
  const filtered = filterTransactions(transactions, filters);
  const expenseTransactions = filtered.filter(t => t.amount < 0);
  const categories = await getCategories();
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const categoryMap = new Map<string, { amount: number; count: number }>();
  for (const t of expenseTransactions) {
    const catId = t.category || 'uncategorized';
    const existing = categoryMap.get(catId) || { amount: 0, count: 0 };
    existing.amount += Math.abs(t.amount);
    existing.count += 1;
    categoryMap.set(catId, existing);
  }

  const breakdown: CategoryBreakdown[] = [];
  for (const [catId, data] of categoryMap) {
    const cat = categories.find(c => c.id === catId);
    breakdown.push({
      categoryId: catId,
      categoryName: cat ? cat.name : (catId === 'uncategorized' ? 'Uncategorized' : 'Unknown'),
      totalAmount: data.amount,
      percentage: totalExpenses > 0 ? Math.round((data.amount / totalExpenses) * 100) : 0,
      transactionCount: data.count,
    });
  }

  return breakdown.sort((a, b) => b.totalAmount - a.totalAmount);
}

export function computeCashFlowReport(transactions: Transaction[], filters: ReportFilters): CashFlowEntry[] {
  const filtered = filterTransactions(transactions, filters);
  const grouped = new Map<string, { income: number; expenses: number }>();

  for (const t of filtered) {
    const d = new Date(t.date);
    const key = filters.groupBy === 'week'
      ? `${d.getFullYear()}-W${String(getWeekNumber(d)).padStart(2, '0')}`
      : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

    const existing = grouped.get(key) || { income: 0, expenses: 0 };
    if (t.amount > 0) existing.income += t.amount;
    else existing.expenses += Math.abs(t.amount);
    grouped.set(key, existing);
  }

  const entries: CashFlowEntry[] = Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([period, data], i, arr) => {
      const prevData = i > 0 ? arr[i - 1][1] : null;
      const net = data.income - data.expenses;
      let trend: 'up' | 'down' | 'flat' = 'flat';
      let trendPercentage = 0;
      if (prevData) {
        const prevNet = prevData.income - prevData.expenses;
        if (prevNet !== 0) {
          trendPercentage = Math.round(((net - prevNet) / Math.abs(prevNet)) * 100);
          trend = trendPercentage > 0 ? 'up' : trendPercentage < 0 ? 'down' : 'flat';
        }
      }
      return {
        period,
        income: data.income,
        expenses: data.expenses,
        netCashFlow: net,
        trend,
        trendPercentage: Math.abs(trendPercentage),
      };
    });

  return entries;
}

function getWeekNumber(d: Date): number {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
}

export async function getReportData(filters: ReportFilters) {
  const transactions = await getAllTransactions();
  const summary = computeIncomeExpensesSummary(transactions, filters);
  const breakdown = await computeCategoryBreakdown(transactions, filters);
  const cashFlow = computeCashFlowReport(transactions, filters);
  return { summary, breakdown, cashFlow, hasData: transactions.length > 0 };
}