// Insight selectors. Memoized — recomputes only when tables or orders change.
//
// AI-READY NOTE:
// When migrating to real AI, this selector becomes a bridge to an async thunk.
// Keep the same Insight[] return shape so InsightCard and AiInsightsScreen need no changes.

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Insight } from "./insightTypes";
import { generateRuleBasedInsights } from "./insightService";

const selectTablesState = (state: RootState) => state.tables;
const selectOrdersState = (state: RootState) => state.orders;

export const selectInsights = createSelector(
  [selectTablesState, selectOrdersState],
  (tables, orders): Insight[] => {
    const tableList = tables.allIds.map((id) => tables.byId[id]);
    const orderList = orders.allIds.map((id) => orders.byId[id]);
    return generateRuleBasedInsights(tableList, orderList);
  }
);
