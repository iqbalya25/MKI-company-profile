export interface ProductAnalytics {
  id: string;
  name: string;
  category: string;
  brand: string;
  price?: number;
  sku?: string;
}

export interface QuoteRequestAnalytics {
  products: ProductAnalytics[];
  totalValue?: number;
  companyName: string;
  urgency: "immediate" | "within_week" | "within_month" | "planning_phase";
}

export interface SearchAnalytics {
  searchTerm: string;
  resultsCount: number;
  filters?: Record<string, string>;
}
