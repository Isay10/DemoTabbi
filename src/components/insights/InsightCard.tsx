// Insight card: severity-colored left border, title, description, severity chip, optional table link.

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { Insight, InsightSeverity } from "../../features/insights/insightTypes";
import { Chip } from "../common/Chip";
import { card } from "../../theme/commonStyles";
import { colors, spacing, fontSize, fontWeight } from "../../theme/tokens";

type Props = {
  insight: Insight;
  onPress?: () => void;
};

const severityColors: Record<InsightSeverity, string> = {
  critical: colors.danger,
  warning: colors.warning,
  info: colors.info,
};

const severityLabels: Record<InsightSeverity, string> = {
  critical: "Crítico",
  warning: "Advertencia",
  info: "Info",
};

export function InsightCard({ insight, onPress }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: severityColors[insight.severity] }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{insight.title}</Text>
        <Chip label={severityLabels[insight.severity]} selected={false} onPress={() => {}} />
      </View>
      <Text style={styles.description}>{insight.description}</Text>
      {insight.tableId && onPress ? (
        <Pressable onPress={onPress} hitSlop={8}>
          <Text style={styles.link}>Ver mesa →</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...card,
    borderLeftWidth: 4,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  link: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
    marginTop: spacing.sm,
  },
});
