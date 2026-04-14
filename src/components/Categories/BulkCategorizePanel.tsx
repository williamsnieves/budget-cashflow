import { useState } from 'react';
import { Zap } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { categorizeTransactionsSync } from '../../services/categorizationEngine';
import { addTransactions } from '../../db';

export default function BulkCategorizePanel() {
  const { transactions, rules, refreshData } = useData();
  const [categorizing, setCategorizing] = useState(false);
  const [result, setResult] = useState<{ categorized: number; total: number } | null>(null);

  const uncategorized = transactions.filter(t => !t.category);
  const uncategorizedCount = uncategorized.length;

  async function handleCategorizeAll() {
    if (uncategorizedCount === 0) return;
    setCategorizing(true);
    try {
      const updated = categorizeTransactionsSync(transactions, rules);
      const changed = updated.filter(
        (t, i) => transactions[i].category !== t.category,
      );
      if (changed.length > 0) {
        await addTransactions(changed);
      }
      setResult({ categorized: changed.length, total: uncategorizedCount });
      await refreshData();
    } finally {
      setCategorizing(false);
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Zap size={32} style={{ color: 'var(--color-accent-green)' }} />
      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
        Uncategorized Transactions
      </h3>

      <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-secondary)' }}>
        {uncategorizedCount === 0
          ? 'All transactions are categorized!'
          : `${uncategorizedCount} transaction${uncategorizedCount !== 1 ? 's' : ''} need${uncategorizedCount === 1 ? 's' : ''} categorization.`}
      </p>

      {result && (
        <div
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            backgroundColor: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.25)',
            fontSize: 14,
            color: 'var(--color-accent-green)',
            fontWeight: 600,
          }}
        >
          Categorized {result.categorized} of {result.total} transactions.
        </div>
      )}

      <button
        onClick={handleCategorizeAll}
        disabled={categorizing || uncategorizedCount === 0}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 24px',
          borderRadius: 8,
          border: 'none',
          backgroundColor: 'var(--color-accent-green)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          cursor: categorizing || uncategorizedCount === 0 ? 'not-allowed' : 'pointer',
          opacity: categorizing || uncategorizedCount === 0 ? 0.6 : 1,
        }}
      >
        <Zap size={16} />
        {categorizing ? 'Categorizing...' : 'Categorize All'}
      </button>
    </div>
  );
}