import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Generate member number
    const count = await db.member.count()
    const memberNumber = `KR-${String(2024000 + count + 1).padStart(7, '0')}`

    const member = await db.member.create({
      data: {
        memberNumber,
        nik: body.nik || null,
        fullName: body.fullName,
        birthPlace: body.birthPlace || null,
        birthDate: body.birthDate ? new Date(body.birthDate) : null,
        gender: body.gender || null,
        address: body.address || null,
        village: body.village || null,
        district: body.district || 'Cikampek',
        regency: body.regency || 'Karawang',
        province: body.province || 'Jawa Barat',
        phone: body.phone || null,
        whatsapp: body.whatsapp || null,
        email: body.email || null,
        education: body.education || null,
        occupation: body.occupation || null,
        skills: body.skills || null,
        certifications: body.certifications || null,
        photo: body.photo || null,
        ktpPhoto: body.ktpPhoto || null,
        certPhoto: body.certPhoto || null,
        status: 'PENDING',
        divisionId: body.divisionId || null,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil! Akun Anda dalam status PENDING APPROVAL. Admin akan mereview data Anda dan mengirim notifikasi email.',
      memberNumber: member.memberNumber,
      id: member.id,
    })
  } catch (error) {
    console.error('Register API error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mendaftar. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}
