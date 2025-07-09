import { ProductAnalytics, QuoteRequestAnalytics, SearchAnalytics } from '@/types/analytics';

export class AutomationAnalytics {
  private static isProduction = process.env.NODE_ENV === 'production';
  private static hasGtag = () => typeof window !== 'undefined' && window.gtag;

  // Initialize GA4
  static init(measurementId: string) {
    if (!this.isProduction || !measurementId) return;

    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
      custom_map: {
        custom_parameter_1: 'business_type',
        custom_parameter_2: 'automation_industry'
      }
    });
  }

  // Track page views
  static trackPageView(url: string) {
    if (!this.hasGtag()) return;
    
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }

  // Product view tracking
  static trackProductView(product: ProductAnalytics) {
    if (!this.hasGtag()) return;

    window.gtag('event', 'view_item', {
      currency: 'IDR',
      value: product.price || 0,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand,
        price: product.price || 0,
        currency: 'IDR',
        item_variant: product.sku
      }]
    });
  }

  // Quote request tracking (key conversion)
  static trackQuoteRequest(data: QuoteRequestAnalytics) {
    if (!this.hasGtag()) return;

    // Track as conversion
    window.gtag('event', 'generate_lead', {
      currency: 'IDR',
      value: data.totalValue || 0,
      lead_type: 'quote_request',
      company_name: data.companyName,
      urgency_level: data.urgency,
      product_count: data.products.length,
      items: data.products.map(product => ({
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand,
        price: product.price || 0
      }))
    });

    // Also track as custom event for detailed analysis
    window.gtag('event', 'automation_quote_request', {
      event_category: 'b2b_conversion',
      event_label: data.companyName,
      urgency: data.urgency,
      product_categories: data.products.map(p => p.category).join(','),
      brands: data.products.map(p => p.brand).join(','),
      value: data.totalValue || 0
    });
  }

  // Search tracking
  static trackSearch(data: SearchAnalytics) {
    if (!this.hasGtag()) return;

    window.gtag('event', 'search', {
      search_term: data.searchTerm,
      results_count: data.resultsCount,
      filters_applied: data.filters ? Object.keys(data.filters).join(',') : '',
      event_category: 'product_search'
    });
  }

  // Contact method tracking
  static trackContact(method: 'phone' | 'email' | 'whatsapp' | 'form', location?: string) {
    if (!this.hasGtag()) return;

    window.gtag('event', 'contact_interaction', {
      event_category: 'engagement',
      contact_method: method,
      page_location: location || window.location.pathname,
      non_interaction: false
    });
  }

  // Technical resource download
  static trackResourceDownload(fileName: string, resourceType: 'datasheet' | 'manual' | 'wiring_diagram' | 'brochure') {
    if (!this.hasGtag()) return;

    window.gtag('event', 'file_download', {
      event_category: 'technical_resources',
      event_label: fileName,
      file_type: resourceType,
      value: 1
    });
  }

  // Blog engagement
  static trackBlogEngagement(action: 'read_start' | 'read_complete' | 'share', articleTitle: string, category?: string) {
    if (!this.hasGtag()) return;

    window.gtag('event', 'blog_engagement', {
      event_category: 'content',
      engagement_type: action,
      article_title: articleTitle,
      content_category: category || 'technical_guide',
      non_interaction: action === 'read_start'
    });
  }

  // Service inquiry tracking
  static trackServiceInquiry(serviceType: 'parameter_setting' | 'commissioning' | 'technical_support' | 'training') {
    if (!this.hasGtag()) return;

    window.gtag('event', 'service_inquiry', {
      event_category: 'service_engagement',
      service_type: serviceType,
      value: 1
    });
  }

  // Location-based tracking
  static trackLocationInterest(location: 'jakarta' | 'surabaya' | 'bandung' | 'tangerang') {
    if (!this.hasGtag()) return;

    window.gtag('event', 'location_interest', {
      event_category: 'geographic',
      location: location,
      page_path: window.location.pathname
    });
  }

  // Industry application tracking
  static trackIndustryInterest(industry: 'manufacturing' | 'pharmaceutical' | 'automotive' | 'food_beverage' | 'textile') {
    if (!this.hasGtag()) return;

    window.gtag('event', 'industry_interest', {
      event_category: 'application',
      industry: industry,
      page_path: window.location.pathname
    });
  }
}