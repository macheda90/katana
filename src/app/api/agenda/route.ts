import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    const upcoming = searchParams.get('upcoming')

    const where: Record<string, unknown> = {}
    if (upcoming === 'true') where.status = 'UPCOMING'

    const agenda = await db.agenda.findMany({
      where,
      orderBy: { startDate: 'asc' },
      take: limit,
    })

    return NextResponse.json(agenda)
  } catch (error) {
    console.error('Agenda API error:', error)
    return NextResponse.json({ error: 'Failed to fetch agenda' }, { status: 500 })
  }
}
