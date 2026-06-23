// AI-READY BOUNDARY
// Current impl: pure rule-based, runs locally, no network.
// Future impl: call a backend API that calls an AI provider (OpenAI, Claude, etc).
//   Backend receives a lightweight state summary (not the full RootState).
//   Backend returns InsightServiceResponse.
//   Never call an AI provider directly from React Native.
//
// To integrate:
//   1. Create src/services/aiInsightApi.ts (placeholder already exists)
//   2. POST /api/insights with { tables, orders, timestamp }
//   3. Replace the generateRuleBasedInsights() call in insightSelectors.ts with the api call
//   4. Add loading/error state to uiSlice if needed

import type { RestaurantTable, Order } from "../../domain/types";
import { getElapsedMinutes } from "../../domain/time";
import type { Insight } from "./insightTypes";

const OPEN_TOO_LONG_MINUTES = 90;
const HIGH_OCCUPANCY_RATIO = 0.8;

export function generateRuleBasedInsights(
  tables: RestaurantTable[],
  orders: Order[]
): Insight[] {
  const insights: Insight[] = [];
  const orderById = new Map(orders.map((o) => [o.id, o]));
  const orderByTableId = new Map(orders.map((o) => [o.tableId, o]));

  for (const table of tables) {
    // critical — in_use too long
    if (table.status === "in_use" && table.openedAt) {
      const minutes = getElapsedMinutes(table.openedAt);
      if (minutes > OPEN_TOO_LONG_MINUTES) {
        insights.push({
          id: `open_too_long_${table.id}`,
          severity: "critical",
          title: "Mesa abierta hace mucho",
          description: `${table.name} lleva ${minutes} min abierta.`,
          tableId: table.id,
        });
      }
    }

    // critical — closed with order ready to bill (pending payment)
    if (table.status === "closed" && table.orderId) {
      const order = orderById.get(table.orderId);
      if (order && order.status === "ready_to_bill") {
        insights.push({
          id: `pending_payment_${table.id}`,
          severity: "critical",
          title: "Pago pendiente",
          description: `${table.name} está cerrada y lista para facturar.`,
          tableId: table.id,
        });
      }
    }

    // warning — in_use with a draft order that has items (command not sent)
    if (table.status === "in_use") {
      const order = orderByTableId.get(table.id);
      if (order && order.status === "draft" && order.items.length > 0) {
        insights.push({
          id: `unsent_command_${table.id}`,
          severity: "warning",
          title: "Comanda sin enviar",
          description: `${table.name} tiene productos sin enviar a cocina.`,
          tableId: table.id,
        });
      }
    }
  }

  // info — sector occupancy above threshold
  const bySector = new Map<string, RestaurantTable[]>();
  for (const table of tables) {
    const group = bySector.get(table.sectorId) ?? [];
    group.push(table);
    bySector.set(table.sectorId, group);
  }
  for (const [sectorId, sectorTables] of bySector) {
    const occupied = sectorTables.filter((t) => t.status !== "available").length;
    const ratio = occupied / sectorTables.length;
    if (ratio > HIGH_OCCUPANCY_RATIO) {
      insights.push({
        id: `high_occupancy_${sectorId}`,
        severity: "info",
        title: "Sector muy ocupado",
        description: `${occupied} de ${sectorTables.length} mesas ocupadas.`,
      });
    }
  }

  return insights;
}
