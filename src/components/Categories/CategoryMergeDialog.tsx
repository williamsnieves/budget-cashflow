import { useState } from 'react';
import type { Category } from '../../types/category';
import { mergeCategories } from '../../services/categoryService';

interface CategoryMergeDialogProps {
  categories: Category[];
  onClose: () => void;
  onMerged: () => void;
}

export default function CategoryMergeDialog({ categories, onClose, onMerged }: CategoryMergeDialogProps) {
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [merging, setMerging] = useState(false);

  const sourceCategory = categories.find(c => c.id === sourceId);
  const targetCategory = categories.find(c => c.id === targetId);

  async function handleMerge() {
    if (!sourceId || !targetId || sourceId === targetId) return;
    setMerging(true);
    try {
      await mergeCategories(sourceId, targetId);
      onMerged();
      onClose();
    } finally {
      setMerging(false);
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
          width: 440,
          maxWidth: '90vw',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Merge Categories
        </h3>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Source (merge from)
          </span>
          <select
            value={sourceId}
            onChange={e => setSourceId(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              fontSize: 14,
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-surface)',
            }}
          >
            <option value="">Select source category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Target (merge into)
          </span>
          <select
            value={targetId}
            onChange={e => setTargetId(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              fontSize: 14,
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-surface)',
            }}
          >
            <option value="">Select target category</option>
            {categories.filter(c => c.id !== sourceId).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        {sourceCategory && targetCategory && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              backgroundColor: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.25)',
              fontSize: 13,
              color: 'var(--color-accent-red)',
            }}
          >
            All transactions in <strong>{sourceCategory.name}</strong> will be moved to <strong>{targetCategory.name}</strong>.
            <strong>{sourceCategory.name}</strong> will be deleted.
          </div>
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
            onClick={handleMerge}
            disabled={merging || !sourceId || !targetId || sourceId === targetId}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: 'var(--color-accent-red)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: merging || !sourceId || !targetId || sourceId === targetId ? 'not-allowed' : 'pointer',
              opacity: merging || !sourceId || !targetId || sourceId === targetId ? 0.6 : 1,
            }}
          >
            {merging ? 'Merging...' : 'Merge'}
          </button>
        </div>
      </div>
    </div>
  );
}