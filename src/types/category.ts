export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategorizationRule {
  id: string;
  name: string;
  matchType: 'contains' | 'startsWith' | 'regex';
  pattern: string;
  categoryId: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}