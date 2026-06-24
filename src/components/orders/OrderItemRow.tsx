// Read-only order line: name, qty × unit price, line total.

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { OrderItem } from "../../domain/types";
import { formatMoney } from "../../domain/money";
import { colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

type Props = {
  item: OrderItem;
};

export function OrderItemRow({ item }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>
          {item.quantity} × {formatMoney(item.unitPrice)}
        </Text>
      </View>
      <Text style={styles.lineTotal}>{formatMoney(item.unitPrice * item.quantity)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  left: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  detail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lineTotal: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
});
