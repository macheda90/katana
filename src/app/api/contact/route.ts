import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    await db.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject,
        message: body.message,
        status: 'BARU',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda berhasil dikirim! Tim kami akan menghubungi Anda segera.',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim pesan' },
      { status: 500 }
    )
  }
}
