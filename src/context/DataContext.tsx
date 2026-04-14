/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Transaction } from '../types/transaction';
import type { Category, CategorizationRule } from '../types/category';
import { getAllTransactions, getAllCategories, getAllRules } from '../db';
import { initializeDefaultCategories } from '../services/defaultCategories';

interface DataContextType {
  transactions: Transaction[];
  categories: Category[];
  rules: CategorizationRule[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rules, setRules] = useState<CategorizationRule[]>([]);
  const [loading, setLoading] = useState(true);

  async function refreshData() {
    setLoading(true);
    try {
      await initializeDefaultCategories();
      const [txs, cats, rls] = await Promise.all([
        getAllTransactions(),
        getAllCategories(),
        getAllRules(),
      ]);
      setTransactions(txs);
      setCategories(cats);
      setRules(rls);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refreshData(); }, []);

  return (
    <DataContext.Provider value={{ transactions, categories, rules, loading, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}