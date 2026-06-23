// Floor view: header, search, sector/status filters, table card grid.

import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import type { RestaurantTable } from "../domain/types";
import { mockSectors } from "../domain/mockData";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectFilteredTables, selectTableTotal, selectPendingKitchenItems } from "../features/tables/tableSelectors";
import { selectSearchQuery, selectSectorFilter, selectStatusFilter } from "../features/ui/uiSelectors";
import { setSearchQuery, setSectorFilter, setStatusFilter } from "../features/ui/uiSlice";

import { AppHeader } from "../components/common/AppHeader";
import { SearchInput } from "../components/common/SearchInput";
import { EmptyState } from "../components/common/EmptyState";
import { SectorFilter } from "../components/tables/SectorFilter";
import { StatusFilter } from "../components/tables/StatusFilter";
import { TableCard } from "../components/tables/TableCard";

import { colors, spacing } from "../theme/tokens";

const sectorMap: Record<string, string> = Object.fromEntries(
  mockSectors.map((s) => [s.id, s.name])
);

function ConnectedTableCard({ table }: { table: RestaurantTable }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const total = useAppSelector((state) => selectTableTotal(state, table.id));
  const pending = useAppSelector((state) => selectPendingKitchenItems(state, table.id));

  return (
    <TableCard
      table={table}
      sectorName={sectorMap[table.sectorId] ?? ""}
      total={total}
      pendingItems={pending}
      onPress={() => navigation.navigate("TableDetail", { tableId: table.id })}
    />
  );
}

export function FloorScreen() {
  const dispatch = useAppDispatch();
  const tables = useAppSelector(selectFilteredTables);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sectorFilter = useAppSelector(selectSectorFilter);
  const statusFilter = useAppSelector(selectStatusFilter);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Mesas" />
      <SearchInput
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        placeholder="Buscar mesa"
      />
      <SectorFilter
        sectors={mockSectors}
        selected={sectorFilter}
        onSelect={(id) => dispatch(setSectorFilter(id))}
      />
      <StatusFilter
        selected={statusFilter}
        onSelect={(status) => dispatch(setStatusFilter(status))}
      />
      <FlatList
        data={tables}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <ConnectedTableCard table={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState message="No hay mesas para este filtro." />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   /*  flex: 1, */
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.sm,
    flexGrow: 1,
  },
});
