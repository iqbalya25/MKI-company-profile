// import { NextResponse } from 'next/server';
// import { getProductBySlug } from '@/lib/contentful';

// export async function GET() {
//   try {
//     // Check environment
//     const spaceId = process.env.CONTENTFUL_SPACE_ID;
//     const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
    
//     // Get the product
//     const product = await getProductBySlug('fuji-frenic-mega-inverter');
    
//     return NextResponse.json({
//       environment: {
//         spaceId: spaceId,
//         accessTokenPrefix: accessToken?.substring(0, 15),
//         nodeEnv: process.env.NODE_ENV
//       },
//       product: product ? {
//         id: product.id,
//         name: product.name,
//         seoTitle: product.seoTitle,
//         seoDescription: product.seoDescription,
//         slug: product.slug,
//         brand: product.brand,
//         model: product.model
//       } : null,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     return NextResponse.json({
//       error: error instanceof Error ? error.message : 'Unknown error',
//       spaceId: process.env.CONTENTFUL_SPACE_ID,
//       hasToken: !!process.env.CONTENTFUL_ACCESS_TOKEN
//     });
//   }
// }