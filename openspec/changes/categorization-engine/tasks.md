# Tasks

## 1. Data Layer
- [ ] 1.1 Define Category and CategorizationRule type interfaces
- [ ] 1.2 Create default categories seed data
- [ ] 1.3 Implement categoryService with CRUD operations
- [ ] 1.4 Implement ruleService with CRUD operations and priority ordering
- [ ] 1.5 Initialize default categories on first app load

## 2. Categorization Engine
- [ ] 2.1 Implement rule matching logic (contains, startsWith, regex)
- [ ] 2.2 Implement priority-ordered rule evaluation
- [ ] 2.3 Implement first-match-wins resolution
- [ ] 2.4 Add regex validation for rule creation
- [ ] 2.5 Handle override tracking (categorySource: auto/manual)
- [ ] 2.6 Integrate engine with transaction import flow

## 3. Category Management UI
- [ ] 3.1 Build CategoriesPage layout
- [ ] 3.2 Build CategoryList component (list with transaction counts)
- [ ] 3.3 Build CategoryForm component (add/edit modal)
- [ ] 3.4 Build CategoryMergeDialog component
- [ ] 3.5 Implement category deletion with reassignment prompt
- [ ] 3.6 Add sidebar navigation entry for Categories

## 4. Rule Management UI
- [ ] 4.1 Build RuleList component (priority-ordered)
- [ ] 4.2 Build RuleForm with match type selector (contains/startsWith/regex)
- [ ] 4.3 Implement pattern input with regex validation feedback
- [ ] 4.4 Add rule priority reordering (drag or up/down buttons)
- [ ] 4.5 Implement rule toggle (active/inactive)
- [ ] 4.6 Add conflict detection and warning display

## 5. Manual Override
- [ ] 5.1 Add category dropdown on transaction rows
- [ ] 5.2 Implement override with categorySource tracking
- [ ] 5.3 Implement revert-to-auto action
- [ ] 5.4 Bulk selection UI for uncategorized transactions

## 6. Bulk Categorization
- [ ] 6.1 Build BulkCategorizePanel component
- [ ] 6.2 "Categorize All" action that runs engine on uncategorized
- [ ] 6.3 Bulk assign by selection with category dropdown
- [ ] 6.4 Progress indicator for large bulk operations

## 7. Testing
- [ ] 7.1 Unit tests for rule matching (contains, startsWith, regex)
- [ ] 7.2 Unit tests for priority ordering and conflict resolution
- [ ] 7.3 Unit tests for override tracking (manual overrides preserved)
- [ ] 7.4 Unit tests for category CRUD (add, rename, merge, delete)
- [ ] 7.5 Integration tests for full categorization flow