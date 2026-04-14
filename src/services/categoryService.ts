import type { Category } from '../types/category';
import { getAllCategories as dbGetAll, addCategory as dbAdd, updateCategory as dbUpdate, deleteCategory as dbDelete } from '../db';
import { v4 as uuidv4 } from 'uuid';

export async function getCategories(): Promise<Category[]> {
  return dbGetAll();
}

export async function createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>): Promise<Category> {
  const now = new Date().toISOString();
  const newCategory: Category = {
    ...category,
    id: uuidv4(),
    isDefault: false,
    createdAt: now,
    updatedAt: now,
  };
  await dbAdd(newCategory);
  return newCategory;
}

export async function renameCategory(id: string, newName: string): Promise<void> {
  const categories = await dbGetAll();
  const category = categories.find(c => c.id === id);
  if (!category) throw new Error('Category not found');
  category.name = newName;
  category.updatedAt = new Date().toISOString();
  await dbUpdate(category);
}

export async function deleteCategoryWithReassign(id: string, reassignToId: string): Promise<void> {
  const { getAllTransactions, addTransactions } = await import('../db');
  const transactions = await getAllTransactions();
  const updated = transactions
    .filter(t => t.category === id || t.categorySource === 'auto')
    .map(t => t.category === id ? { ...t, category: reassignToId } : t);
  if (updated.length > 0) await addTransactions(updated);
  await dbDelete(id);
}

export async function mergeCategories(sourceId: string, targetId: string): Promise<void> {
  await deleteCategoryWithReassign(sourceId, targetId);
}