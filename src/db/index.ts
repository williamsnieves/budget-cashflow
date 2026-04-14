import { openDB, type IDBPDatabase } from 'idb';
import type { Transaction } from '../types/transaction';
import type { Category, CategorizationRule } from '../types/category';

const DB_NAME = 'forge-ledger';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase | null = null;

export async function getDb(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;
  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('transactions')) {
        const txStore = db.createObjectStore('transactions', { keyPath: 'id' });
        txStore.createIndex('date', 'date');
        txStore.createIndex('category', 'category');
        txStore.createIndex('status', 'status');
      }
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore('categories', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('rules')) {
        const ruleStore = db.createObjectStore('rules', { keyPath: 'id' });
        ruleStore.createIndex('priority', 'priority');
      }
      if (!db.objectStoreNames.contains('importSessions')) {
        db.createObjectStore('importSessions', { keyPath: 'id' });
      }
    },
  });
  return dbInstance;
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const db = await getDb();
  return db.getAll('transactions');
}

export async function addTransactions(transactions: Transaction[]): Promise<void> {
  const db = await getDb();
  const tx = db.transaction('transactions', 'readwrite');
  for (const t of transactions) {
    await tx.store.put(t);
  }
  await tx.done;
}

export async function updateTransaction(transaction: Transaction): Promise<void> {
  const db = await getDb();
  await db.put('transactions', transaction);
}

export async function getAllCategories(): Promise<Category[]> {
  const db = await getDb();
  return db.getAll('categories');
}

export async function addCategory(category: Category): Promise<void> {
  const db = await getDb();
  await db.put('categories', category);
}

export async function updateCategory(category: Category): Promise<void> {
  const db = await getDb();
  await db.put('categories', category);
}

export async function deleteCategory(id: string): Promise<void> {
  const db = await getDb();
  await db.delete('categories', id);
}

export async function getAllRules(): Promise<CategorizationRule[]> {
  const db = await getDb();
  return db.getAll('rules');
}

export async function addRule(rule: CategorizationRule): Promise<void> {
  const db = await getDb();
  await db.put('rules', rule);
}

export async function updateRule(rule: CategorizationRule): Promise<void> {
  const db = await getDb();
  await db.put('rules', rule);
}

export async function deleteRule(id: string): Promise<void> {
  const db = await getDb();
  await db.delete('rules', id);
}