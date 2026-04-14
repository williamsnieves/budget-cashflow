import { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/DataContext';
import {
  computeIncomeExpensesSummary,
  computeCategoryBreakdown,
  computeCashFlowReport,
} from '../services/reportService';
import DateRangeFilter from '../components/Reports/DateRangeFilter';
import IncomeExpensesCard from '../components/Reports/IncomeExpensesCard';
import CategoryBreakdownTable from '../components/Reports/CategoryBreakdownTable';
import CashFlowReport from '../components/Reports/CashFlowReport';
import ExportButton from '../components/Reports/ExportButton';
import type { CategoryBreakdown, ReportFilters } from '../types/report';

type Tab = 'summary' | 'category' | 'cashFlow';

function getPresetRange(preset: 'last7' | 'last30'): { start: string; end: string } {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  const d = new Date(now);
  if (preset === 'last7') d.setDate(d.getDate() - 6);
  else d.setDate(d.getDate() - 29);
  return { start: d.toISOString().split('T')[0], end };
}

export default function ReportsPage() {
  const { transactions, categories, loading } = useData();
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [groupBy, setGroupBy] = useState<'week' | 'month'>('month');

  const defaultRange = useMemo(() => getPresetRange('last30'), []);
  const [startDate, setStartDate] = useState(defaultRange.start);
  const [endDate, setEndDate] = useState(defaultRange.end);

  const filters: ReportFilters = useMemo(() => ({
    dateRange: { start: startDate, end: endDate },
    categories: null,
    groupBy,
  }), [startDate, endDate, groupBy]);

  const summary = useMemo(
    () => computeIncomeExpensesSummary(transactions, filters),
    [transactions, filters],
  );

  const [breakdown, setBreakdown] = useState<CategoryBreakdown[]>([]);

  useEffect(() => {
    computeCategoryBreakdown(transactions, filters).then(setBreakdown);
  }, [transactions, filters]);

  const cashFlow = useMemo(
    () => computeCashFlowReport(transactions, filters),
    [transactions, filters],
  );

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 16 }}>Loading...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 16 }}>Import transactions to view reports</p>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'summary', label: 'Summary' },
    { key: 'category', label: 'Category Breakdown' },
    { key: 'cashFlow', label: 'Cash Flow' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1080 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <DateRangeFilter startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
        </div>
        <ExportButton
          summary={summary}
          breakdown={breakdown}
          cashFlow={cashFlow}
          dateRange={{ start: startDate, end: endDate }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '8px 18px',
              borderRadius: 8,
              border: activeTab === tab.key ? '2px solid #22C55E' : '1px solid var(--color-border)',
              backgroundColor: activeTab === tab.key ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-bg-card)',
              color: activeTab === tab.key ? '#22C55E' : 'var(--color-text-secondary)',
              fontWeight: activeTab === tab.key ? 600 : 500,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {(activeTab === 'category' || activeTab === 'cashFlow') && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>Group by:</span>
          <button
            onClick={() => setGroupBy('month')}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              border: groupBy === 'month' ? '2px solid #22C55E' : '1px solid var(--color-border)',
              backgroundColor: groupBy === 'month' ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-bg-card)',
              color: groupBy === 'month' ? '#22C55E' : 'var(--color-text-secondary)',
              fontWeight: groupBy === 'month' ? 600 : 500,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Month
          </button>
          <button
            onClick={() => setGroupBy('week')}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              border: groupBy === 'week' ? '2px solid #22C55E' : '1px solid var(--color-border)',
              backgroundColor: groupBy === 'week' ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-bg-card)',
              color: groupBy === 'week' ? '#22C55E' : 'var(--color-text-secondary)',
              fontWeight: groupBy === 'week' ? 600 : 500,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Week
          </button>
        </div>
      )}

      {activeTab === 'summary' && <IncomeExpensesCard summary={summary} />}
      {activeTab === 'category' && <CategoryBreakdownTable breakdown={breakdown} categories={categories} />}
      {activeTab === 'cashFlow' && <CashFlowReport data={cashFlow} groupBy={groupBy} />}
    </div>
  );
}