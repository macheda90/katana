import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser, ADMIN_ROLES } from '@/lib/auth'

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany()
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value
    return NextResponse.json(map)
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const body = await req.json()

    // Upsert each setting
    const operations = Object.entries(body).map(([key, value]) =>
      db.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )

    await db.$transaction(operations)

    // Log audit
    try {
      await db.auditLog.create({
        data: {
          userId: user.id,
          action: 'UPDATE_SETTINGS',
          entity: 'settings',
          details: `Updated ${operations.length} settings`,
          ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || null,
        },
      })
    } catch {}

    return NextResponse.json({ success: true, updated: operations.length })
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
