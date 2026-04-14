import { Plus, Trash2 } from 'lucide-react';
import type { CategorizationRule, Category } from '../../types/category';

interface RuleListProps {
  rules: CategorizationRule[];
  categories: Category[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onToggle: (rule: CategorizationRule) => void;
}

export default function RuleList({ rules, categories, onAdd, onDelete, onToggle }: RuleListProps) {
  const sorted = [...rules].sort((a, b) => a.priority - b.priority);

  const categoryMap = categories.reduce<Record<string, string>>((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});

  const matchTypeLabel: Record<string, string> = {
    contains: 'Contains',
    startsWith: 'Starts With',
    regex: 'Regex',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Rules
        </h2>
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
          Add Rule
        </button>
      </div>

      {sorted.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, textAlign: 'center', padding: 24 }}>
          No rules yet. Create one to auto-categorize transactions.
        </p>
      )}

      {sorted.map(rule => (
        <div
          key={rule.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            backgroundColor: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-card)',
            opacity: rule.isActive ? 1 : 0.55,
            transition: 'opacity 0.15s',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {rule.name}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '1px 6px',
                  borderRadius: 4,
                  backgroundColor: 'var(--color-bg-surface)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {matchTypeLabel[rule.matchType] ?? rule.matchType}
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              <code style={{ fontSize: 12, backgroundColor: 'var(--color-bg-surface)', padding: '1px 5px', borderRadius: 4 }}>
                {rule.pattern}
              </code>
              {' → '}
              <span style={{ fontWeight: 600 }}>{categoryMap[rule.categoryId] ?? rule.categoryId}</span>
              <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--color-text-secondary)' }}>
                P{rule.priority}
              </span>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}>
            <input
              type="checkbox"
              checked={rule.isActive}
              onChange={() => onToggle(rule)}
              style={{ display: 'none' }}
            />
            <div
              style={{
                width: 36,
                height: 20,
                borderRadius: 10,
                backgroundColor: rule.isActive ? 'var(--color-accent-green)' : 'var(--color-border)',
                position: 'relative',
                transition: 'background-color 0.2s',
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  position: 'absolute',
                  top: 2,
                  left: rule.isActive ? 18 : 2,
                  transition: 'left 0.2s',
                }}
              />
            </div>
          </label>

          <button
            onClick={() => onDelete(rule.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              color: 'var(--color-text-secondary)',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-red)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            title="Delete rule"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}