import { useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import { exportToCsv } from '../../services/csvExport';
import type { IncomeExpensesSummary, CategoryBreakdown, CashFlowEntry } from '../../types/report';

interface ExportButtonProps {
  summary: IncomeExpensesSummary;
  breakdown: CategoryBreakdown[];
  cashFlow: CashFlowEntry[];
  dateRange: { start: string; end: string };
}

export default function ExportButton({ summary, breakdown, cashFlow, dateRange }: ExportButtonProps) {
  const [toast, setToast] = useState(false);

  const handleExport = useCallback(() => {
    const filename = `report-${dateRange.start}-to-${dateRange.end}.csv`;

    const headers = [
      'Section', 'Category', 'Period', 'Income', 'Expenses', 'Net Cash Flow', 'Percentage', 'Count',
    ];

    const rows: string[][] = [];

    rows.push([
      'Summary', '', '',
      summary.totalIncome.toFixed(2),
      summary.totalExpenses.toFixed(2),
      summary.netCashFlow.toFixed(2),
      '', '',
    ]);

    for (const b of breakdown) {
      rows.push([
        'Category Breakdown',
        b.categoryName,
        '',
        '',
        b.totalAmount.toFixed(2),
        '',
        String(b.percentage),
        String(b.transactionCount),
      ]);
    }

    for (const c of cashFlow) {
      rows.push([
        'Cash Flow',
        '',
        c.period,
        c.income.toFixed(2),
        c.expenses.toFixed(2),
        c.netCashFlow.toFixed(2),
        '', '',
      ]);
    }

    exportToCsv(headers, rows, filename);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }, [summary, breakdown, cashFlow, dateRange]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={handleExport}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          borderRadius: 8,
          border: '2px solid #22C55E',
          backgroundColor: 'transparent',
          color: '#22C55E',
          fontWeight: 600,
          fontSize: 13,
          cursor: 'pointer',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <Download size={16} />
        Export CSV
      </button>
      {toast && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: 6,
            backgroundColor: '#22C55E',
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            padding: '4px 12px',
            borderRadius: 6,
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          CSV exported!
        </div>
      )}
    </div>
  );
}