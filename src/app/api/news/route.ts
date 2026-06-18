import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: Record<string, unknown> = { published: true }
    if (category) where.category = category
    if (featured === 'true') where.featured = true

    const news = await db.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        excerpt: true,
        thumbnail: true,
        author: true,
        views: true,
        publishedAt: true,
      },
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
