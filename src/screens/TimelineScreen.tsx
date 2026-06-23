// Read-only operational timeline: tables as rows, business-hour slots as columns.

import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import { mockSectors } from "../domain/mockData";
import { getBusinessSlots, formatSlotLabel, isWithinBusinessHours } from "../domain/time";

import { useAppSelector } from "../app/hooks";
import { AppHeader } from "../components/common/AppHeader";
import { EmptyState } from "../components/common/EmptyState";
import { SectorFilter } from "../components/tables/SectorFilter";
import { TimelineRow, LABEL_WIDTH, SLOT_CELL } from "../components/timeline/TimelineRow";

import { tableStatusColors, colors, spacing, radius, fontSize, fontWeight } from "../theme/tokens";

type Props = NativeStackScreenProps<RootStackParamList, "Timeline">;

const legendItems: { color: string; label: string }[] = [
  { color: tableStatusColors.available.background, label: "Libre" },
  { color: tableStatusColors.reserved.background, label: "Reservada" },
  { color: tableStatusColors.in_use.background, label: "En uso" },
  { color: tableStatusColors.closed.background, label: "Cerrada" },
];

export function TimelineScreen({ navigation }: Props) {
  const tables = useAppSelector((state) =>
    state.tables.allIds.map((id) => state.tables.byId[id])
  );

  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const slots = getBusinessSlots();
  const now = new Date();
  const currentHour = now.getHours();
  const open = isWithinBusinessHours(now);

  const visibleTables = selectedSector
    ? tables.filter((t) => t.sectorId === selectedSector)
    : tables;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Timeline operacional" onBack={() => navigation.goBack()} />
      <SectorFilter
        sectors={mockSectors}
        selected={selectedSector}
        onSelect={setSelectedSector}
      />

      {!open ? (
        <EmptyState message="El local está cerrado. Horario: 09:00 – 00:00" />
      ) : (
        <>
          <ScrollView style={styles.vertical} contentContainerStyle={styles.verticalContent}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.headerRow}>
                  <View style={styles.headerSpacer} />
                  {slots.map((hour) => (
                    <Text key={hour} style={styles.headerLabel}>
                      {formatSlotLabel(hour)}
                    </Text>
                  ))}
                </View>
                {visibleTables.map((table) => (
                  <TimelineRow
                    key={table.id}
                    table={table}
                    slots={slots}
                    currentHour={currentHour}
                    onPress={() => navigation.navigate("TableDetail", { tableId: table.id })}
                  />
                ))}
              </View>
            </ScrollView>
          </ScrollView>

          <View style={styles.legend}>
            {legendItems.map((item) => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  vertical: {
    flex: 1,
  },
  verticalContent: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  headerSpacer: {
    width: LABEL_WIDTH,
  },
  headerLabel: {
    width: SLOT_CELL,
    textAlign: "center",
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.lg,
    marginVertical: spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    marginRight: spacing.xs,
  },
  legendLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});
