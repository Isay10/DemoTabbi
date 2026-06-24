# 02_TECH_SPEC.md — Technical Specification

## Stack

Required:

- Expo
- React Native
- TypeScript
- Redux Toolkit
- React Redux
- Reselect / createSelector
- Mock data

Navigation can use Expo Router or React Navigation. Choose the simplest stable option.

## Why Expo

Expo accelerates setup and testing. The MVP does not need native custom modules, development builds, EAS build or store publication. Expo Go is enough.

## Why Redux Toolkit

The app has shared state across tables, orders, products, filters and insights. Woki already used Redux Toolkit and selectors, so this is a coherent reuse of existing patterns.

## State policy

Global state:

- Tables
- Orders
- Products
- UI filters

Derived through selectors:

- Filtered tables
- Table total
- Pending kitchen items
- Occupied count
- Sector occupancy
- Operational insights

Local state:

- Input draft values
- Modal open/closed
- Screen-only toggles

## Folder structure

```txt
src/
  app/
    store.ts
    hooks.ts
  domain/
    types.ts
    mockData.ts
    tableRules.ts
    orderRules.ts
    time.ts
    money.ts
  features/
    tables/
      tablesSlice.ts
      tableSelectors.ts
    orders/
      ordersSlice.ts
      orderSelectors.ts
    products/
      productsSlice.ts
      productSelectors.ts
    ui/
      uiSlice.ts
      uiSelectors.ts
    insights/
      insightService.ts
      insightSelectors.ts
  screens/
  components/
  navigation/
  theme/
```

## TypeScript rules

Avoid `any`, untyped payloads, repeated string literals and large implicit objects.

Prefer union types, typed payloads, pure helpers, narrow selectors and clear return types.

## Domain rules

The domain layer must not import React, React Native, Redux, navigation, components or theme.

Allowed: domain types, mock data, pure validation rules, money helpers and time helpers.

## Redux rules

Slices own state mutation. Selectors own derived data. Components should not calculate totals, pending kitchen items, occupancy rates or insights.

## UI rules

Use React Native primitives: View, Text, Pressable, FlatList, ScrollView, TextInput and Modal.

Do not use div, span, CSS files, SCSS Modules, DOM APIs, Ant Design or CSS Grid.

## AI-ready architecture

Production direction:

```txt
React Native app -> Backend API -> AI provider -> Backend API -> React Native app
```

Demo direction:

```txt
React Native app -> MockAiInsightService -> rule-based insights
```

Never call OpenAI, Gemini or any external AI provider from the mobile app.

## Performance rules

Use FlatList, stable keys, createSelector and helpers outside render. Memoize only when useful. Do not prematurely optimize.

## Dependency rule

Before adding any dependency, ask:

1. Is this needed for the MVP?
2. Is this Expo Go-compatible?
3. Is it defendable in an interview?
4. Can React Native/Expo already solve it?
5. Does it increase scope?
