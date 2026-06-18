import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Testimonials API error:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}
