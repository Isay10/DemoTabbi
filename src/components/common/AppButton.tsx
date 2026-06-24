// Action button. Variants: primary (orange), secondary (outline), danger (red).

import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "../../theme/tokens";

type Variant = "primary" | "secondary" | "danger";

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
};

export function AppButton({ label, onPress, variant = "primary", disabled = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variantStyles[variant],
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, variant === "secondary" ? styles.labelDark : styles.labelLight]}>
        {label}
      </Text>
    </Pressable>
  );
}

const variantStyles: Record<Variant, object> = {
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong },
  danger: { backgroundColor: colors.danger },
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderWidth: 0,
  },
  label: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  labelLight: {
    color: colors.textInverse,
  },
  labelDark: {
    color: colors.textPrimary,
  },
});
