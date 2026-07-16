import { NextRequest, NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'
import { randomUUID } from 'crypto'
import { getSessionUser, ADMIN_ROLES } from '@/lib/auth'

export async function POST(req: NextRequest) {
    const user = await getSessionUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    try {
        const form = await req.formData()
        const file = form.get('file')
        const prevUrl = form.get('prevUrl')

        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'File upload tidak valid' }, { status: 400 })
        }

        if (prevUrl && typeof prevUrl === 'string' && prevUrl) {
            try {
                await del(prevUrl)
            } catch {
                // best-effort
            }
        }

        const extension = file.name.split('.').pop() || 'jpg'
        const key = `members/${randomUUID()}.${extension}`

        const blob = await put(key, file, {
            access: 'public',
            addRandomSuffix: false,
        })

        return NextResponse.json({ url: blob.url })
    } catch (err: any) {
        console.error('upload-member-photo error:', err)
        return NextResponse.json({ error: err?.message || 'Gagal upload foto' }, { status: 500 })
    }
}

