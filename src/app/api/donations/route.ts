import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.donorName || !body.amount || body.amount < 10000) {
      return NextResponse.json(
        { success: false, error: 'Nama donatur dan nominal minimal Rp 10.000 wajib diisi' },
        { status: 400 }
      )
    }

    const donation = await db.donation.create({
      data: {
        donorName: body.donorName,
        donorEmail: body.donorEmail || null,
        amount: parseInt(body.amount),
        message: body.message || null,
        method: body.method || 'TRANSFER',
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Terima kasih atas donasi Anda! Donasi sedang diverifikasi oleh admin.',
      id: donation.id,
    })
  } catch (error) {
    console.error('Donation API error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal memproses donasi' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const donations = await db.donation.findMany({
      where: { status: 'VERIFIED' },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        donorName: true,
        amount: true,
        message: true,
        createdAt: true,
      },
    })
    const total = donations.reduce((s, d) => s + d.amount, 0)
    return NextResponse.json({ donations, total })
  } catch (error) {
    console.error('Donation GET error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
