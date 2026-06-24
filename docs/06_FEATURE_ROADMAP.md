# 06_FEATURE_ROADMAP.md — Feature Roadmap

## Principle

Build vertical slices. Do not build infrastructure for future features before the current MVP path works.

## Phase 0 — SDD setup

Deliverables: `CLAUDE.md`, `AGENTS.md`, `.claude/agents/*`, `.claude/rules/*`, `docs/*`.

## Phase 1 — Base app setup

Expo + TypeScript app, base folders, theme tokens and placeholder navigation.

## Phase 2 — Domain model

Create `src/domain/types.ts`, `mockData.ts`, `tableRules.ts`, `orderRules.ts`, `time.ts`, `money.ts`.

## Phase 3 — Redux store

Create store, typed hooks, slices and initial selectors.

## Phase 4 — FloorScreen

First visual milestone: list/grid tables, search, sector filter, status filter, table cards and detail navigation.

## Phase 5 — TableDetailScreen

Core operational flow: show table, show order, total, open, send command, close, pay/free.

## Phase 6 — ProductPickerScreen

Product search, category filter and add-to-order flow.

## Phase 7 — TimelineScreen

Simple mobile-friendly timeline using rows, slots and status colors. No drag.

## Phase 8 — AI Insights

Rule-based operational insights behind a typed AI-ready service.

## Phase 9 — Polish

Empty states, consistent spacing, README, screenshots/video notes and demo speech.

## Absolute priority

1. FloorScreen
2. TableDetailScreen
3. Add product
4. Send kitchen command
5. Close/pay/free table
6. AI insights
7. Timeline
8. Transfer table
9. Quick sale
10. Discounts/surcharges

## Stop conditions

Stop expanding if core table flow is not working, TypeScript errors exist, UI is inconsistent, business logic is inside components or the feature cannot be defended in an interview.
