import tablesReducer, {
  openTable,
  closeTable,
  payAndFreeTable,
} from "./tablesSlice";
import { addItemToOrder } from "../orders/ordersSlice";
import type { RestaurantTable, Product } from "../../domain/types";

const baseTable = (over: Partial<RestaurantTable> = {}): RestaurantTable => ({
  id: "t1",
  sectorId: "s1",
  number: 1,
  name: "Mesa 1",
  capacity: { min: 1, max: 4 },
  status: "available",
  sortOrder: 1,
  ...over,
});

const stateWith = (table: RestaurantTable) => ({
  byId: { [table.id]: table },
  allIds: [table.id],
});

const product: Product = { id: "p1", name: "Café", category: "coffee", price: 300 };

describe("tablesSlice reducers", () => {
  it("openTable sets status in_use and records openedAt", () => {
    const next = tablesReducer(stateWith(baseTable()), openTable("t1"));
    expect(next.byId.t1.status).toBe("in_use");
    expect(typeof next.byId.t1.openedAt).toBe("string");
  });

  it("closeTable sets status closed", () => {
    const next = tablesReducer(
      stateWith(baseTable({ status: "in_use" })),
      closeTable("t1")
    );
    expect(next.byId.t1.status).toBe("closed");
  });

  it("payAndFreeTable resets to available and clears session fields", () => {
    const next = tablesReducer(
      stateWith(
        baseTable({
          status: "closed",
          openedAt: "2026-06-24T14:00:00.000Z",
          partySize: 4,
          waiterName: "Carlos",
          orderId: "o1",
        })
      ),
      payAndFreeTable("t1")
    );
    expect(next.byId.t1).toMatchObject({
      status: "available",
      openedAt: undefined,
      partySize: undefined,
      waiterName: undefined,
      orderId: undefined,
    });
  });

  it("links orderId when addItemToOrder fires and table has none", () => {
    const next = tablesReducer(
      stateWith(baseTable({ status: "in_use" })),
      addItemToOrder("t1", product)
    );
    expect(next.byId.t1.orderId).toBeDefined();
  });
});
