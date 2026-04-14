import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency } from '../../services/transactionService';
import type { TrendIndicator } from '../../types/dashboard';

interface SummaryCardProps {
  title: string;
  amount: number;
  trend: TrendIndicator | null;
  type: 'income' | 'expense';
}

function TrendBadge({ trend }: { trend: TrendIndicator | null }) {
  if (!trend) return null;

  const isUp = trend.direction === 'up';

  if (trend.direction === 'flat') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: 'var(--color-text-secondary)', fontSize: 12, fontWeight: 600 }}>
        <Minus size={13} />
        0.0%
      </span>
    );
  }

  const color = isUp ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
  const Icon = isUp ? TrendingUp : TrendingDown;
  const sign = isUp ? '+' : '-';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color, fontSize: 12, fontWeight: 600 }}>
      <Icon size={13} />
      {sign}{trend.percentage}%
    </span>
  );
}

export default function SummaryCard({ title, amount, trend, type }: SummaryCardProps) {
  const isIncome = type === 'income';
  const color = isIncome ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
  const Icon = isIncome ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: isIncome ? 'rgba(34, 197, 94, 0.12)' : 'rgba(248, 113, 113, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 500, margin: '0 0 2px' }}>
          {title}
        </p>
        <p style={{ color, fontSize: 22, fontWeight: 700, margin: 0 }}>
          {formatCurrency(amount)}
        </p>
      </div>
      <TrendBadge trend={trend} />
    </div>
  );
}