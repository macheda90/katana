import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const partners = await db.partner.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(partners)
  } catch (error) {
    console.error('Partners API error:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}
