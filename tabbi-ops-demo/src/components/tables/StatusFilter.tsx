// Horizontal status chips: Todos / Libre / Reservada / En uso / Cerrada.

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { TableStatus } from "../../domain/types";
import { Chip } from "../common/Chip";
import { spacing } from "../../theme/tokens";

type Props = {
  selected: TableStatus | null;
  onSelect: (status: TableStatus | null) => void;
};

const options: { label: string; value: TableStatus | null }[] = [
  { label: "Todos", value: null },
  { label: "Libre", value: "available" },
  { label: "Reservada", value: "reserved" },
  { label: "En uso", value: "in_use" },
  { label: "Cerrada", value: "closed" },
];

export function StatusFilter({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => (
        <Chip
          key={option.label}
          label={option.label}
          selected={selected === option.value}
          onPress={() => onSelect(option.value)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
});
