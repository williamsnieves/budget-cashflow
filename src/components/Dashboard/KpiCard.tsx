import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency } from '../../services/transactionService';
import type { DashboardMetrics, TrendIndicator } from '../../types/dashboard';

interface KpiCardProps {
  metrics: DashboardMetrics | null;
  hasData: boolean;
}

function TrendBadge({ trend }: { trend: TrendIndicator }) {
  const isUp = trend.direction === 'up';

  if (trend.direction === 'flat') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 600 }}>
        <Minus size={16} />
        0.0%
      </span>
    );
  }

  const color = isUp ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
  const Icon = isUp ? TrendingUp : TrendingDown;
  const sign = isUp ? '+' : '-';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color, fontSize: 13, fontWeight: 600 }}>
      <Icon size={16} />
      {sign}{trend.percentage}%
    </span>
  );
}

export default function KpiCard({ metrics, hasData }: KpiCardProps) {
  if (!hasData || !metrics) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: 24,
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, margin: 0, textAlign: 'center', padding: '24px 0' }}>
          Import transactions to get started
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, fontWeight: 500, margin: '0 0 4px' }}>
          Total Net Liquidity
        </p>
        <p style={{ color: 'var(--color-text-primary)', fontSize: 32, fontWeight: 700, margin: 0 }}>
          {formatCurrency(metrics.totalNetLiquidity)}
        </p>
      </div>
      <TrendBadge trend={{
        direction: metrics.totalNetLiquidity > 0 ? 'up' : metrics.totalNetLiquidity < 0 ? 'down' : 'flat',
        percentage: metrics.incomeTrend.percentage,
        previousPeriodValue: metrics.incomeTrend.previousPeriodValue,
      }} />
    </div>
  );
}