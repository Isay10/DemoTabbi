# 09_DECISIONS.md — Technical Decisions

## 1. Small MVP over full POS

Build a small restaurant operations demo, not a full POS. No fiscal billing, auth, printers, Mercado Pago, backend or full admin module.

## 2. Expo over React Native CLI

Use Expo because it accelerates setup and the MVP does not need native modules or development builds.

## 3. Mobile-first over Woki web port

Build mobile-first screens using React Native primitives. Do not port Ant Design, SCSS Modules, DOM events, pointer events or drag/resize interactions.

## 4. Redux Toolkit over Zustand/Context

Use Redux Toolkit because tables, orders, products, filters and insights are shared state, and Woki already used Redux Toolkit and selectors.

## 5. Mock data over backend

Use local mock data. Structure it so it can be replaced by an API later, but do not build the API now.

## 6. AI-ready mock over real provider

Use a mock AI-ready service with rule-based insights. Do not call providers from mobile or expose API keys.

## 7. Operational insights over chatbot

AI value should be operational: delayed tables, pending payment, pending kitchen items, occupancy and shift summary. Do not build a chatbot as the main AI feature.

## 8. Simplified timeline over Woki timeline port

Implement read-only timeline. Reuse rows, slots, statuses and time helpers. Do not implement drag, resize, context menus, zoom, scrubber or scroll sync.

## 9. Domain logic outside UI

Keep business rules in domain/helpers/slices/selectors. Components should not own business rules.

## 10. System fonts

Use React Native system fonts. Do not add font loading complexity.

## 11. Orange primary color

Use orange/amber as brand color. Do not use violet as primary brand.

## 12. Tests after foundation

Small tests can strengthen senior signal, but do not block the first visual milestone. Best targets: money helpers, table rules, selectors and insights.

## 13. Spanish UX copy

Use short Spanish operational labels because the demo context is restaurant operations in Spanish.

## 14. No premature polish

Build domain/store/screens first. Polish after the core table/order flow works.
