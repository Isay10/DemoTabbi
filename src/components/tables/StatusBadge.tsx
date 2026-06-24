// Status dot + Spanish label.

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { TableStatus } from "../../domain/types";
import { tableStatusColors, colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

type Props = {
  status: TableStatus;
};

const labels: Record<TableStatus, string> = {
  available: "Libre",
  reserved: "Reservada",
  in_use: "En uso",
  closed: "Cerrada",
};

export function StatusBadge({ status }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: tableStatusColors[status].background }]} />
      <Text style={styles.label}>{labels[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
});
