import { canAddItem, isOrderEmpty } from "./orderRules";
import type { Order, OrderStatus } from "./types";

const order = (status: OrderStatus, itemCount = 1): Order => ({
  id: "o1",
  tableId: "t1",
  status,
  createdAt: "",
  updatedAt: "",
  items: Array.from({ length: itemCount }, (_, i) => ({
    id: `oi${i}`,
    productId: "p",
    name: "x",
    quantity: 1,
    unitPrice: 100,
    sentToKitchen: false,
  })),
});

describe("canAddItem", () => {
  it("allows draft orders", () => {
    expect(canAddItem(order("draft"))).toEqual({ valid: true });
  });
  it("allows sent_to_kitchen orders", () => {
    expect(canAddItem(order("sent_to_kitchen"))).toEqual({ valid: true });
  });
  it("rejects ready_to_bill orders", () => {
    expect(canAddItem(order("ready_to_bill"))).toEqual({
      valid: false,
      reason: "table_not_ready_to_bill",
    });
  });
  it("rejects paid orders", () => {
    expect(canAddItem(order("paid"))).toEqual({
      valid: false,
      reason: "table_not_ready_to_bill",
    });
  });
});

describe("isOrderEmpty", () => {
  it("is true with no items", () => {
    expect(isOrderEmpty(order("draft", 0))).toBe(true);
  });
  it("is false with items", () => {
    expect(isOrderEmpty(order("draft", 2))).toBe(false);
  });
});
