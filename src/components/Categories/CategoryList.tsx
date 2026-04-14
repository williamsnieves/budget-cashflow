import { Plus, Trash2 } from 'lucide-react';
import type { Category } from '../../types/category';
import type { Transaction } from '../../types/transaction';

interface CategoryListProps {
  categories: Category[];
  transactions: Transaction[];
  onEdit: (cat: Category) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export default function CategoryList({ categories, transactions, onEdit, onAdd, onDelete }: CategoryListProps) {
  const countByCategory = transactions.reduce<Record<string, number>>((acc, t) => {
    if (t.category) acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>Categories</h2>
        <button
          onClick={onAdd}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: 'var(--color-accent-green)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {categories.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, textAlign: 'center', padding: 24 }}>
          No categories yet. Create one to get started.
        </p>
      )}

      {categories.map(cat => {
        const count = countByCategory[cat.id] || 0;
        return (
          <div
            key={cat.id}
            onClick={() => onEdit(cat)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              transition: 'box-shadow 0.15s',
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: cat.color,
                flexShrink: 0,
              }}
            />
            <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {cat.name}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: 6,
                backgroundColor: cat.type === 'income' ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.12)',
                color: cat.type === 'income' ? 'var(--color-accent-green)' : 'var(--color-accent-red)',
              }}
            >
              {cat.type}
            </span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              {count} txn{count !== 1 ? 's' : ''}
            </span>
            <button
              onClick={e => { e.stopPropagation(); onDelete(cat.id); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: 'var(--color-text-secondary)',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
              }}
              title="Delete category"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}