# 04_ARCHITECTURE.md — Architecture

## Goal

Build a small but defendable React Native app with clear separation between domain model, business rules, state management, derived data, screens, presentational components, theme tokens and AI-ready service boundary.

## Layers

```txt
UI Components
  ↓
Screens
  ↓
Redux selectors/actions
  ↓
Redux slices
  ↓
Domain rules/helpers
  ↓
Mock data / future API
```

## Layer responsibilities

### Domain — `src/domain/`

Owns types, mock data, pure rules, time helpers, money helpers and operational validation. Must not import React, React Native, Redux, navigation, components or theme.

### App — `src/app/`

Owns store config and typed Redux hooks.

### Features — `src/features/`

Owns slices and selectors for tables, orders, products, ui and insights.

### Screens — `src/screens/`

Owns screen composition, data selection, dispatching actions and navigation. Screens should not contain business rules.

### Components — `src/components/`

Owns reusable presentational UI.

### Theme — `src/theme/`

Owns design tokens and common styles.

## Data flow

```txt
User action -> screen handler -> dispatch action -> reducer updates state -> selector derives data -> screen/component renders
```

## State shape

```ts
export type RootState = {
  tables: TablesState;
  orders: OrdersState;
  products: ProductsState;
  ui: UiState;
};
```

Recommended normalization:

```ts
export type TablesState = { byId: Record<string, RestaurantTable>; allIds: string[] };
export type OrdersState = { byId: Record<string, Order>; allIds: string[] };
export type ProductsState = { byId: Record<string, Product>; allIds: string[] };
```

## Derived data policy

Do not store derived values if they can be computed safely.

Selectors should calculate table total, pending kitchen items, occupied count, sector occupancy, filtered tables, closed tables and operational insights.

## Validation policy

Business validation should return structured results:

```ts
export type OperationalValidationResult =
  | { valid: true }
  | { valid: false; reason: "table_already_in_use" | "capacity_exceeded" | "target_table_not_available" | "empty_order" | "table_not_ready_to_bill" };
```

Screens convert reasons into user copy.

## AI service boundary

Demo:

```txt
React Native app -> MockAiInsightService -> generateRuleBasedInsights
```

Production:

```txt
React Native app -> Backend API -> AI provider -> Backend API -> React Native app
```

## Timeline architecture

TimelineScreen is read-only operational visualization. Reuse tables as rows, slots as columns, status blocks, time helpers and sector filters. Do not reuse Woki drag, resize, pointer events, context menu, zoom, scrubber or scroll sync.

## Dependency boundary

Allowed by default: Redux Toolkit, React Redux, navigation if needed, Expo built-ins, `@expo/vector-icons` if needed.

Not allowed by default: web UI libraries, drag libraries, CSS-in-JS for this MVP, AI SDKs in mobile, payment SDKs, printer SDKs.
