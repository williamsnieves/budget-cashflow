import type { Category } from '../types/category';
import { v4 as uuidv4 } from 'uuid';

const now = new Date().toISOString();

export const DEFAULT_CATEGORIES: Category[] = [
  { id: uuidv4(), name: 'Income', type: 'income', color: '#22C55E', icon: '💰', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Housing', type: 'expense', color: '#3B82F6', icon: '🏠', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Food & Dining', type: 'expense', color: '#F97316', icon: '🍽️', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Transportation', type: 'expense', color: '#8B5CF6', icon: '🚗', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Utilities', type: 'expense', color: '#EAB308', icon: '⚡', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Entertainment', type: 'expense', color: '#EC4899', icon: '🎭', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Healthcare', type: 'expense', color: '#EF4444', icon: '🏥', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Shopping', type: 'expense', color: '#14B8A6', icon: '🛍️', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Personal', type: 'expense', color: '#6366F1', icon: '👤', isDefault: true, createdAt: now, updatedAt: now },
  { id: uuidv4(), name: 'Other', type: 'expense', color: '#6B7280', icon: '📦', isDefault: true, createdAt: now, updatedAt: now },
];

export async function initializeDefaultCategories(): Promise<void> {
  const { getAllCategories, addCategory } = await import('../db');
  const existing = await getAllCategories();
  if (existing.length === 0) {
    for (const cat of DEFAULT_CATEGORIES) {
      await addCategory({ ...cat, id: uuidv4() });
    }
  }
}