interface QualityPanelProps {
  totalRows: number;
  validRows: number;
  errorRows: number;
  warningRows: number;
  errors: { row: number; message: string }[];
  warnings: { row: number; message: string }[];
}

export default function QualityPanel({ totalRows, validRows, errorRows, warningRows }: QualityPanelProps) {
  const indicators: { label: string; value: number; color: string }[] = [
    { label: 'Total rows', value: totalRows, color: 'var(--color-accent-green)' },
    { label: 'Valid rows', value: validRows, color: 'var(--color-accent-green)' },
    { label: 'Errors', value: errorRows, color: 'var(--color-accent-red)' },
    { label: 'Warnings', value: warningRows, color: '#F59E0B' },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--color-promo-start), var(--color-promo-end))',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 28,
        color: '#FFFFFF',
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 20px 0', color: '#FFFFFF' }}>
        Import Quality
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {indicators.map(({ label, value, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: color,
                flexShrink: 0,
              }}
            />
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#FFFFFF' }}>{label}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}