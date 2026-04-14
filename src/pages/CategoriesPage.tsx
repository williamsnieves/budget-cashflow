import { useState } from 'react';
import { useData } from '../context/DataContext';
import { deleteCategory } from '../db';
import { removeRule, updateRule } from '../services/ruleService';
import CategoryList from '../components/Categories/CategoryList';
import CategoryForm from '../components/Categories/CategoryForm';
import CategoryMergeDialog from '../components/Categories/CategoryMergeDialog';
import RuleList from '../components/Categories/RuleList';
import RuleForm from '../components/Categories/RuleForm';
import BulkCategorizePanel from '../components/Categories/BulkCategorizePanel';
import type { Category } from '../types/category';
import type { CategorizationRule } from '../types/category';

type Tab = 'categories' | 'rules' | 'bulk';

export default function CategoriesPage() {
  const { categories, rules, transactions, refreshData } = useData();
  const [activeTab, setActiveTab] = useState<Tab>('categories');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showRuleForm, setShowRuleForm] = useState(false);

  async function handleDeleteCategory(id: string) {
    await deleteCategory(id);
    await refreshData();
  }

  async function handleDeleteRule(id: string) {
    await removeRule(id);
    await refreshData();
  }

  async function handleToggleRule(rule: CategorizationRule) {
    await updateRule({ ...rule, isActive: !rule.isActive });
    await refreshData();
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'categories', label: 'Categories' },
    { key: 'rules', label: 'Rules' },
    { key: 'bulk', label: 'Bulk Categorize' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
      <div
        style={{
          display: 'flex',
          gap: 0,
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: 10,
          padding: 3,
          border: '1px solid var(--color-border)',
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === tab.key ? 'var(--color-bg-card)' : 'transparent',
              boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              color: activeTab === tab.key ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              fontWeight: activeTab === tab.key ? 600 : 500,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: 20,
        }}
      >
        {activeTab === 'categories' && (
          <>
            <CategoryList
              categories={categories}
              transactions={transactions}
              onEdit={cat => { setEditingCategory(cat); setShowCategoryForm(true); }}
              onAdd={() => { setEditingCategory(null); setShowCategoryForm(true); }}
              onDelete={handleDeleteCategory}
            />
            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => setShowMergeDialog(true)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-secondary)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Merge Categories
              </button>
            </div>
          </>
        )}

        {activeTab === 'rules' && (
          <RuleList
            rules={rules}
            categories={categories}
            onAdd={() => setShowRuleForm(true)}
            onDelete={handleDeleteRule}
            onToggle={handleToggleRule}
          />
        )}

        {activeTab === 'bulk' && <BulkCategorizePanel />}
      </div>

      {showCategoryForm && (
        <CategoryForm
          category={editingCategory}
          onClose={() => { setShowCategoryForm(false); setEditingCategory(null); }}
          onSaved={refreshData}
        />
      )}

      {showMergeDialog && (
        <CategoryMergeDialog
          categories={categories}
          onClose={() => setShowMergeDialog(false)}
          onMerged={refreshData}
        />
      )}

      {showRuleForm && (
        <RuleForm
          categories={categories}
          onClose={() => setShowRuleForm(false)}
          onSaved={refreshData}
        />
      )}
    </div>
  );
}