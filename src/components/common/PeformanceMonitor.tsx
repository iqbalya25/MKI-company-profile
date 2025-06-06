// 'use client';

// import { useEffect } from 'react';

// export default function PerformanceMonitor() {
//   useEffect(() => {
//     // Only run in production
//     if (process.env.NODE_ENV !== 'production') return;

//     // Monitor Core Web Vitals
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB, getINP }) => {
//       getCLS(console.log);
//       getFID(console.log);
//       getFCP(console.log);
//       getLCP(console.log);
//       getTTFB(console.log);
//       getINP(console.log);
//     });

//     // Monitor largest contentful paint
//     const observer = new PerformanceObserver((list) => {
//       const entries = list.getEntries();
//       entries.forEach((entry) => {
//         if (entry.entryType === 'largest-contentful-paint') {
//           console.log('LCP:', entry.startTime);
//         }
//       });
//     });

//     observer.observe({ entryTypes: ['largest-contentful-paint'] });

//     return () => observer.disconnect();
//   }, []);

//   return null;
// }