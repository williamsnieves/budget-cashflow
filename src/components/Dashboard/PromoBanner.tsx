import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { isPromoDismissed, dismissPromo } from '../../services/promoPreferences';

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isPromoDismissed()) {
      setVisible(true);
    }
  }, []);

  function handleDismiss() {
    dismissPromo();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'relative' as const,
        background: 'linear-gradient(135deg, var(--color-promo-start), var(--color-promo-end))',
        borderRadius: 'var(--radius-card)',
        padding: '32px 36px',
        overflow: 'hidden',
        color: '#fff',
      }}
    >
      <div
        style={{
          position: 'absolute' as const,
          top: '-40%',
          right: '-10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none' as const,
        }}
      />
      <div
        style={{
          position: 'absolute' as const,
          bottom: '-30%',
          left: '20%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none' as const,
        }}
      />
      <button
        onClick={handleDismiss}
        style={{
          position: 'absolute' as const,
          top: 12,
          right: 12,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#fff',
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <X size={20} />
      </button>
      <div style={{ position: 'relative' as const }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>
          Take control of your finances
        </h3>
        <p style={{ fontSize: 14, margin: '0 0 20px', color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.5, maxWidth: 520 }}>
          Forge Ledger helps you track spending, optimize cash flow, and make smarter financial decisions.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{
              backgroundColor: 'var(--color-accent-green)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
          >
            Get Started
          </button>
          <button
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: '1.5px solid rgba(255, 255, 255, 0.5)',
              borderRadius: 8,
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}