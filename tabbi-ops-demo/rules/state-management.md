# State Management Rules

- Use Redux Toolkit for shared app state.
- Use typed hooks.
- Use createSelector for derived data.
- Do not store derived totals if selectors can compute them.
- Keep filters in uiSlice.
- Keep tables in tablesSlice.
- Keep orders in ordersSlice.
- Keep products in productsSlice.
- Keep AI insights derived from state/service.
- Do not calculate business totals inside components.
