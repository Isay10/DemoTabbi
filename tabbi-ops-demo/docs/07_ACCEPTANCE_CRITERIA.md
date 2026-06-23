# 07_ACCEPTANCE_CRITERIA.md — Acceptance Criteria

## Global

The MVP is acceptable when:

- App runs in Expo.
- App is TypeScript.
- App uses React Native primitives.
- Domain types are clear.
- Redux Toolkit manages shared state.
- Derived data is calculated through selectors/helpers.
- Business logic is not embedded in UI components.
- UI feels like a mobile restaurant POS/operations tool.
- Core flow works from table to payment/freeing.
- There is a clear explanation of Woki reuse and discarded scope.

## FloorScreen

Must show tables with number/name, sector, status, current total, party size, waiter, pending kitchen items and elapsed time when available.

Must allow sector filter, status filter, search and navigation to TableDetailScreen.

Must show empty state when no table matches.

Forbidden: hardcoded unrelated UI, missing status color, desktop layout, floor editor.

## TableDetailScreen

Must show table data, order items and total.

Must allow valid open, add product, send command, close and pay/free actions.

Must block invalid actions:

- Open table already in use
- Open over max capacity
- Close without items
- Pay/free table not closed

## ProductPickerScreen

Must show products from state, search, category filter and add product to active order. Adding a repeated product increments quantity. Total updates through selectors.

## TimelineScreen

Must show tables as rows, time slots, status colors and mobile-friendly layout.

Must not include drag, resize, context menu, scrubber, advanced zoom or DOM/pointer logic.

## AiInsightsScreen

Must generate insights from current app state.

Must detect some of:

- Long-open tables
- Closed tables pending payment
- Pending kitchen items
- Highly occupied sectors
- Shift summary

Must not call a real AI provider, include API keys, show chatbot-first UI or hardcode unrelated static insights.

## Domain

Must export clear types, validation result, table/order rules, money/time helpers. Must avoid React, Redux and UI imports.

## Redux

Must include typed hooks, slices and selectors for filtered tables, table totals, pending kitchen items, closed tables, occupied count, sector occupancy and operational insights.

## UI

Must use orange primary, light background, white cards, chips, large rounded buttons, status colors, visible totals and clear Spanish copy.

Must not use violet as brand, dark default, desktop layout, tiny touch targets or hidden primary actions.

## Final demo path

1. Open app.
2. See tables.
3. Filter/search table.
4. Open table detail.
5. Add product.
6. Send command.
7. Close table.
8. Pay/free table.
9. Open insights.
10. Open timeline.
11. Explain Woki reuse and discarded scope.
