import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, ADMIN_ROLES } from '@/lib/auth'
import { adminSections } from '@/lib/admin-config'
import { modelMap } from '@/lib/admin-models'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { section, id } = await params
  const config = adminSections[section]
  const model = modelMap[section]
  if (!config || !model) return NextResponse.json({ error: 'Section not found' }, { status: 404 })

  const body = await req.json()
  const data: Record<string, unknown> = {}
  for (const field of config.fields) {
    if (body[field.name] !== undefined) {
      if (field.type === 'number') {
        data[field.name] = parseInt(body[field.name]) || 0
      } else if (field.type === 'boolean') {
        data[field.name] = body[field.name] === true || body[field.name] === 'true'
      } else if (field.type === 'date' && body[field.name]) {
        data[field.name] = new Date(body[field.name])
      } else {
        data[field.name] = body[field.name]
      }
    }
  }

  try {
    const record = await model.update({ where: { id }, data })
    return NextResponse.json(record)
  } catch (error: any) {
    console.error('Update error:', error)
    return NextResponse.json({ error: error.message || 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { section, id } = await params
  const config = adminSections[section]
  const model = modelMap[section]
  if (!config || !model) return NextResponse.json({ error: 'Section not found' }, { status: 404 })

  try {
    await model.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: error.message || 'Failed to delete' }, { status: 500 })
  }
}
