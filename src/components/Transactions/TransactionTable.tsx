import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../services/transactionService';
import type { Transaction } from '../../types/transaction';
import type { Category } from '../../types/category';

interface TransactionTableProps {
  transactions: Transaction[];
  categories: Category[];
}

const PAGE_SIZE = 25;

export default function TransactionTable({ transactions, categories }: TransactionTableProps) {
  const [page, setPage] = useState(0);

  const categoryMap = new Map(categories.map(c => [c.id, c]));

  const sorted = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (transactions.length === 0) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 15, margin: '0 0 12px' }}>
          No transactions yet. Import a CSV to get started.
        </p>
        <Link
          to="/transactions/import"
          style={{
            color: 'var(--color-accent-green)',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          Import CSV →
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th style={{ textAlign: 'right' }}>Amount</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(tx => {
              const cat = tx.category ? categoryMap.get(tx.category) : null;
              const isPositive = tx.amount >= 0;
              return (
                <tr
                  key={tx.id}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'background-color 0.15s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'var(--color-bg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent'; }}
                >
                  <Td>{formatDate(tx.date)}</Td>
                  <Td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tx.description}
                  </Td>
                  <Td>
                    {cat ? (
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 12,
                          fontWeight: 600,
                          padding: '2px 10px',
                          borderRadius: 10,
                          backgroundColor: cat.color + '1A',
                          color: cat.color,
                        }}
                      >
                        {cat.name}
                      </span>
                    ) : (
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 12,
                          fontWeight: 600,
                          padding: '2px 10px',
                          borderRadius: 10,
                          backgroundColor: 'rgba(107, 114, 128, 0.12)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        Uncategorized
                      </span>
                    )}
                  </Td>
                  <Td style={{ textAlign: 'right', fontWeight: 600, color: isPositive ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }}>
                    {isPositive ? '+' : ''}{formatCurrency(tx.amount)}
                  </Td>
                  <Td>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 10,
                        textTransform: 'capitalize',
                        backgroundColor: tx.status === 'cleared' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(107, 114, 128, 0.12)',
                        color: tx.status === 'cleared' ? 'var(--color-accent-green)' : 'var(--color-text-secondary)',
                      }}
                    >
                      {tx.status}
                    </span>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            Page {page + 1} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                backgroundColor: page === 0 ? 'var(--color-bg)' : 'var(--color-bg-card)',
                color: page === 0 ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                fontSize: 13,
                fontWeight: 500,
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                opacity: page === 0 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                backgroundColor: page >= totalPages - 1 ? 'var(--color-bg)' : 'var(--color-bg-card)',
                color: page >= totalPages - 1 ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                fontSize: 13,
                fontWeight: 500,
                cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
                opacity: page >= totalPages - 1 ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Th({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <th
      style={{
        textAlign: 'left',
        padding: '12px 16px',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        ...style,
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td
      style={{
        padding: '12px 16px',
        color: 'var(--color-text-primary)',
        ...style,
      }}
    >
      {children}
    </td>
  );
}