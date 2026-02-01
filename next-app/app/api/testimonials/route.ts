import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { testimonials } from '@/shared/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get('serviceType');

    let query = db.select().from(testimonials);
    
    if (serviceType) {
      const results = await db.select().from(testimonials).where(eq(testimonials.situation, serviceType));
      return NextResponse.json(results);
    }
    
    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
