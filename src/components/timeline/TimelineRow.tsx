// One table row: fixed label + a slot per business hour. No independent scroll.

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { RestaurantTable, TableStatus } from "../../domain/types";
import { TimelineSlot } from "./TimelineSlot";
import { colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

export const LABEL_WIDTH = 72;
export const SLOT_CELL = 56 + spacing.xs; // slot width + right margin, for header alignment

type Props = {
  table: RestaurantTable;
  slots: number[];
  currentHour: number;
  onPress: () => void;
};

export function TimelineRow({ table, slots, currentHour, onPress }: Props) {
  const openedAtHour = table.openedAt ? new Date(table.openedAt).getHours() : null;

  const slotStatus = (slot: number): TableStatus | null => {
    // Future hours: only reserved tables may appear (an upcoming reservation).
    // Open/closed tables can never extend past the current hour.
    if (slot > currentHour) {
      return table.status === "reserved" ? "reserved" : null;
    }
    // Current/past hours: open or closed tables, from the hour they were opened.
    if (table.status === "available" || table.status === "reserved") return null;
    if (openedAtHour === null) return null;
    return slot >= openedAtHour ? table.status : null;
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label} numberOfLines={1}>
        {table.name}
      </Text>
      {slots.map((slot) => (
        <TimelineSlot
          key={slot}
          status={slotStatus(slot)}
          isCurrentHour={slot === currentHour}
          onPress={onPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  label: {
    width: LABEL_WIDTH,
    paddingRight: spacing.sm,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
});
