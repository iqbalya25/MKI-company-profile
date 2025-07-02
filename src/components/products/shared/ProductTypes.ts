/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/products/shared/ProductTypes.ts
// 🎯 SHARED TYPESCRIPT TYPES - All interfaces and types for product components
// ✅ Type safety across server and client components
// ✅ Consistent props and data structures
// ✅ Easy maintenance and refactoring

import {
  Product,
  ProductSpecification,
  ProductCategory,
} from "@/types/product";

// 🃏 PRODUCT CARD TYPES
export interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  showServices?: boolean;
  className?: string;
  priority?: boolean; // For image loading priority
}

export interface ProductCardServerProps extends ProductCardProps {
  // Server-specific props (if any)
  preloadImage?: boolean;
  staticMode?: boolean;
}

export interface ProductCardClientProps extends ProductCardProps {
  // Client-specific props (for future enhancements)
  onCardClick?: (product: Product) => void;
  onQuoteClick?: (product: Product) => void;
  enableAnimations?: boolean;
}

// 📊 PRODUCT GRID TYPES
export interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  viewMode?: "grid" | "list";
  className?: string;
}

export interface ProductGridServerProps extends ProductGridProps {
  baseUrl: string;
  searchParams: Record<string, string | undefined>;
  // Server-specific props
  enablePagination?: boolean;
  itemsPerPage?: number;
}

export interface ProductGridClientProps extends ProductGridProps {
  // Client-specific props (for future enhancements)
  onViewModeChange?: (mode: "grid" | "list") => void;
  onSortChange?: (sortBy: string) => void;
  enableInfiniteScroll?: boolean;
}

// 🔍 SEARCH & FILTER TYPES
export interface ProductSearchProps {
  totalProducts: number;
  currentCategory?: string;
  currentBrand?: string;
  currentSearch?: string;
  className?: string;
}

export interface ProductSearchServerProps extends ProductSearchProps {
  // Server-specific props
  enableAutoSubmit?: boolean;
  formMethod?: "GET" | "POST";
}

export interface ProductSearchClientProps extends ProductSearchProps {
  // Client-specific props (for future enhancements)
  onSearchChange?: (search: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
  enableRealTimeSearch?: boolean;
  debounceMs?: number;
}

// 🔧 FILTER & SORT TYPES
export interface SearchFilters {
  category?: string;
  brand?: string;
  search?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  inStock?: boolean;
  featured?: boolean;
}

export interface SortOptions {
  field: "name" | "brand" | "category" | "price" | "newest" | "oldest";
  direction: "asc" | "desc";
}

export type ViewMode = "grid" | "list";
export type LoadingState = "idle" | "loading" | "success" | "error";

// 📄 PAGINATION TYPES
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: Record<string, string | undefined>;
  className?: string;
}

export interface PaginationServerProps extends PaginationProps {
  // Server-specific pagination
  enablePreload?: boolean;
  maxVisiblePages?: number;
}

export interface PaginationClientProps extends PaginationProps {
  // Client-specific pagination (for future enhancements)
  onPageChange?: (page: number) => void;
  enableKeyboardNavigation?: boolean;
}

// 🛠️ TOOLBAR TYPES
export interface ProductToolbarProps {
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  viewMode: ViewMode;
  sortBy: string;
  className?: string;
}

export interface ProductToolbarServerProps extends ProductToolbarProps {
  // Server-specific toolbar
  availableSorts: Array<{ value: string; label: string }>;
  enableViewToggle?: boolean;
}

export interface ProductToolbarClientProps extends ProductToolbarProps {
  // Client-specific toolbar (for future enhancements)
  onViewModeChange?: (mode: ViewMode) => void;
  onSortChange?: (sortBy: string) => void;
  enableLocalStorage?: boolean;
}

// 🎨 STYLE TYPES
export interface StyleVariant {
  container?: string;
  content?: string;
  image?: string;
  header?: string;
  actions?: string;
}

export interface ResponsiveConfig {
  mobile: number; // columns on mobile
  tablet: number; // columns on tablet
  desktop: number; // columns on desktop
}

// 📱 RESPONSIVE TYPES
export interface ResponsiveGridConfig {
  columns: ResponsiveConfig;
  gap: "sm" | "md" | "lg";
  aspectRatio: "square" | "video" | "auto";
}

// 🔧 UTILITY TYPES
export interface ProductDisplayOptions {
  showPrice: boolean;
  showBrand: boolean;
  showCategory: boolean;
  showServices: boolean;
  showDescription: boolean;
  showBadges: boolean;
  truncateDescription: number; // max characters
}

export interface ProductInteractionOptions {
  enableHover: boolean;
  enableClick: boolean;
  enableQuickView: boolean;
  enableCompare: boolean;
  enableWishlist: boolean;
}

// 📊 ANALYTICS TYPES (for future tracking)
export interface ProductAnalyticsEvent {
  eventType: "view" | "click" | "quote" | "search" | "filter";
  productId?: string;
  productName?: string;
  category?: string;
  brand?: string;
  searchTerm?: string;
  filters?: SearchFilters;
  position?: number; // position in grid
  page?: number;
}

// 🎯 COMPONENT STATE TYPES
export interface ProductCardState {
  isLoading: boolean;
  hasError: boolean;
  isHovered: boolean;
  imageLoaded: boolean;
}

export interface ProductGridState {
  viewMode: ViewMode;
  sortBy: string;
  filters: SearchFilters;
  currentPage: number;
  isLoading: boolean;
  error?: string;
}

