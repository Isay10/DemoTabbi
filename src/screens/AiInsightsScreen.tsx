// AI insights: operational panel (rule-based, no chatbot).

import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import type { Insight, InsightSeverity } from "../features/insights/insightTypes";
import { useAppSelector } from "../app/hooks";
import { selectInsights } from "../features/insights/insightSelectors";

import { AppHeader } from "../components/common/AppHeader";
import { EmptyState } from "../components/common/EmptyState";
import { InsightCard } from "../components/insights/InsightCard";

import { colors, spacing, fontSize, fontWeight } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "AiInsights">;

const severityOrder: Record<InsightSeverity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
};

export function AiInsightsScreen({ navigation }: Props) {
  const insights = useAppSelector(selectInsights);

  const sorted = [...insights].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  const counts = {
    critical: insights.filter((i) => i.severity === "critical").length,
    warning: insights.filter((i) => i.severity === "warning").length,
    info: insights.filter((i) => i.severity === "info").length,
  };

  const onPressInsight = (insight: Insight) => {
    if (insight.tableId) {
      navigation.navigate("TableDetail", { tableId: insight.tableId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Insights operacionales" onBack={() => navigation.goBack()} />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {counts.critical} críticos · {counts.warning} advertencias · {counts.info} informativos
        </Text>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InsightCard insight={item} onPress={() => onPressInsight(item)} />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState message="No hay insights críticos por ahora." />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  summary: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  summaryText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: spacing.sm,
    flexGrow: 1,
  },
});
