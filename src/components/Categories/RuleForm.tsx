import { useState } from 'react';
import type { CategorizationRule, Category } from '../../types/category';
import { createRule } from '../../services/ruleService';

interface RuleFormProps {
  categories: Category[];
  rule?: CategorizationRule | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function RuleForm({ categories, rule, onClose, onSaved }: RuleFormProps) {
  const [name, setName] = useState(rule?.name ?? '');
  const [matchType, setMatchType] = useState<'contains' | 'startsWith' | 'regex'>(
    rule?.matchType ?? 'contains',
  );
  const [pattern, setPattern] = useState(rule?.pattern ?? '');
  const [categoryId, setCategoryId] = useState(rule?.categoryId ?? (categories[0]?.id ?? ''));
  const [saving, setSaving] = useState(false);
  const [patternError, setPatternError] = useState('');

  function validateRegex(p: string): boolean {
    try {
      new RegExp(p);
      return true;
    } catch {
      return false;
    }
  }

  function handlePatternChange(val: string) {
    setPattern(val);
    if (matchType === 'regex' && val) {
      setPatternError(validateRegex(val) ? '' : 'Invalid regular expression');
    } else {
      setPatternError('');
    }
  }

  function handleMatchTypeChange(val: 'contains' | 'startsWith' | 'regex') {
    setMatchType(val);
    if (val === 'regex' && pattern) {
      setPatternError(validateRegex(pattern) ? '' : 'Invalid regular expression');
    } else {
      setPatternError('');
    }
  }

  async function handleSave() {
    if (!name.trim() || !pattern.trim() || !categoryId) return;
    if (matchType === 'regex' && !validateRegex(pattern)) return;

    setSaving(true);
    try {
      await createRule({
        name: name.trim(),
        matchType,
        pattern: pattern.trim(),
        categoryId,
        priority: 999,
        isActive: true,
      });
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
          {rule ? 'Edit Rule' : 'Add Rule'}
        </h3>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Name</span>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Rule name"
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

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Match Type</span>
          <select
            value={matchType}
            onChange={e => handleMatchTypeChange(e.target.value as 'contains' | 'startsWith' | 'regex')}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              fontSize: 14,
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-surface)',
            }}
          >
            <option value="contains">Contains</option>
            <option value="startsWith">Starts With</option>
            <option value="regex">Regex</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Pattern</span>
          <input
            type="text"
            value={pattern}
            onChange={e => handlePatternChange(e.target.value)}
            placeholder={matchType === 'regex' ? 'Regular expression pattern' : 'Text pattern'}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: patternError ? '1px solid var(--color-accent-red)' : '1px solid var(--color-border)',
              fontSize: 14,
              outline: 'none',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-surface)',
            }}
          />
          {patternError && (
            <span style={{ fontSize: 12, color: 'var(--color-accent-red)' }}>{patternError}</span>
          )}
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Category</span>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              fontSize: 14,
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-bg-surface)',
            }}
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

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
            disabled={saving || !name.trim() || !pattern.trim() || !!patternError}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: 'var(--color-accent-green)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: saving || !name.trim() || !pattern.trim() || !!patternError ? 'not-allowed' : 'pointer',
              opacity: saving || !name.trim() || !pattern.trim() || !!patternError ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}