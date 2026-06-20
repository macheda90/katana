import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, ADMIN_ROLES } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
    const user = await getSessionUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [members, positions] = await Promise.all([
        db.member.findMany({
            orderBy: { fullName: 'asc' },
            take: 500,
            select: { id: true, fullName: true, memberNumber: true },
        }),
        db.position.findMany({
            orderBy: { order: 'asc' },
            take: 500,
            select: { id: true, title: true },
        }),
    ])

    return NextResponse.json({
        members: members.map(m => ({
            value: m.id,
            label: m.memberNumber ? `${m.memberNumber} - ${m.fullName}` : m.fullName,
        })),
        positions: positions.map(p => ({
            value: p.id,
            label: p.title,
        })),
    })
}

