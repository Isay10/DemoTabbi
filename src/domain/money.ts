// Money helpers. No currency libraries.

import type { OrderItem } from "./types";

export function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function formatMoney(amount: number): string {
  return "$" + Math.round(amount).toLocaleString("es-AR");
}
