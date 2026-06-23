// Table selectors. Memoized derived data via createSelector.

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { RestaurantTable } from "../../domain/types";
import { calculateTotal } from "../../domain/money";
import {
  selectSearchQuery,
  selectSectorFilter,
  selectStatusFilter,
} from "../ui/uiSelectors";

const selectTablesState = (state: RootState) => state.tables;

const selectAllTables = createSelector([selectTablesState], (tables) =>
  tables.allIds.map((id) => tables.byId[id])
);

export const selectFilteredTables = createSelector(
  [selectAllTables, selectSectorFilter, selectStatusFilter, selectSearchQuery],
  (tables, sectorFilter, statusFilter, searchQuery): RestaurantTable[] => {
    const query = searchQuery.trim().toLowerCase();
    return tables.filter((table) => {
      if (sectorFilter && table.sectorId !== sectorFilter) return false;
      if (statusFilter && table.status !== statusFilter) return false;
      if (query && !table.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }
);

export const selectTableById = (
  state: RootState,
  id: string
): RestaurantTable | undefined => state.tables.byId[id];

export const selectTableTotal = (state: RootState, tableId: string): number => {
  const table = state.tables.byId[tableId];
  if (!table || !table.orderId) return 0;
  const order = state.orders.byId[table.orderId];
  if (!order) return 0;
  return calculateTotal(order.items);
};

export const selectPendingKitchenItems = (
  state: RootState,
  tableId: string
): number => {
  const table = state.tables.byId[tableId];
  if (!table || !table.orderId) return 0;
  const order = state.orders.byId[table.orderId];
  if (!order) return 0;
  return order.items.filter((i) => !i.sentToKitchen).length;
};
