import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany()
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value
    return NextResponse.json(map)
  } catch (error) {
    console.error('Settings API error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
