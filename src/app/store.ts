// Redux store configuration with typed dispatch/state.

import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "../features/tables/tablesSlice";
import ordersReducer from "../features/orders/ordersSlice";
import productsReducer from "../features/products/productsSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    tables: tablesReducer,
    orders: ordersReducer,
    products: productsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
