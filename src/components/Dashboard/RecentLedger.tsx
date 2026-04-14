import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../../services/transactionService';
import type { RecentTransaction } from '../../types/dashboard';

interface RecentLedgerProps {
  transactions: RecentTransaction[];
  hasData: boolean;
}

function LedgerRow({ tx }: { tx: RecentTransaction }) {
  const navigate = useNavigate();
  const isIncome = tx.type === 'income';
  const amountColor = isIncome ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
  const Icon = isIncome ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      onClick={() => navigate('/transactions')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 0',
        borderBottom: '1px solid var(--color-border)',
        cursor: 'pointer',
        transition: 'background-color 0.15s',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: isIncome ? 'rgba(34, 197, 94, 0.12)' : 'rgba(248, 113, 113, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={16} style={{ color: amountColor }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {tx.description}
        </p>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
          {formatDate(tx.date)}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 10,
            backgroundColor: tx.status === 'cleared' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(107, 114, 128, 0.12)',
            color: tx.status === 'cleared' ? 'var(--color-accent-green)' : 'var(--color-text-secondary)',
            textTransform: 'capitalize',
          }}
        >
          {tx.status}
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: amountColor, minWidth: 72, textAlign: 'right' }}>
          {isIncome ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
        </span>
      </div>
    </div>
  );
}

export default function RecentLedger({ transactions, hasData }: RecentLedgerProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: '20px 24px',
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', color: 'var(--color-text-primary)' }}>
        Recent Ledger
      </h3>
      {!hasData || transactions.length === 0 ? (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, textAlign: 'center', padding: '40px 0', margin: 0 }}>
          No transactions yet
        </p>
      ) : (
        <div>
          {transactions.map((tx) => (
            <LedgerRow key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
}