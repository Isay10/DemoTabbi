import {
  selectFilteredTables,
  selectTableTotal,
  selectPendingKitchenItems,
} from "./tableSelectors";
import type { RootState } from "../../app/store";
import type { RestaurantTable, Order } from "../../domain/types";

const t = (over: Partial<RestaurantTable>): RestaurantTable => ({
  id: "t1",
  sectorId: "s1",
  number: 1,
  name: "Mesa 1",
  capacity: { min: 1, max: 4 },
  status: "available",
  sortOrder: 1,
  ...over,
});

const tables: RestaurantTable[] = [
  t({ id: "t1", name: "Mesa 1", sectorId: "s1", status: "available" }),
  t({ id: "t2", name: "Mesa 2", sectorId: "s1", status: "in_use", orderId: "o1" }),
  t({ id: "t3", name: "Barra 1", sectorId: "s2", status: "closed" }),
];

const orders: Record<string, Order> = {
  o1: {
    id: "o1",
    tableId: "t2",
    status: "draft",
    createdAt: "",
    updatedAt: "",
    items: [
      { id: "oi1", productId: "p1", name: "Café", quantity: 2, unitPrice: 300, sentToKitchen: false },
      { id: "oi2", productId: "p2", name: "Té", quantity: 1, unitPrice: 280, sentToKitchen: true },
    ],
  },
};

const buildState = (
  ui: { searchQuery: string; sectorFilter: string | null; statusFilter: RestaurantTable["status"] | null }
): RootState =>
  ({
    tables: {
      byId: Object.fromEntries(tables.map((x) => [x.id, x])),
      allIds: tables.map((x) => x.id),
    },
    orders: { byId: orders, allIds: Object.keys(orders) },
    ui,
  } as unknown as RootState);

const noFilter = { searchQuery: "", sectorFilter: null, statusFilter: null };

describe("selectFilteredTables", () => {
  it("returns all tables when no filter is set", () => {
    expect(selectFilteredTables(buildState(noFilter))).toHaveLength(3);
  });

  it("filters by sector", () => {
    const res = selectFilteredTables(buildState({ ...noFilter, sectorFilter: "s2" }));
    expect(res.map((x) => x.id)).toEqual(["t3"]);
  });

  it("filters by status", () => {
    const res = selectFilteredTables(buildState({ ...noFilter, statusFilter: "in_use" }));
    expect(res.map((x) => x.id)).toEqual(["t2"]);
  });

  it("filters by search query (case-insensitive) and combines with sector", () => {
    const res = selectFilteredTables(
      buildState({ searchQuery: "barra", sectorFilter: "s2", statusFilter: null })
    );
    expect(res.map((x) => x.id)).toEqual(["t3"]);
  });
});

describe("selectTableTotal", () => {
  it("sums the table's order items", () => {
    expect(selectTableTotal(buildState(noFilter), "t2")).toBe(880);
  });
  it("returns 0 for a table without an order", () => {
    expect(selectTableTotal(buildState(noFilter), "t1")).toBe(0);
  });
});

describe("selectPendingKitchenItems", () => {
  it("counts items not yet sent to kitchen", () => {
    expect(selectPendingKitchenItems(buildState(noFilter), "t2")).toBe(1);
  });
  it("returns 0 for a table without an order", () => {
    expect(selectPendingKitchenItems(buildState(noFilter), "t1")).toBe(0);
  });
});
