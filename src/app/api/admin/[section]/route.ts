import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, ADMIN_ROLES } from '@/lib/auth'
import { adminSections, canAccessSection, canPerformAction } from '@/lib/admin-config'
import { modelMap } from '@/lib/admin-models'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { section } = await params
  const config = adminSections[section]
  const model = modelMap[section]
  if (!config || !model) return NextResponse.json({ error: 'Section not found' }, { status: 404 })

  if (!canAccessSection(config, user.role)) {
    return NextResponse.json({ error: 'Anda tidak memiliki akses ke section ini' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status')

  const where: Record<string, unknown> = {}
  if (search && config.searchFields?.length) {
    where.OR = config.searchFields.map((f) => ({ [f]: { contains: search } }))
  }
  if (status && status !== 'all') {
    where.status = status
  }

  // Special handling for relational display in Pengurus
  if (section === 'pengurus') {
    const records = await model.findMany({
      where: where as any,
      orderBy: { startedAt: 'desc' },
      take: 200,
      include: { member: true, position: true },
    })

    // normalize for DataManager columns
    const normalized = records.map((r: any) => ({
      ...r,
      memberAvatar: r.member?.avatar || r.avatar,
      memberName: r.member?.fullName || r.memberId,
      positionTitle: r.position?.title || r.positionId,
    }))

    return NextResponse.json(normalized)
  }

  const records = await model.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return NextResponse.json(records)

}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { section } = await params
  const config = adminSections[section]
  const model = modelMap[section]
  if (!config || !model) return NextResponse.json({ error: 'Section not found' }, { status: 404 })

  if (!canAccessSection(config, user.role) || !canPerformAction(config, user.role, 'create')) {
    return NextResponse.json({ error: 'Anda tidak memiliki izin untuk membuat data di section ini' }, { status: 403 })
  }

  const body = await req.json()

  const data: Record<string, unknown> = {}
  for (const field of config.fields) {
    if (body[field.name] !== undefined && body[field.name] !== '') {
      if (field.type === 'number') {
        data[field.name] = parseInt(body[field.name]) || 0
      } else if (field.type === 'boolean') {
        data[field.name] = body[field.name] === true || body[field.name] === 'true'
      } else if (field.type === 'date') {
        data[field.name] = new Date(body[field.name])
      } else {
        data[field.name] = body[field.name]
      }
    }
  }

  // Auto-generate slug for sections that need it
  if (['news', 'activities', 'agenda'].includes(section) && !data.slug) {
    const titleVal = (data.title as string) || (data.name as string) || `record-${Date.now()}`
    data.slug = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36)
  }

  if (section === 'news') {
    if (!data.publishedAt) data.publishedAt = new Date()
    if (data.views === undefined) data.views = 0
  }

  // Log audit
  try {
    await (await import('@/lib/db')).db.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entity: section,
        entityId: null,
        details: `Created ${config.singular}: ${data.title || data.name || data.fullName || 'record'}`,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || null,
      },
    })
  } catch { }

  try {
    const record = await model.create({ data })
    return NextResponse.json(record)
  } catch (error: any) {
    console.error('Create error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create' }, { status: 500 })
  }
}
