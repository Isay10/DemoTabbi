# 03_UI_STYLE_CONTEXT.md — UI Style Context

## Goal

Build a credible React Native mobile demo that feels aligned with a restaurant POS/operations tool. Do not copy Tabbi pixel-perfect.

## Visual personality

The app should feel practical, operational, simple, clear, light, fast, tablet/POS-oriented and low-friction.

It should not feel like a social app, fintech dashboard, dark developer tool, generic SaaS landing page or decorative startup UI.

## UX priorities

1. Fast reading
2. Large touch targets
3. Visible statuses
4. Clear hierarchy
5. Low visual noise
6. Visible operational data
7. Simple semantic colors
8. Always-visible totals where relevant

## Tokens

```ts
export const colors = {
  primary: "#F5A400",
  primaryDark: "#D88900",
  primaryLight: "#FFF4D8",
  background: "#F5F6FA",
  surface: "#FFFFFF",
  surfaceMuted: "#F3F4F6",
  textPrimary: "#3F454A",
  textSecondary: "#7A7F85",
  textMuted: "#A0A4AA",
  textInverse: "#FFFFFF",
  border: "#E2E5EA",
  borderStrong: "#CDD2D8",
  divider: "#EEF0F3",
  success: "#48C774",
  warning: "#F5A400",
  danger: "#EF5350",
  info: "#3B82F6",
  disabled: "#DADDE2",
};

export const tableStatusColors = {
  available: { background: "#48C774", text: "#FFFFFF", soft: "#E6F8ED" },
  reserved: { background: "#F5A400", text: "#FFFFFF", soft: "#FFF4D8" },
  in_use: { background: "#3B82F6", text: "#FFFFFF", soft: "#EAF2FF" },
  closed: { background: "#EF5350", text: "#FFFFFF", soft: "#FDECEC" },
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 };
export const fontSize = { xs: 11, sm: 12, md: 14, lg: 16, xl: 20, xxl: 24 };
export const fontWeight = { regular: "400", medium: "500", semibold: "600", bold: "700" } as const;
```

## No violet as brand

Violet can appear in documentation as an annotation color. Do not use it for headers, buttons, navigation, product states or main accents.

## Components

Recommended:

- AppHeader
- SearchInput
- Chip
- SegmentedControl
- TableCard
- StatusBadge
- ProductCard
- OrderItemRow
- SummaryPanel
- PrimaryButton
- SecondaryButton
- IconButton
- EmptyState
- InsightCard
- PaymentOption
- QuantityStepper
- BottomSheetModal

## Screen UX

FloorScreen: orange top bar, search, sector filter, optional plan/list toggle, status filter and table cards.

TableDetailScreen: table info, products, total and bottom/prominent actions.

ProductPickerScreen: search, horizontal categories, product list and price visible.

TimelineScreen: mobile adaptation of Woki with slots, rows and colors. No drag.

AiInsightsScreen: operational panel with summary and severity cards. No chatbot.

## Copy

Use short Spanish operational labels:

- Mesas
- Agregar
- Enviar
- Cerrar mesa
- Cobrar
- Liberar mesa
- Facturar
- Resumen
- Cancelar
- Guardar
- Volver
- No hay productos cargados.
- No hay mesas para este filtro.
- No hay insights críticos por ahora.

## Do / Don't

Do: light UI, orange primary, status colors, large buttons, chips, FlatList, visible totals, readable operational hierarchy.

Don't: dark default, violet brand, desktop layout, drag & drop, tiny buttons, hidden totals, too many colors, chatbot AI.
