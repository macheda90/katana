import { db } from "@/lib/db"
import { getSiteSettings } from "@/lib/site-settings"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { AboutSection } from "@/components/sections/about-section"
import { DivisionsSection } from "@/components/sections/divisions-section"
import { ActivitiesSection } from "@/components/sections/activities-section"
import { NewsSection } from "@/components/sections/news-section"
import { AgendaSection } from "@/components/sections/agenda-section"
import { StrukturSection } from "@/components/sections/struktur-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { EdukasiSection } from "@/components/sections/edukasi-section"
import { DashboardSection } from "@/components/sections/dashboard-section"
import { RegisterSection } from "@/components/sections/register-section"
import { LaporSection } from "@/components/sections/lapor-section"
import { DisasterSection } from "@/components/sections/disaster-section"
import { MapSection } from "@/components/sections/map-section"
import { ContactSection } from "@/components/sections/contact-section"
import { AdminPortal } from "@/components/admin/admin-portal"
import { PageContent } from "@/components/pages/page-content"

async function getStats() {
  try {
    const [totalMembers, totalPengurus, totalMissions, totalSocial, activeVolunteers, missionsCompleted] = await Promise.all([
      db.member.count({ where: { status: "ACTIVE" } }),
      db.member.count({ where: { status: "ACTIVE", divisionId: { not: null } } }),
      db.mission.count(),
      db.activity.count({ where: { category: "SOSIAL" } }),
      db.member.count({ where: { status: "ACTIVE" } }),
      db.mission.count({ where: { status: "SELESAI" } }),
    ])
    return { totalMembers, totalPengurus, totalMissions, totalSocial, activeVolunteers, missionsCompleted }
  } catch {
    return { totalMembers: 50, totalPengurus: 8, totalMissions: 5, totalSocial: 20, activeVolunteers: 42, missionsCompleted: 3 }
  }
}

// Revalidate every 30 seconds so front-end syncs with back-office changes
export const revalidate = 30

export default async function HomePage() {
  const [stats, divisions, activities, news, agenda, testimonials, partners, settings, allMembers] = await Promise.all([
    getStats(),
    db.division.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        icon: true,
        color: true,
        coordinator: true,
        order: true,
        _count: { select: { members: { where: { status: "ACTIVE" } } } },
      },
    }),
    db.activity.findMany({
      orderBy: { activityDate: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        description: true,
        location: true,
        activityDate: true,
        image: true,
        division: { select: { name: true, icon: true, color: true } },
      },
    }),
    db.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        excerpt: true,
        thumbnail: true,
        author: true,
        views: true,
        publishedAt: true,
      },
    }),
    db.agenda.findMany({
      where: { status: "UPCOMING" },
      orderBy: { startDate: "asc" },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        location: true,
        startDate: true,
        endDate: true,
        status: true,
      },
    }),
    db.testimonial.findMany({
      orderBy: { order: "asc" },
      select: { id: true, name: true, role: true, org: true, message: true, rating: true, avatar: true },
    }),
    db.partner.findMany({
      orderBy: { order: "asc" },
      select: { id: true, name: true, type: true },
    }),
    getSiteSettings(),
    db.member.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, fullName: true, memberNumber: true, photo: true, bio: true, occupation: true, divisionId: true, status: true },
    }),
  ])

  const safeActivities = activities.map((activity) => ({
    ...activity,
    activityDate: activity.activityDate.toISOString(),
  }))
  const safeNews = news.map((item) => ({
    ...item,
    publishedAt: item.publishedAt.toISOString(),
  }))
  const safeAgenda = agenda.map((item) => ({
    ...item,
    startDate: item.startDate.toISOString(),
    endDate: item.endDate?.toISOString() ?? null,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0f1d]">
      <Navbar />
      <PageContent members={allMembers} divisions={divisions}>
        <main className="flex-1">
          <HeroSection stats={stats} settings={settings} />
          <StatsSection stats={stats} />
          <AboutSection settings={settings} />
          <DivisionsSection divisions={divisions} />
          <ActivitiesSection activities={safeActivities} />
          <NewsSection news={safeNews} />
          <AgendaSection agenda={safeAgenda} />
          <StrukturSection />
          <DisasterSection />
          <EdukasiSection />
          <DashboardSection />
          <RegisterSection divisions={divisions} />
          <LaporSection />
          <TestimonialsSection testimonials={testimonials} />
          <PartnersSection partners={partners} />
          <MapSection settings={settings} />
          <ContactSection settings={settings} />
        </main>
      </PageContent>
      <Footer settings={settings} />
      <AdminPortal />
    </div>
  )
}
