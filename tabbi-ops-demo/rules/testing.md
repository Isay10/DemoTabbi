# Testing Rules

Prioritize pure logic tests: money calculations, table validation, order validation, selectors and insight generation.

Avoid early snapshot tests, broad E2E tests, layout-only tests and brittle implementation tests.

Useful first tests:

- Does not open occupied table.
- Does not exceed table capacity.
- Calculates order total correctly.
- Filters tables by sector/status.
- Detects closed table pending payment.
