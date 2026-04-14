import type { ColumnMapping } from '../../types/transaction';
import { validateMappings } from '../../utils/ColumnMapper';

const TARGET_OPTIONS: { value: ColumnMapping['targetField'] | ''; label: string }[] = [
  { value: '', label: '-- Skip --' },
  { value: 'date', label: 'Date' },
  { value: 'description', label: 'Description' },
  { value: 'amount', label: 'Amount' },
  { value: 'category', label: 'Category' },
];

interface MappingStepProps {
  headers: string[];
  mappings: ColumnMapping[];
  onMappingsChange: (mappings: ColumnMapping[]) => void;
  onContinue: () => void;
}

export default function MappingStep({ headers, mappings, onMappingsChange, onContinue }: MappingStepProps) {
  const missingFields = validateMappings(mappings);

  function handleMappingChange(index: number, newTarget: ColumnMapping['targetField'] | '') {
    const updated = mappings.map((m, i) =>
      i === index ? { ...m, targetField: newTarget || ('' as ColumnMapping['targetField']), confidence: newTarget ? 1 : 0 } : m,
    );
    onMappingsChange(updated);
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
        Column Mapping
      </h2>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: '0 0 24px 0' }}>
        Map your CSV columns to transaction fields
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {headers.map((header, i) => (
          <div key={header} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              {header}
            </span>
            <select
              value={mappings[i]?.targetField || ''}
              onChange={(e) => handleMappingChange(i, e.target.value as ColumnMapping['targetField'] | '')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-surface)',
                fontSize: 14,
                color: 'var(--color-text-primary)',
                outline: 'none',
              }}
            >
              {TARGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value ?? ''}>{opt.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {missingFields.length > 0 && (
        <p style={{ color: 'var(--color-accent-red)', fontSize: 13, fontWeight: 500, marginTop: 16, marginBottom: 0 }}>
          Required fields not mapped: {missingFields.join(', ')}
        </p>
      )}

      <button
        onClick={onContinue}
        disabled={missingFields.length > 0}
        style={{
          marginTop: 24,
          width: '100%',
          padding: '12px 24px',
          border: 'none',
          borderRadius: 8,
          backgroundColor: missingFields.length > 0 ? 'var(--color-text-secondary)' : 'var(--color-accent-green)',
          color: '#FFFFFF',
          fontSize: 15,
          fontWeight: 600,
          cursor: missingFields.length > 0 ? 'not-allowed' : 'pointer',
          opacity: missingFields.length > 0 ? 0.5 : 1,
        }}
      >
        Continue
      </button>
    </div>
  );
}