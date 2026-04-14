import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Upload } from 'lucide-react';
import type { Category } from '../../types/category';

export interface FilterState {
  search: string;
  category: string | null;
  status: 'all' | 'cleared' | 'pending';
  dateFrom: string;
  dateTo: string;
}

interface TransactionFiltersProps {
  categories: Category[];
  onFiltersChange: (filters: FilterState) => void;
}

const INITIAL_FILTERS: FilterState = {
  search: '',
  category: null,
  status: 'all',
  dateFrom: '',
  dateTo: '',
};

export { INITIAL_FILTERS };

export default function TransactionFilters({ categories, onFiltersChange }: TransactionFiltersProps) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  function update(patch: Partial<FilterState>) {
    setFilters(prev => ({ ...prev, ...patch }));
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        padding: '16px 20px',
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-secondary)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Search description…"
          value={filters.search}
          onChange={e => update({ search: e.target.value })}
          style={{
            width: '100%',
            padding: '8px 12px 8px 32px',
            fontSize: 13,
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text-primary)',
            outline: 'none',
          }}
        />
      </div>

      <select
        value={filters.category ?? ''}
        onChange={e => update({ category: e.target.value || null })}
        style={{
          padding: '8px 12px',
          fontSize: 13,
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          minWidth: 140,
        }}
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
        <option value="__uncategorized__">Uncategorized</option>
      </select>

      <select
        value={filters.status}
        onChange={e => update({ status: e.target.value as FilterState['status'] })}
        style={{
          padding: '8px 12px',
          fontSize: 13,
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          minWidth: 120,
        }}
      >
        <option value="all">All Statuses</option>
        <option value="cleared">Cleared</option>
        <option value="pending">Pending</option>
      </select>

      <input
        type="date"
        value={filters.dateFrom}
        onChange={e => update({ dateFrom: e.target.value })}
        placeholder="From"
        style={{
          padding: '8px 12px',
          fontSize: 13,
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          minWidth: 140,
        }}
      />

      <input
        type="date"
        value={filters.dateTo}
        onChange={e => update({ dateTo: e.target.value })}
        placeholder="To"
        style={{
          padding: '8px 12px',
          fontSize: 13,
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          minWidth: 140,
        }}
      />

      <button
        onClick={() => navigate('/transactions/import')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 600,
          border: 'none',
          borderRadius: 8,
          backgroundColor: 'var(--color-accent-green)',
          color: '#fff',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <Upload size={14} />
        Import CSV
      </button>
    </div>
  );
}