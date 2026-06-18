import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const divisions = await db.division.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { members: { where: { status: 'ACTIVE' } } } },
      },
    })
    return NextResponse.json(divisions)
  } catch (error) {
    console.error('Divisions API error:', error)
    return NextResponse.json({ error: 'Failed to fetch divisions' }, { status: 500 })
  }
}
