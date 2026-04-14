import { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { computeDashboardMetrics, computeCashFlowData, getRecentTransactions } from '../services/dashboardService';
import KpiCard from '../components/Dashboard/KpiCard';
import SummaryCard from '../components/Dashboard/SummaryCard';
import CashFlowChart from '../components/Dashboard/CashFlowChart';
import RecentLedger from '../components/Dashboard/RecentLedger';
import PromoBanner from '../components/Dashboard/PromoBanner';

export default function DashboardPage() {
  const { transactions, loading } = useData();

  const metrics = useMemo(() => computeDashboardMetrics(transactions), [transactions]);
  const cashFlowData = useMemo(() => computeCashFlowData(transactions), [transactions]);
  const recentTransactions = useMemo(() => getRecentTransactions(transactions), [transactions]);
  const hasData = transactions.length > 0;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 16 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1080 }}>
      <KpiCard metrics={metrics} hasData={hasData} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <SummaryCard
          title="Income"
          amount={metrics?.totalIncome ?? 0}
          trend={metrics?.incomeTrend ?? null}
          type="income"
        />
        <SummaryCard
          title="Expenses"
          amount={metrics?.totalExpenses ?? 0}
          trend={metrics?.expenseTrend ?? null}
          type="expense"
        />
      </div>
      <CashFlowChart data={cashFlowData} hasData={hasData} />
      <RecentLedger transactions={recentTransactions} hasData={hasData} />
      <PromoBanner />
    </div>
  );
}