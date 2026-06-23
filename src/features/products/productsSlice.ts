// Products slice. Read-only catalog seeded from mockData. No actions yet.

import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../domain/types";
import { mockProducts } from "../../domain/mockData";

type ProductsState = {
  byId: Record<string, Product>;
  allIds: string[];
};

const initialState: ProductsState = {
  byId: Object.fromEntries(mockProducts.map((p) => [p.id, p])),
  allIds: mockProducts.map((p) => p.id),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
