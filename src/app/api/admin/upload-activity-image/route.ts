import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, ADMIN_ROLES } from '@/lib/auth'
import { uploadImage, deleteImage } from '@/lib/blob'

export async function POST(req: NextRequest) {
    const user = await getSessionUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!ADMIN_ROLES.includes(user.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    try {
        const formData = await req.formData()
        const file = formData.get('file')
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'File gambar tidak ditemukan' }, { status: 400 })
        }

        // best-effort delete previous blob when passed
        const prevUrl = formData.get('prevUrl')
        if (typeof prevUrl === 'string' && prevUrl) {
            await deleteImage(prevUrl).catch(() => { })
        }

        const url = await uploadImage(file, 'activity-images')
        return NextResponse.json({ url })
    } catch (error: any) {
        console.error('Upload activity image error:', error)
        return NextResponse.json({ error: error?.message || 'Gagal upload gambar' }, { status: 500 })
    }
}

