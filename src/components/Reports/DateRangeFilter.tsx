import { useCallback, useMemo, useState } from 'react';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
}

type Preset = 'last7' | 'last30' | 'last90' | 'thisMonth' | 'thisYear' | 'custom';

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

function computePresetRange(preset: Preset): { start: string; end: string } {
  const now = new Date();
  const end = formatDate(now);
  let start: string;

  if (preset === 'last7') {
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    start = formatDate(d);
  } else if (preset === 'last30') {
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    start = formatDate(d);
  } else if (preset === 'last90') {
    const d = new Date(now);
    d.setDate(d.getDate() - 89);
    start = formatDate(d);
  } else if (preset === 'thisMonth') {
    start = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
  } else if (preset === 'thisYear') {
    start = formatDate(new Date(now.getFullYear(), 0, 1));
  } else {
    start = '';
  }

  return { start, end };
}

const PRESETS: { key: Preset; label: string }[] = [
  { key: 'last7', label: 'Last 7 days' },
  { key: 'last30', label: 'Last 30 days' },
  { key: 'last90', label: 'Last 90 days' },
  { key: 'thisMonth', label: 'This Month' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'custom', label: 'Custom' },
];

export default function DateRangeFilter({ startDate, endDate, onDateChange }: DateRangeFilterProps) {
  const activePreset = useMemo<Preset>(() => {
    for (const p of PRESETS) {
      if (p.key === 'custom') continue;
      const range = computePresetRange(p.key);
      if (range.start === startDate && range.end === endDate) return p.key;
    }
    return 'custom';
  }, [startDate, endDate]);

  const [customStart, setCustomStart] = useState(startDate);
  const [customEnd, setCustomEnd] = useState(endDate);

  const handlePreset = useCallback((preset: Preset) => {
    if (preset === 'custom') {
      setCustomStart(startDate);
      setCustomEnd(endDate);
      onDateChange(startDate, endDate);
    } else {
      const range = computePresetRange(preset);
      onDateChange(range.start, range.end);
    }
  }, [startDate, endDate, onDateChange]);

  const handleCustomStart = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomStart(val);
    if (val && customEnd) onDateChange(val, customEnd);
  }, [customEnd, onDateChange]);

  const handleCustomEnd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomEnd(val);
    if (customStart && val) onDateChange(customStart, val);
  }, [customStart, onDateChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {PRESETS.map((p) => {
          const isActive = activePreset === p.key;
          return (
            <button
              key={p.key}
              onClick={() => handlePreset(p.key)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: isActive ? '2px solid #22C55E' : '1px solid var(--color-border)',
                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'var(--color-bg-card)',
                color: isActive ? '#22C55E' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      {activePreset === 'custom' && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <label style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            From
            <input
              type="date"
              value={customStart}
              onChange={handleCustomStart}
              style={{
                marginLeft: 6,
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                fontSize: 13,
              }}
            />
          </label>
          <label style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            To
            <input
              type="date"
              value={customEnd}
              onChange={handleCustomEnd}
              style={{
                marginLeft: 6,
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid var(--color-border)',
                fontSize: 13,
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}