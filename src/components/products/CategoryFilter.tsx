// Horizontal product category chips: Todos / Comida / Bebida / Café / Postre.

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Chip } from "../common/Chip";
import { spacing } from "../../theme/tokens";

type Props = {
  selected: string | null;
  onSelect: (cat: string | null) => void;
};

const options: { label: string; value: string | null }[] = [
  { label: "Todos", value: null },
  { label: "Comida", value: "food" },
  { label: "Bebida", value: "drink" },
  { label: "Café", value: "coffee" },
  { label: "Postre", value: "dessert" },
];

export function CategoryFilter({ selected, onSelect }: Props) {
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
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
});
