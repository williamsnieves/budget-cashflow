import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { useData } from '../context/DataContext';
import TransactionFilters, { INITIAL_FILTERS, type FilterState } from '../components/Transactions/TransactionFilters';
import TransactionTable from '../components/Transactions/TransactionTable';

export default function TransactionsPage() {
  const { transactions, categories, loading } = useData();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const handleFiltersChange = useCallback((f: FilterState) => {
    setFilters(f);
  }, []);

  const filtered = useMemo(() => {
    return transactions.filter(tx => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!tx.description.toLowerCase().includes(q)) return false;
      }
      if (filters.category) {
        if (filters.category === '__uncategorized__') {
          if (tx.category !== null) return false;
        } else if (tx.category !== filters.category) {
          return false;
        }
      }
      if (filters.status !== 'all' && tx.status !== filters.status) return false;
      if (filters.dateFrom && tx.date < filters.dateFrom) return false;
      if (filters.dateTo && tx.date > filters.dateTo) return false;
      return true;
    });
  }, [transactions, filters]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Loading transactions…</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480, margin: '60px auto', textAlign: 'center' }}>
        <Link
          to="/transactions/import"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '48px 32px',
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)',
            textDecoration: 'none',
            border: '2px dashed var(--color-border)',
            transition: 'border-color 0.15s',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Upload size={24} style={{ color: 'var(--color-accent-green)' }} />
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
            Import CSV
          </p>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
            No transactions yet. Import a CSV to get started.
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TransactionFilters categories={categories} onFiltersChange={handleFiltersChange} />
      <TransactionTable transactions={filtered} categories={categories} />
    </div>
  );
}