// UI selectors. Plain field reads — no createSelector needed.

import type { RootState } from "../../app/store";

export const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
export const selectSectorFilter = (state: RootState) => state.ui.sectorFilter;
export const selectStatusFilter = (state: RootState) => state.ui.statusFilter;
