// Insight types. AI-ready contract — shape a real backend would return.

export type InsightSeverity = "critical" | "warning" | "info";

export type Insight = {
  id: string;
  severity: InsightSeverity;
  title: string;
  description: string;
  tableId?: string; // optional link to affected table
};

// AI-ready contract — this is what a real backend would return.
// When integrating: replace generateRuleBasedInsights() with a fetch to
// POST /api/insights with a RootState summary as body, same return shape.
export type InsightServiceResponse = {
  insights: Insight[];
  generatedAt: string; // ISO timestamp
};
