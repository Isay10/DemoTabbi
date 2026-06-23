// Tables slice. Synchronous mock mutations — no thunks.

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RestaurantTable } from "../../domain/types";
import { mockTables } from "../../domain/mockData";
import { addItemToOrder } from "../orders/ordersSlice";

type TablesState = {
  byId: Record<string, RestaurantTable>;
  allIds: string[];
};

const initialState: TablesState = {
  byId: Object.fromEntries(mockTables.map((t) => [t.id, t])),
  allIds: mockTables.map((t) => t.id),
};

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    openTable(state, action: PayloadAction<string>) {
      const table = state.byId[action.payload];
      if (!table) return;
      table.status = "in_use";
      table.openedAt = new Date().toISOString();
    },
    closeTable(state, action: PayloadAction<string>) {
      const table = state.byId[action.payload];
      if (!table) return;
      table.status = "closed";
    },
    payAndFreeTable(state, action: PayloadAction<string>) {
      const table = state.byId[action.payload];
      if (!table) return;
      table.status = "available";
      table.openedAt = undefined;
      table.partySize = undefined;
      table.waiterName = undefined;
      table.orderId = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToOrder, (state, action) => {
      const table = state.byId[action.payload.tableId];
      if (table && !table.orderId) {
        table.orderId = action.payload.orderId;
      }
    });
  },
});

export const { openTable, closeTable, payAndFreeTable } = tablesSlice.actions;
export default tablesSlice.reducer;
