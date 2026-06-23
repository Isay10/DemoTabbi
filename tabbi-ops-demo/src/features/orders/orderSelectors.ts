// Order selectors.

import type { RootState } from "../../app/store";
import type { Order } from "../../domain/types";

export const selectOrderByTableId = (
  state: RootState,
  tableId: string
): Order | undefined => {
  // A table's current order is the one it points to. Once a table is freed,
  // its orderId is cleared, so the freed order no longer surfaces here.
  const table = state.tables.byId[tableId];
  if (!table || !table.orderId) return undefined;
  return state.orders.byId[table.orderId];
};
