import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import type { CashFlowEntry } from '../../types/report';
import { formatCurrency } from '../../services/transactionService';

interface CashFlowReportProps {
  data: CashFlowEntry[];
  groupBy: 'week' | 'month';
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        padding: '10px 14px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 6px', color: 'var(--color-text-primary)' }}>
        {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ fontSize: 12, margin: '2px 0', color: entry.color, fontWeight: 500 }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function CashFlowReport({ data, groupBy }: CashFlowReportProps) {
  if (data.length === 0) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: 24,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px', color: 'var(--color-text-primary)' }}>
          Cash Flow
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, textAlign: 'center', padding: '40px 0', margin: 0 }}>
          No cash flow data for this period
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
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px', color: 'var(--color-text-primary)' }}>
        Cash Flow ({groupBy === 'week' ? 'Weekly' : 'Monthly'})
      </h3>
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={data} barGap={4} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--color-border)' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => formatCurrency(v)}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
            formatter={(value: string) => (
              <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>
            )}
          />
          <Bar dataKey="income" name="Income" fill="#22C55E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#F87171" radius={[4, 4, 0, 0]} />
          <Line
            type="monotone"
            dataKey="netCashFlow"
            name="Net Cash Flow"
            stroke="#6366F1"
            strokeWidth={2}
            dot={{ r: 3, fill: '#6366F1' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}