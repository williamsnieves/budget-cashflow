import type { Transaction } from '../types/transaction';
import { getAllTransactions, addTransactions, updateTransaction } from '../db';

export async function getTransactions(): Promise<Transaction[]> {
  return getAllTransactions();
}

export async function saveTransactions(transactions: Transaction[]): Promise<void> {
  await addTransactions(transactions);
}

export async function updateTransactionCategory(id: string, categoryId: string, source: 'auto' | 'manual'): Promise<void> {
  const transactions = await getAllTransactions();
  const tx = transactions.find(t => t.id === id);
  if (!tx) throw new Error('Transaction not found');
  tx.category = categoryId;
  tx.categorySource = source;
  tx.categorizedAt = new Date().toISOString();
  await updateTransaction(tx);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}