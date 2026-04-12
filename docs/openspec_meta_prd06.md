# META — PRD 06: Budget & Cashflow (Fintech)

## 0. Initial Setup (MANDATORY)

We will follow an OpenSpec-first approach.

- OpenSpec is already installed (latest version).
- All development must be driven by specs as the source of truth.
- No implementation should start without approved specs.

### OpenSpec Context

| Area | Description | Link |
|------|-------------|------|
| Concepts | Core model | https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md |
| Workflows | Operating patterns | https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md |
| Commands | AI workflow commands | https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md |
| CLI | Terminal commands | https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md |
| Supported Tools | Integrations | https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md |

---

## Product Overview

A fintech application to analyze income, expenses, and cash flow from transaction data.

## Goal

Help users understand financial health and spending.

## Users

- Freelancers
- Small businesses

## Use Cases

1. Import transactions
2. Categorize expenses
3. Visualize reports

## Scope

### In-Scope
- CSV import
- Categorization rules
- Dashboards

### Out-of-Scope
- Bank integrations

## Functional Requirements

- Import CSV
- Define rules
- Generate reports

## Non-Functional

- Numerical accuracy

## Flow

Import → Categorize → Analyze

## Edge Cases

- Malformed CSV

## Success Metrics

- Accurate totals

## Constraints

- Single currency

## Risks

- Parsing errors

---

# OpenSpec Implementation

## Phase 1: Specs

- Transaction Import
- Categorization Engine
- Reports
- Dashboard

## Phase 2: Explore

Use /explore

## Phase 3: Propose

Use /propose

## Phase 4: Apply

Use /apply

## Phase 5: Verify

Test correctness

## Phase 6: Archive

Use /archive

---

## Definition of Done

- Specs approved
- Implementation aligned
- Correct outputs
