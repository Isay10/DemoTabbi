// Centered empty-state message.

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../../theme/tokens";

type Props = {
  message: string;
};

export function EmptyState({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  text: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    textAlign: "center",
  },
});