export interface ProductSearchState {
  searchTerm: string;
  activeFilters: SearchFilters;
  isSearching: boolean;
  suggestions: string[];
  recentSearches: string[];
}

// 🔍 SEARCH RESULT TYPES
export interface SearchResult {
  products: Product[];
  totalCount: number;
  facets: {
    categories: Array<{ name: string; count: number; slug: string }>;
    brands: Array<{ name: string; count: number; slug: string }>;
    priceRanges: Array<{ min: number; max: number; count: number }>;
  };
  suggestions: string[];
  searchTime: number; // milliseconds
}

// 🎨 THEME TYPES
export interface ProductThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// 🚀 PERFORMANCE TYPES
export interface PerformanceConfig {
  lazyLoadImages: boolean;
  preloadCount: number; // number of images to preload
  intersectionThreshold: number; // for lazy loading
  debounceMs: number; // for search/filter
  cacheResults: boolean;
  maxCacheSize: number;
}

// 📱 MOBILE OPTIMIZATION TYPES
export interface MobileOptimization {
  enableSwipeGestures: boolean;
  infiniteScroll: boolean;
  reducedMotion: boolean;
  touchOptimized: boolean;
  offlineSupport: boolean;
}

// 🔒 SECURITY TYPES
export interface SecurityConfig {
  sanitizeSearch: boolean;
  preventXSS: boolean;
  rateLimitSearch: {
    enabled: boolean;
    maxRequests: number;
    windowMs: number;
  };
  validateFilters: boolean;
}

// 🎯 COMPONENT VARIANTS
export type ProductCardVariant = "default" | "compact" | "featured" | "minimal";
export type ProductGridVariant =
  | "standard"
  | "masonry"
  | "carousel"
  | "infinite";
export type SearchVariant = "full" | "minimal" | "sidebar" | "modal";

// 📊 PROPS VALIDATION TYPES
export interface PropsValidation {
  required: string[];
  optional: string[];
  deprecated: string[];
  typeChecks: Record<string, string>;
}

// 🔧 COMPONENT CONFIG
export interface ComponentConfig {
  product: {
    card: {
      defaultViewMode: ViewMode;
      enableServices: boolean;
      showPriceByDefault: boolean;
      imageAspectRatio: "square" | "video";
      maxDescriptionLength: number;
    };
    grid: {
      defaultColumns: ResponsiveConfig;
      defaultGap: "sm" | "md" | "lg";
      enableVirtualization: boolean;
      itemsPerPage: number;
    };
    search: {
      debounceMs: number;
      minSearchLength: number;
      enableSuggestions: boolean;
      maxSuggestions: number;
    };
  };
  performance: PerformanceConfig;
  mobile: MobileOptimization;
  security: SecurityConfig;
  theme: ProductThemeConfig;
}

// 🎯 DEFAULT CONFIGURATIONS
export const defaultProductConfig: ComponentConfig = {
  product: {
    card: {
      defaultViewMode: "grid",
      enableServices: true,
      showPriceByDefault: false,
      imageAspectRatio: "square",
      maxDescriptionLength: 120,
    },
    grid: {
      defaultColumns: { mobile: 1, tablet: 2, desktop: 4 }, // 🎯 4 COLUMNS DEFAULT
      defaultGap: "md",
      enableVirtualization: false,
      itemsPerPage: 12,
    },
    search: {
      debounceMs: 300,
      minSearchLength: 2,
      enableSuggestions: true,
      maxSuggestions: 5,
    },
  },
  performance: {
    lazyLoadImages: true,
    preloadCount: 4,
    intersectionThreshold: 0.1,
    debounceMs: 300,
    cacheResults: true,
    maxCacheSize: 100,
  },
  mobile: {
    enableSwipeGestures: false,
    infiniteScroll: false,
    reducedMotion: false,
    touchOptimized: true,
    offlineSupport: false,
  },
  security: {
    sanitizeSearch: true,
    preventXSS: true,
    rateLimitSearch: {
      enabled: true,
      maxRequests: 10,
      windowMs: 60000, // 1 minute
    },
    validateFilters: true,
  },
  theme: {
    colors: {
      primary: "teal-600",
      secondary: "blue-600",
      accent: "gray-600",
      success: "green-600",
      warning: "orange-600",
      error: "red-600",
    },
    spacing: {
      xs: "1",
      sm: "2",
      md: "4",
      lg: "6",
      xl: "8",
    },
    borderRadius: {
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
    },
    shadows: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
  },
} as const;

// 🎯 TYPE GUARDS
export const isProduct = (obj: any): obj is Product => {
  return obj && typeof obj.id === "string" && typeof obj.name === "string";
};

export const isProductArray = (obj: any): obj is Product[] => {
  return Array.isArray(obj) && obj.every(isProduct);
};

export const isValidViewMode = (mode: any): mode is ViewMode => {
  return mode === "grid" || mode === "list";
};

export const isValidSortField = (field: any): field is SortOptions["field"] => {
  return ["name", "brand", "category", "price", "newest", "oldest"].includes(
    field
  );
};

// 🎯 HELPER TYPES FOR COMPONENT VARIANTS
export type ProductCardSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProductCardDensity = "compact" | "comfortable" | "spacious";
export type ProductGridLayout = "fixed" | "fluid" | "masonry";

// 🎯 EXPORT ALL TYPES FOR EASY IMPORTING
export type {
  Product,
  ProductSpecification,
  ProductCategory,
} from "@/types/product";
