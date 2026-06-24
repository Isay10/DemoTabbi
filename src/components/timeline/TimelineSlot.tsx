// Single timeline slot: filled rect colored by status. Current-hour slot is tappable.

import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import type { TableStatus } from "../../domain/types";
import { tableStatusColors, colors, spacing, radius } from "../../theme/tokens";

type Props = {
  status: TableStatus | null;
  isCurrentHour: boolean;
  onPress?: () => void;
};

export function TimelineSlot({ status, isCurrentHour, onPress }: Props) {
  const background = status ? tableStatusColors[status].background : colors.border;

  const slotStyle = [
    styles.slot,
    { backgroundColor: background },
    isCurrentHour && styles.current,
  ];

  if (onPress) {
    return <Pressable style={slotStyle} onPress={onPress} />;
  }
  return <View style={slotStyle} />;
}

const styles = StyleSheet.create({
  slot: {
    width: 56,
    height: 44,
    borderRadius: radius.sm,
    marginRight: spacing.xs,
  },
  current: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
