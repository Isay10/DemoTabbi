# 11_PROMPTS.md — Claude Code Prompts

## Prompt rules

Every prompt should include task, context files, scope, allowed files, forbidden files/actions and acceptance criteria.

Avoid: `Build the app.`

Prefer: `Create the initial domain model and mock data only.`

## Initial project scan

```txt
Read CLAUDE.md, AGENTS.md, docs/00_PROJECT_CONTEXT.md, docs/01_PRODUCT_SPEC.md, docs/02_TECH_SPEC.md and docs/10_GUARDRAILS.md.

Summarize the project goal, MVP scope, forbidden scope and first implementation milestone.

Do not edit files. Do not write code.
```

## Domain model foundation

```txt
Use the domain-modeler agent.

Read:
- docs/00_PROJECT_CONTEXT.md
- docs/01_PRODUCT_SPEC.md
- docs/04_ARCHITECTURE.md
- docs/05_DOMAIN_MODEL.md
- docs/10_GUARDRAILS.md

Task:
Create the initial domain model for Tabbi Ops Demo.

Create/edit only:
- src/domain/types.ts
- src/domain/mockData.ts
- src/domain/tableRules.ts
- src/domain/orderRules.ts
- src/domain/time.ts
- src/domain/money.ts

Forbidden:
Do not create screens, Redux store, React imports, React Native imports, Redux imports or dependencies.
```

## Redux foundation

```txt
Use the redux-state-agent agent.

Read docs/02_TECH_SPEC.md, docs/04_ARCHITECTURE.md, docs/05_DOMAIN_MODEL.md, docs/07_ACCEPTANCE_CRITERIA.md and docs/10_GUARDRAILS.md.

Create store, typed hooks, tables/orders/products/ui slices and selectors.

Forbidden: no UI screens, no navigation, no backend, no AI provider, no totals inside components.
```

## FloorScreen vertical slice

```txt
Use the feature-implementer agent. Consult ui-ux-agent.

Read docs/01_PRODUCT_SPEC.md, docs/03_UI_STYLE_CONTEXT.md, docs/04_ARCHITECTURE.md, docs/07_ACCEPTANCE_CRITERIA.md and docs/10_GUARDRAILS.md.

Implement FloorScreen with table cards, search, sector filter, status filter and empty state.

Forbidden: no TableDetail implementation, no drag, no floor editor, no violet brand, no web DOM/CSS patterns.
```

## TableDetailScreen vertical slice

```txt
Use feature-implementer. Consult domain-modeler and redux-state-agent if state changes are needed.

Implement table detail with table info, order items, total, open, send command, close and pay/free actions.

Forbidden: no real payment, no fiscal billing, no printer, no backend, no transfer unless explicitly asked.
```

## ProductPickerScreen

```txt
Use feature-implementer and ui-ux-agent.

Implement product search, category filter and add-to-order flow.

Forbidden: no inventory system, no barcode scanning, no payment functionality.
```

## AI insights

```txt
Use ai-insights-agent.

Implement rule-based operational insights behind typed service/selector structure.

Forbidden: no OpenAI/Gemini calls, no SDK, no API keys, no chatbot, no unrelated static insights.
```

## Simplified TimelineScreen

```txt
Use woki-adapter and feature-implementer.

Implement mobile-friendly operational timeline with rows, slots and status colors.

Forbidden: no drag, no resize, no pointer events, no context menu, no zoom, no Woki UI, no Ant Design, no SCSS.
```

## QA review

```txt
Use qa-reviewer.

Check type errors, scope creep, forbidden dependencies, business logic in components, missing criteria, UI style violations, Woki desktop behavior and AI provider calls/secrets.

Output pass/fail summary and suggested fixes. Do not implement fixes unless asked.
```
