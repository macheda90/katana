import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    const category = searchParams.get('category')

    const where: Record<string, unknown> = {}
    if (category) where.category = category

    const activities = await db.activity.findMany({
      where,
      orderBy: { activityDate: 'desc' },
      take: limit,
      include: {
        division: { select: { name: true, icon: true, color: true } },
      },
    })

    return NextResponse.json(activities)
  } catch (error) {
    console.error('Activities API error:', error)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}
