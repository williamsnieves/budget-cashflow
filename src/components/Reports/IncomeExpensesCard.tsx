import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../services/transactionService';
import type { IncomeExpensesSummary } from '../../types/report';

interface IncomeExpensesCardProps {
  summary: IncomeExpensesSummary;
}

export default function IncomeExpensesCard({ summary }: IncomeExpensesCardProps) {
  const isPositive = summary.netCashFlow >= 0;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 24,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowUpRight size={20} style={{ color: '#22C55E' }} />
          </div>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500, margin: '0 0 2px' }}>
              Total Income
            </p>
            <p style={{ color: '#22C55E', fontSize: 22, fontWeight: 700, margin: 0 }}>
              {formatCurrency(summary.totalIncome)}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: 'rgba(248, 113, 113, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowDownRight size={20} style={{ color: '#F87171' }} />
          </div>
          <div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500, margin: '0 0 2px' }}>
              Total Expenses
            </p>
            <p style={{ color: '#F87171', fontSize: 22, fontWeight: 700, margin: 0 }}>
              {formatCurrency(summary.totalExpenses)}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          Net Cash Flow
        </span>
        <span style={{ fontSize: 15, fontWeight: 700, color: isPositive ? '#22C55E' : '#F87171' }}>
          {isPositive ? '+' : ''}{formatCurrency(summary.netCashFlow)}
        </span>
      </div>
    </div>
  );
}