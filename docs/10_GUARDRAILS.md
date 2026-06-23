# 10_GUARDRAILS.md — Guardrails

## Product guardrails

The app is a demo, not a production POS.

Do not build login/auth, roles, fiscal billing, invoices, payments, Mercado Pago, printers, backend, database, WebSockets, offline-first, push notifications, real-time sync, admin dashboard, floor editor, inventory system, CRM, reports or store publication.

If a request implies any of these, propose a smaller MVP-safe alternative.

## Woki guardrails

Allowed reuse:

- Table concept
- Sector concept
- Capacity validation
- Filtering/search
- Timeline slots
- Time helpers
- Memoized selector strategy
- Performance mindset

Forbidden reuse:

- Ant Design
- SCSS Modules
- CSS Grid
- DOM events
- Pointer events
- Drag & drop
- Resize handles
- Context menu
- Advanced zoom
- Scrubber
- Scroll sync
- Spring drag physics
- Desktop timeline layout

## React Native guardrails

Use View, Text, Pressable, FlatList, ScrollView, TextInput, Modal and StyleSheet.

Do not use div, span, className styling, document/window logic, DOM event APIs, pointer events, CSS files, SCSS Modules or web UI libraries.

## State guardrails

Use Redux Toolkit for shared app state. Use typed hooks and selectors for derived data. Do not store totals or filtered lists manually if selectors can compute them.

## Domain guardrails

Domain files must be pure and must not import React, React Native, Redux, navigation, components or theme.

## AI guardrails

Do not call real AI providers from React Native. Do not add AI SDKs or API keys. Do not make a chatbot the main AI feature. Use local mock service and rule-based insights.

## UI guardrails

Must use light background, white cards, orange primary, large rounded buttons, chips, status colors, visible totals and short Spanish operational copy.

Must avoid violet brand, dark default, tiny buttons, hidden actions, too many colors, decorative animations and fintech/SaaS visual language.

## Dependency guardrails

Before adding a dependency, answer:

1. Is it necessary for the MVP?
2. Is it Expo Go-compatible?
3. Is it defendable in an interview?
4. Can React Native/Expo solve this already?
5. Does it increase scope?

## Final guardrail

If a change does not improve the demo path or interview explanation, do not implement it.
