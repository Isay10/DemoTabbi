// Table card: circle with number, chair stubs, name/sector, in_use info, status badge.

import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import type { RestaurantTable } from "../../domain/types";
import { formatElapsed } from "../../domain/time";
import { formatMoney } from "../../domain/money";
import { StatusBadge } from "./StatusBadge";
import { card } from "../../theme/commonStyles";
import {
  tableStatusColors,
  colors,
  spacing,
  fontSize,
  fontWeight,
} from "../../theme/tokens";

type Props = {
  table: RestaurantTable;
  sectorName: string;
  total: number;
  pendingItems: number;
  onPress: () => void;
};

export function TableCard({ table, sectorName, total, pendingItems, onPress }: Props) {
  const circleColor = tableStatusColors[table.status].background;
  const isInUse = table.status === "in_use";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.diagram}>
        <View style={[styles.chair, styles.chairTop]} />
        <View style={[styles.chair, styles.chairBottom]} />
        <View style={[styles.chairH, styles.chairLeft]} />
        <View style={[styles.chairH, styles.chairRight]} />
        <View style={[styles.circle, { backgroundColor: circleColor }]}>
          <Text style={styles.circleText}>{table.number}</Text>
        </View>
      </View>

      <Text style={styles.name}>{table.name}</Text>
      <Text style={styles.sector}>{sectorName}</Text>

      {isInUse && table.openedAt ? (
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{formatElapsed(table.openedAt)}</Text>
          <Text style={styles.metaTotal}>{formatMoney(total)}</Text>
        </View>
      ) : null}

      {pendingItems > 0 ? (
        <Text style={styles.pending}>{pendingItems} pendiente(s)</Text>
      ) : null}

      <View style={styles.badgeRow}>
        <StatusBadge status={table.status} />
      </View>
    </Pressable>
  );
}

const CIRCLE = 56;
const DIAGRAM = 100;

const styles = StyleSheet.create({
  card: {
    ...card,
    width: "48%",
    margin: spacing.xs,
    padding: spacing.md,
    alignItems: "center",
  },
  diagram: {
    width: DIAGRAM,
    height: DIAGRAM,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    color: colors.textInverse,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  chair: {
    position: "absolute",
    width: 14,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderStrong,
  },
  chairH: {
    position: "absolute",
    width: 6,
    height: 14,
    borderRadius: 3,
    backgroundColor: colors.borderStrong,
  },
  chairTop: { top: 12 },
  chairBottom: { bottom: 12 },
  chairLeft: { left: 12 },
  chairRight: { right: 12 },
  name: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  sector: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  metaTotal: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  pending: {
    fontSize: fontSize.xs,
    color: colors.warning,
    marginTop: spacing.xs,
  },
  badgeRow: {
    marginTop: spacing.sm,
  },
});
