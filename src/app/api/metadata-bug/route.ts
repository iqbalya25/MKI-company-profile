import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/contentful';

export async function GET() {
  try {
    // Test the exact same function your page uses
    const product = await getProductBySlug('fuji-frenic-mega-inverter');
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' });
    }

    // Test the exact same logic your generateMetadata uses
    const title = product.seoTitle;
    const description = product.seoDescription;
    
    return NextResponse.json({
      productFound: !!product,
      rawSeoTitle: product.seoTitle,
      rawSeoDescription: product.seoDescription,
      finalTitle: title,
      finalDescription: description,
      productName: product.name,
      timestamp: new Date().toISOString(),
      environment: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}