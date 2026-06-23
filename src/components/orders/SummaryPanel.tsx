// Order summary: "X productos · $Y.ZZZ". Fixed strip, white bg, top border.

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatMoney } from "../../domain/money";
import { colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

type Props = {
  total: number;
  itemCount: number;
};

export function SummaryPanel({ total, itemCount }: Props) {
  return (
    <View style={styles.panel}>
      <Text style={styles.count}>
        {itemCount} producto{itemCount === 1 ? "" : "s"}
      </Text>
      <Text style={styles.total}>{formatMoney(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  count: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  total: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
});
