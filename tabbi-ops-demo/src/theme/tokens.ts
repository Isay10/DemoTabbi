// Design tokens. Exact values from docs/03_UI_STYLE_CONTEXT.md.

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
export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;
