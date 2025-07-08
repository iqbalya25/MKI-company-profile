// src/lib/web-vitals.ts - NO MORE FID
import type { Metric } from "web-vitals";

// Updated thresholds (removed FID)
const vitalsThresholds = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },    // Replaces FID
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
};

type VitalsRating = "good" | "needs-improvement" | "poor";

function getRating(metric: Metric): VitalsRating {
  const thresholds = vitalsThresholds[metric.name as keyof typeof vitalsThresholds];
  if (!thresholds) return "needs-improvement";

  if (metric.value <= thresholds.good) return "good";
  if (metric.value > thresholds.poor) return "poor";
  return "needs-improvement";
}

export function reportWebVitals(metric: Metric): void {
  const rating = getRating(metric);

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating,
      id: metric.id,
    });
    return;
  }

  // Send to Google Analytics 4 if available
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Helper function to format vitals for display
export function formatVitalValue(name: string, value: number): string {
  switch (name) {
    case "CLS":
      return value.toFixed(3);
    case "FCP":
    case "LCP":
    case "INP":    // Updated: INP instead of FID
    case "TTFB":
      return `${Math.round(value)}ms`;
    default:
      return value.toString();
  }
}