// Order selectors.

import type { RootState } from "../../app/store";
import type { Order } from "../../domain/types";

export const selectOrderByTableId = (
  state: RootState,
  tableId: string
): Order | undefined => {
  for (const id of state.orders.allIds) {
    if (state.orders.byId[id].tableId === tableId) return state.orders.byId[id];
  }
  return undefined;
};
