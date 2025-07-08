'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Modern web-vitals (no FID - it's completely removed)
    import('web-vitals').then((vitals) => {
      // Core Web Vitals (2024 standards)
      if (vitals.onCLS) vitals.onCLS(console.log);     // Cumulative Layout Shift
      if (vitals.onFCP) vitals.onFCP(console.log);     // First Contentful Paint  
      if (vitals.onLCP) vitals.onLCP(console.log);     // Largest Contentful Paint
      if (vitals.onTTFB) vitals.onTTFB(console.log);   // Time to First Byte
      if (vitals.onINP) vitals.onINP(console.log);     // Interaction to Next Paint
      
    }).catch((error) => {
      // Silent fail in production
      if (process.env.NODE_ENV === 'development') {
        console.log('Web vitals not available:', error);
      }
    });
  }, []);

  return null;
}