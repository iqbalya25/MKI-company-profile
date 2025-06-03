// src/lib/web-vitals.ts
import { NextWebVitalsMetric } from "next/app";

// Web Vitals threshold values for rating
const vitalsThresholds = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

type VitalsRating = "good" | "needs-improvement" | "poor";

function getRating(metric: NextWebVitalsMetric): VitalsRating {
  const thresholds =
    vitalsThresholds[metric.name as keyof typeof vitalsThresholds];
  if (!thresholds) return "needs-improvement";

  if (metric.value <= thresholds.good) return "good";
  if (metric.value > thresholds.poor) return "poor";
  return "needs-improvement";
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const rating = getRating(metric);

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating,
      id: metric.id,
    });
    return; // Don't send to analytics in development
  }

  // Send to Google Analytics 4 if available
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ),
      non_interaction: true,
    });
  }

  // OPTIONAL: Send to your own analytics endpoint
  // Uncomment this section when you have an API endpoint ready
  /*
  const analyticsData = {
    name: metric.name,
    value: metric.value,
    rating,
    id: metric.id,
    url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analyticsData),
    }).catch((error) => {
      console.error('Failed to send web vitals:', error);
    });
  }
  */
}

// Helper function to format vitals for display
export function formatVitalValue(name: string, value: number): string {
  switch (name) {
    case "CLS":
      return value.toFixed(3);
    case "FCP":
    case "LCP":
    case "FID":
    case "TTFB":
    case "INP":
      return `${Math.round(value)}ms`;
    default:
      return value.toString();
  }
}

// src/app/layout.tsx - Add this to your layout file:
// export { reportWebVitals } from '@/lib/web-vitals';
