import { formatCurrency } from '../../services/transactionService';
import type { CategoryBreakdown } from '../../types/report';
import type { Category } from '../../types/category';

interface CategoryBreakdownTableProps {
  breakdown: CategoryBreakdown[];
  categories: Category[];
}

export default function CategoryBreakdownTable({ breakdown, categories }: CategoryBreakdownTableProps) {
  if (breakdown.length === 0) {
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
          Category Breakdown
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, textAlign: 'center', padding: '40px 0', margin: 0 }}>
          No expense data for this period
        </p>
      </div>
    );
  }

  const totalAmount = breakdown.reduce((sum, b) => sum + b.totalAmount, 0);

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
        Category Breakdown
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Category', 'Amount', '%', 'Count'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: h === 'Amount' || h === 'Count' ? 'right' : 'left',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {breakdown.map((row) => {
            const cat = categories.find((c) => c.id === row.categoryId);
            const color = cat?.color ?? '#9CA3AF';
            return (
              <tr key={row.categoryId}>
                <td style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                      {row.categoryName}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)', textAlign: 'right', fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {formatCurrency(row.totalAmount)}
                </td>
                <td style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)', width: 120 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: 'var(--color-border)', overflow: 'hidden' }}>
                      <div style={{ width: `${row.percentage}%`, height: '100%', borderRadius: 3, backgroundColor: '#22C55E' }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', minWidth: 30, textAlign: 'right' }}>
                      {row.percentage}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)', textAlign: 'right', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  {row.transactionCount}
                </td>
              </tr>
            );
          })}
          <tr>
            <td style={{ padding: '10px 0', fontWeight: 700, fontSize: 13, color: 'var(--color-text-primary)' }}>
              Total
            </td>
            <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700, fontSize: 13, color: 'var(--color-text-primary)' }}>
              {formatCurrency(totalAmount)}
            </td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}