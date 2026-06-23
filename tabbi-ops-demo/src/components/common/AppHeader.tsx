// Orange top bar with white title. Safe-area aware via padding (no library).

import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

type Props = {
  title: string;
  rightIcon?: React.ReactNode;
};

export function AppHeader({ title, rightIcon }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {rightIcon ? <View style={styles.right}>{rightIcon}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "ios" ? 44 : 24,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.textInverse,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  right: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.md,
  },
});
