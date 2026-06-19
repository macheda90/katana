import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.type || !body.location || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Jenis, lokasi, dan deskripsi kejadian wajib diisi' },
        { status: 400 }
      )
    }

    const report = await db.incidentReport.create({
      data: {
        type: body.type,
        reporterName: body.reporterName || null,
        reporterPhone: body.reporterPhone || null,
        location: body.location,
        description: body.description,
        status: 'BARU',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Laporan Anda telah diterima! Tim SAR Katana Rescue akan segera menindaklanjuti.',
      id: report.id,
    })
  } catch (error) {
    console.error('Incident report API error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim laporan' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const incidents = await db.incidentReport.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    return NextResponse.json(incidents)
  } catch (error) {
    console.error('Incident GET error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
