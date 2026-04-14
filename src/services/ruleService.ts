import type { CategorizationRule } from '../types/category';
import { getAllRules as dbGetAll, addRule as dbAdd, updateRule as dbUpdate, deleteRule as dbDelete } from '../db';
import { v4 as uuidv4 } from 'uuid';

export async function getRules(): Promise<CategorizationRule[]> {
  const rules = await dbGetAll();
  return rules.sort((a, b) => a.priority - b.priority);
}

export async function createRule(rule: Omit<CategorizationRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<CategorizationRule> {
  const now = new Date().toISOString();
  const newRule: CategorizationRule = {
    ...rule,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  await dbAdd(newRule);
  return newRule;
}

export async function updateRule(rule: CategorizationRule): Promise<void> {
  rule.updatedAt = new Date().toISOString();
  await dbUpdate(rule);
}

export async function removeRule(id: string): Promise<void> {
  await dbDelete(id);
}

export async function reorderRule(id: string, newPriority: number): Promise<void> {
  const rules = await dbGetAll();
  const rule = rules.find(r => r.id === id);
  if (!rule) throw new Error('Rule not found');
  rule.priority = newPriority;
  rule.updatedAt = new Date().toISOString();
  await dbUpdate(rule);
}