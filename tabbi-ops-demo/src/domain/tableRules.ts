// Pure table operational rules. No classes, no side effects.

import type { RestaurantTable, Order, OperationalValidationResult } from "./types";
import { isWithinBusinessHours } from "./time";

export function canOpenTable(table: RestaurantTable): OperationalValidationResult {
  if (!isWithinBusinessHours(new Date())) {
    return { valid: false, reason: "outside_business_hours" };
  }
  if (table.status === "available" || table.status === "reserved") {
    return { valid: true };
  }
  return { valid: false, reason: "table_already_in_use" };
}

export function canSendCommand(
  table: RestaurantTable,
  order: Order
): OperationalValidationResult {
  if (table.status !== "in_use") {
    return { valid: false, reason: "table_not_found" };
  }
  if (order.items.length === 0) {
    return { valid: false, reason: "empty_order" };
  }
  return { valid: true };
}

export function canCloseTable(
  table: RestaurantTable,
  order: Order
): OperationalValidationResult {
  if (table.status !== "in_use") {
    return { valid: false, reason: "table_not_found" };
  }
  if (order.items.length === 0) {
    return { valid: false, reason: "empty_order" };
  }
  return { valid: true };
}

export function canPayTable(table: RestaurantTable): OperationalValidationResult {
  if (table.status === "closed") {
    return { valid: true };
  }
  return { valid: false, reason: "table_not_ready_to_bill" };
}
