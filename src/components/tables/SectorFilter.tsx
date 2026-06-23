// Horizontal sector chips. "Todos" = null selection.

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { Sector } from "../../domain/types";
import { Chip } from "../common/Chip";
import { spacing } from "../../theme/tokens";

type Props = {
  sectors: Sector[];
  selected: string | null;
  onSelect: (id: string | null) => void;
};

export function SectorFilter({ sectors, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Chip label="Todos" selected={selected === null} onPress={() => onSelect(null)} />
      {sectors.map((sector) => (
        <Chip
          key={sector.id}
          label={sector.name}
          selected={selected === sector.id}
          onPress={() => onSelect(sector.id)}
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
