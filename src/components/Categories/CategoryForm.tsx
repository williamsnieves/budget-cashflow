import { useState } from 'react';
import type { Category } from '../../types/category';
import { createCategory, renameCategory } from '../../services/categoryService';

interface CategoryFormProps {
  category: Category | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function CategoryForm({ category, onClose, onSaved }: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? '');
  const [type, setType] = useState<'income' | 'expense'>(category?.type ?? 'expense');
  const [color] = useState(category?.color ?? '#6B7280');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (category) {
        await renameCategory(category.id, name.trim());
      } else {
        await createCategory({ name: name.trim(), type, color, icon: null });
      }
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: 24,
          width: 400,
          maxWidth: '90vw',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {category ? 'Edit Category' : 'Add Category'}
        </h3>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Name</span>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Category name"
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              fontSize: 14,
              outline: 'none',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-surface)',
            }}
          />
        </label>

        {!category && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Type</span>
            <select
              value={type}
              onChange={e => setType(e.target.value as 'income' | 'expense')}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                fontSize: 14,
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-surface)',
              }}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-secondary)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: 'var(--color-accent-green)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: saving || !name.trim() ? 'not-allowed' : 'pointer',
              opacity: saving || !name.trim() ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}