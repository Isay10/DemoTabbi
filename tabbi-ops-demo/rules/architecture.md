# Architecture Rules

- Keep business logic outside UI components.
- Domain rules belong in `src/domain`.
- Redux slices and selectors belong in `src/features`.
- Store and typed hooks belong in `src/app`.
- Screens orchestrate data, actions and navigation.
- Components should remain presentational where possible.
- Derived calculations belong in selectors or pure helpers.
- Mock data must be replaceable by API later.
- AI insights must go through a local service/contract layer.
- Do not add backend code.
- Do not add provider integrations.
