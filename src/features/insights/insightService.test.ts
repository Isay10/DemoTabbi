import { generateRuleBasedInsights } from "./insightService";
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

const o = (over: Partial<Order>): Order => ({
  id: "o1",
  tableId: "t1",
  status: "draft",
  createdAt: "",
  updatedAt: "",
  items: [],
  ...over,
});

const minutesAgo = (n: number) => new Date(Date.now() - n * 60000).toISOString();
const ids = (list: { id: string }[]) => list.map((x) => x.id);

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 5, 24, 14, 0, 0));
});
afterEach(() => jest.useRealTimers());

it("flags an in_use table open longer than 90 min as critical", () => {
  const tables = [
    t({ id: "t1", status: "in_use", openedAt: minutesAgo(100) }),
    t({ id: "t2", status: "available" }), // keep sector occupancy <= 0.8
  ];
  const result = generateRuleBasedInsights(tables, []);
  const found = result.find((i) => i.id === "open_too_long_t1");
  expect(found?.severity).toBe("critical");
});

it("flags a closed table with a ready_to_bill order as pending payment (critical)", () => {
  const tables = [
    t({ id: "t1", status: "closed", orderId: "o1" }),
    t({ id: "t2", status: "available" }),
  ];
  const orders = [o({ id: "o1", tableId: "t1", status: "ready_to_bill" })];
  const result = generateRuleBasedInsights(tables, orders);
  const found = result.find((i) => i.id === "pending_payment_t1");
  expect(found?.severity).toBe("critical");
});

it("warns about an in_use table with an unsent draft order", () => {
  const tables = [
    t({ id: "t1", status: "in_use", openedAt: minutesAgo(10) }),
    t({ id: "t2", status: "available" }),
  ];
  const orders = [
    o({
      id: "o1",
      tableId: "t1",
      status: "draft",
      items: [
        { id: "oi1", productId: "p1", name: "Café", quantity: 1, unitPrice: 300, sentToKitchen: false },
      ],
    }),
  ];
  const result = generateRuleBasedInsights(tables, orders);
  const found = result.find((i) => i.id === "unsent_command_t1");
  expect(found?.severity).toBe("warning");
});

it("reports a sector above 80% occupancy as info", () => {
  const tables = [
    t({ id: "t1", sectorId: "s9", status: "closed" }),
    t({ id: "t2", sectorId: "s9", status: "in_use", openedAt: minutesAgo(5) }),
  ];
  const result = generateRuleBasedInsights(tables, []);
  const found = result.find((i) => i.id === "high_occupancy_s9");
  expect(found?.severity).toBe("info");
});

it("returns an empty array for a calm floor", () => {
  const tables = [
    t({ id: "t1", status: "available" }),
    t({ id: "t2", status: "available" }),
  ];
  expect(generateRuleBasedInsights(tables, [])).toEqual([]);
});
