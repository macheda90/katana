import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [
      totalMembers,
      totalPengurus,
      totalMissions,
      totalSocial,
      activeVolunteers,
      pendingMembers,
      totalNews,
      totalAgenda,
      totalDonations,
      missionsCompleted,
    ] = await Promise.all([
      db.member.count({ where: { status: 'ACTIVE' } }),
      db.member.count({ where: { status: 'ACTIVE', divisionId: { not: null } } }),
      db.mission.count(),
      db.activity.count({ where: { category: 'SOSIAL' } }),
      db.member.count({ where: { status: 'ACTIVE' } }),
      db.member.count({ where: { status: 'PENDING' } }),
      db.news.count({ where: { published: true } }),
      db.agenda.count({ where: { status: 'UPCOMING' } }),
      db.donation.count({ where: { status: 'VERIFIED' } }),
      db.mission.count({ where: { status: 'SELESAI' } }),
    ])

    const members = await db.member.findMany({
      where: { status: 'ACTIVE', joinDate: { not: null } },
      select: { joinDate: true },
    })
    const months: { month: string; count: number }[] = []
    const now = new Date()
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const label = d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })
      const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      const count = members.filter((m) => m.joinDate && m.joinDate >= d && m.joinDate < next).length
      months.push({ month: label, count })
    }

    const categories = ['RESCUE', 'SOSIAL', 'PELATIHAN', 'SIMULASI', 'BENCANA']
    const activityByCategory = await Promise.all(
      categories.map(async (c) => ({
        category: c.charAt(0) + c.slice(1).toLowerCase(),
        count: await db.activity.count({ where: { category: c } }),
      }))
    )

    const missions = await db.mission.findMany({ select: { status: true, type: true } })
    const missionByType = ['PENCARIAN', 'EVAKUASI', 'BENCANA', 'MEDIS'].map((t) => ({
      type: t.charAt(0) + t.slice(1).toLowerCase(),
      count: missions.filter((m) => m.type === t).length,
    }))

    const donations = await db.donation.findMany({ where: { status: 'VERIFIED' }, select: { amount: true, createdAt: true } })
    const donationByMonth: { month: string; amount: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const label = d.toLocaleDateString('id-ID', { month: 'short' })
      const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      const amount = donations.filter((don) => don.createdAt >= d && don.createdAt < next).reduce((s, dd) => s + dd.amount, 0)
      donationByMonth.push({ month: label, amount })
    }

    return NextResponse.json({
      stats: {
        totalMembers,
        totalPengurus,
        totalMissions,
        totalSocial,
        activeVolunteers,
        pendingMembers,
        totalNews,
        totalAgenda,
        totalDonations,
        missionsCompleted,
      },
      charts: {
        memberGrowth: months,
        activityByCategory,
        missionByType,
        donationByMonth,
      },
    })
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
