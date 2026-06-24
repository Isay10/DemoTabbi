// Product selectors.

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectProductsState = (state: RootState) => state.products;

export const selectAllProducts = createSelector(
  [selectProductsState],
  (products) => products.allIds.map((id) => products.byId[id])
);
