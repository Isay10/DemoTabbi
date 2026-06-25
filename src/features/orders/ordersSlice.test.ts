import ordersReducer, {
  addItemToOrder,
  sendCommand,
  markAsPaid,
} from "./ordersSlice";
import type { Product } from "../../domain/types";

const empty = () => ({ byId: {}, allIds: [] as string[] });
const product = (over: Partial<Product> = {}): Product => ({
  id: "p1",
  name: "Café",
  category: "coffee",
  price: 300,
  ...over,
});

describe("addItemToOrder", () => {
  it("creates a draft order with the item when none exists", () => {
    const next = ordersReducer(empty(), addItemToOrder("t1", product()));
    const order = next.byId[next.allIds[0]];
    expect(order.status).toBe("draft");
    expect(order.items).toHaveLength(1);
    expect(order.items[0]).toMatchObject({ productId: "p1", quantity: 1 });
  });

  it("increments quantity when the same product is added again", () => {
    let state = ordersReducer(empty(), addItemToOrder("t1", product()));
    state = ordersReducer(state, addItemToOrder("t1", product()));
    const order = state.byId[state.allIds[0]];
    expect(order.items).toHaveLength(1);
    expect(order.items[0].quantity).toBe(2);
  });

  it("adds a new line for a different product", () => {
    let state = ordersReducer(empty(), addItemToOrder("t1", product()));
    state = ordersReducer(state, addItemToOrder("t1", product({ id: "p2", name: "Té" })));
    const order = state.byId[state.allIds[0]];
    expect(order.items).toHaveLength(2);
  });
});

describe("sendCommand", () => {
  it("marks all items sentToKitchen and sets status", () => {
    let state = ordersReducer(empty(), addItemToOrder("t1", product()));
    state = ordersReducer(state, sendCommand({ tableId: "t1" }));
    const order = state.byId[state.allIds[0]];
    expect(order.status).toBe("sent_to_kitchen");
    expect(order.items.every((i) => i.sentToKitchen)).toBe(true);
  });
});

describe("markAsPaid + skip-paid", () => {
  it("sets status paid", () => {
    let state = ordersReducer(empty(), addItemToOrder("t1", product()));
    state = ordersReducer(state, markAsPaid({ tableId: "t1" }));
    expect(state.byId[state.allIds[0]].status).toBe("paid");
  });

  it("a new add after payment creates a separate order (paid order not reused)", () => {
    let state = ordersReducer(empty(), addItemToOrder("t1", product()));
    state = ordersReducer(state, markAsPaid({ tableId: "t1" }));
    state = ordersReducer(state, addItemToOrder("t1", product()));
    expect(state.allIds).toHaveLength(2);
  });
});
