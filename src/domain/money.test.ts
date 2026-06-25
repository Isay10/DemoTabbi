import { calculateTotal, formatMoney } from "./money";
import type { OrderItem } from "./types";

const item = (quantity: number, unitPrice: number): OrderItem => ({
  id: "x",
  productId: "p",
  name: "x",
  quantity,
  unitPrice,
  sentToKitchen: false,
});

describe("calculateTotal", () => {
  it("returns 0 for an empty order", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("sums quantity * unitPrice across items", () => {
    expect(calculateTotal([item(2, 1800), item(1, 600)])).toBe(4200);
  });
});

describe("formatMoney", () => {
  it("rounds and groups with es-AR separators", () => {
    // ponytail: depends on Node having full ICU (es-AR uses '.' as thousands sep)
    expect(formatMoney(1250)).toBe("$1.250");
  });

  it("rounds fractional amounts", () => {
    expect(formatMoney(999.6)).toBe("$1.000");
  });
});
