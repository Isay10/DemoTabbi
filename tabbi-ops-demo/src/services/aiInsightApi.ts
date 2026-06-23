// PLACEHOLDER — not called yet.
// When the backend is ready:
//   POST /api/insights → InsightServiceResponse
// This file replaces the local generateRuleBasedInsights() call.
// The mobile app never imports an AI SDK directly.

import type { RestaurantTable, Order } from "../domain/types";
import type { InsightServiceResponse } from "../features/insights/insightTypes";

export async function fetchInsights(
  _payload: { tables: RestaurantTable[]; orders: Order[] }
): Promise<InsightServiceResponse> {
  throw new Error("aiInsightApi not implemented — backend integration pending");
}
