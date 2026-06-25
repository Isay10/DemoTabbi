# AGENTS.md — Tabbi Ops Demo

## Default workflow

1. Read project context.
2. Check guardrails.
3. Identify feature scope.
4. Update docs before code if the feature changes architecture.
5. Implement smallest useful vertical slice.
6. Run typecheck.
7. Update TASKS and DECISIONS if needed.

## Available project agents

- product-owner: validates feature scope and MVP value.
- rn-architect: reviews React Native structure and navigation.
- domain-modeler: owns types, mock data, business rules.
- redux-state-agent: owns slices, selectors and derived state.
- ui-ux-agent: owns visual consistency with Tabbi-style mobile POS UX.
- qa-reviewer: checks acceptance criteria, edge cases and regressions.
- feature-implementer: implements scoped vertical slices.
- test-engineer: writes/maintains Jest tests for pure logic (domain, reducers, selectors, insights).