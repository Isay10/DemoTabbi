// UI slice. Filters and search state for FloorScreen.

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TableStatus } from "../../domain/types";

type UiState = {
  searchQuery: string;
  sectorFilter: string | null;
  statusFilter: TableStatus | null;
};

const initialState: UiState = {
  searchQuery: "",
  sectorFilter: null,
  statusFilter: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSectorFilter(state, action: PayloadAction<string | null>) {
      state.sectorFilter = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<TableStatus | null>) {
      state.statusFilter = action.payload;
    },
  },
});

export const { setSearchQuery, setSectorFilter, setStatusFilter } = uiSlice.actions;
export default uiSlice.reducer;
