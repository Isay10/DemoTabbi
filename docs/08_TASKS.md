# 08_TASKS.md — Implementation Tasks

## Current milestone

First commit: SDD + agents + guardrails.

Suggested commit:

```txt
chore: setup SDD docs and Claude agents
```

Required files:

```txt
CLAUDE.md
AGENTS.md
.claude/agents/*
.claude/rules/*
docs/00_PROJECT_CONTEXT.md
docs/01_PRODUCT_SPEC.md
docs/02_TECH_SPEC.md
docs/03_UI_STYLE_CONTEXT.md
docs/04_ARCHITECTURE.md
docs/05_DOMAIN_MODEL.md
docs/06_FEATURE_ROADMAP.md
docs/07_ACCEPTANCE_CRITERIA.md
docs/08_TASKS.md
docs/09_DECISIONS.md
docs/10_GUARDRAILS.md
docs/11_PROMPTS.md
docs/12_AGENT_WORKFLOW.md
```

Done when docs and agents are committed without app feature code.

## Commit 2 — Domain foundation

```txt
feat: add initial domain model and mock data
```

Tasks:

- [ ] Create `src/domain/types.ts`
- [ ] Create `src/domain/mockData.ts`
- [ ] Create `src/domain/tableRules.ts`
- [ ] Create `src/domain/orderRules.ts`
- [ ] Create `src/domain/time.ts`
- [ ] Create `src/domain/money.ts`
- [ ] Add sectors mock
- [ ] Add tables mock
- [ ] Add products mock
- [ ] Add initial orders mock
- [ ] Add validation rules
- [ ] Add money/time helpers

## Commit 3 — Redux foundation

```txt
feat: add Redux store, slices and selectors
```

Tasks:

- [ ] Create store and typed hooks
- [ ] Create tables/orders/products/ui slices
- [ ] Create selectors
- [ ] Wire provider

## Commit 4 — FloorScreen

```txt
feat: implement floor screen with filters
```

Tasks:

- [ ] Create tokens/commonStyles
- [ ] Create AppHeader, SearchInput, Chip, filters, StatusBadge, TableCard, EmptyState
- [ ] Create FloorScreen
- [ ] Render filtered tables
- [ ] Add search/filter interactions

## Commit 5 — TableDetailScreen

```txt
feat: implement table detail flow
```

Tasks:

- [ ] Show table info, order items and total
- [ ] Implement open/send/close/pay-free actions
- [ ] Add disabled states

## Commit 6 — ProductPickerScreen

```txt
feat: implement product picker
```

Tasks:

- [ ] Render products
- [ ] Add search/category filter
- [ ] Add product to order

## Commit 7 — AI insights

```txt
feat: add operational insights
```

Tasks:

- [ ] Create insight service/selectors
- [ ] Create AiInsightsScreen/InsightCard
- [ ] Generate rule-based insights

## Commit 8 — Timeline

```txt
feat: add simplified operational timeline
```

Tasks:

- [ ] Render rows, slots and status blocks
- [ ] Keep it mobile-friendly and no-drag

## Commit 9 — Polish

```txt
chore: polish demo presentation
```

Tasks:

- [ ] Review spacing/colors
- [ ] Add missing empty states
- [ ] Update README and demo speech
