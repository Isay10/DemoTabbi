// Orange top bar with white title. Safe-area aware via padding (no library).

import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

type Props = {
  title: string;
  rightIcon?: React.ReactNode;
  onBack?: () => void;
};

export function AppHeader({ title, rightIcon, onBack }: Props) {
  return (
    <View style={styles.container}>
      {onBack ? (
        <Pressable style={styles.back} onPress={onBack} hitSlop={8}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {rightIcon ? <View style={styles.right}>{rightIcon}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "ios" ? 64 : 44,
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
  back: {
    position: "absolute",
    left: spacing.lg,
    bottom: spacing.md,
  },
  backText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
});
