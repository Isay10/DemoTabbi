// Orders slice. Synchronous mock mutations — no thunks.

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderItem, Product } from "../../domain/types";
import { mockOrders } from "../../domain/mockData";

type OrdersState = {
  byId: Record<string, Order>;
  allIds: string[];
};

const initialState: OrdersState = {
  byId: Object.fromEntries(mockOrders.map((o) => [o.id, o])),
  allIds: mockOrders.map((o) => o.id),
};

function findOrderByTableId(state: OrdersState, tableId: string): Order | undefined {
  for (const id of state.allIds) {
    if (state.byId[id].tableId === tableId) return state.byId[id];
  }
  return undefined;
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addItemToOrder: {
      prepare(tableId: string, product: Product) {
        return { payload: { tableId, product, orderId: `ord-${Date.now()}` } };
      },
      reducer(
        state,
        action: PayloadAction<{ tableId: string; product: Product; orderId: string }>
      ) {
        const { tableId, product, orderId } = action.payload;
        const now = new Date().toISOString();
        let order = findOrderByTableId(state, tableId);

        if (!order) {
          order = {
            id: orderId,
            tableId,
            items: [],
            status: "draft",
            createdAt: now,
            updatedAt: now,
          };
          state.byId[orderId] = order;
          state.allIds.push(orderId);
        }

        const existingItem = order.items.find((i) => i.productId === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          const newItem: OrderItem = {
            id: `oi-${Date.now()}`,
            productId: product.id,
            name: product.name,
            quantity: 1,
            unitPrice: product.price,
            sentToKitchen: false,
          };
          order.items.push(newItem);
        }
        order.updatedAt = now;
      },
    },
    sendCommand(state, action: PayloadAction<{ tableId: string }>) {
      const order = findOrderByTableId(state, action.payload.tableId);
      if (!order) return;
      order.items.forEach((i) => {
        i.sentToKitchen = true;
      });
      order.status = "sent_to_kitchen";
      order.updatedAt = new Date().toISOString();
    },
    markAsPaid(state, action: PayloadAction<{ tableId: string }>) {
      const order = findOrderByTableId(state, action.payload.tableId);
      if (!order) return;
      order.status = "paid";
      order.updatedAt = new Date().toISOString();
    },
  },
});

export const { addItemToOrder, sendCommand, markAsPaid } = ordersSlice.actions;
export default ordersSlice.reducer;
