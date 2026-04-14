import type { Transaction } from '../types/transaction';
import type { CategorizationRule } from '../types/category';
import { getRules } from './ruleService';

export function matchRule(description: string, rule: CategorizationRule): boolean {
  switch (rule.matchType) {
    case 'contains':
      return description.toLowerCase().includes(rule.pattern.toLowerCase());
    case 'startsWith':
      return description.toLowerCase().startsWith(rule.pattern.toLowerCase());
    case 'regex':
      try {
        return new RegExp(rule.pattern, 'i').test(description);
      } catch {
        return false;
      }
    default:
      return false;
  }
}

export async function categorizeTransaction(transaction: Transaction): Promise<Transaction> {
  if (transaction.categorySource === 'manual') return transaction;
  const rules = await getRules();
  const activeRules = rules.filter(r => r.isActive);
  for (const rule of activeRules) {
    if (matchRule(transaction.description, rule)) {
      return {
        ...transaction,
        category: rule.categoryId,
        categorySource: 'auto',
        categorizedAt: new Date().toISOString(),
      };
    }
  }
  return transaction;
}

export async function categorizeTransactions(transactions: Transaction[]): Promise<Transaction[]> {
  const rules = await getRules();
  const activeRules = rules.filter(r => r.isActive);
  return transactions.map(transaction => {
    if (transaction.categorySource === 'manual') return transaction;
    for (const rule of activeRules) {
      if (matchRule(transaction.description, rule)) {
        return {
          ...transaction,
          category: rule.categoryId,
          categorySource: 'auto' as const,
          categorizedAt: new Date().toISOString(),
        };
      }
    }
    return transaction;
  });
}

export function categorizeTransactionsSync(transactions: Transaction[], rules: CategorizationRule[]): Transaction[] {
  const activeRules = rules.filter(r => r.isActive).sort((a, b) => a.priority - b.priority);
  return transactions.map(transaction => {
    if (transaction.categorySource === 'manual') return transaction;
    for (const rule of activeRules) {
      if (matchRule(transaction.description, rule)) {
        return {
          ...transaction,
          category: rule.categoryId,
          categorySource: 'auto' as const,
          categorizedAt: new Date().toISOString(),
        };
      }
    }
    return transaction;
  });
}