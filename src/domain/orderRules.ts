// Pure order operational rules. No classes, no side effects.

import type { Order, OperationalValidationResult } from "./types";

export function canAddItem(order: Order): OperationalValidationResult {
  if (order.status === "draft" || order.status === "sent_to_kitchen") {
    return { valid: true };
  }
  return { valid: false, reason: "table_not_ready_to_bill" };
}

export function isOrderEmpty(order: Order): boolean {
  return order.items.length === 0;
}
