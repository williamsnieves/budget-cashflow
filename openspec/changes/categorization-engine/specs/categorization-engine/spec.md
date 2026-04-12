# Categorization Engine Specification

## Purpose

Define the behavior for automatically and manually categorizing transactions into financial categories using user-defined rules.

## Requirements

### Requirement: Default Categories

The system SHALL provide a default set of financial categories on initial setup.

#### Scenario: Initial category setup

- GIVEN a new user with no custom categories
- WHEN the application is initialized
- THEN the following default categories are created: Income, Housing, Food & Dining, Transportation, Utilities, Entertainment, Healthcare, Shopping, Personal, Other
- AND each category has a unique identifier, name, type (income/expense), and color code

#### Scenario: Category deletion restriction

- GIVEN default categories exist
- WHEN a user attempts to delete a category that has transactions assigned
- THEN the system prompts the user to reassign transactions to another category first
- AND the category is not deleted until all transactions are reassigned

### Requirement: Categorization Rules

The system SHALL support user-defined rules that automatically assign categories to transactions based on description matching.

#### Scenario: Create a contains rule

- GIVEN a user on the Categories page
- WHEN the user creates a rule: "If description contains 'STARBUCKS' → Food & Dining"
- THEN the rule is saved with a unique priority order
- AND all existing uncategorized transactions matching the rule are automatically categorized
- AND future imported transactions matching the rule are automatically categorized

#### Scenario: Create a starts-with rule

- GIVEN a user on the Categories page
- WHEN the user creates a rule: "If description starts with 'RENT' → Housing"
- THEN the rule is saved and applied to matching transactions

#### Scenario: Create a regex rule

- GIVEN a user on the Categories page
- WHEN the user creates a rule with regex pattern: "If description matches /^AMZN/ → Shopping"
- THEN the rule is validated for valid regex syntax before saving
- AND matching transactions are categorized accordingly

#### Scenario: Invalid regex pattern

- GIVEN a user creating a regex rule
- WHEN the user enters an invalid regex pattern
- THEN a validation error is shown indicating the pattern is invalid
- AND the rule is not saved

#### Scenario: Rule conflict resolution

- GIVEN multiple rules that could match the same transaction
- WHEN a transaction matches multiple rules
- THEN the rule with the highest priority (lowest priority number) wins
- AND the user is informed of the conflict with an option to reorder

#### Scenario: Delete a rule

- GIVEN an existing categorization rule
- WHEN the user deletes the rule
- THEN transactions previously categorized by this rule retain their current category
- AND the rule is removed from future evaluations

### Requirement: Manual Category Override

The system SHALL allow users to manually override auto-assigned categories on individual transactions.

#### Scenario: Override auto-assigned category

- GIVEN a transaction with an auto-assigned category (e.g., "Food & Dining")
- WHEN the user changes the category to a different one (e.g., "Entertainment")
- THEN the category is updated to the user's choice
- AND the transaction is marked as "manually overridden"
- AND future rule evaluations do not change this transaction's category

#### Scenario: Revert manual override

- GIVEN a transaction with a manually overridden category
- WHEN the user reverts the override
- THEN the category is reassigned by re-evaluating rules
- AND the "manually overridden" flag is removed

### Requirement: Bulk Categorization

The system SHALL support bulk category assignment for uncategorized transactions.

#### Scenario: Bulk categorize uncategorized transactions

- GIVEN there are uncategorized transactions in the system
- WHEN the user triggers "Categorize All" from the Categories page
- THEN all uncategorized transactions are evaluated against existing rules
- AND matching transactions are assigned their category
- AND unmatched transactions remain uncategorized

#### Scenario: Bulk assign by selection

- GIVEN the user has selected multiple uncategorized transactions
- WHEN the user chooses a category from a dropdown
- THEN all selected transactions are assigned the chosen category
- AND each transaction is marked as "manually assigned"

### Requirement: Category Management

The system SHALL allow users to manage categories (add, rename, merge, delete).

#### Scenario: Add a new category

- GIVEN a user on the Categories page
- WHEN the user adds a new category with name "Subscriptions", type "expense", and a color
- THEN the new category is created and available for rules and manual assignment

#### Scenario: Rename a category

- GIVEN an existing category named "Food & Dining"
- WHEN the user renames it to "Food & Groceries"
- THEN all transactions with the old category name are updated
- AND all rules referencing the old name are updated
- AND the category name is changed everywhere

#### Scenario: Merge two categories

- GIVEN categories "Dining Out" and "Restaurants"
- WHEN the user merges "Restaurants" into "Dining Out"
- THEN all transactions in "Restaurants" are reassigned to "Dining Out"
- AND all rules targeting "Restaurants" are updated to "Dining Out"
- AND "Restaurants" is deleted

#### Scenario: Delete an empty category

- GIVEN a category with zero transactions
- WHEN the user deletes it
- THEN the category is removed immediately
- AND all rules targeting this category are removed

## UI Reference

The Categorization Engine is accessible from the sidebar "Categories" navigation item as shown in **`docs/home.png`**. The sidebar includes:

- **Navigation items**: Dashboard, Transactions, Categories, Reports
- **CTA**: "New Invoice" button
- **Section header**: "Architectural Ledger (Freelancer Pro)"

The Categories page should follow the same visual style as the overall app:

- White cards with rounded corners (~12-16px) and soft shadows
- `#F5F7FA` background, `#0F172A` primary text
- `#22C55E` green accent for positive actions
- `#F87171` red accent for destructive actions
- `#E5E7EB` borders/dividers