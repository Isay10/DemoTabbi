import {
  canOpenTable,
  canSendCommand,
  canCloseTable,
  canPayTable,
} from "./tableRules";
import type { RestaurantTable, Order, TableStatus } from "./types";

const table = (status: TableStatus): RestaurantTable => ({
  id: "t1",
  sectorId: "s1",
  number: 1,
  name: "Mesa 1",
  capacity: { min: 1, max: 4 },
  status,
  sortOrder: 1,
});

const order = (itemCount: number): Order => ({
  id: "o1",
  tableId: "t1",
  status: "draft",
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

describe("canOpenTable", () => {
  afterEach(() => jest.useRealTimers());

  it("allows opening an available table within business hours", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 5, 24, 14, 0, 0));
    expect(canOpenTable(table("available"))).toEqual({ valid: true });
  });

  it("rejects a table already in use", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 5, 24, 14, 0, 0));
    expect(canOpenTable(table("in_use"))).toEqual({
      valid: false,
      reason: "table_already_in_use",
    });
  });

  it("rejects opening outside business hours", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 5, 24, 3, 0, 0));
    expect(canOpenTable(table("available"))).toEqual({
      valid: false,
      reason: "outside_business_hours",
    });
  });
});

describe("canSendCommand", () => {
  it("rejects when table is not in use", () => {
    expect(canSendCommand(table("available"), order(1))).toEqual({
      valid: false,
      reason: "table_not_found",
    });
  });
  it("rejects an empty order", () => {
    expect(canSendCommand(table("in_use"), order(0))).toEqual({
      valid: false,
      reason: "empty_order",
    });
  });
  it("allows an in_use table with items", () => {
    expect(canSendCommand(table("in_use"), order(2))).toEqual({ valid: true });
  });
});

describe("canCloseTable", () => {
  it("rejects when table is not in use", () => {
    expect(canCloseTable(table("closed"), order(1))).toEqual({
      valid: false,
      reason: "table_not_found",
    });
  });
  it("rejects an empty order", () => {
    expect(canCloseTable(table("in_use"), order(0))).toEqual({
      valid: false,
      reason: "empty_order",
    });
  });
  it("allows an in_use table with items", () => {
    expect(canCloseTable(table("in_use"), order(1))).toEqual({ valid: true });
  });
});

describe("canPayTable", () => {
  it("allows a closed table", () => {
    expect(canPayTable(table("closed"))).toEqual({ valid: true });
  });
  it("rejects a table that is not closed", () => {
    expect(canPayTable(table("in_use"))).toEqual({
      valid: false,
      reason: "table_not_ready_to_bill",
    });
  });
});
