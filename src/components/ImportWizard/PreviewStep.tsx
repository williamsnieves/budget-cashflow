import type { ColumnMapping } from '../../types/transaction';
import { parseAmount } from '../../utils/CSVParser';
import { formatCurrency, formatDate } from '../../services/transactionService';

interface PreviewStepProps {
  rows: string[][];
  mappings: ColumnMapping[];
  headers: string[];
}

function getColumnIndex(mappings: ColumnMapping[], field: string): number | undefined {
  const idx = mappings.findIndex(m => m.targetField === field);
  return idx >= 0 ? idx : undefined;
}

export default function PreviewStep({ rows, mappings }: PreviewStepProps) {
  const dateCol = getColumnIndex(mappings, 'date');
  const descCol = getColumnIndex(mappings, 'description');
  const amountCol = getColumnIndex(mappings, 'amount');
  const catCol = getColumnIndex(mappings, 'category');
  const displayRows = rows.slice(0, 20);

  function getCellValue(row: string[], colIndex: number | undefined, _header: string): string {
    if (colIndex === undefined || colIndex >= row.length) return '—';
    return row[colIndex]?.trim() || '—';
  }

  function getAmountValue(row: string[]): { text: string; color: string } {
    if (amountCol === undefined) return { text: '—', color: 'var(--color-text-secondary)' };
    const raw = row[amountCol]?.trim();
    if (!raw) return { text: '—', color: 'var(--color-text-secondary)' };
    const num = parseAmount(raw);
    if (num === null) return { text: raw, color: 'var(--color-text-secondary)' };
    return {
      text: formatCurrency(num),
      color: num >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)',
    };
  }

  function getDateValue(row: string[]): string {
    if (dateCol === undefined) return '—';
    const raw = row[dateCol]?.trim();
    if (!raw) return '—';
    const parsed = Date.parse(raw);
    if (isNaN(parsed)) return raw;
    return formatDate(raw);
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 28,
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--color-text-primary)' }}>
        Data Preview
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 24px 0' }}>
        Review your transactions before importing
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Description</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
              <th style={thStyle}>Category</th>
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, i) => {
              const amount = getAmountValue(row);
              return (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={tdStyle}>{getDateValue(row)}</td>
                  <td style={tdStyle}>{getCellValue(row, descCol, 'description')}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', color: amount.color, fontWeight: 600 }}>{amount.text}</td>
                  <td style={tdStyle}>{getCellValue(row, catCol, 'category')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length > 20 && (
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 12, marginBottom: 0 }}>
          Showing 20 of {rows.length} rows
        </p>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
  borderBottom: '2px solid var(--color-border)',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  color: 'var(--color-text-primary)',
};